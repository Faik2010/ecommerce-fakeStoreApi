'use client';

import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useTranslations } from '@/hooks/use-translations';
import { ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadCartFromStorage } from '@/lib/store/slices/cart-slice';
import type { RootState } from '@/lib/store';

export function CartCounter() {
  const dispatch = useDispatch();
  const { totalQuantity } = useSelector((state: RootState) => state.cart);
  const { locale } = useTranslations();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    dispatch(loadCartFromStorage());
    setMounted(true);
  }, [dispatch]);

  return (
    <Link href={`/${locale}/cart`} className="hover:text-blue-200 transition-all duration-200 relative group cursor-pointer">
      <span className="flex items-center space-x-2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 backdrop-blur-sm">
        <ShoppingCart className="w-5 h-5" />
        <span className="font-medium">{locale === 'tr' ? 'Sepet' : 'Cart'}</span>
        {mounted && totalQuantity > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce-gentle shadow-lg font-bold">
            {totalQuantity > 99 ? '99+' : totalQuantity}
          </span>
        )}
      </span>
    </Link>
  );
}