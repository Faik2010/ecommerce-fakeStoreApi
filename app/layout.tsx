import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'E-Commerce Store',
  description: 'Modern e-commerce store with quality products',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fakestoreapi.com" />
        <link rel="dns-prefetch" href="https://fakestoreapi.com" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
