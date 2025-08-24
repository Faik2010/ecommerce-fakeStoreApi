'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/utils';
import type { CartItem as CartItemType } from '@/types';

interface CartItemProps {
  item: CartItemType;
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

export function CartItem({ item, onRemove, onUpdateQuantity }: CartItemProps) {
  const t = useTranslations();
  const locale = useLocale();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      onRemove(item.id);
    } else {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="border rounded-lg p-4">
      <div className="flex gap-4">
        <Link href={`/products/${item.id}`} className="flex-shrink-0">
          <div className="w-20 h-20 border rounded overflow-hidden bg-white">
            <Image
              src={item.image}
              alt={item.title}
              width={80}
              height={80}
              className="w-full h-full object-contain p-2"
            />
          </div>
        </Link>

        <div className="flex-1 space-y-2">
          <Link 
            href={`/products/${item.id}`}
            className="font-semibold hover:text-primary line-clamp-2"
          >
            {item.title}
          </Link>
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold">
              {formatPrice(item.price, locale)}
            </span>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuantityChange(item.quantity - 1)}
                className="h-8 w-8 p-0"
              >
                -
              </Button>
              
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                className="w-16 text-center border rounded px-2 py-1"
              />
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuantityChange(item.quantity + 1)}
                className="h-8 w-8 p-0"
              >
                +
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">
              {t('cart.quantity')}: {item.quantity}
            </span>
            
            <div className="flex items-center space-x-4">
              <span className="font-semibold">
                {formatPrice(item.price * item.quantity, locale)}
              </span>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => onRemove(item.id)}
                className="text-destructive hover:text-destructive"
              >
                {t('cart.remove')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
