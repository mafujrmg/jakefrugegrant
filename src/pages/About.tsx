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
      <section className="bg-base pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-secondary/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
            <FadeInSection direction="left">
              <div className="relative group perspective">
                <div className="absolute -inset-4 bg-gradient-primary opacity-20 blur-2xl rounded-[2rem] group-hover:opacity-30 transition-opacity duration-500" />
                <div className="glass-card p-2 rounded-[2rem] transform transition-transform duration-500 hover:rotate-y-[5deg]">
                  <img
                    src={IMAGES.jakeWhiteHoodie}
                    alt={`${SUBJECT_NAME} — entrepreneur, CEO of JFJ Holdings, and founder of the ${SUBJECT_NAME} Grant`}
                    className="relative z-10 w-full mx-auto rounded-[1.5rem] object-cover shadow-2xl mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700 grayscale-[40%]"
                    loading="lazy"
                  />
                </div>
              </div>
            </FadeInSection>
            <FadeInSection direction="right">
              <p className="font-accent uppercase tracking-widest text-secondary text-sm mb-4 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-secondary"></span>
                The Founder
              </p>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-text-main mb-8 leading-tight tracking-tight">
                {SUBJECT_NAME}
              </h1>
              <div className="flex flex-wrap gap-3 mb-10">
                {['Entrepreneur', 'CEO of JFJ Holdings', 'Forbes Council'].map((tag) => (
                  <span key={tag} className="px-5 py-2 glass border border-white/10 text-white font-accent uppercase tracking-wider text-[10px] md:text-xs rounded-full inline-block hover:border-primary/50 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-text-muted text-lg md:text-xl leading-relaxed mb-10 font-light">
                Known as "The People's Champ," {SUBJECT_NAME} is a self-made entrepreneur who transformed a childhood marked by instability into a career defined by record-breaking achievement and relentless service to others.
              </p>
              <SocialIcons links={SOCIAL_LINKS} className="!justify-start opacity-80 hover:opacity-100 transition-opacity" />
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Early Life */}
      <section className="py-24 md:py-36 bg-surface relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <FadeInSection>
            <p className="font-accent uppercase tracking-widest text-secondary text-sm mb-4">The Beginning</p>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-text-main mb-6">
              Early Life & Resilience
            </h2>
            <DiamondDivider />
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <div className="mt-16 space-y-8 text-text-muted text-lg leading-relaxed max-w-3xl mx-auto font-light text-left md:text-center">
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
      <section className="py-24 md:py-36 bg-base relative overflow-hidden">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeInSection>
            <div className="text-center mb-20">
              <p className="font-accent uppercase tracking-widest text-secondary text-sm mb-4">Career & Impact</p>
              <h2 className="font-display text-4xl md:text-6xl font-bold text-text-main mb-6">
                Built From Nothing
              </h2>
              <DiamondDivider />
            </div>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <div className="space-y-8 text-text-muted text-lg leading-relaxed mb-20 font-light">
              <p className="glass-card p-8 rounded-2xl border-l-4 border-l-primary">
                In his first year in financial services, {SUBJECT_NAME} generated $330,000 in revenue — a figure that shattered existing records and signaled the arrival of a force that the industry had never seen. He did not slow down. Over the next decade, {SUBJECT_NAME} accumulated more than $100 million in personal sales and led teams that collectively produced over $1 billion in revenue.
              </p>
              <p className="px-8">
                But {SUBJECT_NAME} was never just about personal production. He recruited and trained over 40,000 agents, building a culture of excellence, accountability, and service that extended far beyond his own results. His ability to develop people — to see potential where others saw risk — became his defining leadership trait.
              </p>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.3}>
            <div className="overflow-x-auto pb-8">
              <table className="w-full border-collapse glass-card rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10">
                    <th className="px-8 py-6 text-left font-accent uppercase tracking-widest text-xs text-primary-light">Achievement</th>
                    <th className="px-8 py-6 text-left font-accent uppercase tracking-widest text-xs text-primary-light">Detail</th>
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
                    <tr key={i} className={`transition-colors hover:bg-white/5 ${i !== 7 ? 'border-b border-white/5' : ''}`}>
                      <td className="px-8 py-6 font-semibold text-text-muted text-[10px] md:text-xs uppercase tracking-wider bg-white/[0.02] w-1/2">{achievement}</td>
                      <td className="px-8 py-6 text-text-main text-sm md:text-lg font-medium w-1/2">{detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Why the Grant */}
      <section className="py-24 md:py-36 bg-surface relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
            <FadeInSection direction="left">
              <p className="font-accent uppercase tracking-widest text-secondary text-sm mb-4 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-secondary"></span>
                The Mission
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-text-main mb-8 leading-tight">
                Why I Created This Grant
              </h2>
              <div className="space-y-6 text-text-muted text-lg leading-relaxed font-light">
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
              <div className="relative group perspective">
                <div className="absolute -inset-4 bg-gradient-to-tr from-secondary/20 to-primary/20 blur-2xl rounded-[2rem] group-hover:opacity-60 transition-opacity duration-500 opacity-30" />
                <div className="glass-card p-2 rounded-[2rem] transform transition-transform duration-500 hover:rotate-y-[-5deg]">
                  <img
                    src={IMAGES.jakeTeamPhoto}
                    alt={`${SUBJECT_NAME} with his team — demonstrating the leadership and mentorship that inspired the ${SUBJECT_NAME} Grant`}
                    className="relative z-10 w-full rounded-[1.5rem] object-cover mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700 grayscale-[40%]"
                    loading="lazy"
                  />
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-90 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        
        <div className="max-w-4xl mx-auto px-6 py-24 md:py-32 text-center relative z-20 glass m-8 rounded-[3rem] border border-white/20">
          <FadeInSection>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
              Apply for the {SUBJECT_NAME} Grant
            </h2>
            <p className="text-white/80 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light">
              If you have the drive, {SUBJECT_NAME} wants to invest in your future.
            </p>
            <Link
              to="/apply"
              className="inline-block bg-white text-base font-accent uppercase tracking-widest px-12 py-5 font-bold rounded-lg shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(255,255,255,0.2)] text-primary"
            >
              Start Your Application
            </Link>
          </FadeInSection>
        </div>
      </section>
    </>
  );
}
