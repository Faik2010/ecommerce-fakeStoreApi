'use client';

import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useTranslations } from '@/hooks/use-translations';
import { OptimizedImage } from '@/components/optimized-image';
import { removeFromCart, updateQuantity, clearCart, loadCartFromStorage } from '@/lib/store/slices/cart-slice';
import type { RootState } from '@/lib/store';

export default function CartPage() {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalAmount } = useSelector((state: RootState) => state.cart);
  const { t, locale } = useTranslations();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    dispatch(loadCartFromStorage());
    setMounted(true);
  }, [dispatch]);

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <div className="bg-muted/30 rounded-2xl p-12 shadow-lg">
          <div className="mb-8">
            <svg 
              className="mx-auto h-24 w-24 text-muted-foreground"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1} 
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5H21M9 19a2 2 0 100 4 2 2 0 000-4zM20 19a2 2 0 100 4 2 2 0 000-4z" 
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-4 text-foreground">{t('cart.empty')}</h1>
          <p className="text-muted-foreground mb-8">Sepetiniz boş görünüyor. Alışverişe başlayın!</p>
          <Link href={`/${locale}/products`}>
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-xl text-lg hover:bg-primary/90 transition-colors cursor-pointer">
              {t('cart.continueShopping')}
            </button>
          </Link>
        </div>
      </div>
    );
  }

 
  if (!mounted) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8 p-4 bg-muted/30 rounded-xl">
          <h1 className="text-3xl font-bold text-foreground bg-gradient-to-r from-foreground via-primary to-blue-600 bg-clip-text text-transparent">
            {t('cart.title')}
          </h1>
          <div className="h-6 w-16 bg-muted rounded animate-pulse"></div>
        </div>
        <div className="animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border border-border rounded-2xl p-4 bg-card">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-muted rounded-xl"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-4 bg-muted rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-1">
              <div className="border border-border rounded-2xl p-6 bg-muted/30">
                <div className="h-6 bg-muted rounded w-24 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8 p-4 bg-muted/30 rounded-xl">
        <h1 className="text-3xl font-bold text-foreground bg-gradient-to-r from-foreground via-primary to-blue-600 bg-clip-text text-transparent">
          {t('cart.title')} ({totalQuantity} {t('cart.items')})
        </h1>
        <button 
          onClick={() => dispatch(clearCart())}
          className="text-destructive hover:text-destructive/80 font-medium transition-colors cursor-pointer"
        >
          {t('cart.remove')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="border border-border rounded-2xl p-4 bg-card shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="flex gap-4">
                <Link href={`/${locale}/products/${item.id}`} className="flex-shrink-0">
                  <div className="w-20 h-20 bg-muted rounded-xl border border-border flex items-center justify-center hover:scale-105 transition-transform duration-300">
                    <OptimizedImage
                      src={item.image}
                      alt={item.title}
                      width={80}
                      height={80}
                      className="max-w-full max-h-full object-contain cursor-pointer"
                    />
                  </div>
                </Link>

                <div className="flex-1 space-y-2">
                  <Link 
                    href={`/${locale}/products/${item.id}`}
                    className="font-semibold hover:text-primary line-clamp-2 text-foreground transition-colors cursor-pointer"
                  >
                    {item.title}
                  </Link>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">
                      ₺{item.price}
                    </span>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                        className="w-8 h-8 border border-border rounded-lg flex items-center justify-center hover:bg-muted bg-background text-foreground transition-colors cursor-pointer"
                      >
                        -
                      </button>
                      
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => dispatch(updateQuantity({ id: item.id, quantity: parseInt(e.target.value) || 1 }))}
                        className="w-16 text-center border border-border rounded-lg py-1 bg-background text-foreground"
                      />
                      
                      <button
                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                        className="w-8 h-8 border border-border rounded-lg flex items-center justify-center hover:bg-muted bg-background text-foreground transition-colors cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {t('cart.quantity')}: {item.quantity}
                    </span>
                    
                    <div className="flex items-center space-x-4">
                      <span className="font-semibold text-foreground">
                        ₺{(item.price * item.quantity).toFixed(2)}
                      </span>
                      
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="text-destructive hover:text-destructive/80 text-sm font-medium transition-colors cursor-pointer"
                      >
                        {t('cart.remove')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="border border-border rounded-2xl p-6 bg-muted/30 sticky top-4 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-foreground">{t('cart.total')}</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('cart.items')}:</span>
                <span className="text-foreground">{totalQuantity}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('cart.subtotal')}:</span>
                <span className="text-foreground">₺{totalAmount.toFixed(2)}</span>
              </div>
              
              <div className="border-t border-border pt-2">
                <div className="flex justify-between font-semibold text-lg">
                  <span className="text-foreground">{t('cart.total')}:</span>
                  <span className="text-primary">₺{totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button className="w-full bg-primary text-primary-foreground py-3 rounded-xl text-lg font-semibold hover:bg-primary/90 transition-colors mb-3 cursor-pointer">
              {t('cart.checkout')}
            </button>

            <Link href={`/${locale}/products`} className="block">
              <button className="w-full bg-secondary text-secondary-foreground py-2 rounded-xl hover:bg-secondary/80 transition-colors cursor-pointer">
                {t('cart.continueShopping')}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}