'use client';

import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { useLocale, useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
import { removeFromCart, updateQuantity, clearCart } from '@/lib/store/slices/cart-slice';
import { Button } from '@/components/ui/button';
import { CartItem } from '@/components/common/cart-item';
import { formatPrice } from '@/utils';
import type { RootState } from '@/lib/store';

export function CartContainer() {
  const t = useTranslations();
  const locale = useLocale();
  const dispatch = useDispatch();
  const { items, totalQuantity, totalAmount } = useSelector((state: RootState) => state.cart);

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
    toast.success(t('notifications.removedFromCart'));
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
    toast.success(t('notifications.cartUpdated'));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success(t('notifications.cartUpdated'));
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mb-6">
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
        <h1 className="text-2xl font-bold mb-4">{t('cart.empty')}</h1>
        <Link href="/products">
          <Button size="lg">
            {t('cart.continueShopping')}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t('cart.title')}</h1>
        <Button 
          variant="outline" 
          onClick={handleClearCart}
          className="text-destructive hover:text-destructive"
        >
          {t('common.delete')} {t('cart.title')}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={handleRemoveItem}
              onUpdateQuantity={handleUpdateQuantity}
            />
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 space-y-4 sticky top-20">
            <h2 className="text-xl font-semibold">{t('cart.subtotal')}</h2>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {totalQuantity} {t('cart.items')}
                </span>
                <span>{formatPrice(totalAmount, locale)}</span>
              </div>
              
              <div className="border-t pt-2">
                <div className="flex justify-between font-semibold text-lg">
                  <span>{t('cart.total')}</span>
                  <span>{formatPrice(totalAmount, locale)}</span>
                </div>
              </div>
            </div>

            <Button size="lg" className="w-full">
              {t('cart.checkout')}
            </Button>

            <Link href="/products" className="block">
              <Button variant="outline" size="lg" className="w-full">
                {t('cart.continueShopping')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
