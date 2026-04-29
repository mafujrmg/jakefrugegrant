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
      <section className="bg-navy py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <FadeInSection>
            <p className="font-accent uppercase tracking-[0.3em] text-gold text-sm mb-4">Support Center</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
              Everything you need to know about the {SUBJECT_NAME} Grant, our mission, and the application process.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <DiamondDivider />
            </div>
          </FadeInSection>

          <div className="space-y-4 max-w-3xl mx-auto">
            {FAQS.map((faq, i) => (
              <FadeInSection key={i} delay={i * 0.05}>
                <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-navy/5">
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full px-6 py-5 md:px-8 md:py-6 flex items-center justify-between text-left group"
                  >
                    <span className={`font-display text-lg md:text-xl font-bold transition-colors duration-200 ${openIndex === i ? 'text-gold' : 'text-navy group-hover:text-gold'}`}>
                      {faq.q}
                    </span>
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${openIndex === i ? 'bg-gold border-gold text-navy rotate-45' : 'border-gold/30 text-gold'}`}>
                      <span className="text-xl font-bold">+</span>
                    </div>
                  </button>
                  <div className={`transition-all duration-300 ease-in-out ${openIndex === i ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                    <div className="px-6 pb-6 md:px-8 md:pb-8 border-t border-navy/5 mt-2 pt-4">
                      <p className="text-navy/70 leading-relaxed text-base md:text-lg">{faq.a}</p>
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
