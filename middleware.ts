import { NextRequest, NextResponse } from 'next/server';

import { LOCALES, DEFAULT_LOCALE } from '@/lib/utils/constants';

const locales = LOCALES;
const defaultLocale = DEFAULT_LOCALE;

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  if (!pathnameHasLocale) {
    const locale = defaultLocale;
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: [
    '/((?!_next|api|favicon.ico).*)',
  ]
};
