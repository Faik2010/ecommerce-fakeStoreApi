import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getStaticProduct, getProductIds } from '@/lib/api/products';
import { notFound } from 'next/navigation';
import ProductDetailClient from './product-detail-client';

export const revalidate = 300;

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ id: string; locale: string }> 
}): Promise<Metadata> {
  const { id, locale } = await params;
  const { product } = await getProductDetailData(id) || {};

  if (!product) {
    return {
      title: locale === 'tr' ? 'Ürün Bulunamadı' : 'Product Not Found',
      description: locale === 'tr' ? 'Aradığınız ürün bulunamadı.' : 'The product you are looking for was not found.'
    };
  }

  const title = locale === 'tr' 
    ? `${product.title} - En İyi Fiyatlarla | E-Ticaret Mağazası`
    : `${product.title} - Best Prices | E-Commerce Store`;
    
  const description = locale === 'tr'
    ? `${product.title} ürününü en uygun fiyatlarla satın alın. ${product.description.substring(0, 100)}...`
    : `Buy ${product.title} at the best prices. ${product.description.substring(0, 100)}...`;

  return {
    title,
    description,
    keywords: [product.title, product.category, 'online shopping', 'e-commerce', 'best price'],
    openGraph: {
      title,
      description,
      images: [
        {
          url: product.image,
          width: 600,
          height: 600,
          alt: product.title,
        },
      ],
      type: 'website',
      locale: locale,
      url: `https://ecommerce-store.vercel.app/${locale}/products/${id}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [product.image],
    },
    alternates: {
      canonical: `https://ecommerce-store.vercel.app/${locale}/products/${id}`,
      languages: {
        'tr': `https://ecommerce-store.vercel.app/tr/products/${id}`,
        'en': `https://ecommerce-store.vercel.app/en/products/${id}`,
      },
    },
  };
}

export async function generateStaticParams() {
  try {
    const productIds = await getProductIds();
    return productIds.map((id) => ({
      id: id,
    }));
  } catch (error) {
    return [];
  }
}

async function getProductDetailData(id: string) {
  try {
    const product = await getStaticProduct(id);
    if (!product) {
      return null;
    }
    return { product };
  } catch (error) {
    return null;
  }
}

export default async function ProductDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string; locale: string }> 
}) {
  const { id, locale } = await params;
  const { product } = await getProductDetailData(id) || {};

  if (!product) {
    notFound();
  }

  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <ProductDetailClient product={product} />
    </Suspense>
  );
}

function ProductDetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-muted aspect-square rounded animate-pulse"></div>
        <div className="space-y-4">
          <div className="h-8 bg-muted rounded animate-pulse"></div>
          <div className="h-4 bg-muted rounded animate-pulse"></div>
          <div className="h-6 bg-muted rounded w-1/3 animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded animate-pulse"></div>
            <div className="h-4 bg-muted rounded animate-pulse"></div>
            <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}