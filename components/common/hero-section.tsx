'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  const t = useTranslations('home');

  return (
    <section className="text-center py-16">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
        {t('title')}
      </h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
        {t('subtitle')}
      </p>
      <Link href="/products">
        <Button size="lg" className="text-lg px-8 py-6">
          {t('viewAllProducts')}
        </Button>
      </Link>
    </section>
  );
}
