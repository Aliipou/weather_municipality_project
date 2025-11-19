import { useCallback } from 'react';
import { weatherApi } from '../services/weatherApi';
import { useWeatherStore } from '../store/useWeatherStore';

export const useWeather = () => {
  const { setWeatherData, setLoading, setError } = useWeatherStore();

  const fetchWeatherByCity = useCallback(
    async (city: string) => {
      try {
        setLoading(true);
        setError(null);
        const data = await weatherApi.getWeatherByCity(city);
        setWeatherData(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    },
    [setWeatherData, setLoading, setError]
  );

  const fetchWeatherByCoords = useCallback(
    async (lat: number, lon: number) => {
      try {
        setLoading(true);
        setError(null);
        const data = await weatherApi.getWeatherByCoords(lat, lon);
        setWeatherData(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    },
    [setWeatherData, setLoading, setError]
  );

  const fetchWeatherByCurrentLocation = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { lat, lon } = await weatherApi.getCurrentLocation();
      const data = await weatherApi.getWeatherByCoords(lat, lon);
      setWeatherData(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to get current location');
    } finally {
      setLoading(false);
    }
  }, [setWeatherData, setLoading, setError]);

  return {
    fetchWeatherByCity,
    fetchWeatherByCoords,
    fetchWeatherByCurrentLocation,
  };
};
