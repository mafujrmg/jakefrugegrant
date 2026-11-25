export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  date: string;
  time: string;
  datePublished: string;
  category: string[];
  tags: string[];
  focusKeyphrase: string;
  seoTitle: string;
  metaDescription: string;
  image: string;
  imageAlt: string;
  imageCaption: string;
  imageDescription: string;
  originalPostLink: string;
  excerpt: string;
  content: string;
}

type Frontmatter = Record<string, string | string[]>;

const rawPosts = import.meta.glob('/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function stripQuotes(value: string): string {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    const inner = trimmed.slice(1, -1);
    try {
      return JSON.parse(trimmed.startsWith('"') ? trimmed : `"${inner.replace(/"/g, '\\"')}"`);
    } catch {
      return inner;
    }
  }
  return trimmed;
}

function parseValue(value: string): string | string[] {
  const trimmed = value.trim();
  if (trimmed.startsWith('[')) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) return parsed.map((item) => String(item));
    } catch {
      return trimmed
        .slice(1, -1)
        .split(',')
        .map((item) => stripQuotes(item))
        .filter((item) => item.length > 0);
    }
  }
  return stripQuotes(trimmed);
}

function parseFrontmatter(raw: string): { data: Frontmatter; body: string } {
  const normalized = raw.replace(/\r\n/g, '\n');
  if (!normalized.startsWith('---\n')) {
    return { data: {}, body: normalized };
  }
  const end = normalized.indexOf('\n---\n', 4);
  if (end === -1) {
    return { data: {}, body: normalized };
  }
  const block = normalized.slice(4, end);
  const body = normalized.slice(end + 5);
  const data: Frontmatter = {};
  for (const line of block.split('\n')) {
    const separator = line.indexOf(':');
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    if (!key) continue;
    data[key] = parseValue(line.slice(separator + 1));
  }
  return { data, body };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderInline(value: string): string {
  let html = escapeHtml(value);
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, text, url) => `<a href="${url}">${text}</a>`);
  html = html.replace(/\*\*\*([^*]+)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  return html;
}

function renderTable(lines: string[]): string {
  const rows = lines.map((line) =>
    line
      .trim()
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map((cell) => cell.trim()),
  );
  if (rows.length < 2) return '';
  const header = rows[0];
  const bodyRows = rows.slice(2);
  const headHtml = header.map((cell) => `<th>${renderInline(cell)}</th>`).join('');
  const bodyHtml = bodyRows
    .map((row) => `<tr>${row.map((cell) => `<td>${renderInline(cell)}</td>`).join('')}</tr>`)
    .join('');
  return `<table><thead><tr>${headHtml}</tr></thead><tbody>${bodyHtml}</tbody></table>`;
}

function markdownToHtml(markdown: string): string {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const blocks: string[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (!line.trim()) {
      index += 1;
      continue;
    }

    if (line.trim().startsWith('|') && index + 1 < lines.length && /^\s*\|?[\s:|-]+\|/.test(lines[index + 1])) {
      const tableLines: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith('|')) {
        tableLines.push(lines[index]);
        index += 1;
      }
      const table = renderTable(tableLines);
      if (table) blocks.push(table);
      continue;
    }

    const heading = /^(#{1,6})\s+(.*)$/.exec(line);
    if (heading) {
      const level = heading[1].length;
      blocks.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
      index += 1;
      continue;
    }

    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\s*[-*]\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\s*[-*]\s+/, ''));
        index += 1;
      }
      blocks.push(`<ul>${items.map((item) => `<li>${renderInline(item)}</li>`).join('')}</ul>`);
      continue;
    }

    if (/^\s*>\s?/.test(line)) {
      const quoteLines: string[] = [];
      while (index < lines.length && /^\s*>\s?/.test(lines[index])) {
        quoteLines.push(lines[index].replace(/^\s*>\s?/, ''));
        index += 1;
      }
      blocks.push(`<blockquote>${quoteLines.map((item) => renderInline(item)).join(' ')}</blockquote>`);
      continue;
    }

    const paragraph = [line];
    index += 1;
    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^(#{1,6})\s+/.test(lines[index]) &&
      !/^\s*[-*]\s+/.test(lines[index]) &&
      !lines[index].trim().startsWith('|') &&
      !/^\s*>\s?/.test(lines[index])
    ) {
      paragraph.push(lines[index]);
      index += 1;
    }
    blocks.push(`<p>${renderInline(paragraph.join(' '))}</p>`);
  }

  return blocks.join('\n');
}

function asString(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value.join(', ');
  return value ?? '';
}

function asArray(value: string | string[] | undefined): string[] {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  return [value];
}

function toIsoTime(time: string): string {
  const parts = time.split(':');
  if (parts.length < 2) return '00:00:00';
  const hours = parts[0].padStart(2, '0');
  const minutes = parts[1].padStart(2, '0');
  const seconds = (parts[2] ?? '00').padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

export const POSTS: BlogPost[] = Object.entries(rawPosts)
  .map(([path, raw], index) => {
    const { data, body } = parseFrontmatter(raw);
    const slug = asString(data.slug) || path.replace(/^.*\//, '').replace(/\.md$/, '');
    const date = asString(data.date);
    const time = asString(data.time);
    const metaDescription = asString(data.meta_description);
    return {
      id: index + 1,
      slug,
      title: asString(data.title),
      date,
      time,
      datePublished: date ? `${date}T${toIsoTime(time)}` : '',
      category: asArray(data.category),
      tags: asArray(data.tags),
      focusKeyphrase: asString(data.focus_keyphrase),
      seoTitle: asString(data.seo_title) || asString(data.title),
      metaDescription,
      image: asString(data.image),
      imageAlt: asString(data.image_alt),
      imageCaption: asString(data.image_caption),
      imageDescription: asString(data.image_description),
      originalPostLink: asString(data.original_post_link),
      excerpt: metaDescription,
      content: markdownToHtml(body),
    };
  })
  .sort((a, b) => {
    if (a.date !== b.date) return b.date.localeCompare(a.date);
    return (b.time || '').localeCompare(a.time || '');
  });

export function getPostBySlug(slug: string): BlogPost | null {
  return POSTS.find((post) => post.slug === slug) ?? null;
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function formatPostDate(date: string): string {
  const parts = date.split('-');
  if (parts.length !== 3) return date;
  const year = Number(parts[0]);
  const month = Number(parts[1]);
  const day = Number(parts[2]);
  if (!year || !month || !day || month < 1 || month > 12) return date;
  return `${MONTHS[month - 1]} ${day}, ${year}`;
}
