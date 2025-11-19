import axios from 'axios';
import type { WeatherData, CitySearchResult, AirQuality } from '../types';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

interface GeoCodingResponse {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

export const weatherApi = {
  async getWeatherByCity(city: string): Promise<WeatherData> {
    try {
      // First, get coordinates
      const geoResponse = await axios.get(`${GEO_URL}/direct`, {
        params: {
          q: city,
          limit: 1,
          appid: API_KEY,
        },
      });

      if (!geoResponse.data || geoResponse.data.length === 0) {
        throw new Error('City not found');
      }

      const { lat, lon, name, country } = geoResponse.data[0];
      return this.getWeatherByCoords(lat, lon, name, country);
    } catch (error) {
      console.error('Error fetching weather by city:', error);
      throw error;
    }
  },

  async getWeatherByCoords(
    lat: number,
    lon: number,
    name?: string,
    country?: string
  ): Promise<WeatherData> {
    try {
      // Fetch current weather and forecast
      const [currentResponse, forecastResponse, airQualityResponse] = await Promise.all([
        axios.get(`${BASE_URL}/weather`, {
          params: {
            lat,
            lon,
            appid: API_KEY,
            units: 'metric',
          },
        }),
        axios.get(`${BASE_URL}/onecall`, {
          params: {
            lat,
            lon,
            appid: API_KEY,
            units: 'metric',
            exclude: 'minutely',
          },
        }),
        this.getAirQuality(lat, lon).catch(() => null),
      ]);

      const current = currentResponse.data;
      const forecast = forecastResponse.data;

      return {
        location: {
          name: name || current.name,
          country: country || current.sys.country,
          lat,
          lon,
          timezone: forecast.timezone,
          localTime: new Date(forecast.current.dt * 1000).toISOString(),
        },
        current: {
          temp: forecast.current.temp,
          feelsLike: forecast.current.feels_like,
          humidity: forecast.current.humidity,
          pressure: forecast.current.pressure,
          windSpeed: forecast.current.wind_speed,
          windDeg: forecast.current.wind_deg,
          clouds: forecast.current.clouds,
          uvi: forecast.current.uvi,
          visibility: forecast.current.visibility,
          dewPoint: forecast.current.dew_point,
          sunrise: forecast.current.sunrise,
          sunset: forecast.current.sunset,
          description: forecast.current.weather[0].description,
          icon: forecast.current.weather[0].icon,
          main: forecast.current.weather[0].main,
        },
        forecast: {
          daily: forecast.daily,
        },
        hourly: forecast.hourly.slice(0, 24),
        airQuality: airQualityResponse || undefined,
        alerts: forecast.alerts,
      };
    } catch (error) {
      console.error('Error fetching weather by coordinates:', error);
      throw error;
    }
  },

  async getAirQuality(lat: number, lon: number): Promise<AirQuality> {
    try {
      const response = await axios.get(`${BASE_URL}/air_pollution`, {
        params: {
          lat,
          lon,
          appid: API_KEY,
        },
      });

      const data = response.data.list[0];
      return {
        aqi: data.main.aqi,
        components: data.components,
      };
    } catch (error) {
      console.error('Error fetching air quality:', error);
      throw error;
    }
  },

  async searchCities(query: string): Promise<CitySearchResult[]> {
    try {
      const response = await axios.get(`${GEO_URL}/direct`, {
        params: {
          q: query,
          limit: 5,
          appid: API_KEY,
        },
      });

      return response.data.map((city: GeoCodingResponse) => ({
        name: city.name,
        country: city.country,
        state: city.state,
        lat: city.lat,
        lon: city.lon,
      }));
    } catch (error) {
      console.error('Error searching cities:', error);
      throw error;
    }
  },

  async getCurrentLocation(): Promise<{ lat: number; lon: number }> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        }
      );
    });
  },
};
