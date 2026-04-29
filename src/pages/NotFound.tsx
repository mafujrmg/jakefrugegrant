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
      <section className="min-h-[80vh] flex items-center justify-center bg-cream py-20">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="relative inline-block mb-8">
            <span className="font-accent text-[150px] font-bold text-gold/10 leading-none">404</span>
            <div className="absolute inset-0 flex items-center justify-center">
               <h1 className="font-display text-4xl font-bold text-navy">Lost?</h1>
            </div>
          </div>
          <p className="text-navy/70 text-lg md:text-xl mb-10 leading-relaxed font-light italic">
            "I did not have anyone handing me opportunities. I had to create them."
            <br />
            <span className="text-sm font-accent uppercase tracking-widest text-gold not-italic">— {SUBJECT_NAME}</span>
          </p>
          <p className="text-navy/60 mb-12 max-w-sm mx-auto">
            The page you are looking for has been moved or doesn't exist. Let's get you back on track.
          </p>
          <Link
            to="/"
            className="inline-block bg-navy hover:bg-navy-light text-white font-accent uppercase tracking-[0.2em] px-12 py-4 text-sm font-bold shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </>
  );
}
