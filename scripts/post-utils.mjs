import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const ROOT = path.resolve(__dirname, '..');
export const POSTS_DIR = path.join(ROOT, 'posts');
export const IMAGES_DIR = path.join(POSTS_DIR, 'images');
export const PUBLIC_DIR = path.join(ROOT, 'public');

export const SITE_DOMAIN = 'https://jakefrugejrgrant.com';
export const SITE_TIMEZONE = 'America/New_York';

const DATE_KEYS = ['date', 'publish_date', 'published_date', 'published', 'pubDate', 'publishDate'];
const TIME_KEYS = ['time', 'publish_time', 'publishTime'];

export function asString(value) {
  if (Array.isArray(value)) return value.join(', ');
  if (value === undefined || value === null) return '';
  return String(value);
}

export function asArray(value) {
  if (Array.isArray(value)) return value.map((item) => asString(item)).filter(Boolean);
  if (value === undefined || value === null || value === '') return [];
  return [String(value)];
}

export function pick(data, names) {
  for (const name of names) {
    if (Object.prototype.hasOwnProperty.call(data, name)) {
      const value = asString(data[name]).trim();
      if (value !== '') return value;
    }
  }
  return '';
}

function parseScalar(value) {
  const trimmed = value.trim();
  if (trimmed === '') return '';
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  if (trimmed === 'null' || trimmed === '~') return '';
  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    try {
      return JSON.parse(trimmed);
    } catch {
      return trimmed.slice(1, -1);
    }
  }
  if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
    return trimmed.slice(1, -1).replace(/''/g, "'");
  }
  if (trimmed.startsWith('[')) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) return parsed.map((item) => asString(item));
    } catch {
      return trimmed
        .slice(1, -1)
        .split(',')
        .map((item) => asString(parseScalar(item)).trim())
        .filter(Boolean);
    }
  }
  return trimmed;
}

export function parseFrontmatter(raw) {
  const text = String(raw).replace(/\r\n/g, '\n');
  if (!text.startsWith('---\n')) return { data: {}, body: text };
  const end = text.indexOf('\n---\n', 4);
  if (end === -1) return { data: {}, body: text };
  const block = text.slice(4, end);
  const body = text.slice(end + 5);
  const data = {};
  for (const line of block.split('\n')) {
    const match = /^([A-Za-z0-9_-]+)\s*:\s*(.*)$/.exec(line);
    if (!match) continue;
    data[match[1]] = parseScalar(match[2]);
  }
  return { data, body };
}

export function readPostFiles() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isFile() && /\.md$/i.test(entry.name))
    .map((entry) => path.join(POSTS_DIR, entry.name))
    .sort();
}

export function listImages() {
  if (!fs.existsSync(IMAGES_DIR)) return [];
  return fs
    .readdirSync(IMAGES_DIR, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .sort();
}

export function normalizeTitle(value) {
  return String(value)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function pad(value, length = 2) {
  return String(value).padStart(length, '0');
}

function parseTime(value) {
  const match = /^(\d{1,2}):(\d{2})(?::(\d{1,2}))?(?:\.(\d+))?$/.exec(String(value).trim());
  if (!match) return null;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  const seconds = Number(match[3] || '0');
  if (hours > 23 || minutes > 59 || seconds > 59) return null;
  return { hours, minutes, seconds };
}

function getTimeZoneOffsetMs(date, timeZone) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const parts = formatter.formatToParts(date);
  const values = {};
  for (const part of parts) {
    if (part.type !== 'literal') values[part.type] = part.value;
  }
  let hours = Number(values.hour);
  if (hours === 24) hours = 0;
  const asUtc = Date.UTC(
    Number(values.year),
    Number(values.month) - 1,
    Number(values.day),
    hours,
    Number(values.minute),
    Number(values.second),
  );
  return asUtc - date.getTime();
}

export function zonedToUtc(year, month, day, hours, minutes, seconds, timeZone) {
  const utcGuess = Date.UTC(year, month - 1, day, hours, minutes, seconds);
  let instant = utcGuess;
  for (let i = 0; i < 3; i += 1) {
    const offset = getTimeZoneOffsetMs(new Date(instant), timeZone);
    instant = utcGuess - offset;
  }
  return new Date(instant);
}

export function computePublishMoment(data) {
  const rawDate = pick(data, DATE_KEYS);
  const rawTime = pick(data, TIME_KEYS);
  if (!rawDate) return null;

  const combined = /^(\d{4})-(\d{1,2})-(\d{1,2})[T ](\d{1,2}):(\d{2})(?::(\d{1,2}))?(?:\.(\d+))?(Z|[+-]\d{2}:?\d{2})?$/.exec(
    rawDate,
  );
  if (combined) {
    const year = Number(combined[1]);
    const month = Number(combined[2]);
    const day = Number(combined[3]);
    const hours = Number(combined[4]);
    const minutes = Number(combined[5]);
    const seconds = Number(combined[6] || '0');
    const milliseconds = Number(`0.${combined[7] || '0'}`) * 1000;
    const zone = combined[8];
    if (hours > 23 || minutes > 59 || seconds > 59) return null;
    let moment;
    if (zone) {
      let offset = zone;
      if (offset !== 'Z') {
        const sign = offset[0];
        const digits = offset.slice(1).replace(':', '');
        offset = `${sign}${digits.slice(0, 2)}:${digits.slice(2, 4)}`;
      }
      moment = new Date(
        `${year}-${pad(month)}-${pad(day)}T${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(
          Math.round(milliseconds),
          3,
        )}${offset}`,
      );
    } else {
      moment = zonedToUtc(year, month, day, hours, minutes, seconds, SITE_TIMEZONE);
      moment = new Date(moment.getTime() + Math.round(milliseconds));
    }
    if (Number.isNaN(moment.getTime())) return null;
    return {
      moment,
      date: `${year}-${pad(month)}-${pad(day)}`,
      time: `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`,
    };
  }

  const dateOnly = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(rawDate);
  if (!dateOnly) return null;
  const year = Number(dateOnly[1]);
  const month = Number(dateOnly[2]);
  const day = Number(dateOnly[3]);
  const parsedTime = rawTime ? parseTime(rawTime) : { hours: 0, minutes: 0, seconds: 0 };
  if (!parsedTime) return null;
  const moment = zonedToUtc(year, month, day, parsedTime.hours, parsedTime.minutes, parsedTime.seconds, SITE_TIMEZONE);
  if (Number.isNaN(moment.getTime())) return null;
  return {
    moment,
    date: `${year}-${pad(month)}-${pad(day)}`,
    time: `${pad(parsedTime.hours)}:${pad(parsedTime.minutes)}:${pad(parsedTime.seconds)}`,
  };
}

export function loadPostFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, body } = parseFrontmatter(raw);
  const filename = path.basename(filePath);
  const title = pick(data, ['title', 'post_title', 'name']).trim();
  const slug = (pick(data, ['slug', 'post_slug']).trim() || filename.replace(/\.md$/i, '')).trim();
  return {
    filePath,
    filename,
    data,
    body,
    title,
    slug,
    publish: computePublishMoment(data),
  };
}
