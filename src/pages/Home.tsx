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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${IMAGES.heroGrant})` }}
        />
        <div className="absolute inset-0 bg-navy/75" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <FadeInSection direction="none">
            <p className="font-accent uppercase tracking-[0.4em] text-gold text-sm md:text-base mb-6">
              Fueling the Next Generation of Doers
            </p>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] mb-8">
              The {SUBJECT_NAME} Grant
            </h1>
          </FadeInSection>
          <FadeInSection delay={0.4}>
            <p className="text-white/80 text-lg md:text-2xl max-w-3xl mx-auto mb-12 font-light leading-relaxed">
              A {GRANT_AMOUNT} annual grant designed to remove financial barriers for ambitious college students across the United States. No GPA requirement. No essay. Just drive.
            </p>
          </FadeInSection>
          <FadeInSection delay={0.6}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-4">
              <Link
                to="/apply"
                className="bg-gold hover:bg-gold-light text-navy font-accent uppercase tracking-widest px-10 py-5 text-sm font-bold transition-all duration-300 w-full sm:w-auto text-center shadow-[0_10px_30px_rgba(184,134,11,0.3)] hover:-translate-y-1"
              >
                Apply for the Grant
              </Link>
              <Link
                to="/eligibility"
                className="border-2 border-white text-white hover:bg-white hover:text-navy font-accent uppercase tracking-widest px-10 py-5 text-sm font-bold transition-all duration-300 bg-navy/20 sm:bg-transparent w-full sm:w-auto hover:-translate-y-1 shadow-xl"
              >
                View Eligibility
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* GRANT OVERVIEW */}
      <section className="py-24 md:py-36 bg-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-20">
              <p className="font-accent uppercase tracking-[0.3em] text-gold text-sm mb-4">About the Grant</p>
              <h2 className="font-display text-4xl md:text-6xl font-bold text-navy mb-6">
                The {SUBJECT_NAME} Grant at a Glance
              </h2>
              <DiamondDivider />
            </div>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <p className="text-center text-navy/80 max-w-3xl mx-auto mb-20 text-xl leading-relaxed font-light">
              The {SUBJECT_NAME} Grant was established to bridge the gap between ambition and resources. {SUBJECT_NAME} understands firsthand that financial obstacles should never determine a student's ceiling. This grant is open to any undergraduate or graduate student enrolled at an accredited US institution.
            </p>
          </FadeInSection>

          <FadeInSection delay={0.3}>
            <div className="overflow-x-auto">
              <table className="w-full max-w-4xl mx-auto border-collapse shadow-2xl rounded-xl overflow-hidden border border-navy/5">
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
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-cream-dark/40'}>
                      <td className="px-8 py-6 sm:px-12 sm:py-8 font-accent uppercase tracking-[0.15em] text-[10px] md:text-xs text-navy font-bold border-b border-navy/5 w-1/3 leading-tight bg-navy/5">{label}</td>
                      <td className="px-8 py-6 sm:px-12 sm:py-8 text-navy/80 text-sm md:text-lg border-b border-navy/5 font-medium">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* FOUNDER INTRO */}
      <section className="py-24 md:py-40 bg-navy relative z-10">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
            <FadeInSection direction="left">
              <div className="relative">
                <div className="absolute -inset-6 border-2 border-gold/20 rounded-lg translate-x-3 translate-y-3 hidden lg:block" />
                <img
                  src={IMAGES.jakeForbesSuit}
                  alt={`${SUBJECT_NAME} in a professional suit`}
                  className="relative z-10 w-full rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                  loading="lazy"
                />
              </div>
            </FadeInSection>
            <FadeInSection direction="right">
              <p className="font-accent uppercase tracking-[0.4em] text-gold text-xs md:text-sm mb-4">Meet the Founder</p>
              <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-10 leading-tight">
                {SUBJECT_NAME}: From Adversity to Enterprise
              </h2>
              <div className="space-y-6 text-white/70 text-lg md:text-xl leading-relaxed mb-12 font-light">
                <p>
                  {SUBJECT_NAME} grew up in over 30 cities and attended 19 different schools. By 17, he was hustling to survive. At 21, he made a decision that changed everything — he entered financial services and never looked back.
                </p>
                <p>
                  Today, as CEO of JFJ Holdings — a nine-figure holdings company with 30+ businesses — {SUBJECT_NAME} channels his success into empowering others through the {SUBJECT_NAME} Grant.
                </p>
              </div>
              <Link
                to="/about"
                className="inline-block border-2 border-gold text-gold hover:bg-gold hover:text-navy font-accent uppercase tracking-widest px-10 py-5 text-sm font-bold transition-all duration-300 shadow-xl"
              >
                Read Full Story
              </Link>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* HOW TO APPLY */}
      <section className="py-24 md:py-36 bg-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-24">
              <p className="font-accent uppercase tracking-[0.3em] text-gold text-sm mb-4">Application Process</p>
              <h2 className="font-display text-4xl md:text-6xl font-bold text-navy mb-8">
                How to Apply for the {SUBJECT_NAME} Grant
              </h2>
              <DiamondDivider />
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 max-w-6xl mx-auto">
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
                <div className="bg-white p-10 lg:p-14 rounded-2xl shadow-xl text-center hover:shadow-2xl transition-all duration-500 border border-navy/5 hover:border-gold/50 h-full flex flex-col items-center justify-start relative overflow-hidden group">
                  <span className="font-accent text-7xl font-bold text-gold/10 block mb-8 transition-all duration-500 group-hover:scale-110 group-hover:text-gold/20">{item.step}</span>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-navy mb-6">{item.title}</h3>
                  <p className="text-navy/70 leading-relaxed text-lg font-light">{item.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION QUOTE */}
      <section className="py-24 md:py-32 bg-navy-light relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--color-gold)_0%,_transparent_70%)]" />
        <div className="max-w-4xl mx-auto px-8 text-center relative z-10">
          <FadeInSection>
            <div className="w-16 h-16 mx-auto mb-10 flex items-center justify-center opacity-40">
              <svg className="text-gold" width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            <blockquote className="font-display text-3xl md:text-5xl italic text-white leading-[1.4] mb-10">
              "I did not have anyone handing me opportunities. I had to create them. This grant exists so that one less student has to choose between their education and their survival."
            </blockquote>
            <p className="font-accent uppercase tracking-[0.4em] text-gold text-sm md:text-base font-bold">
              — {SUBJECT_NAME}, Founder
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* STUDENTS IMAGE SECTION */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeInSection direction="left">
              <p className="font-accent uppercase tracking-[0.2em] text-gold text-sm mb-3">Who This Grant Is For</p>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-navy mb-8">
                {SUBJECT_NAME} Invests in Driven Students
              </h2>
              <p className="text-navy/80 text-lg leading-relaxed mb-6">
                The {SUBJECT_NAME} Grant is not about grades or test scores. It is about recognizing students who demonstrate initiative, resilience, and a genuine commitment to building something meaningful with their education. Whether you are studying engineering, education, business, or the arts, this grant is designed for students who refuse to let financial barriers slow them down.
              </p>
              <p className="text-navy/80 text-lg leading-relaxed mb-10">
                {SUBJECT_NAME} built JFJ Holdings from nothing — no inheritance, no safety net, no connections. He knows what it means to fight for every opportunity. The {SUBJECT_NAME} Grant is his way of ensuring that the next generation of builders, creators, and leaders has one fewer obstacle in their path.
              </p>
              <Link
                to="/eligibility"
                className="inline-block bg-navy hover:bg-navy-light text-white font-accent uppercase tracking-wider px-8 py-3.5 text-sm font-bold transition-colors duration-300"
              >
                View Full Eligibility
              </Link>
            </FadeInSection>
            <FadeInSection direction="right">
              <img
                src={IMAGES.campusStudents}
                alt={`College students collaborating — the ${SUBJECT_NAME} Grant supports driven undergraduate and graduate students across the United States`}
                className="w-full rounded-lg shadow-2xl"
                loading="lazy"
              />
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="bg-gold relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="max-w-5xl mx-auto px-6 py-28 md:py-40 text-center relative z-10">
          <FadeInSection>
            <DiamondDivider className="!my-0 mb-16 opacity-30 invert" />
            <h2 className="font-display text-5xl md:text-8xl font-bold text-navy mb-10 leading-tight">
              Ready to Claim Your Grant?
            </h2>
            <p className="text-navy/80 text-xl md:text-2xl mb-14 max-w-3xl mx-auto leading-relaxed font-light">
              Applications for the 2026 {SUBJECT_NAME} Grant are now open. The deadline is {GRANT_DEADLINE}.
            </p>
            <Link
              to="/apply"
              className="inline-block bg-navy hover:bg-navy-light text-white font-accent uppercase tracking-[0.2em] px-16 py-6 text-sm md:text-base font-bold shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              Apply Now
            </Link>
          </FadeInSection>
        </div>
      </section>
    </>
  );
}
