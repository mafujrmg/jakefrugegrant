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
      <section className="min-h-screen flex items-center justify-center bg-base py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-primary)_0%,_transparent_40%)] opacity-10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="max-w-lg mx-auto px-6 text-center relative z-10 glass-card p-12 md:p-16 rounded-3xl border border-white/10 shadow-2xl">
          <div className="relative inline-block mb-10">
            <span className="font-display text-[150px] md:text-[200px] font-bold text-white/[0.03] leading-none tracking-tighter mix-blend-screen">404</span>
            <div className="absolute inset-0 flex items-center justify-center">
               <h1 className="font-display text-4xl md:text-5xl font-bold text-text-main">Lost?</h1>
            </div>
          </div>
          <p className="text-text-muted text-lg md:text-xl mb-12 leading-relaxed font-light italic px-4">
            "I did not have anyone handing me opportunities. I had to create them."
            <br />
            <span className="block mt-4 text-xs font-accent uppercase tracking-widest text-primary-light not-italic font-bold">— {SUBJECT_NAME}</span>
          </p>
          <p className="text-text-muted/60 mb-12 max-w-sm mx-auto font-light text-sm md:text-base">
            The page you are looking for has been moved or doesn't exist. Let's get you back on track.
          </p>
          <Link
            to="/"
            className="inline-block bg-primary hover:bg-primary-light text-white font-accent uppercase tracking-widest px-10 py-4 text-xs font-bold rounded-lg shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </>
  );
}
