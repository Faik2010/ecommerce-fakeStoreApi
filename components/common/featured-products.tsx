'use client';

import { useDispatch } from 'react-redux';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
import { useGetProductsQuery } from '@/lib/store/api-slice';
import { addToCart } from '@/lib/store/slices/cart-slice';
import { ProductCard } from '@/components/ui/product-card';
import type { Product } from '@/types';

export function FeaturedProducts() {
  const t = useTranslations();
  const dispatch = useDispatch();
  const { data: products, isLoading, error } = useGetProductsQuery();

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
    toast.success(t('notifications.addedToCart'));
  };

  if (isLoading) {
    return <ProductsSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground mb-4">{t('common.error')}</p>
        <button 
          onClick={() => window.location.reload()}
          className="text-primary hover:underline"
        >
          {t('common.retry')}
        </button>
      </div>
    );
  }

  const featuredProducts = products?.slice(0, 4) || [];

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-8">
        {t('home.featuredProducts')}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
}

function ProductsSkeleton() {
  return (
    <div>
      <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-8"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="border rounded-lg p-4 animate-pulse">
            <div className="aspect-square bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
