import fs from 'node:fs';
import path from 'node:path';
import {
  ROOT,
  PUBLIC_DIR,
  SITE_DOMAIN,
  asArray,
  pick,
  readPostFiles,
  listImages,
  loadPostFile,
  normalizeTitle,
} from './post-utils.mjs';

const nowOverride = process.env.POSTS_NOW ? new Date(process.env.POSTS_NOW) : null;
const now = nowOverride && !Number.isNaN(nowOverride.getTime()) ? nowOverride : new Date();

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderInline(value) {
  let html = escapeHtml(value);
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, text, url) => `<a href="${url}">${text}</a>`);
  html = html.replace(/\*\*\*([^*]+)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  return html;
}

function renderTable(lines) {
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

function markdownToHtml(markdown) {
  const lines = String(markdown).replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (!line.trim()) {
      index += 1;
      continue;
    }

    if (line.trim().startsWith('|') && index + 1 < lines.length && /^\s*\|?[\s:|-]+\|/.test(lines[index + 1])) {
      const tableLines = [];
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
      const items = [];
      while (index < lines.length && /^\s*[-*]\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\s*[-*]\s+/, ''));
        index += 1;
      }
      blocks.push(`<ul>${items.map((item) => `<li>${renderInline(item)}</li>`).join('')}</ul>`);
      continue;
    }

    if (/^\s*>\s?/.test(line)) {
      const quoteLines = [];
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

function plainTextFromMarkdown(markdown) {
  const lines = String(markdown).replace(/\r\n/g, '\n').split('\n');
  const line = lines.find((item) => {
    const trimmed = item.trim();
    if (!trimmed) return false;
    if (trimmed.startsWith('#')) return false;
    if (trimmed.startsWith('|')) return false;
    if (/^[-*]\s+/.test(trimmed)) return false;
    if (trimmed.startsWith('>')) return false;
    return true;
  });
  if (!line) return '';
  return line
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`>#]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function resolveImage(data, title, images) {
  const declared = pick(data, ['image', 'featured_image', 'featuredImage', 'image_path']).trim();
  if (declared) {
    const normalized = declared.replace(/\\/g, '/');
    if (/^https?:\/\//i.test(normalized)) {
      return { image: normalized, warning: '' };
    }
    let candidate = '';
    if (normalized.startsWith('/posts/images/')) {
      candidate = decodeURIComponent(normalized.slice('/posts/images/'.length));
    } else {
      candidate = decodeURIComponent(normalized.split('/').pop() || '');
    }
    if (candidate) {
      const exact =
        images.find((name) => name === candidate) ||
        images.find((name) => name.toLowerCase() === candidate.toLowerCase());
      if (exact) return { image: `/posts/images/${encodeURIComponent(exact)}`, warning: '' };
      return { image: '', warning: `declared image not found: ${declared}` };
    }
    return { image: '', warning: `invalid image path: ${declared}` };
  }

  const key = normalizeTitle(title);
  if (!key) return { image: '', warning: 'empty title for image matching' };
  const matches = images.filter((name) => normalizeTitle(name.replace(/\.[^.]+$/, '')) === key);
  if (matches.length === 1) {
    return { image: `/posts/images/${encodeURIComponent(matches[0])}`, warning: '' };
  }
  if (matches.length > 1) {
    return { image: '', warning: `multiple images match title (${matches.length})` };
  }
  return { image: '', warning: 'no image found for title' };
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function updateSitemap(visiblePosts) {
  const sitemapPath = path.join(PUBLIC_DIR, 'sitemap.xml');
  const baseEntries = [];
  if (fs.existsSync(sitemapPath)) {
    const xml = fs.readFileSync(sitemapPath, 'utf8');
    const blocks = xml.match(/<url>[\s\S]*?<\/url>/g) || [];
    for (const block of blocks) {
      const loc = (/<loc>\s*(.*?)\s*<\/loc>/.exec(block) || [])[1] || '';
      let pathname = '';
      try {
        pathname = new URL(loc).pathname;
      } catch {
        pathname = loc;
      }
      const isBlogPost = pathname.startsWith('/blog/') && pathname !== '/blog';
      if (!isBlogPost) baseEntries.push(block.trim());
    }
  }
  if (baseEntries.length === 0) {
    baseEntries.push(
      `<url><loc>${SITE_DOMAIN}/</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>`,
      `<url><loc>${SITE_DOMAIN}/blog</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`,
    );
  }
  const postEntries = visiblePosts.map(
    (post) =>
      `  <url><loc>${escapeXml(`${SITE_DOMAIN}${post.path}`)}</loc><lastmod>${post.date}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>`,
  );
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${baseEntries
    .map((entry) => `  ${entry}`)
    .join('\n')}\n${postEntries.join('\n')}\n</urlset>\n`;
  fs.writeFileSync(sitemapPath, xml, 'utf8');
}

function toRecord(candidate, index) {
  const { loaded, image } = candidate;
  const data = loaded.data;
  const metaDescription = pick(data, ['meta_description', 'metaDescription', 'seo_description']);
  const body = loaded.body;
  const excerpt = metaDescription || plainTextFromMarkdown(body).slice(0, 200);
  return {
    id: index + 1,
    slug: loaded.slug,
    path: `/blog/${encodeURIComponent(loaded.slug)}`,
    title: loaded.title,
    date: loaded.publish.date,
    time: loaded.publish.time,
    publishMoment: loaded.publish.moment.toISOString(),
    timestamp: loaded.publish.moment.getTime(),
    category: asArray(data.category || data.categories),
    tags: asArray(data.tags || data.tag),
    focusKeyphrase: pick(data, ['focus_keyphrase', 'focus_keyword', 'focusKeyphrase', 'focusKeyword']),
    seoTitle: pick(data, ['seo_title', 'seoTitle', 'title_seo']) || loaded.title,
    metaDescription,
    image: image.image,
    imageAlt: pick(data, ['image_alt', 'image_alt_text', 'alt_text', 'alt']),
    imageTitle: pick(data, ['image_title', 'image_name']),
    imageCaption: pick(data, ['image_caption', 'caption']),
    imageDescription: pick(data, ['image_description', 'image_desc']),
    originalPostLink: pick(data, ['original_post_link', 'original_link', 'source_url', 'post_link']),
    excerpt,
    content: markdownToHtml(body),
  };
}

const images = listImages();
const warnings = [];
const candidates = [];

for (const filePath of readPostFiles()) {
  const filename = path.basename(filePath);
  try {
    const loaded = loadPostFile(filePath);
    if (!loaded.title) {
      warnings.push(`${filename}: missing title -> skipped`);
      continue;
    }
    if (!loaded.publish) {
      warnings.push(`${filename}: missing or invalid date -> hidden`);
      continue;
    }
    if (!loaded.body.trim()) {
      warnings.push(`${filename}: empty content -> skipped`);
      continue;
    }
    const image = resolveImage(loaded.data, loaded.title, images);
    if (image.warning) {
      warnings.push(`${filename}: ${image.warning} -> showing post without image`);
    }
    candidates.push({ loaded, image });
  } catch (error) {
    warnings.push(`${filename}: could not be read (${error.message}) -> skipped`);
  }
}

candidates.sort((a, b) => a.loaded.publish.moment.getTime() - b.loaded.publish.moment.getTime());
const seenSlugs = new Set();
const unique = [];
for (const candidate of candidates) {
  const slug = candidate.loaded.slug;
  if (seenSlugs.has(slug)) {
    warnings.push(`${candidate.loaded.filename}: duplicate slug "${slug}" -> skipped (kept earlier post)`);
    continue;
  }
  seenSlugs.add(slug);
  unique.push(candidate);
}

const visible = unique.filter((candidate) => candidate.loaded.publish.moment.getTime() <= now.getTime());
const hidden = unique.filter((candidate) => candidate.loaded.publish.moment.getTime() > now.getTime());
visible.sort((a, b) => b.loaded.publish.moment.getTime() - a.loaded.publish.moment.getTime());

const visibleRecords = visible.map((candidate, index) => toRecord(candidate, index));

const generatedDir = path.join(ROOT, 'src', 'generated');
fs.mkdirSync(generatedDir, { recursive: true });
const generatedPath = path.join(generatedDir, 'posts.ts');
const interfaceText = `export interface GeneratedPost {
  id: number;
  slug: string;
  path: string;
  title: string;
  date: string;
  time: string;
  publishMoment: string;
  timestamp: number;
  category: string[];
  tags: string[];
  focusKeyphrase: string;
  seoTitle: string;
  metaDescription: string;
  image: string;
  imageAlt: string;
  imageTitle: string;
  imageCaption: string;
  imageDescription: string;
  originalPostLink: string;
  excerpt: string;
  content: string;
}`;
const generatedFile = `// This file is generated by scripts/build-posts.mjs. Do not edit.\n\n${interfaceText}\n\nexport const BUILD_TIME = ${JSON.stringify(
  now.toISOString(),
)};\n\nexport const GENERATED_POSTS: GeneratedPost[] = ${JSON.stringify(visibleRecords, null, 2)};\n`;
fs.writeFileSync(generatedPath, generatedFile, 'utf8');

fs.mkdirSync(PUBLIC_DIR, { recursive: true });
fs.writeFileSync(
  path.join(PUBLIC_DIR, 'build-info.json'),
  `${JSON.stringify({ builtAt: now.toISOString() }, null, 2)}\n`,
  'utf8',
);

updateSitemap(visibleRecords);

console.log(`[posts] build time: ${now.toISOString()}`);
console.log(`[posts] visible posts: ${visibleRecords.length}`);
console.log(`[posts] hidden future posts: ${hidden.length}`);
for (const candidate of hidden) {
  console.log(`[posts]   hidden until ${candidate.loaded.publish.moment.toISOString()}: ${candidate.loaded.title}`);
}
for (const warning of warnings) {
  console.warn(`[posts] warning: ${warning}`);
}
