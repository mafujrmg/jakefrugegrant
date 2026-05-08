export interface WPPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  featuredImage: string;
  author: string;
  link: string;
}

export interface WPRawPost {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  link: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>;
    author?: Array<{ name: string }>;
  };
}

export function mapWPPost(raw: WPRawPost): WPPost {
  const authorName = raw._embedded?.author?.[0]?.name || '';
  return {
    id: raw.id,
    slug: raw.slug,
    title: raw.title.rendered,
    excerpt: raw.excerpt.rendered.replace(/<[^>]*>?/gm, '').trim(),
    content: raw.content.rendered,
    date: raw.date,
    link: raw.link,
    featuredImage: raw._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/images/blog-hero.webp',
    author: authorName.toLowerCase() === 'rmg' ? 'Jake Fruge Jr Grant' : authorName || 'Jake Fruge Jr Grant',
  };
}

export async function fetchPosts(page = 1, perPage = 12, search = '') {
  try {
    const params = new URLSearchParams({
      page: String(page),
      per_page: String(perPage),
      _embed: 'true',
      orderby: 'date',
      order: 'desc'
    });
    if (search) params.set('search', search);

    const res = await fetch(`/.netlify/functions/posts?${params}`);
    
    const contentType = res.headers.get('Content-Type') || '';
    if (!contentType.includes('application/json')) {
      throw new Error('WP API proxy returned non-JSON response');
    }
    
    if (!res.ok) throw new Error(`WP API error: ${res.status}`);

    const data: WPRawPost[] = await res.json();
    const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1', 10);
    const total = parseInt(res.headers.get('X-WP-Total') || '0', 10);
    
    return { posts: data.map(mapWPPost), totalPages, total };
  } catch (err) {
    console.error('Failed to fetch WordPress posts:', err);
    return { posts: [], totalPages: 1, total: 0 };
  }
}

export async function fetchPostBySlug(slug: string): Promise<WPPost | null> {
  try {
    const params = new URLSearchParams({ slug, _embed: 'true' });
    const res = await fetch(`/.netlify/functions/posts?${params}`);
    
    const contentType = res.headers.get('Content-Type') || '';
    if (!contentType.includes('application/json')) {
      throw new Error('WP API proxy returned non-JSON response');
    }
    
    if (!res.ok) throw new Error(`WP API error: ${res.status}`);

    const data: WPRawPost[] = await res.json();
    return data.length > 0 ? mapWPPost(data[0]) : null;
  } catch (err) {
    console.error(`Failed to fetch WordPress post with slug ${slug}:`, err);
    return null;
  }
}
