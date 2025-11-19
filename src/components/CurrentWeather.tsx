import { motion } from 'framer-motion';
import { MapPin, Wind, Droplets, Eye, Gauge } from 'lucide-react';
import { useWeatherStore } from '../store/useWeatherStore';
import { formatTemperature, formatWindSpeed, getWindDirection } from '../utils/helpers';

export const CurrentWeather = () => {
  const { weatherData, settings } = useWeatherStore();

  if (!weatherData) return null;

  const { location, current } = weatherData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-8 mb-6">
        {/* Location */}
        <div className="flex items-center gap-2 mb-6">
          <MapPin className="w-5 h-5 text-white/80" />
          <h2 className="text-2xl font-bold text-white">
            {location.name}, {location.country}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Main Weather */}
          <div className="flex flex-col items-center justify-center">
            <img
              src={`https://openweathermap.org/img/wn/${current.icon}@4x.png`}
              alt={current.description}
              className="w-40 h-40"
            />
            <div className="text-7xl font-bold text-white mb-2">
              {formatTemperature(current.temp, settings.temperatureUnit)}
            </div>
            <div className="text-xl text-white/80 capitalize mb-2">
              {current.description}
            </div>
            <div className="text-lg text-white/60">
              Feels like {formatTemperature(current.feelsLike, settings.temperatureUnit)}
            </div>
          </div>

          {/* Weather Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <WeatherDetailCard
              icon={<Wind className="w-6 h-6" />}
              label="Wind"
              value={formatWindSpeed(current.windSpeed, settings.windSpeedUnit)}
              subtitle={getWindDirection(current.windDeg)}
            />
            <WeatherDetailCard
              icon={<Droplets className="w-6 h-6" />}
              label="Humidity"
              value={`${current.humidity}%`}
            />
            <WeatherDetailCard
              icon={<Gauge className="w-6 h-6" />}
              label="Pressure"
              value={`${current.pressure} hPa`}
            />
            <WeatherDetailCard
              icon={<Eye className="w-6 h-6" />}
              label="Visibility"
              value={`${(current.visibility / 1000).toFixed(1)} km`}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface WeatherDetailCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtitle?: string;
}

const WeatherDetailCard = ({ icon, label, value, subtitle }: WeatherDetailCardProps) => (
  <div className="bg-white/10 dark:bg-gray-700/30 backdrop-blur-md rounded-2xl p-4 border border-white/20 dark:border-gray-600/50">
    <div className="flex items-center gap-2 mb-2 text-white/60">
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
    <div className="text-2xl font-bold text-white">{value}</div>
    {subtitle && <div className="text-sm text-white/60 mt-1">{subtitle}</div>}
  </div>
);
