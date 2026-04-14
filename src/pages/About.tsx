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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <FadeInSection direction="left">
              <img
                src={IMAGES.jakeWhiteHoodie}
                alt={`${SUBJECT_NAME} — entrepreneur, CEO of JFJ Holdings, and founder of the ${SUBJECT_NAME} Grant`}
                className="w-full max-w-sm mx-auto"
                loading="lazy"
              />
            </FadeInSection>
            <FadeInSection direction="right">
              <p className="font-accent uppercase tracking-[0.2em] text-gold text-sm mb-3">About the Founder</p>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                {SUBJECT_NAME}
              </h1>
              <p className="text-white/60 font-accent uppercase tracking-wider text-sm mb-4">
                Entrepreneur &bull; CEO of JFJ Holdings &bull; Forbes Business Council Member
              </p>
              <p className="text-white/80 leading-relaxed mb-4">
                Known as "The People's Champ," {SUBJECT_NAME} is a self-made entrepreneur who transformed a childhood marked by instability into a career defined by record-breaking achievement and relentless service to others.
              </p>
              <SocialIcons links={SOCIAL_LINKS} />
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Early Life */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <p className="font-accent uppercase tracking-[0.2em] text-gold text-sm mb-3">The Beginning</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mb-4">
              The Early Life of {SUBJECT_NAME}
            </h2>
            <DiamondDivider className="mb-8" />
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <p className="text-navy/80 leading-relaxed mb-4">
              {SUBJECT_NAME} did not grow up with the advantages that many associate with business success. He lived in more than 30 cities before adulthood, attended 19 different schools, and spent much of his childhood navigating the consequences of having parents who were in and out of incarceration. By the age of 17, {SUBJECT_NAME} was on his own, doing whatever it took to survive.
            </p>
            <p className="text-navy/80 leading-relaxed mb-4">
              There was no trust fund, no family business to inherit, and no network of connections to lean on. What {SUBJECT_NAME} did have was an unshakable belief that his circumstances did not have to be his destiny. That belief — forged in adversity and sharpened by necessity — became the foundation of everything he would go on to build.
            </p>
            <p className="text-navy/80 leading-relaxed">
              At 21, {SUBJECT_NAME} made a pivotal decision. He gave his life to Christ and entered the financial services industry with zero experience, zero contacts, and zero guarantees. What happened next would rewrite the trajectory of his life and the lives of tens of thousands of people who followed his lead.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Career & Achievements */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <p className="font-accent uppercase tracking-[0.2em] text-gold text-sm mb-3">Career & Impact</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mb-4">
              {SUBJECT_NAME} Built an Empire From Nothing
            </h2>
            <DiamondDivider className="mb-8" />
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <p className="text-navy/80 leading-relaxed mb-4">
              In his first year in financial services, {SUBJECT_NAME} generated $330,000 in revenue — a figure that shattered existing records and signaled the arrival of a force that the industry had never seen. He did not slow down. Over the next decade, {SUBJECT_NAME} accumulated more than $100 million in personal sales and led teams that collectively produced over $1 billion in revenue.
            </p>
            <p className="text-navy/80 leading-relaxed mb-4">
              But {SUBJECT_NAME} was never just about personal production. He recruited and trained over 40,000 agents, building a culture of excellence, accountability, and service that extended far beyond his own results. His ability to develop people — to see potential where others saw risk — became his defining leadership trait.
            </p>
            <p className="text-navy/80 leading-relaxed mb-6">
              {SUBJECT_NAME} became a millionaire by age 26 and eventually executed a multi-seven-figure exit before founding JFJ Holdings, the nine-figure holdings company he leads today as CEO. With more than 30 companies under its umbrella, JFJ Holdings reflects the breadth of {SUBJECT_NAME}'s vision and his commitment to building enterprises that create lasting value.
            </p>
          </FadeInSection>

          <FadeInSection delay={0.3}>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-navy text-white">
                    <th className="px-6 py-3 text-left font-accent uppercase tracking-wider text-sm">Achievement</th>
                    <th className="px-6 py-3 text-left font-accent uppercase tracking-wider text-sm">Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Personal Sales', '$100M+'],
                    ['Team Sales', '$1B+'],
                    ['Agents Recruited & Trained', '40,000+'],
                    ['First-Year Revenue', '$330,000 (industry record)'],
                    ['Millionaire By', 'Age 26'],
                    ['Exit', 'Multi-7-figure'],
                    ['Current Role', 'CEO, JFJ Holdings (30+ companies)'],
                    ['Revenue (JFJ Holdings)', 'Nine figures annually'],
                    ['Education', 'University of Louisiana at Lafayette'],
                    ['Recognition', 'Forbes Business Council Member'],
                  ].map(([achievement, detail], i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-cream' : 'bg-white'}>
                      <td className="px-6 py-3 font-semibold text-navy text-sm">{achievement}</td>
                      <td className="px-6 py-3 text-navy/80 text-sm">{detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Why the Grant */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <FadeInSection direction="left">
              <p className="font-accent uppercase tracking-[0.2em] text-gold text-sm mb-3">The Mission</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mb-6">
                Why {SUBJECT_NAME} Created This Grant
              </h2>
              <p className="text-navy/80 leading-relaxed mb-4">
                {SUBJECT_NAME} knows what it feels like to have ambition without resources. He knows the weight of choosing between paying rent and paying tuition. He knows that talent is evenly distributed, but opportunity is not. The {SUBJECT_NAME} Grant exists to close that gap — even if only for one student at a time.
              </p>
              <p className="text-navy/80 leading-relaxed mb-4">
                Unlike traditional grants that focus on academic metrics, the {SUBJECT_NAME} Grant is built on a different philosophy: that drive, resilience, and a willingness to work are the true predictors of success. {SUBJECT_NAME} did not have a 4.0 GPA when he started. He had hunger, discipline, and an unwillingness to quit. He is looking for students who share that same fire.
              </p>
              <p className="text-navy/80 leading-relaxed">
                This grant is not charity. It is an investment — in a person, in a future, and in the belief that one act of support can set off a chain reaction of achievement that extends far beyond the individual.
              </p>
            </FadeInSection>
            <FadeInSection direction="right">
              <img
                src={IMAGES.jakeTeamPhoto}
                alt={`${SUBJECT_NAME} with his team — demonstrating the leadership and mentorship that inspired the ${SUBJECT_NAME} Grant`}
                className="w-full rounded-lg shadow-xl"
                loading="lazy"
              />
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
