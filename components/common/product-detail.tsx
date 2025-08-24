'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useLocale, useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
import { useGetProductQuery } from '@/lib/store/api-slice';
import { addToCart } from '@/lib/store/slices/cart-slice';
import { Button } from '@/components/ui/button';
import { formatPrice, getStarRating } from '@/utils';

interface ProductDetailProps {
  productId: number;
}

export function ProductDetail({ productId }: ProductDetailProps) {
  const t = useTranslations();
  const locale = useLocale();
  const dispatch = useDispatch();
  const { data: product, isLoading, error } = useGetProductQuery(productId);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      toast.success(t('notifications.addedToCart'));
    }
  };

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (error || !product) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">{t('product.notFound')}</h1>
        <Link href="/products">
          <Button variant="outline">
            {t('product.backToProducts')}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <nav className="text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">
          {t('nav.home')}
        </Link>
        {' / '}
        <Link href="/products" className="hover:text-primary">
          {t('nav.products')}
        </Link>
        {' / '}
        <span className="text-foreground">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="aspect-square overflow-hidden rounded-lg border bg-white">
          <Image
            src={product.image}
            alt={product.title}
            width={600}
            height={600}
            className="h-full w-full object-contain p-8"
            priority
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="text-muted-foreground capitalize mt-2">
              {t('product.category')}: {product.category}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-lg">
              {getStarRating(product.rating.rate)}
            </span>
            <span className="text-muted-foreground">
              {product.rating.rate} ({product.rating.count} {t('product.rating')})
            </span>
          </div>

          <div className="text-3xl font-bold text-primary">
            {formatPrice(product.price, locale)}
          </div>

          <div>
            <h3 className="font-semibold mb-2">{t('product.details')}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          <Button
            size="lg"
            onClick={handleAddToCart}
            className="w-full md:w-auto"
          >
            {t('product.addToCart')}
          </Button>
        </div>
      </div>
    </div>
  );
}

function ProductDetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-4 bg-gray-200 rounded w-64"></div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
        
        <div className="space-y-6">
          <div className="h-8 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-6 bg-gray-200 rounded w-32"></div>
          <div className="h-6 bg-gray-200 rounded w-32"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
          <div className="h-12 bg-gray-200 rounded w-48"></div>
        </div>
      </div>
    </div>
  );
}
