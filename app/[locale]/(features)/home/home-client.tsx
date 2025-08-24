'use client';

import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useTranslations } from '@/hooks/use-translations';
import { ProductCard } from '@/components/ui/product-card';
import { Button } from '@/components/ui/button';
import { setStaticProducts } from '@/lib/store/slices/products-slice';
import { addToCart } from '@/lib/store/slices/cart-slice';
import type { Product } from '@/types';
import Link from 'next/link';

interface HomeClientProps {
  initialProducts: Product[];
}

export function HomeClient({ initialProducts }: HomeClientProps) {
  const dispatch = useDispatch();
  const { t, locale } = useTranslations();

  useEffect(() => {
    dispatch(setStaticProducts(initialProducts));
  }, [dispatch, initialProducts]);

  const handleAddToCart = useCallback((product: Product) => {
    dispatch(addToCart(product));
    toast.success(t('notifications.addedToCart'));
  }, [dispatch, t]);

  return (
    <div className="w-full">
      <div className="text-center mb-16 mt-8 px-4">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight tracking-tight">
            {t('home.featuredProducts')}
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-600 mx-auto rounded-full"></div>
        </div>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {t('home.subtitle')}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 px-4 mb-16">
        {initialProducts.map((product) => (
          <div key={product.id} className="h-full">
            <ProductCard
              product={product}
              onAddToCart={handleAddToCart}
              variant="premium"
            />
          </div>
        ))}
      </div>
      
      {initialProducts.length > 0 && (
        <div className="text-center mb-12">
          <div className="bg-gradient-to-r from-primary/5 via-blue-600/5 to-purple-600/5 border border-border/50 rounded-3xl p-10 mx-4 backdrop-blur-sm">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
              {locale === 'tr' ? 'Daha Fazla Ürün Keşfet' : 'Discover More Products'}
            </h2>
            <p className="text-muted-foreground mb-8 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              {locale === 'tr' 
                ? 'Binlerce kaliteli ürün arasından seçim yapın ve en uygun fiyatlarla alışveriş yapın.'
                : 'Choose from thousands of quality products and shop at the best prices.'
              }
            </p>
            <Link href={`/${locale}/products`}>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 cursor-pointer shadow-md"
              >
                {t('home.viewAllProducts')}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
