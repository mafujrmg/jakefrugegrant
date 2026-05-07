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
      <section className="bg-base pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-primary)_0%,_transparent_50%)] opacity-10 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <FadeInSection>
            <p className="font-accent uppercase tracking-widest text-secondary text-sm mb-4">Grant Details</p>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-text-main mb-8 leading-tight tracking-tight">
              Grant Eligibility & Details
            </h1>
            <p className="text-text-muted text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed font-light">
              The {SUBJECT_NAME} Grant is intentionally accessible. Designed to remove barriers, not create them.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-24 md:py-36 bg-surface relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeInSection>
            <div className="text-center mb-16">
              <p className="font-accent uppercase tracking-widest text-secondary text-sm mb-3">Requirements</p>
              <h2 className="font-display text-4xl md:text-6xl font-bold text-text-main mb-4">
                Eligibility Requirements
              </h2>
              <DiamondDivider />
            </div>
          </FadeInSection>

          <div className="space-y-6">
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
                <div className="glass-card p-8 rounded-2xl flex flex-col sm:flex-row gap-8 hover:border-primary/50 transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-secondary opacity-50 group-hover:opacity-100 transition-opacity" />
                  <span className="font-display text-5xl md:text-6xl font-bold text-white/[0.03] group-hover:text-primary/20 shrink-0 transition-colors tracking-tighter">{req.num}</span>
                  <div className="relative z-10">
                    <h3 className="font-display text-2xl font-bold text-text-main mb-3">{req.title}</h3>
                    <p className="text-text-muted leading-relaxed text-base font-light">{req.desc}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Summary Table */}
      <section className="py-24 md:py-36 bg-base relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <p className="font-accent uppercase tracking-widest text-secondary text-sm mb-3">Summary</p>
              <h2 className="font-display text-4xl md:text-6xl font-bold text-text-main mb-4">
                Grant Summary
              </h2>
              <DiamondDivider />
            </div>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <div className="overflow-x-auto pb-8">
              <table className="w-full border-collapse glass-card rounded-2xl overflow-hidden shadow-2xl border border-white/5">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10">
                    <th className="px-8 py-6 text-left font-accent uppercase tracking-widest text-xs text-primary-light">Criteria</th>
                    <th className="px-8 py-6 text-left font-accent uppercase tracking-widest text-xs text-primary-light">Requirement</th>
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
                    <tr key={i} className={`transition-colors hover:bg-white/5 ${i !== 8 ? 'border-b border-white/5' : ''}`}>
                      <td className="px-8 py-6 sm:px-12 sm:py-8 font-semibold text-text-muted text-[10px] md:text-xs uppercase tracking-wider bg-white/[0.02] w-1/3">{criteria}</td>
                      <td className="px-8 py-6 sm:px-12 sm:py-8 text-text-main text-sm md:text-lg font-medium">{req}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 md:py-36 bg-surface relative">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeInSection>
            <div className="text-center mb-20">
              <p className="font-accent uppercase tracking-widest text-secondary text-sm mb-3">2026 Timeline</p>
              <h2 className="font-display text-4xl md:text-6xl font-bold text-text-main mb-4">
                Grant Timeline
              </h2>
              <DiamondDivider />
            </div>
          </FadeInSection>

          <div className="space-y-12 max-w-2xl mx-auto relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-secondary before:to-transparent">
            {[
              { date: 'Now', event: 'Applications Open', desc: `The ${SUBJECT_NAME} Grant application is live and accepting submissions.` },
              { date: GRANT_DEADLINE, event: 'Application Deadline', desc: 'All applications must be submitted by 11:59 PM EST.' },
              { date: 'August 16–29, 2026', event: 'Review Period', desc: `The ${SUBJECT_NAME} Grant selection committee reviews all applications.` },
              { date: GRANT_WINNER_DATE, event: 'Winner Announced', desc: `The ${SUBJECT_NAME} Grant recipient is notified and announced publicly.` },
            ].map((item, i) => (
              <FadeInSection key={i} delay={i * 0.1}>
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full border-4 border-surface bg-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10" />
                  <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] glass-card p-6 rounded-2xl hover:border-primary/50 transition-colors">
                    <p className="font-accent uppercase tracking-wider text-primary-light text-xs font-bold mb-2">{item.date}</p>
                    <h3 className="font-display text-2xl font-bold text-text-main mb-3">{item.event}</h3>
                    <p className="text-text-muted text-sm leading-relaxed font-light">{item.desc}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Selection Criteria */}
      <section className="py-24 md:py-36 bg-base relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <p className="font-accent uppercase tracking-widest text-secondary text-sm mb-3">Selection</p>
              <h2 className="font-display text-4xl md:text-6xl font-bold text-text-main mb-4">
                Selection Process
              </h2>
              <DiamondDivider />
            </div>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <div className="glass-card p-10 md:p-14 rounded-3xl text-text-muted leading-relaxed space-y-6 font-light text-lg">
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
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-90 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        
        <div className="max-w-4xl mx-auto px-6 py-24 md:py-32 text-center relative z-20 glass m-8 rounded-[3rem] border border-white/20">
          <FadeInSection>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
              Do You Qualify?
            </h2>
            <p className="text-white/80 text-lg md:text-xl mb-10 leading-relaxed font-light">
              The application takes less than five minutes. The deadline is <strong className="font-medium text-white">{GRANT_DEADLINE}</strong>.
            </p>
            <Link
              to="/apply"
              className="inline-block bg-white text-base font-accent uppercase tracking-widest px-12 py-5 font-bold rounded-lg shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(255,255,255,0.2)] text-primary"
            >
              Apply Now
            </Link>
          </FadeInSection>
        </div>
      </section>
    </>
  );
}
