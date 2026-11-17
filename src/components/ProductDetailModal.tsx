import React from 'react';
import { X, Check, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import type { Product } from '../types';
import { getWhatsAppOrderUrl, SITE_CONFIG } from '../config/site';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(product.price);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
      {/* Backdrop click to dismiss */}
      <div className="fixed inset-0" onClick={onClose}></div>

      {/* Modal Dialog Content */}
      <div className="relative bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden z-10 border border-stone-200 animate-scaleUp">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-stone-700 hover:text-stone-900 shadow-sm transition"
          aria-label="Tutup modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Image */}
          <div className="relative aspect-[3/4] md:aspect-auto bg-stone-100">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.isBestseller && (
              <span className="absolute top-4 left-4 bg-stone-900 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                Bestseller
              </span>
            )}
          </div>

          {/* Right Column: Details */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold tracking-wider uppercase text-rose-800 bg-rose-50 px-2.5 py-1 rounded-full">
                {product.category}
              </span>

              <h2 className="font-serif text-2xl font-bold text-stone-900 mt-3 leading-snug">
                {product.name}
              </h2>

              <p className="text-xl font-bold text-stone-800 mt-2">
                {formattedPrice}
              </p>

              <p className="text-sm text-stone-600 mt-4 leading-relaxed">
                {product.description}
              </p>

              {/* What's included */}
              <div className="mt-6 pt-5 border-t border-stone-100">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Paket Termasuk:
                </h4>
                <ul className="space-y-1.5 text-xs text-stone-600">
                  {product.includes?.map((inc, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>{inc}</span>
                    </li>
                  )) || (
                    <>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>Wrapping premium elegan & tahan air</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>Gratis kartu ucapan custom (tulis pesan Anda)</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 pt-4 border-t border-stone-100 space-y-2">
              <a
                href={getWhatsAppOrderUrl(product.name, product.price, product.category)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-200 shadow-md hover:shadow-lg text-sm"
              >
                <WhatsAppIcon className="w-5 h-5 text-white" />
                <span>Pesan Sekarang via WhatsApp</span>
              </a>
              <p className="text-[11px] text-center text-stone-400">
                {SITE_CONFIG.orderLeadTime}
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
