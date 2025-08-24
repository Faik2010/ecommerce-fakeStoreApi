import type { Product } from '@/types';

const API_BASE_URL = 'https://fakestoreapi.com';

export async function getStaticProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      next: { revalidate: 300 }, // 5 dakika cache
      headers: {
        'Cache-Control': 'no-cache',
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  } catch (error) {
    return [];
  }
}

export async function getStaticProduct(id: string): Promise<Product | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      next: { revalidate: 600 }, // 10 dakika cache (ürün detayları daha az değişir)
      headers: {
        'Cache-Control': 'no-cache',
      }
    });
    if (!response.ok) {
      return null;
    }
    return response.json();
  } catch (error) {
    return null;
  }
}

export async function getProductIds(): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      return [];
    }
    const products = await response.json();
    return products.map((product: Product) => product.id.toString());
  } catch (error) {
    return [];
  }
}
