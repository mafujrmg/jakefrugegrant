import { WP_API_BASE } from './siteConfig';
import { FALLBACK_POSTS } from './fallbackPosts';

export interface WPPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  featuredImage: string;
  author: string;
}

interface WPRawPost {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>;
    author?: Array<{ name: string }>;
  };
}

function mapWPPost(raw: WPRawPost): WPPost {
  const authorName = raw._embedded?.author?.[0]?.name || '';
  return {
    id: raw.id,
    slug: raw.slug,
    title: raw.title.rendered,
    excerpt: raw.excerpt.rendered,
    content: raw.content.rendered,
    date: raw.date,
    featuredImage: raw._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
    author: authorName.toLowerCase() === 'rmg' ? 'Jake Fruge Jr Grant' : authorName || 'Jake Fruge Jr Grant',
  };
}

function paginatePosts(posts: WPPost[], page: number, perPage: number) {
  const start = (page - 1) * perPage;
  return {
    posts: posts.slice(start, start + perPage),
    totalPages: Math.ceil(posts.length / perPage),
  };
}

export async function fetchPosts(page = 1, perPage = 10, search = '') {
  try {
    const params = new URLSearchParams({
      page: String(page),
      per_page: String(perPage),
      _embed: '',
    });
    if (search) params.set('search', search);

    const res = await fetch(`${WP_API_BASE}/posts?${params}`);
    const contentType = res.headers.get('Content-Type') || '';
    if (!contentType.includes('application/json')) {
      throw new Error('WP API returned non-JSON response (possible CAPTCHA)');
    }
    if (!res.ok) throw new Error(`WP API error: ${res.status}`);

    const data: WPRawPost[] = await res.json();
    const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1', 10);
    return { posts: data.map(mapWPPost), totalPages };
  } catch (err) {
    console.warn('WordPress API unavailable, using fallback posts:', err);
    const filtered = search
      ? FALLBACK_POSTS.filter(
          (p) =>
            p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.content.toLowerCase().includes(search.toLowerCase())
        )
      : FALLBACK_POSTS;
    return paginatePosts(filtered, page, perPage);
  }
}

export async function fetchPostBySlug(slug: string): Promise<WPPost | null> {
  try {
    const params = new URLSearchParams({ slug, _embed: '' });
    const res = await fetch(`${WP_API_BASE}/posts?${params}`);
    const contentType = res.headers.get('Content-Type') || '';
    if (!contentType.includes('application/json')) {
      throw new Error('WP API returned non-JSON response (possible CAPTCHA)');
    }
    if (!res.ok) throw new Error(`WP API error: ${res.status}`);

    const data: WPRawPost[] = await res.json();
    return data.length > 0 ? mapWPPost(data[0]) : null;
  } catch (err) {
    console.warn('WordPress API unavailable, using fallback posts:', err);
    return FALLBACK_POSTS.find((p) => p.slug === slug) || null;
  }
}
