import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Heart, ShieldCheck, Clock } from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { ProductCard } from '../components/ProductCard';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { TestimonialSlider } from '../components/TestimonialSlider';
import { INITIAL_PRODUCTS, INITIAL_TESTIMONIALS } from '../data/mockData';
import type { Product } from '../types';
import { getWhatsAppGeneralUrl, getWhatsAppCustomOrderUrl } from '../config/site';

export const HomePage: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filter 4 bestseller products as shown in wireframe
  const bestsellers = INITIAL_PRODUCTS.filter((p) => p.isBestseller).slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-[#fbf9f5] border-b border-stone-200/80">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 flex flex-col items-center text-center">
          
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 text-rose-800 text-xs font-semibold tracking-wider uppercase mb-6 border border-rose-100">
            <Sparkles className="w-3.5 h-3.5" />
            Spesialis Buket Wisuda, Sidang & Hadiah Spesial
          </span>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-stone-900 max-w-4xl leading-[1.15]">
            Setiap Buket Punya Cerita, <br className="hidden sm:inline" />
            <span className="italic font-normal text-stone-700">Setiap Hadiah Punya Makna.</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-stone-600 max-w-2xl font-normal leading-relaxed">
            Hadirkan ungkapan rasa bahagia dan cinta kepada orang terdekat dengan buket premium dirangkai penuh kehangatan oleh RR Bouquet.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              to="/produk"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold tracking-widest uppercase rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
            >
              <span>Lihat Katalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={getWhatsAppGeneralUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white hover:bg-stone-50 text-stone-900 text-xs font-semibold tracking-widest uppercase rounded-full border border-stone-300 shadow-sm hover:shadow transition-all duration-200 active:scale-95"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
              <span>Konsultasi Buket</span>
            </a>
          </div>

          {/* Value Badges */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-stone-600 border-t border-stone-200/80 pt-8 w-full max-w-4xl">
            <div className="flex items-center gap-2.5 justify-center sm:justify-start">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-medium">Bunga Segar & Impor</span>
            </div>
            <div className="flex items-center gap-2.5 justify-center sm:justify-start">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-medium">Wrapping Waterproof</span>
            </div>
            <div className="flex items-center gap-2.5 justify-center sm:justify-start">
              <Heart className="w-4 h-4 text-rose-500" />
              <span className="text-xs font-medium">Free Greeting Card</span>
            </div>
            <div className="flex items-center gap-2.5 justify-center sm:justify-start">
              <Clock className="w-4 h-4 text-sky-600" />
              <span className="text-xs font-medium">Fast Respons WA</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. BRAND STORY SECTION (Identik dengan tata letak Wireframe) */}
      <section className="py-20 lg:py-28 bg-[#edf2f7]/60 border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900">
              Buket Spesial untuk Momen Istimewa
            </h2>
            <p className="mt-3 text-xs sm:text-sm tracking-widest uppercase text-stone-500 font-semibold">
              RR BOUQUETT — Setiap Buket Punya Cerita, Setiap Hadiah Punya Makna.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: 3 Staggered / Overlapping Bouquet Photos like Wireframe */}
            <div className="lg:col-span-7 relative h-[420px] sm:h-[480px] w-full flex items-center justify-center">
              
              {/* Photo 1 (Back Left) */}
              <div className="absolute left-2 sm:left-6 top-4 w-48 sm:w-56 aspect-[3/4] bg-white p-2 rounded-xl shadow-lg transform -rotate-6 hover:rotate-0 hover:z-30 transition-all duration-300">
                <img
                  src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80"
                  alt="Buket RR Bouquet"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Photo 2 (Top Right) */}
              <div className="absolute right-4 sm:right-16 top-0 w-44 sm:w-52 aspect-[3/4] bg-white p-2 rounded-xl shadow-lg transform rotate-6 hover:rotate-0 hover:z-30 transition-all duration-300">
                <img
                  src="https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=600&q=80"
                  alt="Buket Wisuda RR Bouquet"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Photo 3 (Front Center-Bottom) */}
              <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 w-56 sm:w-64 aspect-[4/3] bg-white p-2.5 rounded-xl shadow-2xl z-20 hover:scale-105 transition-transform duration-300">
                <img
                  src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80"
                  alt="Rangkaian Bunga Eksklusif"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

            </div>

            {/* Right Column: Narrative Card */}
            <div className="lg:col-span-5 bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-stone-200/90 relative">
              <div className="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed">
                <p>
                  <strong>RR BOUQUETT</strong> hadir untuk membuat setiap momen spesial menjadi lebih berkesan melalui rangkaian buket yang cantik, kreatif, dan penuh makna.
                </p>
                <p>
                  Kami menyediakan berbagai pilihan buket yang cocok untuk hadiah ulang tahun, wisuda, anniversary, hari spesial, maupun kejutan untuk orang tersayang.
                </p>
                <p>
                  Dengan desain yang menarik, pilihan yang beragam, dan sentuhan penuh ketelitian, RR BOUQUETT siap membantu Anda menyampaikan perasaan melalui hadiah yang istimewa.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="/images/logorrbouquet.jpeg"
                    alt="RR Bouquet"
                    className="w-10 h-10 rounded-full object-cover border border-stone-200 shadow-sm"
                  />
                  <div className="flex flex-col">
                    <span className="font-serif text-base font-bold text-stone-900">RR Bouquet Studio</span>
                    <span className="text-xs text-stone-500">Florist & Gift Artisan</span>
                  </div>
                </div>
                <a
                  href={getWhatsAppCustomOrderUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-800 hover:text-rose-900 underline underline-offset-4"
                >
                  Konsultasi Custom &rarr;
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. OUR BESTSELLERS SECTION (Wireframe) */}
      <section className="py-20 lg:py-28 bg-[#faf9f6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900">
              Our Bestsellers
            </h2>
            <p className="mt-3 text-sm text-stone-500">
              Koleksi rangkaian buket terfavorit pilihan pelanggan kami
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {bestsellers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setSelectedProduct}
              />
            ))}
          </div>

          {/* Bottom Button "Lihat Semua Produk" */}
          <div className="mt-14 text-center">
            <Link
              to="/produk"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold tracking-widest uppercase rounded-full shadow-md hover:shadow-lg transition-all duration-200"
            >
              <span>Lihat Semua Produk</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 4. TESTIMONIAL SECTION (Wireframe) */}
      <section className="py-20 lg:py-28 bg-white border-t border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900">
              Apa kata pelanggan kami tentang kami
            </h2>
            <p className="mt-3 text-sm text-stone-500">
              Kepuasan dan senyum penerima adalah prioritas tertinggi kami
            </p>
          </div>

          <TestimonialSlider testimonials={INITIAL_TESTIMONIALS} />

        </div>
      </section>

      {/* 5. QUICK CONTACT BANNER (Wireframe: "Hubungi kami jika Anda memiliki pertanyaan") */}
      <section className="py-20 bg-[#faf8f5] text-center border-b border-stone-200/80">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900">
            Hubungi kami jika Anda memiliki pertanyaan.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-stone-600">
            Punya ide khusus, butuh konsultasi pemilihan buket, atau jadwal pengiriman cepat? Tim admin kami siap membantu Anda dengan senang hati.
          </p>
          <div className="mt-8">
            <a
              href={getWhatsAppGeneralUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold tracking-widest uppercase rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
              <span>Contact</span>
            </a>
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

    </div>
  );
};
