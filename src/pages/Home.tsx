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
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${IMAGES.heroGrant})` }}
        />
        <div className="absolute inset-0 bg-navy/70" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <FadeInSection direction="none">
            <p className="font-accent uppercase tracking-[0.3em] text-gold text-sm md:text-base mb-4">
              Fueling the Next Generation of Doers
            </p>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              The {SUBJECT_NAME} Grant
            </h1>
          </FadeInSection>
          <FadeInSection delay={0.4}>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-8 font-light leading-relaxed">
              A {GRANT_AMOUNT} annual grant designed to remove financial barriers for ambitious college students across the United States. No GPA requirement. No essay. Just drive.
            </p>
          </FadeInSection>
          <FadeInSection delay={0.6}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/apply"
                className="bg-gold hover:bg-gold-light text-navy font-accent uppercase tracking-wider px-8 py-3 text-sm font-semibold transition-colors duration-300"
              >
                Apply for the Grant
              </Link>
              <Link
                to="/eligibility"
                className="border border-white/40 hover:border-gold text-white hover:text-gold font-accent uppercase tracking-wider px-8 py-3 text-sm transition-colors duration-300"
              >
                View Eligibility
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* GRANT OVERVIEW */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <p className="font-accent uppercase tracking-[0.2em] text-gold text-sm mb-3">About the Grant</p>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-navy mb-4">
                The {SUBJECT_NAME} Grant at a Glance
              </h2>
              <DiamondDivider />
            </div>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <p className="text-center text-navy/90 max-w-3xl mx-auto mb-16 text-lg leading-relaxed">
              The {SUBJECT_NAME} Grant was established to bridge the gap between ambition and resources. {SUBJECT_NAME} understands firsthand that financial obstacles should never determine a student's ceiling. This grant is open to any undergraduate or graduate student enrolled at an accredited US institution — because potential does not come with prerequisites.
            </p>
          </FadeInSection>

          <FadeInSection delay={0.3}>
            <div className="overflow-x-auto pb-4">
              <table className="w-full max-w-3xl mx-auto border-collapse shadow-sm rounded-lg overflow-hidden">
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
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-cream-dark'}>
                      <td className="px-8 py-4 font-accent uppercase tracking-wider text-xs md:text-sm text-navy font-bold border-b border-navy/5">{label}</td>
                      <td className="px-8 py-4 text-navy/80 text-sm md:text-base border-b border-navy/5">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* FOUNDER INTRO */}
      <section className="py-20 md:py-28 bg-navy">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeInSection direction="left">
              <div className="relative">
                <div className="absolute -inset-4 border border-gold/30 rounded-lg translate-x-2 translate-y-2 hidden md:block" />
                <img
                  src={IMAGES.jakeForbesSuit}
                  alt={`${SUBJECT_NAME} in a professional suit — entrepreneur, CEO of JFJ Holdings, and founder of the ${SUBJECT_NAME} Grant`}
                  className="relative z-10 w-full rounded-lg shadow-2xl"
                  loading="lazy"
                />
              </div>
            </FadeInSection>
            <FadeInSection direction="right">
              <p className="font-accent uppercase tracking-[0.2em] text-gold text-sm mb-3">Meet the Founder</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-8">
                {SUBJECT_NAME}: From Adversity to Enterprise
              </h2>
              <p className="text-white/80 text-lg leading-relaxed mb-6">
                {SUBJECT_NAME} grew up in over 30 cities, attended 19 different schools, and watched his parents cycle in and out of incarceration. By 17, he was hustling to survive. At 21, he made a decision that changed everything — he entered financial services and never looked back.
              </p>
              <p className="text-white/80 text-lg leading-relaxed mb-6">
                In his first year, {SUBJECT_NAME} generated $330,000 in revenue, shattering industry records. He went on to achieve over $100 million in personal sales, lead teams responsible for more than $1 billion in collective revenue, and recruit and train over 40,000 agents. Today, as CEO of JFJ Holdings — a nine-figure holdings company with 30+ businesses — {SUBJECT_NAME} channels his success into empowering others.
              </p>
              <p className="text-white/80 text-lg leading-relaxed mb-10">
                The {SUBJECT_NAME} Grant is a direct expression of that mission: investing in students who refuse to let their circumstances define their future.
              </p>
              <Link
                to="/about"
                className="inline-block border-2 border-gold text-gold hover:bg-gold hover:text-navy font-accent uppercase tracking-wider px-8 py-3.5 text-sm font-bold transition-colors duration-300"
              >
                Read Full Story
              </Link>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* HOW TO APPLY */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <p className="font-accent uppercase tracking-[0.2em] text-gold text-sm mb-3">Application Process</p>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-navy mb-4">
                How to Apply for the {SUBJECT_NAME} Grant
              </h2>
              <DiamondDivider />
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {[
              {
                step: '01',
                title: 'Check Your Eligibility',
                desc: `Confirm you are currently enrolled at a US-based accredited college or university as an undergraduate or graduate student. The ${SUBJECT_NAME} Grant has no GPA or essay requirements.`,
              },
              {
                step: '02',
                title: 'Complete the Application',
                desc: `Fill out the online application form with your personal details, academic information, and a brief statement about why you deserve the ${SUBJECT_NAME} Grant (500 characters max).`,
              },
              {
                step: '03',
                title: 'Submit Before the Deadline',
                desc: `Applications must be received by ${GRANT_DEADLINE}. The ${SUBJECT_NAME} Grant recipient will be announced on ${GRANT_WINNER_DATE}.`,
              },
            ].map((item, i) => (
              <FadeInSection key={i} delay={i * 0.15}>
                <div className="bg-white p-10 rounded-lg shadow-md text-center hover:shadow-xl transition-all duration-300 border-b-4 border-transparent hover:border-gold h-full">
                  <span className="font-accent text-5xl font-bold text-gold/20 block mb-6">{item.step}</span>
                  <h3 className="font-display text-2xl font-bold text-navy mb-4">{item.title}</h3>
                  <p className="text-navy/70 leading-relaxed">{item.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION QUOTE */}
      <section className="py-16 md:py-20 bg-navy-light">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <FadeInSection>
            <div className="w-12 h-12 mx-auto mb-6 flex items-center justify-center">
              <svg className="text-gold" width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            <blockquote className="font-display text-2xl md:text-3xl italic text-white leading-relaxed mb-6">
              "I did not have anyone handing me opportunities. I had to create them. This grant exists so that one less student has to choose between their education and their survival. If you have the drive, the {SUBJECT_NAME} Grant is here to fuel it."
            </blockquote>
            <p className="font-accent uppercase tracking-widest text-gold text-sm">
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
      <section className="py-20 md:py-28 bg-gold">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <FadeInSection>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-navy mb-6">
              Ready to Claim Your {SUBJECT_NAME} Grant?
            </h2>
            <p className="text-navy/90 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Applications for the 2026 {SUBJECT_NAME} Grant are now open. The deadline is {GRANT_DEADLINE}. Do not let this opportunity pass.
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
