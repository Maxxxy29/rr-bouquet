import React, { useState } from 'react';
import { Clock, MapPin, ChevronDown, HelpCircle, Send } from 'lucide-react';
import { InstagramIcon } from '../components/InstagramIcon';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { SITE_CONFIG, getWhatsAppGeneralUrl } from '../config/site';
import { FAQ_ITEMS } from '../data/mockData';

export const ContactPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-widest uppercase text-stone-500">
            Layanan Pelanggan
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-stone-900 mt-2">
            Kontak & Informasi Pemesanan
          </h1>
          <p className="mt-3 text-sm text-stone-600">
            Kami siap melayani kebutuhan buket bunga dan konsultasi hadiah Anda setiap hari.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Card WhatsApp */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#25D366] flex items-center justify-center mb-4">
                <WhatsAppIcon className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                WhatsApp Admin
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Layanan pesan cepat, cek ketersediaan slot, dan konsultasi desain.
              </p>
              <p className="text-sm font-semibold text-stone-800 mt-3">
                {SITE_CONFIG.phoneDisplay}
              </p>
            </div>
            <a
              href={getWhatsAppGeneralUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-full transition shadow-sm"
            >
              <span>Chat WhatsApp Sekarang</span>
              <Send className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card Instagram */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center mb-4">
                <InstagramIcon className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Instagram Resmi
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Ikuti galeri karya terbaru kami, tips hadiah, dan inspirasi buket.
              </p>
              <p className="text-sm font-semibold text-stone-800 mt-3">
                {SITE_CONFIG.instagramHandle}
              </p>
            </div>
            <a
              href={SITE_CONFIG.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-full transition shadow-sm"
            >
              <span>Kunjungi Instagram</span>
            </a>
          </div>

          {/* Card Jam Operasional */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Jam Operasional
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Waktu operasional admin dan perangkaian buket.
              </p>
              <div className="mt-3 space-y-1 text-xs text-stone-700">
                <p className="font-medium">{SITE_CONFIG.operatingHours}</p>
                <p className="text-stone-500">{SITE_CONFIG.orderLeadTime}</p>
              </div>
            </div>
            <div className="mt-6 pt-3 border-t border-stone-100 flex items-center gap-2 text-xs text-stone-500">
              <MapPin className="w-4 h-4 text-rose-500 flex-shrink-0" />
              <span>Pengiriman kurir instan / sameday</span>
            </div>
          </div>

        </div>

        {/* FAQ Section (PRD Section 4.4) */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-full bg-rose-50 text-rose-800">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                Pertanyaan yang Sering Diajukan (FAQ)
              </h2>
              <p className="text-xs sm:text-sm text-stone-500">
                Panduan praktis sebelum melakukan pemesanan
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="border border-stone-200 rounded-xl overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-4 text-left font-medium text-sm sm:text-base text-stone-900 hover:bg-stone-50 transition"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-stone-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-stone-900' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-0 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 bg-stone-50/50">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
};
