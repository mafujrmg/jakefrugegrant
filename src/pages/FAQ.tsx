import { useState } from 'react';
import SEO from '@/components/SEO';
import FadeInSection from '@/components/FadeInSection';
import DiamondDivider from '@/components/DiamondDivider';
import { SUBJECT_NAME, GRANT_AMOUNT, GRANT_DEADLINE, GRANT_WINNER_DATE } from '@/lib/siteConfig';

const FAQS = [
  { q: `What is the ${SUBJECT_NAME} Grant?`, a: `The ${SUBJECT_NAME} Grant is a ${GRANT_AMOUNT} annual grant founded by ${SUBJECT_NAME}, entrepreneur and CEO of JFJ Holdings. It is awarded to one US college student each year to help remove financial barriers to education.` },
  { q: `Who is eligible for the ${SUBJECT_NAME} Grant?`, a: `Any student currently enrolled at an accredited US-based college or university is eligible. This includes undergraduate, graduate, and doctoral students in any field of study. There is no GPA requirement and no essay requirement.` },
  { q: `How much is the ${SUBJECT_NAME} Grant worth?`, a: `The ${SUBJECT_NAME} Grant awards ${GRANT_AMOUNT} to one recipient per year.` },
  { q: `Is there a GPA requirement for the ${SUBJECT_NAME} Grant?`, a: `No. ${SUBJECT_NAME} believes that grades do not always reflect a student's potential or drive. The ${SUBJECT_NAME} Grant has no minimum GPA requirement.` },
  { q: `Do I need to write an essay to apply?`, a: `No essay is required. The application includes a brief statement (500 characters maximum) where you explain why you deserve the ${SUBJECT_NAME} Grant. That is the only written component.` },
  { q: `What is the deadline to apply for the ${SUBJECT_NAME} Grant?`, a: `The application deadline for the 2026 ${SUBJECT_NAME} Grant is ${GRANT_DEADLINE} at 11:59 PM EST.` },
  { q: `When will the ${SUBJECT_NAME} Grant winner be announced?`, a: `The ${SUBJECT_NAME} Grant recipient will be announced on ${GRANT_WINNER_DATE}.` },
  { q: `How is the ${SUBJECT_NAME} Grant recipient selected?`, a: `Applications are reviewed holistically by the selection committee. The brief statement carries significant weight. ${SUBJECT_NAME} personally participates in the final selection to ensure the grant goes to a student whose drive and ambition align with the mission of the grant.` },
  { q: `Can international students apply for the ${SUBJECT_NAME} Grant?`, a: `International students who are currently enrolled at an accredited US-based institution are eligible to apply. There is no citizenship requirement.` },
  { q: `Can part-time students apply?`, a: `Yes. Both full-time and part-time students enrolled at accredited US institutions are eligible for the ${SUBJECT_NAME} Grant.` },
  { q: `How will I receive the grant funds?`, a: `The ${SUBJECT_NAME} Grant recipient will be contacted directly with details on fund disbursement. Funds are typically issued via check or direct deposit.` },
  { q: `Can I apply for the ${SUBJECT_NAME} Grant if I also received other grants or scholarships?`, a: `Yes. Receiving other financial aid does not disqualify you from the ${SUBJECT_NAME} Grant.` },
  { q: `Who is ${SUBJECT_NAME}?`, a: `${SUBJECT_NAME} is an entrepreneur, CEO of JFJ Holdings (a nine-figure holdings company with 30+ businesses), and Forbes Business Council member. He grew up in over 30 cities, attended 19 schools, and built his career from nothing. He created the ${SUBJECT_NAME} Grant to invest in students who share his drive and resilience.` },
  { q: `How can I contact the ${SUBJECT_NAME} Grant team?`, a: `You can reach the ${SUBJECT_NAME} Grant team via the Contact page on this website or by emailing info@jakefrugejrgrant.com.` },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  return (
    <>
      <SEO
        title={`FAQ | ${SUBJECT_NAME} Grant | Frequently Asked Questions`}
        description={`Frequently asked questions about the ${SUBJECT_NAME} Grant. Learn about eligibility, the application process, deadlines, and how the ${GRANT_AMOUNT} grant recipient is selected.`}
        canonical="/faq"
        schemas={[faqSchema]}
      />

      {/* Hero */}
      <section className="bg-base pt-32 pb-24 md:pt-40 md:pb-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <FadeInSection>
            <p className="font-accent uppercase tracking-widest text-secondary text-sm mb-4">Support Center</p>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-text-main mb-8 leading-tight tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-text-muted text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed font-light">
              Everything you need to know about the {SUBJECT_NAME} Grant, our mission, and the application process.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-24 md:py-36 bg-surface relative">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
          <FadeInSection>
            <div className="text-center mb-16">
              <DiamondDivider />
            </div>
          </FadeInSection>

          <div className="space-y-6 max-w-3xl mx-auto">
            {FAQS.map((faq, i) => (
              <FadeInSection key={i} delay={i * 0.05}>
                <div className={`glass-card rounded-2xl overflow-hidden border transition-all duration-300 ${openIndex === i ? 'border-primary/50 shadow-[0_0_30px_rgba(139,92,246,0.15)] bg-white/[0.03]' : 'border-white/5 hover:border-white/20'}`}>
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full px-6 py-6 md:px-8 md:py-8 flex items-center justify-between text-left group"
                  >
                    <span className={`font-display text-lg md:text-xl font-bold transition-colors duration-200 pr-8 ${openIndex === i ? 'text-primary' : 'text-text-main group-hover:text-primary-light'}`}>
                      {faq.q}
                    </span>
                    <div className={`shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${openIndex === i ? 'bg-primary border-primary text-white rotate-45 shadow-[0_0_15px_rgba(139,92,246,0.5)]' : 'border-white/10 text-white/50 group-hover:text-primary-light group-hover:border-primary/50'}`}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300">
                        <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </button>
                  <div className={`transition-all duration-500 ease-in-out ${openIndex === i ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                    <div className="px-6 pb-6 md:px-8 md:pb-8 pt-2">
                      <p className="text-text-muted leading-relaxed text-base md:text-lg font-light pl-4 border-l-2 border-primary/30">{faq.a}</p>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
