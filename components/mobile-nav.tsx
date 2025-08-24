'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CartCounter } from '@/components/cart-counter';
import { useTranslations } from '@/hooks/use-translations';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Menu, X, Home, Package } from 'lucide-react';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { locale } = useTranslations();

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 backdrop-blur-sm cursor-pointer"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-gradient-to-b from-blue-600 to-purple-700 dark:from-blue-800 dark:to-purple-900 border-t border-blue-500/50 z-[9998] backdrop-blur-sm">
          <nav className="flex flex-col p-6 space-y-4">
            <Link 
              href={`/${locale}`}
              className="flex items-center space-x-3 text-white hover:text-blue-200 transition-all duration-200 py-3 px-4 rounded-lg hover:bg-white/10 cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">{locale === 'tr' ? 'Ana Sayfa' : 'Home'}</span>
            </Link>
            <Link 
              href={`/${locale}/products`}
              className="flex items-center space-x-3 text-white hover:text-blue-200 transition-all duration-200 py-3 px-4 rounded-lg hover:bg-white/10 cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <Package className="w-5 h-5" />
              <span className="font-medium">{locale === 'tr' ? 'Ürünler' : 'Products'}</span>
            </Link>
            
            <div className="flex items-center justify-between pt-6 border-t border-white/20">
              <CartCounter />
              <div className="flex items-center space-x-3">
                <ThemeSwitcher />
                <LanguageSwitcher />
              </div>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
