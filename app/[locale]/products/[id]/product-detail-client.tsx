'use client';

import Link from 'next/link';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { OptimizedImage } from '@/components/optimized-image';
import { addToCart } from '@/lib/store/slices/cart-slice';
import { useTranslations } from '@/hooks/use-translations';
import type { Product } from '@/types';

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const dispatch = useDispatch();
  const { t, locale } = useTranslations();

  const stars = '★'.repeat(Math.floor(product.rating.rate)) + 
               '☆'.repeat(5 - Math.floor(product.rating.rate));

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(t('notifications.addedToCart'));
  };

  return (
    <div className="w-full">
      <nav className="text-sm text-muted-foreground mb-6 p-4 bg-muted/30 rounded-xl">
        <Link href={`/${locale}`} className="hover:text-primary transition-colors cursor-pointer">{t('nav.home')}</Link>
        {' / '}
        <Link href={`/${locale}/products`} className="hover:text-primary transition-colors cursor-pointer">{t('nav.products')}</Link>
        {' / '}
        <span className="text-foreground">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 lg:gap-16">
        <div className="bg-muted rounded-2xl p-8 flex items-center justify-center shadow-lg">
          <OptimizedImage 
            src={product.image} 
            alt={product.title}
            width={500}
            height={500}
            priority={true}
            className="max-w-full max-h-96 object-contain hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-2 text-foreground bg-gradient-to-r from-foreground via-primary to-blue-600 bg-clip-text text-transparent">
              {product.title}
            </h1>
            <p className="text-muted-foreground capitalize bg-muted/30 px-3 py-1 rounded-full inline-block">
              {t('product.category')}: {product.category}
            </p>
          </div>

          <div className="flex items-center space-x-2 p-4 bg-muted/30 rounded-xl">
            <span className="text-warning text-lg">{stars}</span>
            <span className="text-muted-foreground">
              {product.rating.rate} ({product.rating.count} {t('product.rating')})
            </span>
          </div>

          <div className="text-3xl font-bold text-primary p-4 bg-primary/10 rounded-xl">
            ₺{product.price}
          </div>

          <div className="p-4 bg-muted/30 rounded-xl">
            <h3 className="font-semibold mb-2 text-foreground">{t('product.details')}</h3>
            <p className="text-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="space-y-4">
            <button 
              className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-xl text-lg font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
              onClick={handleAddToCart}
            >
              {t('product.addToCart')}
            </button>
            
            <Link href={`/${locale}/products`}>
              <button className="w-full bg-secondary text-secondary-foreground py-2 px-6 rounded-xl hover:bg-secondary/80 transition-colors cursor-pointer">
                {t('product.backToProducts')}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
