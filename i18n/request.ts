import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const locales = ['tr', 'en'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  const currentLocale = locale || 'tr';
  
  if (!locales.includes(currentLocale as Locale)) {
    notFound();
  }

  try {
    return {
      locale: currentLocale,
      messages: (await import(`./messages/${currentLocale}.json`)).default
    };
  } catch (error) {
    return {
      locale: 'tr',
      messages: (await import(`./messages/tr.json`)).default
    };
  }
});
