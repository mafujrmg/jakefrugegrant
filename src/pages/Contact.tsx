import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import FadeInSection from '@/components/FadeInSection';
import DiamondDivider from '@/components/DiamondDivider';
import SocialIcons from '@/components/SocialIcons';
import { SUBJECT_NAME, SOCIAL_LINKS, IMAGES } from '@/lib/siteConfig';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const errs: Record<string, string> = {};
    ['name', 'email', 'subject', 'message'].forEach((f) => {
      if (!form.get(f)?.toString().trim()) errs[f] = 'This field is required';
    });
    const email = form.get('email')?.toString() || '';
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Enter a valid email';
    setErrors(errs);
    if (Object.keys(errs).length === 0) setSubmitted(true);
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-2.5 border ${errors[field] ? 'border-red-500' : 'border-navy/20'} rounded focus:outline-none focus:border-gold bg-white text-navy text-sm transition-colors duration-200`;

  return (
    <>
      <SEO
        title={`Contact | ${SUBJECT_NAME} Grant | Get in Touch`}
        description={`Contact the ${SUBJECT_NAME} Grant team with questions about the ${SUBJECT_NAME} Grant, eligibility, or the application process. Founded by ${SUBJECT_NAME}, CEO of JFJ Holdings.`}
        canonical="/contact"
        ogImage={IMAGES.contactHero}
      />

      {/* Hero */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.contactHero})` }} />
        <div className="absolute inset-0 bg-navy/80" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <FadeInSection>
            <p className="font-accent uppercase tracking-[0.2em] text-gold text-sm mb-3">Contact</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Get in Touch With the {SUBJECT_NAME} Grant Team
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Have a question about the {SUBJECT_NAME} Grant? We are here to help.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left: Info */}
            <FadeInSection direction="left">
              <p className="font-accent uppercase tracking-[0.2em] text-gold text-sm mb-3">Contact Information</p>
              <h2 className="font-display text-3xl font-bold text-navy mb-6">
                {SUBJECT_NAME} Grant Contact Details
              </h2>
              <DiamondDivider className="mb-6" align="left" />

              <div className="space-y-6">
                <div>
                  <h3 className="font-accent uppercase tracking-wider text-sm text-navy font-semibold mb-1">Email</h3>
                  <a href="mailto:info@jakefrugejrgrant.com" className="inline-link">
                    info@jakefrugejrgrant.com
                  </a>
                </div>
                <div>
                  <h3 className="font-accent uppercase tracking-wider text-sm text-navy font-semibold mb-1">Response Time</h3>
                  <p className="text-navy/70 text-sm">We typically respond within 2–3 business days.</p>
                </div>
                <div>
                  <h3 className="font-accent uppercase tracking-wider text-sm text-navy font-semibold mb-2">
                    Follow {SUBJECT_NAME}
                  </h3>
                  <SocialIcons links={SOCIAL_LINKS} className="!text-navy/60 hover:!text-gold" />
                </div>
              </div>

              <div className="mt-8 p-6 bg-navy rounded-lg">
                <h3 className="font-display text-xl font-bold text-white mb-3">About {SUBJECT_NAME}</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {SUBJECT_NAME} is an entrepreneur, CEO of JFJ Holdings, and Forbes Business Council member. He founded the {SUBJECT_NAME} Grant to invest in driven college students who refuse to let financial barriers define their future. Learn more on the{' '}
                  <Link to="/about" className="inline-link-on-dark">About page</Link>.
                </p>
              </div>
            </FadeInSection>

            {/* Right: Form */}
            <FadeInSection direction="right">
              {submitted ? (
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gold/20 rounded-full flex items-center justify-center">
                    <svg className="text-gold" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-navy mb-3">Message Sent</h3>
                  <p className="text-navy/70">Thank you for reaching out. The {SUBJECT_NAME} Grant team will respond within 2–3 business days.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="bg-white p-8 rounded-lg shadow-md">
                  <h3 className="font-display text-2xl font-bold text-navy mb-6">Send Us a Message</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block font-accent uppercase tracking-wider text-xs text-navy mb-1.5">Full Name</label>
                      <input name="name" type="text" className={inputClass('name')} placeholder="Your name" />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block font-accent uppercase tracking-wider text-xs text-navy mb-1.5">Email</label>
                      <input name="email" type="email" className={inputClass('email')} placeholder="you@email.com" />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="block font-accent uppercase tracking-wider text-xs text-navy mb-1.5">Subject</label>
                      <input name="subject" type="text" className={inputClass('subject')} placeholder="Subject" />
                      {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                    </div>
                    <div>
                      <label className="block font-accent uppercase tracking-wider text-xs text-navy mb-1.5">Message</label>
                      <textarea name="message" rows={5} className={inputClass('message')} placeholder="Your message..." />
                      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn-primary w-full mt-6"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </FadeInSection>
          </div>
        </div>
      </section>
    </>
  );
}
