import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/eligibility', label: 'Eligibility' },
  { to: '/apply', label: 'Apply' },
  { to: '/faq', label: 'FAQ' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav className="bg-navy sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Text-only logo */}
          <Link to="/" className="flex items-center gap-1 shrink-0" onClick={() => setOpen(false)}>
            <span className="font-display text-xl md:text-2xl italic font-bold text-white">
              Jake Fruge{' '}
              <span className="text-gold">Jr</span>
            </span>
            <span className="font-accent text-xs md:text-sm uppercase tracking-widest text-gold/80 ml-2">
              Grant
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 text-xs lg:text-sm font-accent uppercase tracking-[0.2em] transition-all duration-300 relative group ${
                  pathname === link.to
                    ? 'text-gold'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-4 right-4 h-0.5 bg-gold transition-transform duration-300 ${pathname === link.to ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="md:hidden bg-navy border-t border-white/5 animate-in fade-in slide-in-from-top-5 duration-300">
          <div className="px-4 py-6 space-y-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`block px-4 py-3 font-accent uppercase tracking-[0.2em] text-xs transition-all ${
                  pathname === link.to
                    ? 'text-gold bg-white/5 border-l-2 border-gold'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
