import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { SITE_CONFIG, getWhatsAppGeneralUrl } from '../config/site';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'BERANDA', path: '/' },
    { name: 'PRODUK', path: '/produk' },
    { name: 'ABOUT US', path: '/tentang-kami' },
    { name: 'KONTAK KAMI', path: '/kontak' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="/images/logorrbouquet.jpeg" 
              alt={SITE_CONFIG.name} 
              className="h-11 w-11 rounded-full object-cover shadow-sm border border-stone-200 transition-transform group-hover:scale-105"
            />
            <span className="font-serif text-2xl font-bold tracking-tight text-stone-900 group-hover:text-rose-900 transition-colors">
              RR BOUQUET
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs font-semibold tracking-widest transition-colors duration-150 py-1 border-b-2 ${
                  isActive(link.path)
                    ? 'border-stone-900 text-stone-900'
                    : 'border-transparent text-stone-600 hover:text-stone-950 hover:border-stone-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Right CTA: "Buy Now" button like wireframe */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={getWhatsAppGeneralUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-2.5 text-xs font-semibold tracking-wider text-stone-900 border border-stone-900 rounded-full hover:bg-stone-900 hover:text-white transition-all duration-200 shadow-sm hover:shadow"
            >
              Buy Now
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              aria-label="Buka Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 px-4 pt-3 pb-6 space-y-3 shadow-lg animate-fadeIn">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium tracking-wide ${
                  isActive(link.path)
                    ? 'bg-stone-900 text-white'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 opacity-60" />
              </Link>
            ))}
          </div>

          <div className="pt-2">
            <a
              href={getWhatsAppGeneralUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-stone-900 text-white rounded-full text-xs font-semibold tracking-wider hover:bg-stone-800 transition"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
              Pesan Sekarang (WhatsApp)
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
