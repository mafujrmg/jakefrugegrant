import { Link } from 'react-router-dom';
import { SOCIAL_LINKS, SUBJECT_NAME } from '@/lib/siteConfig';
import SocialIcons from './SocialIcons';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--color-primary-light)_0%,_transparent_70%)] opacity-5 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-8 sm:px-12 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Column 1: Logo + Bio */}
          <div>
            <Link to="/" className="inline-block mb-6 no-underline group">
              <span className="font-display text-2xl font-bold text-text-main group-hover:text-primary-light transition-colors">
                Jake Fruge <span className="text-primary">Jr</span>
              </span>
              <span className="font-accent text-sm uppercase tracking-widest text-secondary ml-2 opacity-80">
                Grant
              </span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed max-w-sm">
              The {SUBJECT_NAME} Grant is a $1,000 annual award created by {SUBJECT_NAME}, entrepreneur and CEO of JFJ Holdings, to invest in driven college students across the United States. {SUBJECT_NAME} believes that removing financial barriers empowers the next generation of doers, builders, and leaders.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-accent uppercase tracking-widest text-text-main text-sm mb-6 flex items-center gap-3">
              <span className="w-8 h-[2px] bg-primary"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About the Founder' },
                { to: '/eligibility', label: 'Eligibility & Details' },
                { to: '/apply', label: 'Apply Now' },
                { to: '/faq', label: 'FAQ' },
                { to: '/blog', label: 'Blog' },
                { to: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-text-muted hover:text-primary-light text-sm transition-colors flex items-center gap-2 group">
                    <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0 duration-300">→</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Connect */}
          <div>
            <h3 className="font-accent uppercase tracking-widest text-text-main text-sm mb-6 flex items-center gap-3">
              <span className="w-8 h-[2px] bg-secondary"></span>
              Connect
            </h3>
            <div className="mb-6">
              <SocialIcons links={SOCIAL_LINKS} />
            </div>
            <div>
              <p className="text-text-muted text-sm">
                <strong className="text-text-main font-medium">Email:</strong>{' '}
                <a href="mailto:info@jakefrugejrgrant.com" className="hover:text-secondary transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-secondary">
                  info@jakefrugejrgrant.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-muted/70 text-xs">
            &copy; {year} {SUBJECT_NAME} Grant. All rights reserved.
          </p>
          <p className="text-text-muted/70 text-xs">
            A philanthropic initiative by{' '}
            <a href="https://www.jakefrugejr.com" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary-light transition-colors underline underline-offset-2 decoration-white/20 hover:decoration-primary-light font-medium">
              {SUBJECT_NAME}
            </a>
            , CEO of JFJ Holdings.
          </p>
        </div>
      </div>
    </footer>
  );
}
