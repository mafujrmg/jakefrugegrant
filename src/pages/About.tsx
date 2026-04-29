import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import FadeInSection from '@/components/FadeInSection';
import DiamondDivider from '@/components/DiamondDivider';
import SocialIcons from '@/components/SocialIcons';
import { IMAGES, SUBJECT_NAME, SOCIAL_LINKS } from '@/lib/siteConfig';

export default function About() {
  return (
    <>
      <SEO
        title={`About ${SUBJECT_NAME} | Founder of the ${SUBJECT_NAME} Grant | CEO of JFJ Holdings`}
        description={`Learn the story of ${SUBJECT_NAME}, entrepreneur, CEO of JFJ Holdings, Forbes Business Council member, and founder of the ${SUBJECT_NAME} Grant. From 30 cities and 19 schools to building a nine-figure enterprise.`}
        canonical="/about"
        ogImage={IMAGES.jakeForbesSuit}
      />

      {/* Hero */}
      <section className="bg-navy py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <FadeInSection direction="left">
              <div className="relative inline-block">
                <div className="absolute -inset-4 border-2 border-gold/20 rounded-lg" />
                <img
                  src={IMAGES.jakeWhiteHoodie}
                  alt={`${SUBJECT_NAME} — entrepreneur, CEO of JFJ Holdings, and founder of the ${SUBJECT_NAME} Grant`}
                  className="relative z-10 w-full max-w-sm mx-auto rounded-lg shadow-2xl"
                  loading="lazy"
                />
              </div>
            </FadeInSection>
            <FadeInSection direction="right">
              <p className="font-accent uppercase tracking-[0.3em] text-gold text-sm mb-4">The Founder</p>
              <h1 className="font-display text-4xl md:text-7xl font-bold text-white mb-6">
                {SUBJECT_NAME}
              </h1>
              <div className="flex flex-wrap gap-3 mb-10">
                {['Entrepreneur', 'CEO of JFJ Holdings', 'Forbes Council'].map((tag) => (
                  <span key={tag} className="px-5 py-2.5 bg-white/10 border border-white/20 text-white font-accent uppercase tracking-[0.15em] text-[10px] md:text-xs rounded-full inline-block backdrop-blur-sm">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-10 font-light">
                Known as "The People's Champ," {SUBJECT_NAME} is a self-made entrepreneur who transformed a childhood marked by instability into a career defined by record-breaking achievement and relentless service to others.
              </p>
              <SocialIcons links={SOCIAL_LINKS} className="!justify-start" />
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Early Life */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInSection>
            <p className="font-accent uppercase tracking-[0.2em] text-gold text-sm mb-3">The Beginning</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-navy mb-4">
              Early Life & Resilience
            </h2>
            <DiamondDivider />
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <div className="mt-12 space-y-6 text-navy/80 text-lg leading-relaxed max-w-3xl mx-auto">
              <p>
                {SUBJECT_NAME} did not grow up with the advantages that many associate with business success. He lived in more than 30 cities before adulthood, attended 19 different schools, and spent much of his childhood navigating the consequences of having parents who were in and out of incarceration. By the age of 17, {SUBJECT_NAME} was on his own, doing whatever it took to survive.
              </p>
              <p>
                There was no trust fund, no family business to inherit, and no network of connections to lean on. What {SUBJECT_NAME} did have was an unshakable belief that his circumstances did not have to be his destiny. That belief — forged in adversity and sharpened by necessity — became the foundation of everything he would go on to build.
              </p>
              <p>
                At 21, {SUBJECT_NAME} made a pivotal decision. He gave his life to Christ and entered the financial services industry with zero experience, zero contacts, and zero guarantees. What happened next would rewrite the trajectory of his life and the lives of tens of thousands of people who followed his lead.
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Career & Achievements */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <p className="font-accent uppercase tracking-[0.2em] text-gold text-sm mb-3">Career & Impact</p>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-navy mb-4">
                Built From Nothing
              </h2>
              <DiamondDivider />
            </div>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <div className="space-y-6 text-navy/80 text-lg leading-relaxed mb-16">
              <p>
                In his first year in financial services, {SUBJECT_NAME} generated $330,000 in revenue — a figure that shattered existing records and signaled the arrival of a force that the industry had never seen. He did not slow down. Over the next decade, {SUBJECT_NAME} accumulated more than $100 million in personal sales and led teams that collectively produced over $1 billion in revenue.
              </p>
              <p>
                But {SUBJECT_NAME} was never just about personal production. He recruited and trained over 40,000 agents, building a culture of excellence, accountability, and service that extended far beyond his own results. His ability to develop people — to see potential where others saw risk — became his defining leadership trait.
              </p>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.3}>
            <div className="overflow-x-auto shadow-2xl rounded-xl">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-navy text-white">
                    <th className="px-8 py-5 text-left font-accent uppercase tracking-wider text-sm">Achievement</th>
                    <th className="px-8 py-5 text-left font-accent uppercase tracking-wider text-sm">Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Personal Sales', '$100M+'],
                    ['Team Sales', '$1B+'],
                    ['Agents Recruited', '40,000+'],
                    ['First-Year Revenue', '$330,000 (Record)'],
                    ['Millionaire By', 'Age 26'],
                    ['Current Role', 'CEO, JFJ Holdings'],
                    ['Company Size', '30+ Businesses'],
                    ['Recognition', 'Forbes Council'],
                  ].map(([achievement, detail], i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-cream/30' : 'bg-white'}>
                      <td className="px-8 py-6 font-bold text-navy text-[10px] md:text-xs uppercase tracking-widest border-b border-navy/5 bg-navy/5">{achievement}</td>
                      <td className="px-8 py-6 text-navy/80 text-sm md:text-lg border-b border-navy/5 font-medium">{detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Why the Grant */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeInSection direction="left">
              <p className="font-accent uppercase tracking-[0.2em] text-gold text-sm mb-3">The Mission</p>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-navy mb-8">
                Why I Created This Grant
              </h2>
              <div className="space-y-6 text-navy/80 text-lg leading-relaxed">
                <p>
                  {SUBJECT_NAME} knows what it feels like to have ambition without resources. He knows the weight of choosing between paying rent and paying tuition. He knows that talent is evenly distributed, but opportunity is not. The {SUBJECT_NAME} Grant exists to close that gap — even if only for one student at a time.
                </p>
                <p>
                  Unlike traditional grants that focus on academic metrics, the {SUBJECT_NAME} Grant is built on a different philosophy: that drive, resilience, and a willingness to work are the true predictors of success.
                </p>
                <p>
                  This grant is not charity. It is an investment — in a person, in a future, and in the belief that one act of support can set off a chain reaction of achievement that extends far beyond the individual.
                </p>
              </div>
            </FadeInSection>
            <FadeInSection direction="right">
              <div className="relative">
                <div className="absolute -inset-4 border border-gold/30 rounded-lg translate-x-3 translate-y-3 hidden md:block" />
                <img
                  src={IMAGES.jakeTeamPhoto}
                  alt={`${SUBJECT_NAME} with his team — demonstrating the leadership and mentorship that inspired the ${SUBJECT_NAME} Grant`}
                  className="relative z-10 w-full rounded-lg shadow-2xl"
                  loading="lazy"
                />
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gold">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <FadeInSection>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mb-4">
              Apply for the {SUBJECT_NAME} Grant
            </h2>
            <p className="text-navy/80 text-lg mb-8">
              If you have the drive, {SUBJECT_NAME} wants to invest in your future.
            </p>
            <Link
              to="/apply"
              className="inline-block bg-navy hover:bg-navy-light text-white font-accent uppercase tracking-wider px-10 py-3.5 text-sm font-semibold transition-colors duration-300"
            >
              Start Your Application
            </Link>
          </FadeInSection>
        </div>
      </section>
    </>
  );
}
