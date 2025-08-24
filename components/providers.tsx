'use client';

import { Provider } from 'react-redux';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';
import { store } from '@/lib/store';
import { useEffect, useState } from 'react';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Provider store={store}>
        <div className="min-h-screen bg-background text-foreground">
          {children}
        </div>
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'hsl(var(--background))',
              color: 'hsl(var(--foreground))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '12px',
              padding: '16px 20px',
              fontSize: '14px',
              fontWeight: '500',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              backdropFilter: 'blur(8px)',
              maxWidth: '400px',
            },
            success: {
              style: {
                background: 'hsl(var(--background))',
                color: 'hsl(var(--foreground))',
                border: '1px solid #10b981',
                borderLeft: '4px solid #10b981',
              },
              iconTheme: {
                primary: '#10b981',
                secondary: 'hsl(var(--background))',
              },
            },
            error: {
              style: {
                background: 'hsl(var(--background))',
                color: 'hsl(var(--foreground))',
                border: '1px solid #ef4444',
                borderLeft: '4px solid #ef4444',
              },
              iconTheme: {
                primary: '#ef4444',
                secondary: 'hsl(var(--background))',
              },
            },
            loading: {
              style: {
                background: 'hsl(var(--background))',
                color: 'hsl(var(--foreground))',
                border: '1px solid #3b82f6',
                borderLeft: '4px solid #3b82f6',
              },
            },
          }}
          containerStyle={{
            top: '80px',
          }}
        />
      </ThemeProvider>
    </Provider>
  );
}
