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
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.blogHero})` }} />
        <div className="absolute inset-0 bg-navy/85" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <FadeInSection>
            <p className="font-accent uppercase tracking-[0.3em] text-gold text-sm mb-4">Insights & News</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
              The {SUBJECT_NAME} Grant Blog
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
              Expert insights on entrepreneurship, financial literacy, and the mindset of success — from {SUBJECT_NAME} and the team.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <DiamondDivider />
            </div>
          </FadeInSection>

          {loading ? (
            <div className="text-center py-20">
              <div className="w-10 h-10 border-3 border-gold border-t-transparent rounded-full animate-spin mx-auto shadow-[0_0_15px_rgba(184,134,11,0.2)]" />
              <p className="text-navy/40 mt-6 font-accent uppercase tracking-widest text-xs">Loading articles...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl shadow-sm">
              <p className="text-navy/60 font-display text-xl italic">No articles found at this time. Please check back soon.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                {posts.map((post, i) => (
                  <FadeInSection key={post.id} delay={i * 0.1}>
                    <Link to={`/blog/${post.slug}`} className="group block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                      {post.featuredImage && (
                        <div className="aspect-[16/10] overflow-hidden">
                          <img
                            src={post.featuredImage}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="p-8">
                        <div className="flex items-center gap-2 mb-4">
                          <span className="w-8 h-px bg-gold/50" />
                          <p className="font-accent uppercase tracking-widest text-gold text-[10px] font-bold">
                            {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </p>
                        </div>
                        <h2 className="font-display text-2xl font-bold text-navy mb-4 group-hover:text-gold transition-colors leading-snug">
                          {post.title}
                        </h2>
                        <p className="text-navy/70 text-sm leading-relaxed line-clamp-3 mb-6">
                          {stripHtml(post.excerpt)}
                        </p>
                        <span className="font-accent uppercase tracking-[0.2em] text-[10px] font-bold text-navy group-hover:text-gold transition-colors flex items-center gap-2">
                          Read Article <span>&rarr;</span>
                        </span>
                      </div>
                    </Link>
                  </FadeInSection>
                ))}
              </div>

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
            </>
          )}
        </div>
      </section>
    </>
  );
}
