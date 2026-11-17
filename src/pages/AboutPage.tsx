import React from 'react';
import { Sparkles, Heart, Award } from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { SITE_CONFIG, getWhatsAppGeneralUrl } from '../config/site';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#faf9f6] py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-widest uppercase text-stone-500">
            Tentang RR Bouquet
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-stone-900 mt-2">
            Rangkaian Penuh Makna untuk Setiap Momen Berharga
          </h1>
          <p className="mt-4 text-base text-stone-600 font-serif italic">
            "{SITE_CONFIG.tagline}"
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-sm mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4 text-sm sm:text-base text-stone-700 leading-relaxed">
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                Cerita Kami
              </h2>
              <p>
                <strong>RR Bouquet</strong> berawal dari kecintaan kami terhadap keindahan bunga dan seni merangkai hadiah. Bagi kami, buket bukan sekadar hadiah seremonial biasa, melainkan media untuk mengungkapkan rasa bangga, apresiasi, kasih sayang, dan doa yang tulus.
              </p>
              <p>
                Setiap buket dirangkai secara teliti dengan tangan (*handcrafted*), menggabungkan estetika warna yang harmonis, teknik pembungkusan (*wrapping*) gaya modern ala Korea, serta pemilihan material terbaik.
              </p>
            </div>
            
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80"
                alt="Florist crafting bouquet"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* 3 Core Value Propositions (PRD Section 4.3) */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="font-serif text-2xl sm:text-3xl text-stone-900">
              Mengapa Memilih RR Bouquet?
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              3 Komitmen utama kami dalam setiap buket yang Anda pesan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-rose-50 flex items-center justify-center text-rose-800 mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">
                1. Bunga Berkualitas
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Pemilihan bunga segar pilihan dan material artificial/latex premium yang tampak hidup, mekar sempurna, dan harum.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-amber-50 flex items-center justify-center text-amber-700 mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">
                2. Wrapping Eksklusif
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Menggunakan kertas cellophane waterproof impor dengan teknik lipatan berlapis yang rapi, bervolume, dan tahan guncangan saat pengiriman.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700 mb-4">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">
                3. Free Greeting Card
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Setiap buket dilengkapi kartu ucapan eksklusif gratis. Anda dapat menuliskan pesan personal yang menyentuh hati penerima.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-[#faf8f5] p-8 sm:p-12 rounded-3xl border border-stone-200">
          <h3 className="font-serif text-2xl font-normal text-stone-900">
            Ingin merangkai buket impian Anda bersama kami?
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-md mx-auto">
            Diskusikan kebutuhan bunga atau hadiah Anda langsung dengan admin RR Bouquet.
          </p>
          <div className="mt-6">
            <a
              href={getWhatsAppGeneralUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold tracking-widest uppercase rounded-full shadow transition"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
              <span>Hubungi Admin Kami</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
