'use client';

import { useTheme } from '@/hooks/use-theme';
import { Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm">
        <div className="w-5 h-5 bg-white/50 rounded animate-pulse"></div>
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 backdrop-blur-sm cursor-pointer group"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
      ) : (
        <Moon className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
      )}
    </button>
  );
}
