import { useState, useEffect } from 'react';
import type { Theme } from '../types';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const saved = localStorage.getItem('og-theme');
    const initial = (saved as Theme) || 'dark';
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('og-theme', next);
    applyTheme(next);
  };

  return { theme, toggleTheme };
};
