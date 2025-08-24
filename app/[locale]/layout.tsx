import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import '../globals.css';
import Link from 'next/link';
import { CartCounter } from '@/components/cart-counter';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { MobileNav } from '@/components/mobile-nav';
import { Providers } from '@/components/providers';
import { ShoppingBag, Home, Package } from 'lucide-react';

const locales = ['tr', 'en'] as const;

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const { locale } = await params;
  
  const titles = {
    tr: 'E-Ticaret Mağazası - En İyi Ürünler',
    en: 'E-Commerce Store - Best Products'
  };
  
  const descriptions = {
    tr: 'Modern e-ticaret mağazası. En kaliteli ürünleri keşfedin, güvenli alışveriş yapın.',
    en: 'Modern e-commerce store. Discover quality products and shop securely.'
  };

  return {
    title: titles[locale as 'tr' | 'en'] || titles.tr,
    description: descriptions[locale as 'tr' | 'en'] || descriptions.tr,
    keywords: ['e-commerce', 'shopping', 'products', 'store', 'online shopping'],
    authors: [{ name: 'E-Commerce Store' }],
    creator: 'E-Commerce Store',
    publisher: 'E-Commerce Store',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale,
      url: `https://ecommerce-store.vercel.app/${locale}`,
      title: titles[locale as 'tr' | 'en'] || titles.tr,
      description: descriptions[locale as 'tr' | 'en'] || descriptions.tr,
      siteName: 'E-Commerce Store',
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale as 'tr' | 'en'] || titles.tr,
      description: descriptions[locale as 'tr' | 'en'] || descriptions.tr,
    },
    alternates: {
      canonical: `https://ecommerce-store.vercel.app/${locale}`,
      languages: {
        'tr': 'https://ecommerce-store.vercel.app/tr',
        'en': 'https://ecommerce-store.vercel.app/en',
      },
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/favicon.ico',
    },
    viewport: {
      width: 'device-width',
      initialScale: 1,
    },
    themeColor: '#2563eb',
    other: {
      'next-head-count': '0',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  
  if (!locales.includes(locale as 'tr' | 'en')) notFound();

  return (
    <Providers>
      <div className="min-h-screen bg-background text-foreground transition-all duration-300">
        <header className="fixed top-0 left-0 right-0 z-[9999] bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 dark:from-blue-800 dark:via-blue-900 dark:to-purple-900 text-white shadow-xl transition-all duration-300">
          <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
          <div className="relative max-w-7xl mx-auto flex justify-between items-center p-4">
            <Link href={`/${locale}`} className="text-xl font-bold hover:text-blue-200 transition-all duration-200 flex items-center space-x-3 group cursor-pointer">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-all duration-200">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent font-extrabold">
                E-Commerce Store
              </span>
            </Link>
          
            <nav className="hidden md:flex items-center space-x-8">
              <Link href={`/${locale}`} className="hover:text-blue-200 transition-all duration-200 font-medium relative group cursor-pointer flex items-center space-x-2">
                <Home className="w-4 h-4" />
                <span>{locale === 'tr' ? 'Ana Sayfa' : 'Home'}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-200 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href={`/${locale}/products`} className="hover:text-blue-200 transition-all duration-200 font-medium relative group cursor-pointer flex items-center space-x-2">
                <Package className="w-4 h-4" />
                <span>{locale === 'tr' ? 'Ürünler' : 'Products'}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-200 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <CartCounter />
              <div className="flex items-center space-x-2">
                <ThemeSwitcher />
                <LanguageSwitcher />
              </div>
            </nav>

            <MobileNav />
          </div>
        </header>
        
        <main className="pt-28 pb-8 px-4 sm:px-6 lg:px-8 transition-all duration-300">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
        
        <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-950 dark:from-gray-950 dark:via-gray-900 dark:to-black text-white p-8 text-center transition-all duration-300 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
          <div className="relative max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">E-Commerce Store</h3>
                <p className="text-gray-300 text-sm">
                  {locale === 'tr' ? 'En kaliteli ürünleri uygun fiyatlarla sunuyoruz.' : 'We offer the highest quality products at affordable prices.'}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">{locale === 'tr' ? 'Hızlı Linkler' : 'Quick Links'}</h3>
                <div className="space-y-2 text-sm">
                  <Link href={`/${locale}`} className="block text-gray-300 hover:text-white transition-colors cursor-pointer">
                    {locale === 'tr' ? 'Ana Sayfa' : 'Home'}
                  </Link>
                  <Link href={`/${locale}/products`} className="block text-gray-300 hover:text-white transition-colors cursor-pointer">
                    {locale === 'tr' ? 'Ürünler' : 'Products'}
                  </Link>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">{locale === 'tr' ? 'İletişim' : 'Contact'}</h3>
                <p className="text-gray-300 text-sm">
                  {locale === 'tr' ? 'info@ecommerce.com' : 'info@ecommerce.com'}
                </p>
              </div>
            </div>
            <div className="border-t border-gray-700 pt-6">
              <p className="text-sm opacity-90">
                &copy; 2025 E-Commerce Store. {locale === 'tr' ? 'Tüm hakları saklıdır.' : 'All rights reserved.'}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Providers>
  );
}