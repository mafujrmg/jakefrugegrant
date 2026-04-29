import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import FadeInSection from '@/components/FadeInSection';
import { fetchPostBySlug, type WPPost } from '@/lib/wordpress';
import { SUBJECT_NAME, SITE_DOMAIN } from '@/lib/siteConfig';

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<WPPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetchPostBySlug(slug).then((p) => {
      setPost(p);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-cream">
        <div className="w-10 h-10 border-3 border-gold border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(184,134,11,0.2)]" />
        <p className="mt-4 font-accent uppercase tracking-widest text-[10px] text-navy/40">Loading article...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-cream">
        <div className="max-w-md mx-auto px-4 text-center">
          <h1 className="font-display text-4xl font-bold text-navy mb-6">Article Not Found</h1>
          <p className="text-navy/60 mb-8 leading-relaxed text-lg italic">The article you are looking for may have been moved or deleted.</p>
          <Link to="/blog" className="inline-block bg-navy text-white px-8 py-3 font-accent uppercase tracking-widest text-sm hover:bg-navy-light transition-colors">
            Return to Blog
          </Link>
        </div>
      </div>
    );
  }

  const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '').trim();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: stripHtml(post.excerpt).slice(0, 160),
    image: post.featuredImage ? `${SITE_DOMAIN}${post.featuredImage}` : undefined,
    datePublished: post.date,
    author: { '@type': 'Organization', name: `${SUBJECT_NAME} Grant` },
    publisher: { '@type': 'Organization', name: `${SUBJECT_NAME} Grant`, url: SITE_DOMAIN },
  };

  return (
    <>
      <SEO
        title={`${post.title} | ${SUBJECT_NAME} Grant Blog`}
        description={stripHtml(post.excerpt).slice(0, 160)}
        canonical={`/blog/${post.slug}`}
        ogType="article"
        ogImage={post.featuredImage}
        schemas={[articleSchema]}
      />

      <article className="bg-cream">
        {/* Header */}
        <section className="bg-navy pt-20 pb-28 md:pt-28 md:pb-40">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <FadeInSection>
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="w-12 h-px bg-gold/50" />
                <p className="font-accent uppercase tracking-[0.2em] text-gold text-xs font-bold">
                  {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <span className="w-12 h-px bg-gold/50" />
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-[1.15] mb-6">
                {post.title}
              </h1>
              {post.author && (
                <p className="font-accent uppercase tracking-widest text-white/40 text-xs">
                  Written by {post.author}
                </p>
              )}
            </FadeInSection>
          </div>
        </section>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="max-w-5xl mx-auto px-4 -mt-16 md:-mt-24 relative z-10">
            <div className="p-2 bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full rounded-xl shadow-inner"
                loading="lazy"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <section className="py-20 md:py-28 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 -translate-y-48 translate-x-48 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy/5 translate-y-48 -translate-x-48 rounded-full blur-3xl -z-10" />
          
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInSection>
              <div
                className="wp-content text-navy/90 text-lg md:text-xl leading-[1.8] font-light"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </FadeInSection>

            <div className="mt-20 pt-10 border-t border-navy/10 flex flex-col items-center gap-6">
              <p className="font-accent uppercase tracking-widest text-navy/40 text-xs font-bold">Share this article</p>
              <div className="flex gap-4 mb-6">
                <button className="w-10 h-10 rounded-full border border-navy/10 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-navy transition-all duration-300">
                   <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </button>
                <button className="w-10 h-10 rounded-full border border-navy/10 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-navy transition-all duration-300">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </button>
              </div>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 font-accent uppercase tracking-widest text-xs font-bold text-navy hover:text-gold transition-all group"
              >
                <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> Back to All Articles
              </Link>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
