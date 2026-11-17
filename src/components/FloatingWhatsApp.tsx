import React, { useState } from 'react';
import { X } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { getWhatsAppGeneralUrl } from '../config/site';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3 select-none">
      {/* Tooltip prompt */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-stone-800 text-xs py-2 px-3.5 rounded-2xl shadow-xl border border-stone-200 animate-bounce duration-1000">
          <span>Pesan buket atau tanya stok? Chat kami!</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-stone-400 hover:text-stone-600 p-0.5"
            aria-label="Tutup tip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={getWhatsAppGeneralUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hubungi Admin RR Bouquet di WhatsApp"
        className="relative group flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 active:scale-95"
      >
        {/* Soft pulse animation waves */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping opacity-75"></span>
        <span className="absolute -inset-0.5 rounded-full bg-[#25D366]/50"></span>

        {/* Official WhatsApp Brand Icon */}
        <WhatsAppIcon className="w-8 h-8 relative z-10 text-white fill-white" />
      </a>
    </div>
  );
};
