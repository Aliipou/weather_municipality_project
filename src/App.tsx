import { useEffect } from 'react';
import { Settings } from 'lucide-react';
import { useWeather } from './hooks/useWeather';
import { useWeatherStore } from './store/useWeatherStore';
import { getWeatherBackground } from './utils/helpers';
import { SearchBar } from './components/SearchBar';
import { CurrentWeather } from './components/CurrentWeather';
import { HourlyForecast } from './components/HourlyForecast';
import { DailyForecast } from './components/DailyForecast';
import { AirQuality } from './components/AirQuality';
import { WeatherDetails } from './components/WeatherDetails';
import { SavedLocations, SaveCurrentLocationButton } from './components/SavedLocations';
import { ThemeToggle } from './components/ThemeToggle';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';

function App() {
  const { weatherData, isLoading, error } = useWeatherStore();
  const { fetchWeatherByCity, fetchWeatherByCoords, fetchWeatherByCurrentLocation } = useWeather();

  useEffect(() => {
    // Try to load weather for a default city on first load
    fetchWeatherByCity('London');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const backgroundClass = weatherData
    ? getWeatherBackground(weatherData.current.main, weatherData.current.icon)
    : 'bg-gradient-to-br from-blue-500 via-blue-400 to-cyan-400';

  return (
    <div className={`min-h-screen ${backgroundClass} transition-all duration-1000`}>
      <div className="min-h-screen backdrop-blur-sm">
        {/* Header */}
        <header className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🌤️</div>
              <h1 className="text-3xl font-bold text-white">Advanced Weather</h1>
            </div>
            <div className="flex items-center gap-3">
              {weatherData && <SaveCurrentLocationButton />}
              <ThemeToggle />
              <button
                className="p-3 rounded-xl bg-white/20 dark:bg-gray-800/50 backdrop-blur-md border border-white/30 dark:border-gray-700 text-white hover:bg-white/30 dark:hover:bg-gray-700/50 transition-all"
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex justify-center">
            <SearchBar
              onCitySelect={fetchWeatherByCoords}
              onCurrentLocation={fetchWeatherByCurrentLocation}
            />
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 pb-12">
          {isLoading && <LoadingSpinner />}

          {error && !isLoading && (
            <ErrorMessage
              message={error}
              onRetry={() => fetchWeatherByCity('London')}
            />
          )}

          {weatherData && !isLoading && (
            <div className="space-y-6 animate-fade-in">
              <CurrentWeather />
              <HourlyForecast />
              <DailyForecast />
              <WeatherDetails />
              <AirQuality />
              <SavedLocations />
            </div>
          )}

          {!weatherData && !isLoading && !error && (
            <div className="text-center text-white py-20">
              <h2 className="text-2xl font-bold mb-4">Welcome to Advanced Weather</h2>
              <p className="text-white/80 mb-6">Search for a city or use your current location to get started</p>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-6 text-center text-white/60">
          <p>Powered by OpenWeatherMap API</p>
          <p className="text-sm mt-2">© 2024 Advanced Weather App</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
