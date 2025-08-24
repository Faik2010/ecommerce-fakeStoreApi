const API_BASE_URL = 'https://fakestoreapi.com';

export async function getStaticCategories(): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`, {
      next: { revalidate: 3600 }, // 1 saat cache (kategoriler çok ender değişir)
      headers: {
        'Cache-Control': 'no-cache',
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return response.json();
  } catch (error) {
    return [];
  }
}
