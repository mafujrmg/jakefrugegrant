import { GENERATED_POSTS, BUILD_TIME, type GeneratedPost } from '@/generated/posts';

export type BlogPost = GeneratedPost;

export { BUILD_TIME };

const MOCK_NOW = import.meta.env.VITE_POSTS_NOW as string | undefined;

export function getNow(): Date {
  if (MOCK_NOW) {
    const mocked = new Date(MOCK_NOW);
    if (!Number.isNaN(mocked.getTime())) return mocked;
  }
  return new Date();
}

export function isPublished(
  post: Pick<GeneratedPost, 'publishMoment'>,
  now: Date = getNow(),
): boolean {
  const publishTime = Date.parse(post.publishMoment);
  if (Number.isNaN(publishTime)) return false;
  return publishTime <= now.getTime();
}

export const POSTS: BlogPost[] = GENERATED_POSTS.filter((post) => isPublished(post, getNow()));

export function getPostBySlug(slug: string): BlogPost | null {
  let decoded = slug;
  try {
    decoded = decodeURIComponent(slug);
  } catch {
    decoded = slug;
  }
  const post = GENERATED_POSTS.find((item) => item.slug === slug || item.slug === decoded);
  if (!post) return null;
  return isPublished(post) ? post : null;
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
