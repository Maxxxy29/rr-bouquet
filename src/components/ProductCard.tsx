import React from 'react';
import { Eye } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import type { Product } from '../types';
import { getWhatsAppOrderUrl } from '../config/site';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(product.price);

  return (
    <div className="group flex flex-col bg-white border border-stone-200/90 rounded-xl overflow-hidden hover:shadow-xl hover:border-stone-400/80 transition-all duration-300">
      
      {/* Product Image Container */}
      <div 
        className="relative aspect-[3/4] overflow-hidden bg-stone-100 cursor-pointer"
        onClick={() => onQuickView && onQuickView(product)}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Badge category / Bestseller */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isBestseller && (
            <span className="bg-stone-900 text-white text-[10px] font-semibold tracking-wider px-2.5 py-1 rounded-full uppercase shadow">
              Bestseller
            </span>
          )}
          <span className="bg-white/90 backdrop-blur-sm text-stone-800 text-[10px] font-medium px-2 py-0.5 rounded-full border border-stone-200 shadow-sm">
            {product.category}
          </span>
        </div>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-0 bg-stone-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView && onQuickView(product);
            }}
            className="flex items-center gap-1.5 bg-white/95 text-stone-900 text-xs font-semibold px-4 py-2 rounded-full shadow-lg hover:bg-stone-900 hover:text-white transition transform translate-y-2 group-hover:translate-y-0"
          >
            <Eye className="w-3.5 h-3.5" />
            Detail Cepat
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div 
          className="cursor-pointer"
          onClick={() => onQuickView && onQuickView(product)}
        >
          <h3 className="font-serif text-base sm:text-lg font-medium text-stone-900 line-clamp-1 group-hover:text-rose-900 transition-colors">
            {product.name}
          </h3>
          <p className="mt-1 text-sm font-semibold text-stone-700 tracking-tight">
            {formattedPrice}
          </p>
          <p className="mt-1 text-xs text-stone-500 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Direct WhatsApp "Buy Now" CTA Button */}
        <div className="mt-4 pt-3 border-t border-stone-100">
          <a
            href={getWhatsAppOrderUrl(product.name, product.price, product.category)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold tracking-wider py-2.5 px-4 rounded-full transition-all duration-200 active:scale-95 shadow-sm hover:shadow"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
            <span>Buy Now</span>
          </a>
        </div>

      </div>
    </div>
  );
};
