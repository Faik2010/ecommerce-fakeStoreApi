'use client';

import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from './button';
import { formatPrice, truncateText, getStarRating } from '@/utils';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  variant?: 'default' | 'premium';
}

export const ProductCard = memo(function ProductCard({ product, onAddToCart, variant = 'default' }: ProductCardProps) {
  const t = useTranslations();
  const locale = useLocale();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(product);
  };

  if (variant === 'premium') {
    return (
      <div className="group border border-border/20 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-500 bg-card hover:scale-[1.02] h-full flex flex-col relative overflow-hidden">
        {/* Subtle gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
        
        <Link href={`/${locale}/products/${product.id}`} className="cursor-pointer block flex-1 relative z-10">
          <div className="h-56 mb-6 flex items-center justify-center bg-gradient-to-br from-muted/30 to-accent/20 rounded-xl overflow-hidden group-hover:from-muted/40 group-hover:to-accent/30 transition-all duration-500 p-4">
            <Image
              src={product.image}
              alt={product.title}
              width={300}
              height={300}
              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-sm"
              loading="lazy"
            />
          </div>
          
          <div className="space-y-4 flex-1 flex flex-col">
            {/* Fixed height container for title to ensure alignment */}
            <div className="h-14 flex items-start">
              <h3 className="font-bold text-lg line-clamp-2 text-foreground group-hover:text-primary transition-colors duration-300 leading-tight" title={product.title}>
                {truncateText(product.title, 50)}
              </h3>
            </div>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-muted-foreground text-xs font-semibold capitalize bg-muted/40 px-3 py-1.5 rounded-full border border-muted">
                {product.category}
              </span>
              <p className="font-black text-2xl text-primary">
                {formatPrice(product.price, locale)}
              </p>
            </div>
          </div>
        </Link>
        
        <Button 
          className="w-full mt-6 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white py-3.5 rounded-xl font-semibold text-base transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer shadow-sm relative z-10"
          onClick={handleAddToCart}
        >
          {t('product.addToCart')}
        </Button>
      </div>
    );
  }

  return (
    <div className="group relative rounded-lg border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-md">
      <Link href={`/${locale}/products/${product.id}`}>
        <div className="aspect-square overflow-hidden rounded-t-lg">
          <Image
            src={product.image}
            alt={product.title}
            width={300}
            height={300}
            className="h-full w-full object-contain p-4 transition-transform group-hover:scale-105"
            loading="lazy"
          />
        </div>
        
        <div className="p-4 space-y-2">
          <div className="space-y-1">
            <h3 className="font-semibold leading-none tracking-tight line-clamp-2">
              {truncateText(product.title, 60)}
            </h3>
            <p className="text-sm text-muted-foreground capitalize">
              {product.category}
            </p>
          </div>
          
          {product.rating && (
            <div className="flex items-center space-x-2">
              <span className="text-xs text-muted-foreground">
                {getStarRating(product.rating.rate)}
              </span>
              <span className="text-xs text-muted-foreground">
                ({product.rating.count})
              </span>
            </div>
          )}
          
          <div className="flex items-center justify-between pt-2">
            <span className="text-lg font-bold">
              {formatPrice(product.price, locale)}
            </span>
            
            {onAddToCart && (
              <Button
                size="sm"
                onClick={handleAddToCart}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {t('product.addToCart')}
              </Button>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
});
