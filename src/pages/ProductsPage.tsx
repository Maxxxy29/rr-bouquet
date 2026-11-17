import React, { useState, useMemo } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { ProductCard } from '../components/ProductCard';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { INITIAL_PRODUCTS, CATEGORIES } from '../data/mockData';
import type { Product } from '../types';
import { getWhatsAppCustomOrderUrl } from '../config/site';

export const ProductsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return INITIAL_PRODUCTS.filter((product) => {
      const matchCategory =
        selectedCategory === 'Semua' || product.category === selectedCategory;
      const matchSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'featured') {
        if (a.isBestseller && !b.isBestseller) return -1;
        if (!a.isBestseller && b.isBestseller) return 1;
      }
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-[#faf9f6] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-stone-500">
            Katalog RR Bouquet
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-stone-900 mt-2">
            Rangkaian Bunga & Kado Pilihan
          </h1>
          <p className="mt-3 text-sm text-stone-600">
            Temukan buket impian untuk momen kelulusan, anniversary, ulang tahun, dan ungkapan kasih.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-medium px-4 py-2 rounded-full whitespace-nowrap transition-all duration-150 ${
                  selectedCategory === cat
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-60">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Cari buket..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-full focus:outline-none focus:ring-1 focus:ring-stone-900"
              />
            </div>

            {/* Sort Select */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs bg-stone-50 border border-stone-200 rounded-full px-3 py-1.5 text-stone-700 focus:outline-none focus:ring-1 focus:ring-stone-900"
            >
              <option value="featured">Paling Populer</option>
              <option value="price-asc">Harga: Rendah ke Tinggi</option>
              <option value="price-desc">Harga: Tinggi ke Rendah</option>
            </select>
          </div>

        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setSelectedProduct}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-stone-200 p-8">
            <p className="text-base font-serif text-stone-800">
              Tidak ada produk yang cocok dengan pencarian Anda.
            </p>
            <p className="text-xs text-stone-500 mt-2">
              Coba ganti kata kunci atau pilih kategori lain.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('Semua');
                setSearchQuery('');
              }}
              className="mt-4 text-xs font-semibold text-rose-800 underline underline-offset-4"
            >
              Reset Filter
            </button>
          </div>
        )}

        {/* Custom Order Callout Section (PRD Section 4.2) */}
        <div className="mt-20 bg-gradient-to-r from-stone-900 to-stone-800 text-white rounded-3xl p-8 sm:p-12 shadow-xl">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-700 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Layanan Buket Kustom
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-normal text-white">
              Punya Ide Buket Sendiri atau Mau Menyesuaikan Budget?
            </h2>
            <p className="mt-4 text-sm text-stone-300 leading-relaxed">
              Anda bebas menentukan jenis bunga, tema warna kertas wrapping, jumlah tangkai, maupun kombinasi snack & uang sesuai anggaran yang Anda inginkan.
            </p>
            <div className="mt-8">
              <a
                href={getWhatsAppCustomOrderUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold tracking-widest uppercase rounded-full shadow-lg hover:shadow-emerald-500/30 transition-all duration-200"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>Request Buket Kustom via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Modal Quick View */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};
