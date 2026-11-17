-- ========================================================
-- RR BOUQUET — DATABASE SCHEMA & STORAGE SETUP (SUPABASE)
-- Aman dijalankan berulang kali (Idempotent)
-- ========================================================

-- 1. Tabel Produk
create table if not exists public.products (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  slug text not null,
  price numeric not null,
  category text not null,
  description text default '',
  image_url text not null,
  is_bestseller boolean default false,
  size text default 'Medium',
  includes text[] default array['Wrapping Waterproof', 'Gratis Kartu Ucapan']
);

-- Aktifkan RLS
alter table public.products enable row level security;

-- Hapus policy lama jika sudah ada agar tidak error 42710
drop policy if exists "Allow public read on products" on public.products;
drop policy if exists "Allow all operations for products" on public.products;

-- Buat ulang policy
create policy "Allow public read on products" 
  on public.products 
  for select 
  using (true);

create policy "Allow all operations for products" 
  on public.products 
  for all 
  using (true)
  with check (true);


-- 2. Tabel Pengaturan Toko
create table if not exists public.store_settings (
  key text primary key,
  value text not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.store_settings enable row level security;

drop policy if exists "Allow public read on store_settings" on public.store_settings;
drop policy if exists "Allow all operations for store_settings" on public.store_settings;

create policy "Allow public read on store_settings" 
  on public.store_settings 
  for select 
  using (true);

create policy "Allow all operations for store_settings" 
  on public.store_settings 
  for all 
  using (true)
  with check (true);

-- Isi pengaturan awal toko
insert into public.store_settings (key, value) 
values 
  ('phone_number', '085196254499'),
  ('instagram_url', 'https://www.instagram.com/rrbouqett?xtok=MXVqMGFxZThyNjB2bA==')
on conflict (key) do nothing;


-- 3. Storage Bucket untuk Foto Buket
insert into storage.buckets (id, name, public) 
values ('bouquets', 'bouquets', true)
on conflict (id) do update set public = true;

drop policy if exists "Public Access to Bouquets Bucket" on storage.objects;
drop policy if exists "Allow upload to Bouquets Bucket" on storage.objects;
drop policy if exists "Allow update and delete to Bouquets Bucket" on storage.objects;

create policy "Public Access to Bouquets Bucket" 
  on storage.objects 
  for select 
  using (bucket_id = 'bouquets');

create policy "Allow upload to Bouquets Bucket" 
  on storage.objects 
  for insert 
  with check (bucket_id = 'bouquets');

create policy "Allow update and delete to Bouquets Bucket" 
  on storage.objects 
  for delete 
  using (bucket_id = 'bouquets');


-- 4. Masukkan Data Produk Awal (Opsional)
insert into public.products (name, slug, price, category, description, image_url, is_bestseller, size)
values 
  ('Classic Pastel Rose Bouquet', 'classic-pastel-rose', 185000, 'Buket Romantis / Anniversary', 'Rangkaian mawar premium bernuansa pastel lembut dipadukan dengan daun eucalyptus dan kertas wrapping Korean style tahan air.', 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80', true, 'Medium'),
  ('Graduation Sunshine Bloom', 'graduation-sunshine-bloom', 165000, 'Buket Wisuda & Sidang', 'Pilihan favorit untuk perayaan wisuda dan sidang! Kombinasi bunga matahari segar dan aksen pita satin elegan.', 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=800&q=80', true, 'Medium'),
  ('Sweet Peach Romantic Symphony', 'sweet-peach-romantic', 245000, 'Buket Romantis / Anniversary', 'Kombinasi mewah bunga mawar peach, carnation, dan aster impor untuk hadiah hari jadi, ulang tahun, atau lamaran.', 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80', true, 'Large'),
  ('Snack & Chocolate Tower Bouquet', 'snack-chocolate-tower', 145000, 'Buket Snack & Uang', 'Buket kombinasi cokelat premium dan camilan favorit yang disusun rapi serta estetik.', 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80', true, 'Medium')
on conflict do nothing;
