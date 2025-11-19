import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { WeatherData, SavedLocation, AppSettings } from '../types';

interface WeatherStore {
  weatherData: WeatherData | null;
  savedLocations: SavedLocation[];
  settings: AppSettings;
  isLoading: boolean;
  error: string | null;

  setWeatherData: (data: WeatherData | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  addSavedLocation: (location: SavedLocation) => void;
  removeSavedLocation: (id: string) => void;

  updateSettings: (settings: Partial<AppSettings>) => void;
}

export const useWeatherStore = create<WeatherStore>()(
  persist(
    (set) => ({
      weatherData: null,
      savedLocations: [],
      settings: {
        temperatureUnit: 'celsius',
        windSpeedUnit: 'ms',
        pressureUnit: 'hpa',
        timeFormat: '24h',
        theme: 'auto',
      },
      isLoading: false,
      error: null,

      setWeatherData: (data) => set({ weatherData: data, error: null }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error, isLoading: false }),

      addSavedLocation: (location) =>
        set((state) => ({
          savedLocations: [...state.savedLocations, location],
        })),

      removeSavedLocation: (id) =>
        set((state) => ({
          savedLocations: state.savedLocations.filter((loc) => loc.id !== id),
        })),

      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
    }),
    {
      name: 'weather-app-storage',
      partialize: (state) => ({
        savedLocations: state.savedLocations,
        settings: state.settings,
      }),
    }
  )
);
