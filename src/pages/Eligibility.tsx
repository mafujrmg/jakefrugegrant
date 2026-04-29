import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import FadeInSection from '@/components/FadeInSection';
import DiamondDivider from '@/components/DiamondDivider';
import { SUBJECT_NAME, GRANT_AMOUNT, GRANT_DEADLINE, GRANT_WINNER_DATE, IMAGES } from '@/lib/siteConfig';

export default function Eligibility() {
  return (
    <>
      <SEO
        title={`Eligibility & Details | ${SUBJECT_NAME} Grant | ${GRANT_AMOUNT} for US College Students`}
        description={`Find out if you qualify for the ${SUBJECT_NAME} Grant. Open to all undergraduate and graduate students at accredited US institutions. No GPA requirement. No essay. ${GRANT_AMOUNT} awarded annually. Deadline: ${GRANT_DEADLINE}.`}
        canonical="/eligibility"
        ogImage={IMAGES.campusStudents}
      />

      {/* Hero */}
      <section className="bg-navy py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <FadeInSection>
            <p className="font-accent uppercase tracking-[0.3em] text-gold text-sm mb-4">Grant Details</p>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Grant Eligibility & Details
            </h1>
            <p className="text-white/80 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed font-light">
              The {SUBJECT_NAME} Grant is intentionally accessible. Designed to remove barriers, not create them.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <p className="font-accent uppercase tracking-[0.2em] text-gold text-sm mb-3">Requirements</p>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-navy mb-4">
                Eligibility Requirements
              </h2>
              <DiamondDivider />
            </div>
          </FadeInSection>

          <div className="space-y-8">
            {[
              {
                num: '01',
                title: 'US-Based Institution',
                desc: `Applicants for the ${SUBJECT_NAME} Grant must be currently enrolled at an accredited college or university located within the United States. Online programs affiliated with accredited US institutions also qualify.`,
              },
              {
                num: '02',
                title: 'Undergraduate or Graduate Student',
                desc: `The ${SUBJECT_NAME} Grant is open to students at any level — undergraduate, graduate, or doctoral. There is no restriction on year of study or program type.`,
              },
              {
                num: '03',
                title: 'Any Field of Study',
                desc: `${SUBJECT_NAME} believes that ambition exists in every discipline. Whether you are pursuing business, healthcare, engineering, education, the arts, or any other field, you are eligible for the ${SUBJECT_NAME} Grant.`,
              },
              {
                num: '04',
                title: 'No Minimum GPA',
                desc: `The ${SUBJECT_NAME} Grant does not require a minimum GPA. ${SUBJECT_NAME} understands that grades do not always reflect a student's potential, work ethic, or capacity for impact.`,
              },
              {
                num: '05',
                title: 'No Essay Required',
                desc: `There is no essay component to the ${SUBJECT_NAME} Grant application. Applicants submit a brief statement (500 characters maximum) explaining why they deserve the grant. That is it.`,
              },
            ].map((req, i) => (
              <FadeInSection key={i} delay={i * 0.1}>
                <div className="bg-white p-8 rounded-lg shadow-md flex flex-col sm:flex-row gap-6 hover:shadow-lg transition-shadow duration-300 border-l-4 border-gold relative overflow-hidden">
                  <span className="font-accent text-5xl font-bold text-gold/50 shrink-0">{req.num}</span>
                  <div className="relative z-10">
                    <h3 className="font-display text-2xl font-bold text-navy mb-3">{req.title}</h3>
                    <p className="text-navy/70 leading-relaxed text-base">{req.desc}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Summary Table */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <p className="font-accent uppercase tracking-[0.2em] text-gold text-sm mb-3">Summary</p>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-navy mb-4">
                Grant Summary
              </h2>
              <DiamondDivider />
            </div>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <div className="overflow-x-auto shadow-xl rounded-lg">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-navy text-white">
                    <th className="px-8 py-5 text-left font-accent uppercase tracking-wider text-sm">Criteria</th>
                    <th className="px-8 py-5 text-left font-accent uppercase tracking-wider text-sm">Requirement</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Citizenship', 'No citizenship requirement (must attend US institution)'],
                    ['Enrollment', 'Currently enrolled (full-time or part-time)'],
                    ['Level', 'Undergraduate, Graduate, or Doctoral'],
                    ['Major', 'Any field of study'],
                    ['GPA', 'No minimum'],
                    ['Essay', 'Not required'],
                    ['Brief Statement', 'Yes (500 characters max)'],
                    ['Grant Amount', GRANT_AMOUNT],
                    ['Number of Recipients', '1 per year'],
                  ].map(([criteria, req], i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-cream/30' : 'bg-white'}>
                      <td className="px-8 py-6 sm:px-12 sm:py-8 font-bold text-navy text-[10px] md:text-xs uppercase tracking-widest border-b border-navy/5 bg-navy/5">{criteria}</td>
                      <td className="px-8 py-6 sm:px-12 sm:py-8 text-navy/80 text-sm md:text-lg border-b border-navy/5 font-medium">{req}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <p className="font-accent uppercase tracking-[0.2em] text-gold text-sm mb-3">2026 Timeline</p>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-navy mb-4">
                Grant Timeline
              </h2>
              <DiamondDivider />
            </div>
          </FadeInSection>

          <div className="space-y-10 max-w-2xl mx-auto">
            {[
              { date: 'Now', event: 'Applications Open', desc: `The ${SUBJECT_NAME} Grant application is live and accepting submissions.` },
              { date: GRANT_DEADLINE, event: 'Application Deadline', desc: 'All applications must be submitted by 11:59 PM EST.' },
              { date: 'August 16–29, 2026', event: 'Review Period', desc: `The ${SUBJECT_NAME} Grant selection committee reviews all applications.` },
              { date: GRANT_WINNER_DATE, event: 'Winner Announced', desc: `The ${SUBJECT_NAME} Grant recipient is notified and announced publicly.` },
            ].map((item, i) => (
              <FadeInSection key={i} delay={i * 0.1}>
                <div className="flex gap-6 items-start">
                  <div className="w-4 h-4 mt-2 rotate-45 bg-gold shrink-0 shadow-[0_0_10px_rgba(184,134,11,0.3)]" />
                  <div>
                    <p className="font-accent uppercase tracking-wider text-gold text-xs font-bold mb-1">{item.date}</p>
                    <h3 className="font-display text-2xl font-bold text-navy mb-2">{item.event}</h3>
                    <p className="text-navy/70 text-base leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Selection Criteria */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <p className="font-accent uppercase tracking-[0.2em] text-gold text-sm mb-3">Selection</p>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-navy mb-4">
                Selection Process
              </h2>
              <DiamondDivider />
            </div>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <div className="prose prose-lg max-w-none text-navy/80 leading-relaxed space-y-6">
              <p>
                The {SUBJECT_NAME} Grant selection process is designed to identify students who embody the same qualities that {SUBJECT_NAME} values most: drive, resilience, and a genuine commitment to making the most of their education. The selection committee evaluates applications holistically, considering the applicant's brief statement, their academic context, and the overall strength of their candidacy.
              </p>
              <p>
                Because the {SUBJECT_NAME} Grant has no GPA or essay requirement, the brief statement carries significant weight. Applicants are encouraged to be authentic, specific, and direct about why they deserve this investment in their future.
              </p>
              <p>
                {SUBJECT_NAME} personally participates in the final selection process, ensuring that the grant goes to a student whose story and ambition align with the mission of the {SUBJECT_NAME} Grant: fueling the next generation of doers.
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-gold">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <FadeInSection>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-navy mb-6">
              Do You Qualify?
            </h2>
            <p className="text-navy/90 text-xl mb-10 leading-relaxed">
              The application takes less than five minutes. The deadline is {GRANT_DEADLINE}.
            </p>
            <Link
              to="/apply"
              className="inline-block bg-navy hover:bg-navy-light text-white font-accent uppercase tracking-wider px-12 py-4 text-sm font-bold shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              Apply Now
            </Link>
          </FadeInSection>
        </div>
      </section>
    </>
  );
}
