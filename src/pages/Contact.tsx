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
    `w-full px-4 py-3 border border-white/10 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-surface text-text-main text-sm md:text-base transition-all duration-200 placeholder:text-text-muted/50 ${errors[field] ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`;

  return (
    <>
      <SEO
        title={`Contact | ${SUBJECT_NAME} Grant | Get in Touch`}
        description={`Contact the ${SUBJECT_NAME} Grant team with questions about the ${SUBJECT_NAME} Grant, eligibility, or the application process. Founded by ${SUBJECT_NAME}, CEO of JFJ Holdings.`}
        canonical="/contact"
        ogImage={IMAGES.contactHero}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden flex items-center justify-center min-h-[50vh]">
        <div className="absolute inset-0 bg-cover bg-center mix-blend-luminosity opacity-30" style={{ backgroundImage: `url(${IMAGES.contactHero})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-base via-base/90 to-base" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <FadeInSection>
            <p className="font-accent uppercase tracking-widest text-secondary text-sm mb-4">Support</p>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-text-main mb-8 leading-tight tracking-tight">
              Get in Touch
            </h1>
            <p className="text-text-muted text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed font-light">
              Have a question about the {SUBJECT_NAME} Grant? Our team is here to assist you.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 md:py-36 bg-base relative z-20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left: Info */}
            <FadeInSection direction="left" className="min-w-0">
              <p className="font-accent uppercase tracking-widest text-secondary text-sm mb-3">Contact Information</p>
              <h2 className="font-display text-4xl font-bold text-text-main mb-8">
                Connect With Us
              </h2>
              <DiamondDivider className="mb-10 !justify-start" />

              <div className="space-y-10">
                <div className="flex gap-6 group">
                  <div className="w-12 h-12 glass border border-white/10 rounded-full flex items-center justify-center shrink-0 group-hover:border-primary/50 transition-colors">
                    <svg className="text-primary-light" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-accent uppercase tracking-widest text-xs text-text-main font-bold mb-2">Email Support</h3>
                    <a href="mailto:info@jakefrugejrgrant.com" className="text-lg text-primary-light font-medium hover:text-primary transition-colors">
                      info@jakefrugejrgrant.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="w-12 h-12 glass border border-white/10 rounded-full flex items-center justify-center shrink-0 group-hover:border-primary/50 transition-colors">
                    <svg className="text-primary-light" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-accent uppercase tracking-widest text-xs text-text-main font-bold mb-2">Response Time</h3>
                    <p className="text-text-muted text-base font-light">We typically respond within 2–3 business days.</p>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="w-12 h-12 glass border border-white/10 rounded-full flex items-center justify-center shrink-0 group-hover:border-primary/50 transition-colors">
                    <svg className="text-primary-light" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-accent uppercase tracking-widest text-xs text-text-main font-bold mb-3">
                      Social Presence
                    </h3>
                    <SocialIcons links={SOCIAL_LINKS} className="!justify-start opacity-70 hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>

              <div className="mt-16 p-10 glass-card rounded-2xl relative overflow-hidden group border border-white/10 hover:border-primary/30 transition-colors">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 -translate-y-16 translate-x-16 rounded-full group-hover:scale-110 transition-transform duration-500" />
                <h3 className="font-display text-2xl font-bold text-text-main mb-4 relative z-10">About the Founder</h3>
                <p className="text-text-muted text-base leading-relaxed mb-8 relative z-10 font-light">
                  {SUBJECT_NAME} is an entrepreneur, CEO of JFJ Holdings, and Forbes Business Council member. He founded this grant to invest in the next generation of builders.
                </p>
                <a href="/about" className="inline-flex items-center gap-2 text-primary font-accent uppercase tracking-widest text-xs font-bold hover:gap-3 transition-all relative z-10">
                  Read His Story <span>&rarr;</span>
                </a>
              </div>
            </FadeInSection>

            {/* Right: Form */}
            <FadeInSection direction="right" className="min-w-0">
              {submitted ? (
                <div className="glass-card p-12 rounded-3xl text-center h-full flex flex-col items-center justify-center border border-white/10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-primary)_0%,_transparent_50%)] opacity-10 pointer-events-none" />
                  <div className="relative z-10">
                    <div className="w-24 h-24 mx-auto mb-8 bg-primary/20 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.3)] border border-primary/30">
                      <svg className="text-primary-light" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h3 className="font-display text-3xl font-bold text-text-main mb-4">Message Sent</h3>
                    <p className="text-text-muted text-lg leading-relaxed font-light">Thank you for reaching out. The {SUBJECT_NAME} Grant team will respond to your inquiry shortly.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="glass-card p-8 md:p-14 rounded-3xl shadow-2xl border border-white/10">
                  <h3 className="font-display text-3xl font-bold text-text-main mb-8">Send a Message</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block font-accent uppercase tracking-widest text-xs font-bold text-text-main mb-3">Full Name</label>
                      <input name="name" type="text" className={inputClass('name')} placeholder="Your name" />
                      {errors.name && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block font-accent uppercase tracking-widest text-xs font-bold text-text-main mb-3">Email Address</label>
                      <input name="email" type="email" className={inputClass('email')} placeholder="you@email.com" />
                      {errors.email && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="block font-accent uppercase tracking-widest text-xs font-bold text-text-main mb-3">Subject</label>
                      <input name="subject" type="text" className={inputClass('subject')} placeholder="How can we help?" />
                      {errors.subject && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.subject}</p>}
                    </div>
                    <div>
                      <label className="block font-accent uppercase tracking-widest text-xs font-bold text-text-main mb-3">Message</label>
                      <textarea name="message" rows={5} className={inputClass('message')} placeholder="Your message..." />
                      {errors.message && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.message}</p>}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="mt-10 w-full bg-primary hover:bg-primary-light text-white font-accent uppercase tracking-widest py-4 text-sm font-bold shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-lg hover:shadow-[0_0_15px_rgba(139,92,246,0.5)]"
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
