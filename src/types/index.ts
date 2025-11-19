export interface WeatherData {
  location: LocationData;
  current: CurrentWeather;
  forecast: ForecastData;
  hourly: HourlyForecast[];
  airQuality?: AirQuality;
  alerts?: WeatherAlert[];
}

export interface LocationData {
  name: string;
  country: string;
  lat: number;
  lon: number;
  timezone: string;
  localTime: string;
}

export interface CurrentWeather {
  temp: number;
  feelsLike: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDeg: number;
  clouds: number;
  uvi: number;
  visibility: number;
  dewPoint: number;
  sunrise: number;
  sunset: number;
  description: string;
  icon: string;
  main: string;
}

export interface ForecastData {
  daily: DailyForecast[];
}

export interface DailyForecast {
  dt: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feelsLike: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;
  humidity: number;
  weather: WeatherCondition[];
  speed: number;
  deg: number;
  clouds: number;
  pop: number;
  rain?: number;
  snow?: number;
  uvi: number;
}

export interface HourlyForecast {
  dt: number;
  temp: number;
  feelsLike: number;
  pressure: number;
  humidity: number;
  clouds: number;
  windSpeed: number;
  windDeg: number;
  weather: WeatherCondition[];
  pop: number;
}

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface AirQuality {
  aqi: number;
  components: {
    co: number;
    no: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    nh3: number;
  };
}

export interface WeatherAlert {
  sender: string;
  event: string;
  start: number;
  end: number;
  description: string;
}

export interface SavedLocation {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
  addedAt: number;
}

export interface AppSettings {
  temperatureUnit: 'celsius' | 'fahrenheit';
  windSpeedUnit: 'ms' | 'kmh' | 'mph';
  pressureUnit: 'hpa' | 'inhg';
  timeFormat: '12h' | '24h';
  theme: 'light' | 'dark' | 'auto';
}

export interface CitySearchResult {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}
