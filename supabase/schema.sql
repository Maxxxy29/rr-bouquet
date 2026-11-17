-- ========================================================
-- RR BOUQUET — DATABASE SCHEMA & STORAGE SETUP (SUPABASE)
-- Jalankan query ini di menu: Supabase Dashboard -> SQL Editor
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

-- Aktifkan RLS (Row Level Security)
alter table public.products enable row level security;

-- Policy: Publik bisa melihat semua produk
create policy "Allow public read on products" 
  on public.products 
  for select 
  using (true);

-- Policy: Publik / Admin bisa menambah, mengedit, dan menghapus produk
create policy "Allow all operations for products" 
  on public.products 
  for all 
  using (true)
  with check (true);


-- 2. Tabel Pengaturan Toko (Nomor WhatsApp & Sosmed)
create table if not exists public.store_settings (
  key text primary key,
  value text not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.store_settings enable row level security;

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

-- Policy Storage: Publik bisa melihat foto
create policy "Public Access to Bouquets Bucket" 
  on storage.objects 
  for select 
  using (bucket_id = 'bouquets');

-- Policy Storage: Publik / Admin bisa mengunggah foto
create policy "Allow upload to Bouquets Bucket" 
  on storage.objects 
  for insert 
  with check (bucket_id = 'bouquets');

create policy "Allow update and delete to Bouquets Bucket" 
  on storage.objects 
  for delete 
  using (bucket_id = 'bouquets');
