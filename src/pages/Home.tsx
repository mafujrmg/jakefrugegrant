import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import FadeInSection from '@/components/FadeInSection';
import DiamondDivider from '@/components/DiamondDivider';
import { IMAGES, SITE_DOMAIN, SUBJECT_NAME, GRANT_AMOUNT, GRANT_DEADLINE, GRANT_WINNER_DATE } from '@/lib/siteConfig';

export default function Home() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${SUBJECT_NAME} Grant - Official Website`,
    url: SITE_DOMAIN,
    description: `The ${SUBJECT_NAME} Grant is a ${GRANT_AMOUNT} annual grant for US college students, founded by ${SUBJECT_NAME}, entrepreneur and CEO of JFJ Holdings.`,
    author: { '@type': 'Person', name: SUBJECT_NAME },
  };

  return (
    <>
      <SEO
        title={`${SUBJECT_NAME} Grant | ${GRANT_AMOUNT} Annual Grant for College Students | CEO of JFJ Holdings`}
        description={`The ${SUBJECT_NAME} Grant awards ${GRANT_AMOUNT} annually to one driven US college student. Founded by ${SUBJECT_NAME}, entrepreneur and CEO of JFJ Holdings. No GPA requirement. No essay. Apply by ${GRANT_DEADLINE}.`}
        canonical="/"
        schemas={[websiteSchema]}
      />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-base pt-20">
        <div className="absolute inset-0 w-full h-full">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity"
            style={{ backgroundImage: `url(${IMAGES.heroGrant})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-base via-base/80 to-base" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-primary)_0%,_transparent_50%)] opacity-[0.08]" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <FadeInSection direction="none">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <p className="font-accent uppercase tracking-widest text-secondary text-xs md:text-sm font-medium">
                Fueling the Next Generation of Doers
              </p>
            </div>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-text-main leading-tight mb-8 tracking-tight">
              The {SUBJECT_NAME} <span className="text-gradient">Grant</span>
            </h1>
          </FadeInSection>
          <FadeInSection delay={0.4}>
            <p className="text-text-muted text-lg md:text-2xl max-w-3xl mx-auto mb-12 font-light leading-relaxed">
              A <strong className="text-text-main font-medium">{GRANT_AMOUNT}</strong> annual grant designed to remove financial barriers for ambitious college students across the United States. No GPA requirement. No essay. Just drive.
            </p>
          </FadeInSection>
          <FadeInSection delay={0.6}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-4">
              <Link
                to="/apply"
                className="bg-primary hover:bg-primary-light text-white font-accent uppercase tracking-widest px-10 py-5 text-sm font-bold transition-all duration-300 w-full sm:w-auto text-center shadow-[0_0_40px_rgba(139,92,246,0.4)] hover:shadow-[0_0_60px_rgba(167,139,250,0.6)] rounded-lg hover:-translate-y-1"
              >
                Apply for the Grant
              </Link>
              <Link
                to="/eligibility"
                className="glass hover:bg-white/10 text-text-main font-accent uppercase tracking-widest px-10 py-5 text-sm font-bold transition-all duration-300 w-full sm:w-auto text-center rounded-lg hover:-translate-y-1"
              >
                View Eligibility
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* GRANT OVERVIEW */}
      <section className="py-24 md:py-36 bg-surface relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <FadeInSection>
            <div className="text-center mb-20">
              <p className="font-accent uppercase tracking-widest text-secondary text-sm mb-4">About the Grant</p>
              <h2 className="font-display text-4xl md:text-6xl font-bold text-text-main mb-6">
                The {SUBJECT_NAME} Grant at a Glance
              </h2>
              <DiamondDivider />
            </div>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <p className="text-center text-text-muted max-w-3xl mx-auto mb-20 text-xl leading-relaxed font-light">
              The {SUBJECT_NAME} Grant was established to bridge the gap between ambition and resources. {SUBJECT_NAME} understands firsthand that financial obstacles should never determine a student's ceiling. This grant is open to any undergraduate or graduate student enrolled at an accredited US institution.
            </p>
          </FadeInSection>

          <FadeInSection delay={0.3}>
            <div className="overflow-x-auto pb-8">
              <table className="w-full max-w-4xl mx-auto border-collapse glass-card rounded-2xl overflow-hidden border border-white/5">
                <tbody>
                  {[
                    ['Grant Amount', GRANT_AMOUNT],
                    ['Frequency', 'Awarded annually (one recipient per year)'],
                    ['Eligibility', 'Any US-based undergraduate or graduate student'],
                    ['GPA Requirement', 'None'],
                    ['Essay Requirement', 'None'],
                    ['Application Deadline', GRANT_DEADLINE],
                    ['Winner Announced', GRANT_WINNER_DATE],
                  ].map(([label, value], i) => (
                    <tr key={i} className={`transition-colors hover:bg-white/5 ${i !== 6 ? 'border-b border-white/5' : ''}`}>
                      <td className="px-8 py-6 sm:px-12 sm:py-8 font-accent uppercase tracking-wider text-[10px] md:text-xs text-primary-light font-semibold w-1/3 leading-tight bg-white/[0.02]">{label}</td>
                      <td className="px-8 py-6 sm:px-12 sm:py-8 text-text-main text-sm md:text-lg font-medium">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* FOUNDER INTRO */}
      <section className="py-24 md:py-40 bg-base relative z-10 overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
            <FadeInSection direction="left">
              <div className="relative group perspective">
                <div className="absolute -inset-4 bg-gradient-primary opacity-20 blur-2xl rounded-[2rem] group-hover:opacity-30 transition-opacity duration-500" />
                <div className="glass-card p-2 rounded-[2rem] transform transition-transform duration-500 hover:rotate-y-[-5deg]">
                  <img
                    src="/images/jake-fruge-jr.jpeg"
                    alt={`${SUBJECT_NAME} in a professional suit`}
                    className="relative z-10 w-full rounded-[1.5rem] object-cover mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700 grayscale-[50%]"
                    loading="lazy"
                  />
                </div>
              </div>
            </FadeInSection>
            <FadeInSection direction="right">
              <p className="font-accent uppercase tracking-widest text-secondary text-xs md:text-sm mb-4 flex items-center gap-3">
                <span className="w-10 h-[1px] bg-secondary"></span>
                Meet the Founder
              </p>
              <h2 className="font-display text-4xl md:text-6xl font-bold text-text-main mb-10 leading-tight">
                {SUBJECT_NAME}: From Adversity to Enterprise
              </h2>
              <div className="space-y-6 text-text-muted text-lg md:text-xl leading-relaxed mb-12 font-light">
                <p>
                  {SUBJECT_NAME} grew up in over 30 cities and attended 19 different schools. By 17, he was hustling to survive. At 21, he made a decision that changed everything — he entered financial services and never looked back.
                </p>
                <p>
                  Today, as CEO of JFJ Holdings — a nine-figure holdings company with 30+ businesses — {SUBJECT_NAME} channels his success into empowering others through the {SUBJECT_NAME} Grant.
                </p>
              </div>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 border border-primary/50 text-primary-light hover:bg-primary/10 font-accent uppercase tracking-widest px-10 py-5 text-sm font-bold transition-all duration-300 rounded-lg group"
              >
                Read Full Story
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* HOW TO APPLY */}
      <section className="py-24 md:py-36 bg-surface relative">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-24">
              <p className="font-accent uppercase tracking-widest text-secondary text-sm mb-4">Application Process</p>
              <h2 className="font-display text-4xl md:text-6xl font-bold text-text-main mb-8">
                How to Apply for the {SUBJECT_NAME} Grant
              </h2>
              <DiamondDivider />
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {[
              {
                step: '01',
                title: 'Check Eligibility',
                desc: `Confirm enrollment at a US-based accredited institution. No GPA or essay requirements.`,
              },
              {
                step: '02',
                title: 'Apply Online',
                desc: `Complete the brief form with your statement (500 characters max).`,
              },
              {
                step: '03',
                title: 'Submit',
                desc: `Applications close ${GRANT_DEADLINE}. Recipients announced ${GRANT_WINNER_DATE}.`,
              },
            ].map((item, i) => (
              <FadeInSection key={i} delay={i * 0.15} className="h-full">
                <div className="glass-card p-10 lg:p-12 rounded-2xl transition-all duration-500 border border-white/5 hover:border-primary/50 h-full flex flex-col relative overflow-hidden group">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors duration-500" />
                  <span className="font-display text-7xl font-bold text-white/[0.03] block mb-8 transition-all duration-500 group-hover:text-primary/10 tracking-tighter">{item.step}</span>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-text-main mb-4">{item.title}</h3>
                  <p className="text-text-muted leading-relaxed text-base font-light">{item.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION QUOTE */}
      <section className="py-32 md:py-48 bg-base relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03] mix-blend-screen" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-primary/10 blur-[100px] rounded-[100%] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-8 text-center relative z-10">
          <FadeInSection>
            <div className="w-16 h-16 mx-auto mb-10 flex items-center justify-center">
              <svg className="text-secondary opacity-50" width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            <blockquote className="font-display text-3xl md:text-5xl font-light text-text-main leading-tight mb-10 tracking-tight">
              "I did not have anyone handing me opportunities. I had to create them. This grant exists so that one less student has to choose between their education and their survival."
            </blockquote>
            <p className="font-accent uppercase tracking-[0.3em] text-primary-light text-sm md:text-base font-medium">
              — {SUBJECT_NAME}, Founder
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* STUDENTS IMAGE SECTION */}
      <section className="py-20 md:py-32 bg-surface relative">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
            <FadeInSection direction="left">
              <p className="font-accent uppercase tracking-widest text-secondary text-sm mb-4 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-secondary"></span>
                Who This Grant Is For
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-text-main mb-8 leading-tight">
                {SUBJECT_NAME} Invests in Driven Students
              </h2>
              <div className="space-y-6 text-text-muted text-lg leading-relaxed mb-10 font-light">
                <p>
                  The {SUBJECT_NAME} Grant is not about grades or test scores. It is about recognizing students who demonstrate initiative, resilience, and a genuine commitment to building something meaningful with their education. Whether you are studying engineering, education, business, or the arts, this grant is designed for students who refuse to let financial barriers slow them down.
                </p>
                <p>
                  {SUBJECT_NAME} built JFJ Holdings from nothing — no inheritance, no safety net, no connections. He knows what it means to fight for every opportunity. The {SUBJECT_NAME} Grant is his way of ensuring that the next generation of builders, creators, and leaders has one fewer obstacle in their path.
                </p>
              </div>
              <Link
                to="/eligibility"
                className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-text-main font-accent uppercase tracking-wider px-8 py-4 text-sm font-bold transition-all duration-300 rounded-lg group"
              >
                View Full Eligibility
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </FadeInSection>
            <FadeInSection direction="right">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-[2rem] blur-xl" />
                <img
                  src={IMAGES.campusStudents}
                  alt={`College students collaborating`}
                  className="relative z-10 w-full rounded-[2rem] border border-white/10 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700 grayscale-[30%] shadow-2xl"
                  loading="lazy"
                />
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-90 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/30 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 py-32 md:py-48 text-center relative z-20 glass m-8 rounded-[3rem] border border-white/20">
          <FadeInSection>
            <div className="inline-block mb-10 p-4 rounded-full bg-white/10 backdrop-blur-md">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
              Ready to Claim Your Grant?
            </h2>
            <p className="text-white/80 text-xl md:text-2xl mb-14 max-w-2xl mx-auto leading-relaxed font-light">
              Applications for the 2026 {SUBJECT_NAME} Grant are now open. The deadline is <strong className="text-white font-medium">{GRANT_DEADLINE}</strong>.
            </p>
            <Link
              to="/apply"
              className="inline-block bg-white text-base font-accent uppercase tracking-widest px-12 py-5 text-sm md:text-base font-bold rounded-lg shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(255,255,255,0.2)]"
            >
              Apply Now
            </Link>
          </FadeInSection>
        </div>
      </section>
    </>
  );
}
