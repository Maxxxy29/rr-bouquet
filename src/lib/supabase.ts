import { createClient } from '@supabase/supabase-js';
import type { Product } from '../types';
import { INITIAL_PRODUCTS } from '../data/mockData';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('https://')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

const STORAGE_KEY = 'rr_bouquet_products_v1';

// Get local fallback products
function getLocalProducts(): Product[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to read from localStorage', e);
  }
  return INITIAL_PRODUCTS;
}

// Save local fallback products
function saveLocalProducts(products: Product[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
}

/**
 * Fetch all products (From Supabase if connected, else from local storage)
 */
export async function getProducts(): Promise<Product[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data && data.length > 0) {
        return data.map((item) => ({
          id: item.id,
          name: item.name,
          slug: item.slug,
          price: item.price,
          category: item.category,
          description: item.description,
          imageUrl: item.image_url,
          isBestseller: item.is_bestseller,
          size: item.size || 'Medium',
          includes: item.includes || ['Wrapping Waterproof', 'Gratis Kartu Ucapan'],
        }));
      }
    } catch (err) {
      console.warn('Could not fetch from Supabase, falling back to local data', err);
    }
  }
  return getLocalProducts();
}

/**
 * Add a new product
 */
export async function createProduct(product: Omit<Product, 'id'>): Promise<Product> {
  const newId = `prod-${Date.now()}`;
  const fullProduct: Product = { ...product, id: newId };

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([
          {
            name: product.name,
            slug: product.slug,
            price: product.price,
            category: product.category,
            description: product.description,
            image_url: product.imageUrl,
            is_bestseller: product.isBestseller ?? false,
            size: product.size ?? 'Medium',
            includes: product.includes ?? ['Wrapping Waterproof', 'Gratis Kartu Ucapan'],
          },
        ])
        .select()
        .single();

      if (!error && data) {
        return {
          id: data.id,
          name: data.name,
          slug: data.slug,
          price: data.price,
          category: data.category,
          description: data.description,
          imageUrl: data.image_url,
          isBestseller: data.is_bestseller,
          size: data.size,
          includes: data.includes,
        };
      }
    } catch (err) {
      console.error('Error inserting into Supabase:', err);
    }
  }

  // Fallback to local
  const current = getLocalProducts();
  const updated = [fullProduct, ...current];
  saveLocalProducts(updated);
  return fullProduct;
}

/**
 * Toggle or update product bestseller status
 */
export async function toggleProductBestseller(id: string, currentStatus: boolean): Promise<boolean> {
  const newStatus = !currentStatus;

  if (supabase) {
    try {
      const { error } = await supabase
        .from('products')
        .update({ is_bestseller: newStatus })
        .eq('id', id);

      if (!error) return newStatus;
    } catch (err) {
      console.error('Error updating Supabase bestseller:', err);
    }
  }

  // Fallback
  const current = getLocalProducts();
  const updated = current.map((p) => (p.id === id ? { ...p, isBestseller: newStatus } : p));
  saveLocalProducts(updated);
  return newStatus;
}

/**
 * Delete a product
 */
export async function removeProduct(id: string): Promise<boolean> {
  if (supabase) {
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (!error) return true;
    } catch (err) {
      console.error('Error deleting from Supabase:', err);
    }
  }

  // Fallback
  const current = getLocalProducts();
  const updated = current.filter((p) => p.id !== id);
  saveLocalProducts(updated);
  return true;
}

/**
 * Upload bouquet image directly to Supabase Storage
 */
export async function uploadBouquetImage(file: File): Promise<string> {
  if (supabase) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `bouquet-${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('bouquets')
        .upload(filePath, file, { cacheControl: '3600', upsert: false });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('bouquets').getPublicUrl(filePath);
      if (data?.publicUrl) {
        return data.publicUrl;
      }
    } catch (err) {
      console.error('Error uploading file to Supabase Storage:', err);
    }
  }

  // Fallback to Base64 data URL for local testing
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.readAsDataURL(file);
  });
}
