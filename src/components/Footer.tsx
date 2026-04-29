import { Link } from 'react-router-dom';
import { SOCIAL_LINKS, SUBJECT_NAME } from '@/lib/siteConfig';
import SocialIcons from './SocialIcons';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Column 1: Logo + Bio */}
          <div>
            <Link to="/" className="inline-block mb-4 no-underline">
              <span className="font-display text-2xl italic font-bold text-white">
                Jake Fruge{' '}
                <span className="text-gold">Jr</span>
              </span>
              <span className="font-accent text-sm uppercase tracking-widest text-gold/80 ml-2">
                Grant
              </span>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed">
              The {SUBJECT_NAME} Grant is a $1,000 annual award created by {SUBJECT_NAME}, entrepreneur and CEO of JFJ Holdings, to invest in driven college students across the United States. {SUBJECT_NAME} believes that removing financial barriers empowers the next generation of doers, builders, and leaders.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-accent uppercase tracking-widest text-gold text-sm mb-4">Quick Links</h3>
            <ul className="space-y-2">
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
                  <Link to={link.to} className="text-white/70 hover:text-gold text-sm underline underline-offset-4 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Connect */}
          <div>
            <h3 className="font-accent uppercase tracking-widest text-gold text-sm mb-4">Connect With {SUBJECT_NAME}</h3>
            <SocialIcons links={SOCIAL_LINKS} />
            <div className="mt-6">
              <p className="text-white/70 text-sm">
                <strong className="text-white">Email:</strong>{' '}
                <a href="mailto:info@jakefrugejrgrant.com" className="hover:text-gold transition-colors underline underline-offset-4">
                  info@jakefrugejrgrant.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-xs">
            &copy; {year} {SUBJECT_NAME} Grant. All rights reserved.
          </p>
          <p className="text-white/50 text-xs">
            A philanthropic initiative by{' '}
            <a href="https://www.jakefrugejr.com" target="_blank" rel="noopener noreferrer" className="text-gold/70 hover:text-gold transition-colors underline underline-offset-2">
              {SUBJECT_NAME}
            </a>
            , CEO of JFJ Holdings.
          </p>
        </div>
      </div>
    </footer>
  );
}
