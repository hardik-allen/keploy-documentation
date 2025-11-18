'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Get initial theme from localStorage or system preference
    const getInitialTheme = (): Theme => {
      try {
        // Check localStorage first
        const savedTheme = localStorage.getItem('theme') as Theme | null;
        if (savedTheme === 'dark' || savedTheme === 'light') {
          return savedTheme;
        }
        
        // Check system preference
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          return 'dark';
        }
      } catch (e) {
        console.error('Error reading theme:', e);
      }
      return 'light';
    };

    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
    
    // Set dark class on HTML
    const html = document.documentElement;
    if (initialTheme === 'dark') {
      html.classList.add('dark');
      html.style.backgroundColor = '#000000';
      document.body.style.backgroundColor = '#000000';
    } else {
      html.classList.remove('dark');
      html.style.backgroundColor = '';
      document.body.style.backgroundColor = '';
    }
    
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme((currentTheme) => {
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      try {
        localStorage.setItem('theme', newTheme);
        const html = document.documentElement;
        if (newTheme === 'dark') {
          html.classList.add('dark');
          // Force background color
          html.style.backgroundColor = '#000000';
          document.body.style.backgroundColor = '#000000';
        } else {
          html.classList.remove('dark');
          html.style.backgroundColor = '';
          document.body.style.backgroundColor = '';
        }
      } catch (e) {
        console.error('Error toggling theme:', e);
      }
      
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

