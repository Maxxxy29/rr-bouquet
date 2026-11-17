import React from 'react';
import { Link } from 'react-router-dom';
import { InstagramIcon } from './InstagramIcon';
import { WhatsAppIcon } from './WhatsAppIcon';
import { SITE_CONFIG, getWhatsAppGeneralUrl } from '../config/site';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#18181b] text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand Centerpiece */}
        <div className="flex flex-col items-center text-center pb-12 border-b border-stone-800/80">
          <Link to="/" className="flex flex-col items-center group mb-4">
            <img
              src="/images/logorrbouquet.jpeg"
              alt={SITE_CONFIG.name}
              className="h-16 w-16 rounded-full object-cover shadow-lg border-2 border-stone-700 mb-3 group-hover:scale-105 transition-transform"
            />
            <span className="font-serif text-3xl sm:text-4xl font-bold tracking-widest text-white group-hover:text-stone-300 transition-colors">
              RR BOUQUET
            </span>
          </Link>
          <p className="max-w-md text-stone-400 text-sm italic font-serif">
            "{SITE_CONFIG.tagline}"
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-6 mt-6">
            <a
              href={SITE_CONFIG.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-stone-800/60 hover:bg-stone-700/80 text-stone-200 text-xs tracking-wider transition"
            >
              <InstagramIcon className="w-4 h-4 text-pink-400" />
              <span>{SITE_CONFIG.instagramHandle}</span>
            </a>
            <a
              href={getWhatsAppGeneralUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-stone-800/60 hover:bg-stone-700/80 text-stone-200 text-xs tracking-wider transition"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
              <span>{SITE_CONFIG.phoneDisplay}</span>
            </a>
          </div>
        </div>

        {/* Quick Nav Links */}
        <div className="py-8 flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs tracking-widest font-medium text-stone-400 uppercase">
          <Link to="/" className="hover:text-white transition">Beranda</Link>
          <Link to="/produk" className="hover:text-white transition">Katalog Produk</Link>
          <Link to="/tentang-kami" className="hover:text-white transition">Tentang Kami</Link>
          <Link to="/kontak" className="hover:text-white transition">Kontak Kami</Link>
          <Link to="/admin" className="hover:text-stone-500 transition text-stone-600">Admin</Link>
        </div>

        {/* Bottom Bar matching wireframe: Privacy Policy | © 2026 Copyright | Terms and Conditions */}
        <div className="pt-6 border-t border-stone-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <div>
            <span className="hover:text-stone-300 cursor-pointer">Privacy policy</span>
          </div>
          <div className="flex items-center gap-1">
            <span>© 2026 Copyright</span>
            <span className="text-stone-400">•</span>
            <span>RR Bouquet. All rights reserved.</span>
          </div>
          <div>
            <span className="hover:text-stone-300 cursor-pointer">Terms and Conditions</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
