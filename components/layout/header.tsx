'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/layout/language-switcher';
import { ThemeSwitcher } from '@/components/layout/theme-switcher';
import type { RootState } from '@/lib/store';

export function Header() {
  const t = useTranslations();

  const cartItems = useSelector((state: RootState) => state.cart.totalQuantity);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="font-bold text-xl">
              {t('home.title')}
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {t('nav.home')}
            </Link>
            <Link 
              href="/products"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {t('nav.products')}
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <ThemeSwitcher />
            <LanguageSwitcher />
            
            <Link href="/cart">
              <Button variant="outline" size="sm" className="relative">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5H21M9 19a2 2 0 100 4 2 2 0 000-4zM20 19a2 2 0 100 4 2 2 0 000-4z"
                  />
                </svg>
                {cartItems > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {cartItems}
                  </span>
                )}
                <span className="sr-only">{t('nav.cart')}</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
