import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import FadeInSection from '@/components/FadeInSection';
import DiamondDivider from '@/components/DiamondDivider';
import { POSTS, formatPostDate } from '@/lib/posts';
import { SUBJECT_NAME, IMAGES } from '@/lib/siteConfig';

const POSTS_PER_PAGE = 6;

export default function Blog() {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(POSTS.length / POSTS_PER_PAGE));
  const posts = POSTS.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

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
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden flex items-center justify-center min-h-[50vh]">
        <div className="absolute inset-0 bg-cover bg-center mix-blend-luminosity opacity-30 grayscale-[50%]" style={{ backgroundImage: `url(${IMAGES.blogHero})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-base via-base/90 to-base" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-primary)_0%,_transparent_50%)] opacity-20 pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
          <FadeInSection>
            <p className="font-accent uppercase tracking-widest text-secondary text-sm mb-4">Insights & News</p>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-text-main mb-8 leading-tight tracking-tight">
              The {SUBJECT_NAME} Grant Blog
            </h1>
            <p className="text-text-muted text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed font-light">
              Expert insights on entrepreneurship, financial literacy, and the mindset of success.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-24 md:py-36 bg-surface relative z-20">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
          <FadeInSection>
            <div className="text-center mb-16">
              <DiamondDivider />
            </div>
          </FadeInSection>

          {posts.length === 0 ? (
            <div className="text-center py-32 glass-card rounded-3xl border border-white/5">
              <p className="text-text-muted font-display text-2xl font-light">No articles found at this time. Please check back soon.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {posts.map((post, i) => (
                <FadeInSection key={post.slug} delay={i * 0.1} className="h-full w-full">
                  <Link to={`/blog/${post.slug}`} className="group flex flex-col h-full glass-card rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] transition-all duration-500 transform hover:-translate-y-2 no-underline border border-white/10">
                    {post.image && (
                        <div className="aspect-[16/10] overflow-hidden relative">
                          <div className="absolute inset-0 bg-base/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                          <img
                            src={post.image}
                            alt={post.imageAlt || post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale-[20%] group-hover:grayscale-0"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="p-8 flex flex-col flex-grow relative bg-white/[0.02]">
                        <div className="flex items-center gap-3 mb-6">
                          <span className="w-8 h-px bg-primary/50" />
                          <p className="font-accent uppercase tracking-widest text-primary-light text-[10px] font-bold">
                            {formatPostDate(post.date)}
                          </p>
                        </div>
                        <h2 className="font-display text-2xl font-bold text-text-main mb-4 group-hover:text-primary transition-colors leading-snug">
                          {post.title}
                        </h2>
                        <p className="text-text-muted text-sm leading-relaxed line-clamp-3 mb-8 font-light">
                          {stripHtml(post.excerpt)}
                        </p>
                        <div className="mt-auto pt-6 border-t border-white/5">
                          <span className="font-accent uppercase tracking-widest text-[10px] font-bold text-text-muted group-hover:text-primary-light transition-colors flex items-center gap-2">
                            Read Article <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                          </span>
                        </div>
                      </div>
                    </Link>
                  </FadeInSection>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-6 mt-20">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-6 py-3 font-accent uppercase tracking-widest text-xs border border-white/10 text-text-main disabled:opacity-30 disabled:hover:border-white/10 disabled:hover:text-text-main hover:border-primary hover:text-primary hover:bg-primary/5 transition-all rounded-lg"
                  >
                    Previous
                  </button>
                  <span className="text-text-muted text-sm font-accent tracking-widest">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-6 py-3 font-accent uppercase tracking-widest text-xs border border-white/10 text-text-main disabled:opacity-30 disabled:hover:border-white/10 disabled:hover:text-text-main hover:border-primary hover:text-primary hover:bg-primary/5 transition-all rounded-lg"
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
