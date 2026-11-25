import { useParams, Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import FadeInSection from '@/components/FadeInSection';
import { getPostBySlug, formatPostDate } from '@/lib/posts';
import { SUBJECT_NAME, SITE_DOMAIN } from '@/lib/siteConfig';

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : null;

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-primary)_0%,_transparent_40%)] opacity-10 pointer-events-none" />
        <div className="max-w-md mx-auto px-4 text-center relative z-10 glass-card p-12 rounded-3xl border border-white/10">
          <h1 className="font-display text-4xl font-bold text-text-main mb-6">Article Not Found</h1>
          <p className="text-text-muted mb-10 leading-relaxed text-lg font-light">The article you are looking for may have been moved or deleted.</p>
          <Link to="/blog" className="inline-block bg-primary text-white px-10 py-4 font-accent uppercase tracking-widest text-xs font-bold rounded-lg hover:bg-primary-light transition-all shadow-lg hover:shadow-primary/20 hover:-translate-y-1">
            Return to Blog
          </Link>
        </div>
      </div>
    );
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    image: post.image ? `${SITE_DOMAIN}${post.image}` : undefined,
    datePublished: post.datePublished,
    dateModified: post.datePublished,
    author: { '@type': 'Organization', name: `${SUBJECT_NAME} Grant` },
    publisher: { '@type': 'Organization', name: `${SUBJECT_NAME} Grant`, url: SITE_DOMAIN },
    mainEntityOfPage: `${SITE_DOMAIN}/blog/${post.slug}`,
  };

  return (
    <>
      <SEO
        title={post.seoTitle}
        description={post.metaDescription}
        canonical={`/blog/${post.slug}`}
        ogType="article"
        ogImage={post.image}
        schemas={[articleSchema]}
      />

      <article className="bg-base min-h-screen">
        {/* Header */}
        <section className="relative pt-32 pb-32 md:pt-40 md:pb-48 overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px] pointer-events-none" />
          
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <FadeInSection>
              <div className="flex items-center justify-center gap-4 mb-8">
                <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-primary" />
                <p className="font-accent uppercase tracking-widest text-primary-light text-xs font-bold">
                  {formatPostDate(post.date)}
                </p>
                <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-primary" />
              </div>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-text-main leading-tight mb-8 tracking-tight">
                {post.title}
              </h1>
              <p className="font-accent uppercase tracking-widest text-text-muted text-xs flex items-center justify-center gap-3">
                <span className="w-6 h-px bg-white/20"></span>
                Written by {SUBJECT_NAME}
                <span className="w-6 h-px bg-white/20"></span>
              </p>
            </FadeInSection>
          </div>
        </section>

        {/* Featured Image */}
        {post.image && (
          <div className="max-w-5xl mx-auto px-6 -mt-20 md:-mt-32 relative z-20 mb-20 md:mb-32">
            <FadeInSection delay={0.2}>
              <figure className="glass-card p-3 rounded-[2.5rem] shadow-2xl border border-white/10 group">
                <div className="overflow-hidden rounded-[2rem] relative bg-surface">
                  <div className="absolute inset-0 bg-base/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                  <img
                    src={post.image}
                    alt={post.imageAlt || post.title}
                    className="w-full object-cover aspect-[21/9] group-hover:scale-105 transition-transform duration-700 grayscale-[20%] group-hover:grayscale-0"
                    loading="lazy"
                  />
                </div>
                {post.imageCaption && (
                  <figcaption className="px-6 pt-5 pb-2 text-center font-accent uppercase tracking-widest text-[10px] text-text-muted">
                    {post.imageCaption}
                  </figcaption>
                )}
              </figure>
            </FadeInSection>
          </div>
        )}

        {/* Content */}
        <section className="pb-24 md:pb-36 relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none" />
          
          <div className="max-w-3xl mx-auto px-6 lg:px-8 relative z-10">
            <FadeInSection>
              <div
                className="wp-content text-text-muted text-lg md:text-xl leading-relaxed font-light prose prose-invert prose-p:text-text-muted prose-headings:text-text-main prose-a:text-primary hover:prose-a:text-primary-light prose-strong:text-text-main prose-blockquote:border-primary prose-blockquote:bg-white/[0.02] prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </FadeInSection>

            <div className="mt-24 pt-12 border-t border-white/10 flex flex-col items-center gap-8">
              <p className="font-accent uppercase tracking-widest text-text-muted text-xs font-bold">Share this article</p>
              <div className="flex gap-6 mb-8">
                <button className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-text-muted hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                   <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </button>
                <button className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-text-muted hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </button>
              </div>
              <Link
                to="/blog"
                className="inline-flex items-center gap-3 font-accent uppercase tracking-widest text-xs font-bold text-text-main hover:text-primary transition-all group"
              >
                <span className="group-hover:-translate-x-1 transition-transform border border-white/20 rounded-full w-8 h-8 flex items-center justify-center group-hover:border-primary/50">&larr;</span> 
                Back to All Articles
              </Link>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
