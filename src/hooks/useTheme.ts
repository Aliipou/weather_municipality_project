import { useEffect } from 'react';
import { useWeatherStore } from '../store/useWeatherStore';

export const useTheme = () => {
  const { settings, updateSettings } = useWeatherStore();

  useEffect(() => {
    const root = window.document.documentElement;

    if (settings.theme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', prefersDark);
    } else {
      root.classList.toggle('dark', settings.theme === 'dark');
    }
  }, [settings.theme]);

  const toggleTheme = () => {
    const themes: Array<'light' | 'dark' | 'auto'> = ['light', 'dark', 'auto'];
    const currentIndex = themes.indexOf(settings.theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    updateSettings({ theme: nextTheme });
  };

  return { theme: settings.theme, toggleTheme };
};
