export const SITE_CONFIG = {
  name: 'RR Bouquet',
  tagline: 'Setiap Buket Punya Cerita, Setiap Hadiah Punya Makna.',
  description: 'Rangkaian buket bunga cantik, kreatif, dan berkelas untuk wisuda, anniversary, ulang tahun, dan momen spesial Anda.',
  phoneRaw: '6285196254499', // WhatsApp format
  phoneDisplay: '0851-9625-4499',
  instagram: 'https://www.instagram.com/rrbouqett?xtok=MXVqMGFxZThyNjB2bA==',
  instagramHandle: '@rrbouqett',
  address: 'Indonesia',
  operatingHours: 'Setiap Hari: 08.00 - 20.00 WIB',
  orderLeadTime: 'Menerima pesanan H-1 & Same Day (konfirmasi via chat)',
};

/**
 * Generate dynamic WhatsApp order link
 */
export function getWhatsAppOrderUrl(productName: string, price: number, category?: string): string {
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(price);

  const message = `Halo RR Bouquet, saya tertarik memesan produk berikut dari website:
- *Nama Produk:* ${productName}
- *Perkiraan Harga:* ${formattedPrice}${category ? `\n- *Kategori:* ${category}` : ''}

Mohon info ketersediaan slot dan jadwal pengirimannya. Terima kasih!`;

  return `https://wa.me/${SITE_CONFIG.phoneRaw}?text=${encodeURIComponent(message)}`;
}

/**
 * Generate custom order WhatsApp link
 */
export function getWhatsAppCustomOrderUrl(): string {
  const message = `Halo RR Bouquet, saya ingin konsultasi pemesanan buket kustom:
- *Acara/Momen:* (Wisuda / Anniversary / Ulang Tahun / Event)
- *Target Budget:* Rp ...
- *Tema Warna / Request Khusus:* ...

Mohon bantuan rekomendasi desain dan ketersediaan slotnya. Terima kasih!`;

  return `https://wa.me/${SITE_CONFIG.phoneRaw}?text=${encodeURIComponent(message)}`;
}

/**
 * Generate general consultation WhatsApp link
 */
export function getWhatsAppGeneralUrl(): string {
  const message = `Halo RR Bouquet, saya ingin bertanya dan konsultasi seputar pemesanan buket bunga.`;
  return `https://wa.me/${SITE_CONFIG.phoneRaw}?text=${encodeURIComponent(message)}`;
}
