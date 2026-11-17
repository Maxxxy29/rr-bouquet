import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, Sparkles, Check, Upload, Image as ImageIcon, Database, HelpCircle, X, ExternalLink } from 'lucide-react';
import { InstagramIcon } from '../components/InstagramIcon';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { CATEGORIES } from '../data/mockData';
import type { Product } from '../types';
import { SITE_CONFIG } from '../config/site';
import { 
  isSupabaseConfigured, 
  getProducts, 
  createProduct, 
  toggleProductBestseller, 
  removeProduct, 
  uploadBouquetImage 
} from '../lib/supabase';

export const AdminPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [phone, setPhone] = useState(SITE_CONFIG.phoneDisplay);
  const [instagram, setInstagram] = useState(SITE_CONFIG.instagram);
  const [isSaved, setIsSaved] = useState(false);
  const [showSetupGuide, setShowSetupGuide] = useState(false);

  // New product form modal state
  const [isAdding, setIsAdding] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: CATEGORIES[1],
    price: 150000,
    description: '',
    imageUrl: '',
    isBestseller: false,
    size: 'Medium' as 'Small' | 'Medium' | 'Large' | 'Extra Large',
  });

  // Load products on mount
  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    }
    load();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleToggleBestseller = async (id: string, currentStatus: boolean = false) => {
    const updatedStatus = await toggleProductBestseller(id, currentStatus);
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isBestseller: updatedStatus } : p))
    );
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm('Yakin ingin menghapus buket ini dari katalog?')) {
      await removeProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name) return;

    setUploadingImage(true);
    let finalImageUrl = newProduct.imageUrl;

    // If user selected an image file from laptop/phone, upload it
    if (imageFile) {
      finalImageUrl = await uploadBouquetImage(imageFile);
    }

    if (!finalImageUrl) {
      finalImageUrl = 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80';
    }

    const created = await createProduct({
      name: newProduct.name,
      slug: newProduct.name.toLowerCase().replace(/\s+/g, '-'),
      price: Number(newProduct.price),
      category: newProduct.category,
      description: newProduct.description,
      imageUrl: finalImageUrl,
      isBestseller: newProduct.isBestseller,
      size: newProduct.size,
      includes: ['Wrapping Waterproof', 'Gratis Kartu Ucapan'],
    });

    setProducts([created, ...products]);
    setUploadingImage(false);
    setIsAdding(false);
    setImageFile(null);
    setImagePreview('');
    setNewProduct({
      name: '',
      category: CATEGORIES[1],
      price: 150000,
      description: '',
      imageUrl: '',
      isBestseller: false,
      size: 'Medium',
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
        
        {/* Admin Header with Supabase Status Indicator */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="bg-rose-100 text-rose-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                CMS Panel
              </span>

              {isSupabaseConfigured ? (
                <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Terhubung ke Supabase Cloud
                </span>
              ) : (
                <button
                  onClick={() => setShowSetupGuide(true)}
                  className="inline-flex items-center gap-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-medium px-2.5 py-0.5 rounded-full transition"
                >
                  <Database className="w-3.5 h-3.5 text-amber-600" />
                  Mode Lokal — Klik untuk Hubungkan Cloud
                </button>
              )}
            </div>

            <h1 className="font-serif text-2xl font-bold text-stone-900">
              Dashboard Manajemen RR Bouquet
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Upload foto buket langsung dari galeri HP/laptop, kelola harga, dan tandai bestseller.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSetupGuide(true)}
              className="p-2.5 text-stone-600 hover:text-stone-900 rounded-full border border-stone-200 hover:bg-stone-50 transition"
              title="Panduan Supabase Cloud"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsAdding(true)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-full shadow-md transition"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Buket Baru</span>
            </button>
          </div>
        </div>

        {/* Modal Panduan Supabase */}
        {showSetupGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-serif text-lg font-bold text-stone-900">
                    Cara Menghubungkan ke Supabase Cloud (Gratis)
                  </h3>
                </div>
                <button
                  onClick={() => setShowSetupGuide(false)}
                  className="text-stone-400 hover:text-stone-600 p-1 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs text-stone-600 leading-relaxed">
                <p>
                  Dengan menghubungkan ke Supabase Cloud, seluruh foto buket yang Anda upload akan tersimpan permanen di cloud dan bisa diedit kapan saja dari perangkat mana pun:
                </p>
                <ol className="list-decimal pl-4 space-y-2">
                  <li>
                    Buka <strong><a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-emerald-700 underline inline-flex items-center gap-1">supabase.com <ExternalLink className="w-3 h-3" /></a></strong> dan klik <strong>Start your project</strong> (gratis).
                  </li>
                  <li>
                    Buat proyek baru bernama <strong>RR Bouquet</strong> dan tentukan password database.
                  </li>
                  <li>
                    Di dashboard Supabase, buka menu <strong>SQL Editor</strong>, lalu salin dan jalankan query dari file <code>supabase/schema.sql</code>.
                  </li>
                  <li>
                    Buka <strong>Project Settings -&gt; API</strong>, salin <strong>Project URL</strong> dan <strong>anon key</strong>.
                  </li>
                  <li>
                    Masukkan kedua kunci tersebut ke file <code>.env</code> di laptop Anda atau di dashboard <strong>Vercel (Environment Variables)</strong>.
                  </li>
                </ol>
                <div className="p-3 bg-emerald-50 text-emerald-900 rounded-xl border border-emerald-200 mt-4">
                  💡 <strong>Catatan:</strong> Saat ini sistem juga sudah berfungsi dalam <em>Mode Penyimpanan Lokal</em>, jadi Anda tetap bisa menguji coba upload foto dan tambah produk langsung sekarang!
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex justify-end">
                <button
                  onClick={() => setShowSetupGuide(false)}
                  className="px-5 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800"
                >
                  Tutup Panduan
                </button>
              </div>
            </div>
          </div>
        )}

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

        {/* Modal Tambah Buket dengan File Upload */}
        {isAdding && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 my-8">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Tambah Buket Baru ke Katalog
                </h3>
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="text-stone-400 hover:text-stone-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddProduct} className="space-y-4 text-xs">
                {/* Image Upload Box */}
                <div>
                  <label className="block font-medium text-stone-700 mb-1">
                    Foto Buket Asli (Pilih dari HP / Laptop)
                  </label>
                  
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-stone-300 border-dashed rounded-xl hover:border-stone-400 transition bg-stone-50/60 relative cursor-pointer group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    
                    {imagePreview ? (
                      <div className="text-center">
                        <img
                          src={imagePreview}
                          alt="Preview Buket"
                          className="h-36 w-auto object-cover rounded-lg mx-auto shadow-md"
                        />
                        <p className="mt-2 text-stone-500 text-[11px]">
                          Klik untuk mengganti foto yang dipilih
                        </p>
                      </div>
                    ) : (
                      <div className="text-center space-y-1">
                        <Upload className="mx-auto h-8 w-8 text-stone-400 group-hover:text-stone-600 transition" />
                        <div className="text-stone-600">
                          <span className="font-semibold text-rose-800">Klik untuk upload foto</span> atau seret foto ke sini
                        </div>
                        <p className="text-[10px] text-stone-400">
                          Format JPG, PNG, WEBP (Maks 5 MB)
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Or Manual URL option */}
                  <div className="mt-2 flex items-center gap-2">
                    <ImageIcon className="w-3.5 h-3.5 text-stone-400" />
                    <input
                      type="text"
                      placeholder="Atau tempel URL gambar jika ada..."
                      value={newProduct.imageUrl}
                      onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                      className="flex-1 p-1.5 text-[11px] bg-stone-50 border border-stone-200 rounded-md"
                    />
                  </div>
                </div>

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

                <div className="pt-4 flex justify-end gap-2 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="px-4 py-2 border border-stone-300 rounded-lg text-stone-700 hover:bg-stone-50"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={uploadingImage}
                    className="px-5 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 disabled:opacity-50 flex items-center gap-2"
                  >
                    {uploadingImage ? 'Menyimpan Buket...' : 'Simpan Buket'}
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

          {loading ? (
            <div className="py-12 text-center text-xs text-stone-500">
              Memuat data katalog...
            </div>
          ) : (
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
                          onClick={() => handleToggleBestseller(item.id, item.isBestseller)}
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
          )}
        </div>

      </div>
    </div>
  );
};
