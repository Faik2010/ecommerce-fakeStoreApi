'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function LanguageSwitcher() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = () => {
    const newLocale = locale === 'tr' ? 'en' : 'tr';
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={switchLanguage}
      className="h-8 w-8 p-0"
    >
      <span className="text-sm font-medium">
        {locale === 'tr' ? 'EN' : 'TR'}
      </span>
      <span className="sr-only">{t('nav.language')}</span>
    </Button>
  );
}
