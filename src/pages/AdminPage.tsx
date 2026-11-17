import React, { useState } from 'react';
import { Plus, Trash2, Save, Sparkles, Check } from 'lucide-react';
import { InstagramIcon } from '../components/InstagramIcon';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { INITIAL_PRODUCTS, CATEGORIES } from '../data/mockData';
import type { Product } from '../types';
import { SITE_CONFIG } from '../config/site';

export const AdminPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [phone, setPhone] = useState(SITE_CONFIG.phoneDisplay);
  const [instagram, setInstagram] = useState(SITE_CONFIG.instagram);
  const [isSaved, setIsSaved] = useState(false);

  // New product form modal state
  const [isAdding, setIsAdding] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: CATEGORIES[1],
    price: 150000,
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80',
    isBestseller: false,
  });

  const handleToggleBestseller = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isBestseller: !p.isBestseller } : p))
    );
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Yakin ingin menghapus produk ini dari katalog?')) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name) return;

    const created: Product = {
      id: `prod-${Date.now()}`,
      name: newProduct.name,
      slug: newProduct.name.toLowerCase().replace(/\s+/g, '-'),
      price: Number(newProduct.price),
      category: newProduct.category,
      description: newProduct.description,
      imageUrl: newProduct.imageUrl,
      isBestseller: newProduct.isBestseller,
      includes: ['Wrapping Waterproof', 'Gratis Kartu Ucapan'],
    };

    setProducts([created, ...products]);
    setIsAdding(false);
    setNewProduct({
      name: '',
      category: CATEGORIES[1],
      price: 150000,
      description: '',
      imageUrl: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80',
      isBestseller: false,
    });
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-stone-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Admin Header */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-rose-100 text-rose-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                CMS Panel
              </span>
              <h1 className="font-serif text-2xl font-bold text-stone-900">
                Dashboard Manajemen RR Bouquet
              </h1>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              Kelola katalog buket, tandai bestseller, dan perbarui nomor kontak WhatsApp.
            </p>
          </div>

          <button
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-full shadow transition"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Buket Baru</span>
          </button>
        </div>

        {/* Store Settings Form */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Pengaturan Kontak Cepat
          </h2>

          <form onSubmit={handleSaveSettings} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Nomor WhatsApp Toko
              </label>
              <div className="flex items-center gap-2">
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs p-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Tautan Instagram
              </label>
              <div className="flex items-center gap-2">
                <InstagramIcon className="w-4 h-4 text-pink-600" />
                <input
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className="w-full text-xs p-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>
            </div>

            <div className="sm:col-span-2 flex items-center justify-end pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow transition"
              >
                {isSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                <span>{isSaved ? 'Tersimpan!' : 'Simpan Pengaturan'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Modal Tambah Buket */}
        {isAdding && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200">
              <h3 className="font-serif text-lg font-bold text-stone-900 mb-4">
                Tambah Buket Baru ke Katalog
              </h3>

              <form onSubmit={handleAddProduct} className="space-y-4 text-xs">
                <div>
                  <label className="block font-medium text-stone-700 mb-1">Nama Buket</label>
                  <input
                    type="text"
                    required
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="Contoh: Buket Mawar Peach Exclusive"
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Kategori</label>
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg"
                    >
                      {CATEGORIES.filter((c) => c !== 'Semua').map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Harga (Rp)</label>
                    <input
                      type="number"
                      required
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-stone-700 mb-1">URL Foto Buket</label>
                  <input
                    type="url"
                    required
                    value={newProduct.imageUrl}
                    onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-medium text-stone-700 mb-1">Deskripsi Singkat</label>
                  <textarea
                    rows={3}
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    placeholder="Penjelasan buket, warna bunga, dan kertas wrap..."
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="bestseller-check"
                    checked={newProduct.isBestseller}
                    onChange={(e) => setNewProduct({ ...newProduct, isBestseller: e.target.checked })}
                    className="w-4 h-4 text-stone-900 rounded"
                  />
                  <label htmlFor="bestseller-check" className="text-stone-700">
                    Tampilkan sebagai Bestseller di Halaman Beranda
                  </label>
                </div>

                <div className="pt-4 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="px-4 py-2 border border-stone-300 rounded-lg text-stone-700 hover:bg-stone-50"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800"
                  >
                    Simpan Buket
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Product Catalog List */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-stone-100 flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-stone-900">
              Daftar Buket ({products.length} Produk)
            </h2>
            <span className="text-xs text-stone-500">
              {products.filter((p) => p.isBestseller).length} Ditandai Bestseller
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-stone-50 text-stone-500 font-semibold uppercase tracking-wider border-b border-stone-200">
                  <th className="py-3 px-4">Foto</th>
                  <th className="py-3 px-4">Nama Produk</th>
                  <th className="py-3 px-4">Kategori</th>
                  <th className="py-3 px-4">Harga</th>
                  <th className="py-3 px-4 text-center">Bestseller (Beranda)</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {products.map((item) => (
                  <tr key={item.id} className="hover:bg-stone-50/80 transition">
                    <td className="py-3 px-4">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-12 h-14 object-cover rounded-md shadow-sm"
                      />
                    </td>
                    <td className="py-3 px-4 font-medium text-stone-900">
                      {item.name}
                    </td>
                    <td className="py-3 px-4 text-stone-600">
                      {item.category}
                    </td>
                    <td className="py-3 px-4 font-semibold text-stone-800">
                      Rp {item.price.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleToggleBestseller(item.id)}
                        className={`px-3 py-1 rounded-full text-[10px] font-semibold transition ${
                          item.isBestseller
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-stone-100 text-stone-400 hover:text-stone-600'
                        }`}
                      >
                        {item.isBestseller ? '★ Aktif di Beranda' : 'Jadikan Bestseller'}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleDeleteProduct(item.id)}
                        className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition"
                        title="Hapus Buket"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
