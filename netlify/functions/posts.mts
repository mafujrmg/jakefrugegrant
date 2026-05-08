import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    // Build params for WordPress API
    const wpParams = new URLSearchParams();
    
    // Explicitly set defaults per requirements
    wpParams.set('_embed', searchParams.get('_embed') ?? 'true');
    wpParams.set('per_page', searchParams.get('per_page') ?? '12');
    wpParams.set('orderby', searchParams.get('orderby') ?? 'date');
    wpParams.set('order', searchParams.get('order') ?? 'desc');

    // Forward optional params if present
    if (searchParams.has('page')) wpParams.set('page', searchParams.get('page')!);
    if (searchParams.has('search')) wpParams.set('search', searchParams.get('search')!);
    if (searchParams.has('slug')) wpParams.set('slug', searchParams.get('slug')!);

    const upstreamUrl = `http://blog.jakefrugejrgrant.com/wp-json/wp/v2/posts?${wpParams.toString()}`;
    
    const response = await fetch(upstreamUrl);
    
    if (!response.ok) {
      return new Response(JSON.stringify({ error: `Upstream error: ${response.status}` }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const data = await response.json();
    
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=60, s-maxage=300',
      'Access-Control-Expose-Headers': 'X-WP-Total, X-WP-TotalPages'
    });

    const total = response.headers.get('X-WP-Total');
    const totalPages = response.headers.get('X-WP-TotalPages');

    if (total) headers.set('X-WP-Total', total);
    if (totalPages) headers.set('X-WP-TotalPages', totalPages);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to proxy request to WordPress' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
