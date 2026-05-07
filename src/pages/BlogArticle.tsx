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
      <div className="min-h-[60vh] flex items-center justify-center bg-cream">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-cream">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-navy mb-4">Article Not Found</h1>
          <Link to="/blog" className="inline-link">Back to Blog</Link>
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
        <section className="bg-navy py-12 md:py-16">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <FadeInSection>
              <p className="font-accent uppercase tracking-wider text-gold text-xs mb-3">
                {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                {post.author && ` · ${post.author}`}
              </p>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight">
                {post.title}
              </h1>
            </FadeInSection>
          </div>
        </section>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="max-w-4xl mx-auto px-4 -mt-6">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full rounded-lg shadow-xl"
              loading="lazy"
            />
          </div>
        )}

        {/* Content */}
        <section className="py-12 md:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInSection>
              <div
                className="wp-content text-navy/80 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </FadeInSection>

            <div className="mt-12 pt-8 border-t border-navy/10 text-center">
              <Link
                to="/blog"
                className="btn-outline-dark !border-navy/20 !text-navy hover:!border-gold hover:!text-gold"
              >
                Back to Blog
              </Link>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
