import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { SUBJECT_NAME } from '@/lib/siteConfig';

export default function NotFound() {
  return (
    <>
      <SEO
        title={`Page Not Found | ${SUBJECT_NAME} Grant`}
        description="The page you are looking for does not exist."
        canonical="/404"
      />
      <section className="min-h-[70vh] flex items-center justify-center bg-cream">
        <div className="max-w-lg mx-auto px-4 text-center">
          <span className="font-accent text-8xl font-bold text-gold/30">404</span>
          <h1 className="font-display text-3xl font-bold text-navy mt-4 mb-4">Page Not Found</h1>
          <p className="text-navy/70 mb-8">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-block bg-gold hover:bg-gold-light text-navy font-accent uppercase tracking-wider px-8 py-3 text-sm font-semibold transition-colors duration-300"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </>
  );
}
