import { useState, type FormEvent } from 'react';
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
    `w-full px-4 py-3 border-2 ${errors[field] ? 'border-red-500' : 'border-navy/10'} rounded-md focus:outline-none focus:border-gold bg-white text-navy text-sm md:text-base transition-all duration-200`;

  return (
    <>
      <SEO
        title={`Contact | ${SUBJECT_NAME} Grant | Get in Touch`}
        description={`Contact the ${SUBJECT_NAME} Grant team with questions about the ${SUBJECT_NAME} Grant, eligibility, or the application process. Founded by ${SUBJECT_NAME}, CEO of JFJ Holdings.`}
        canonical="/contact"
        ogImage={IMAGES.contactHero}
      />

      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden flex items-center justify-center min-h-[40vh]">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.contactHero})` }} />
        <div className="absolute inset-0 bg-navy/85" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <FadeInSection>
            <p className="font-accent uppercase tracking-[0.4em] text-gold text-sm mb-4">Support</p>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Get in Touch
            </h1>
            <p className="text-white/80 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed font-light">
              Have a question about the {SUBJECT_NAME} Grant? Our team is here to assist you.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 md:py-36 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
            {/* Left: Info */}
            <FadeInSection direction="left" className="min-w-0">
              <p className="font-accent uppercase tracking-[0.2em] text-gold text-sm mb-3">Contact Information</p>
              <h2 className="font-display text-4xl font-bold text-navy mb-8">
                Connect With Us
              </h2>
              <DiamondDivider className="mb-10 !justify-start" />

              <div className="space-y-10">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center shrink-0">
                    <svg className="text-gold" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-accent uppercase tracking-widest text-xs text-navy font-bold mb-1">Email Support</h3>
                    <a href="mailto:info@jakefrugejrgrant.com" className="text-lg text-gold font-bold underline decoration-2 underline-offset-4 hover:opacity-80 transition-opacity">
                      info@jakefrugejrgrant.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center shrink-0">
                    <svg className="text-gold" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-accent uppercase tracking-widest text-xs text-navy font-bold mb-1">Response Time</h3>
                    <p className="text-navy/70 text-base">We typically respond within 2–3 business days.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center shrink-0">
                    <svg className="text-gold" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-accent uppercase tracking-widest text-xs text-navy font-bold mb-3">
                      Social Presence
                    </h3>
                    <SocialIcons links={SOCIAL_LINKS} className="!text-navy/40 hover:!text-gold transition-colors" />
                  </div>
                </div>
              </div>

              <div className="mt-12 p-8 bg-navy rounded-xl shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 -translate-y-16 translate-x-16 rounded-full group-hover:scale-110 transition-transform duration-500" />
                <h3 className="font-display text-2xl font-bold text-white mb-4 relative z-10">About the Founder</h3>
                <p className="text-white/70 text-base leading-relaxed mb-6 relative z-10">
                  {SUBJECT_NAME} is an entrepreneur, CEO of JFJ Holdings, and Forbes Business Council member. He founded this grant to invest in the next generation of builders.
                </p>
                <a href="/about" className="inline-flex items-center gap-2 text-gold font-accent uppercase tracking-widest text-xs font-bold underline underline-offset-4 hover:gap-3 transition-all relative z-10">
                  Read His Story <span>&rarr;</span>
                </a>
              </div>
            </FadeInSection>

            {/* Right: Form */}
            <FadeInSection direction="right" className="min-w-0">
              {submitted ? (
                <div className="bg-white p-12 rounded-xl shadow-2xl text-center h-full flex flex-col items-center justify-center">
                  <div className="w-20 h-20 mx-auto mb-8 bg-gold/20 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(184,134,11,0.2)]">
                    <svg className="text-gold" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="font-display text-3xl font-bold text-navy mb-4">Message Sent</h3>
                  <p className="text-navy/70 text-lg leading-relaxed">Thank you for reaching out. The {SUBJECT_NAME} Grant team will respond to your inquiry shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="bg-white p-8 md:p-12 rounded-xl shadow-2xl">
                  <h3 className="font-display text-3xl font-bold text-navy mb-8">Send a Message</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block font-accent uppercase tracking-widest text-xs font-bold text-navy mb-3">Full Name</label>
                      <input name="name" type="text" className={inputClass('name')} placeholder="Your name" />
                      {errors.name && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block font-accent uppercase tracking-widest text-xs font-bold text-navy mb-3">Email Address</label>
                      <input name="email" type="email" className={inputClass('email')} placeholder="you@email.com" />
                      {errors.email && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="block font-accent uppercase tracking-widest text-xs font-bold text-navy mb-3">Subject</label>
                      <input name="subject" type="text" className={inputClass('subject')} placeholder="How can we help?" />
                      {errors.subject && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.subject}</p>}
                    </div>
                    <div>
                      <label className="block font-accent uppercase tracking-widest text-xs font-bold text-navy mb-3">Message</label>
                      <textarea name="message" rows={5} className={inputClass('message')} placeholder="Your message..." />
                      {errors.message && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.message}</p>}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="mt-10 w-full bg-gold hover:bg-gold-light text-navy font-accent uppercase tracking-[0.2em] py-4 text-sm font-bold shadow-xl transition-all duration-300 hover:-translate-y-1"
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
