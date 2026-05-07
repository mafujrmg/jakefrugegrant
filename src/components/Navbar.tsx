import { useState, useEffect } from 'react';
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'glass py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Text-only logo */}
          <Link to="/" className="flex items-center gap-1 shrink-0 no-underline group" onClick={() => setOpen(false)}>
            <span className="font-display text-xl md:text-2xl font-bold text-text-main tracking-tight group-hover:text-primary-light transition-colors">
              Jake Fruge <span className="text-primary">Jr</span>
            </span>
            <span className="font-accent text-xs md:text-sm uppercase tracking-widest text-secondary ml-2 opacity-80">
              Grant
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 text-xs lg:text-sm font-accent uppercase tracking-wider transition-all duration-300 relative group rounded-md ${
                  pathname === link.to
                    ? 'text-primary-light bg-white/5'
                    : 'text-text-muted hover:text-text-main hover:bg-white/5'
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-primary to-secondary transition-transform duration-300 rounded-full ${pathname === link.to ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-text-main p-2 hover:bg-white/10 rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="md:hidden glass absolute top-full left-0 w-full border-t border-white/10 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`block px-4 py-3 font-accent uppercase tracking-wider text-sm transition-all rounded-md ${
                  pathname === link.to
                    ? 'text-primary-light bg-white/10 border-l-2 border-primary'
                    : 'text-text-muted hover:text-text-main hover:bg-white/5 border-l-2 border-transparent hover:border-white/20'
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
