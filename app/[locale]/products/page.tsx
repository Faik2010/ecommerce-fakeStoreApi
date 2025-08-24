import { Suspense } from 'react';
import { getStaticProducts } from '@/lib/api/products';
import { getStaticCategories } from '@/lib/api/categories';
import ProductsClient  from '../(features)/products/products-client';
import { ProductsSkeleton } from '@/components/features/products/products-skeleton';

export const revalidate = 60;

async function getProductsPageData() {
  try {
    const [products, categories] = await Promise.all([
      getStaticProducts(),
      getStaticCategories()
    ]);
    return { products, categories };
  } catch (error) {
    return { products: [], categories: [] };
  }
}

export default async function ProductsPage() {
  const { products, categories } = await getProductsPageData();

  return (
    <Suspense fallback={<ProductsSkeleton />}>
      <ProductsClient 
        initialProducts={products} 
        initialCategories={categories} 
      />
    </Suspense>
  );
}
