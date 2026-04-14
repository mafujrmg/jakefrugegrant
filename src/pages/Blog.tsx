import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import FadeInSection from '@/components/FadeInSection';
import DiamondDivider from '@/components/DiamondDivider';
import { fetchPosts, type WPPost } from '@/lib/wordpress';
import { SUBJECT_NAME, IMAGES } from '@/lib/siteConfig';

export default function Blog() {
  const [posts, setPosts] = useState<WPPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetchPosts(page, 6).then(({ posts: p, totalPages: tp }) => {
      setPosts(p);
      setTotalPages(tp);
      setLoading(false);
    });
  }, [page]);

  const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '').trim();

  return (
    <>
      <SEO
        title={`Blog | ${SUBJECT_NAME} Grant | Insights on Entrepreneurship, Education & Success`}
        description={`Read articles from the ${SUBJECT_NAME} Grant blog. Insights on entrepreneurship, financial literacy, resilience, and education from ${SUBJECT_NAME}, CEO of JFJ Holdings.`}
        canonical="/blog"
        ogImage={IMAGES.blogHero}
      />

      {/* Hero */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.blogHero})` }} />
        <div className="absolute inset-0 bg-navy/80" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <FadeInSection>
            <p className="font-accent uppercase tracking-[0.2em] text-gold text-sm mb-3">Blog</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              {SUBJECT_NAME} Grant Blog
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Insights on entrepreneurship, financial literacy, resilience, and the mindset that drives success — from {SUBJECT_NAME} and the {SUBJECT_NAME} Grant team.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <DiamondDivider className="mb-10" />
          </FadeInSection>

          {loading ? (
            <div className="text-center py-20">
              <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-navy/60 mt-4 text-sm">Loading articles...</p>
            </div>
          ) : posts.length === 0 ? (
            <p className="text-center text-navy/60 py-20">No articles found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, i) => (
                <FadeInSection key={post.id} delay={i * 0.1}>
                  <Link to={`/blog/${post.slug}`} className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    {post.featuredImage && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <p className="font-accent uppercase tracking-wider text-gold text-xs mb-2">
                        {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                      <h2 className="font-display text-xl font-bold text-navy mb-2 group-hover:text-gold transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-navy/70 text-sm leading-relaxed line-clamp-3">
                        {stripHtml(post.excerpt)}
                      </p>
                    </div>
                  </Link>
                </FadeInSection>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-12">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 font-accent uppercase tracking-wider text-xs border border-navy/20 text-navy disabled:opacity-30 hover:border-gold hover:text-gold transition-colors"
              >
                Previous
              </button>
              <span className="text-navy/60 text-sm">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 font-accent uppercase tracking-wider text-xs border border-navy/20 text-navy disabled:opacity-30 hover:border-gold hover:text-gold transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
