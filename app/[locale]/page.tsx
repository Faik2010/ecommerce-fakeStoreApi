import { Suspense } from 'react';
import { getStaticProducts } from '@/lib/api/products';
import { HomeClient } from './(features)/home/home-client';
import { HomeSkeleton } from '@/components/features/home/home-skeleton';

export const revalidate = 300;

async function getHomePageData() {
  try {
    const allProducts = await getStaticProducts();
    const featuredProducts = allProducts.slice(0, 4);
    return { products: featuredProducts };
  } catch (error) {
    return { products: [] };
  }
}

export default async function HomePage() {
  const { products } = await getHomePageData();

  return (
    <Suspense fallback={<HomeSkeleton />}>
      <HomeClient initialProducts={products} />
    </Suspense>
  );
}
