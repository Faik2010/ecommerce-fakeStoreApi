'use client';

import { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
import { useGetProductsQuery, useGetCategoriesQuery } from '@/lib/store/api-slice';
import { addToCart } from '@/lib/store/slices/cart-slice';
import { ProductCard } from '@/components/ui/product-card';
import { FilterBar } from '@/components/common/filter-bar';
import type { Product, ProductFilters } from '@/types';

export function ProductsContainer() {
  const t = useTranslations();
  const dispatch = useDispatch();
  const { data: products, isLoading: productsLoading, error: productsError } = useGetProductsQuery();
  const { data: categories, isLoading: categoriesLoading } = useGetCategoriesQuery();

  const [filters, setFilters] = useState<ProductFilters>({
    category: '',
    minPrice: 0,
    maxPrice: 1000,
    sortBy: 'name-asc',
  });

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    let filtered = [...products];

    if (filters.category && filters.category !== '') {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    filtered = filtered.filter(product => 
      product.price >= filters.minPrice && product.price <= filters.maxPrice
    );

    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, filters]);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
    toast.success(t('notifications.addedToCart'));
  };

  const handleFiltersChange = (newFilters: Partial<ProductFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  if (productsLoading || categoriesLoading) {
    return <ProductsContainerSkeleton />;
  }

  if (productsError) {
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

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">{t('products.title')}</h1>
      
      <FilterBar
        categories={categories || []}
        filters={filters}
        onFiltersChange={handleFiltersChange}
      />
      
      <p className="text-muted-foreground">
        {filteredProducts.length} {t('products.allProducts')}
      </p>
      
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{t('products.noProducts')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ProductsContainerSkeleton() {
  return (
    <div className="space-y-8">
      <div className="h-8 bg-gray-200 rounded w-48"></div>
      
      <div className="flex flex-wrap gap-4">
        <div className="h-10 bg-gray-200 rounded w-32"></div>
        <div className="h-10 bg-gray-200 rounded w-32"></div>
        <div className="h-10 bg-gray-200 rounded w-32"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
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
