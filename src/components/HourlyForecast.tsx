import { motion } from 'framer-motion';
import { useWeatherStore } from '../store/useWeatherStore';
import { formatTemperature, formatTime } from '../utils/helpers';

export const HourlyForecast = () => {
  const { weatherData, settings } = useWeatherStore();

  if (!weatherData || !weatherData.hourly) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-4xl mx-auto mb-6"
    >
      <h3 className="text-2xl font-bold text-white mb-4">Hourly Forecast</h3>
      <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-6 overflow-x-auto">
        <div className="flex gap-4 min-w-max">
          {weatherData.hourly.slice(0, 12).map((hour) => (
            <div
              key={hour.dt}
              className="flex flex-col items-center min-w-[80px] p-3 bg-white/10 dark:bg-gray-700/30 rounded-xl border border-white/20 dark:border-gray-600/50"
            >
              <div className="text-white/80 text-sm font-medium mb-2">
                {formatTime(hour.dt, settings.timeFormat)}
              </div>
              <img
                src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                alt={hour.weather[0].description}
                className="w-12 h-12"
              />
              <div className="text-white font-bold text-lg">
                {formatTemperature(hour.temp, settings.temperatureUnit)}
              </div>
              <div className="text-white/60 text-xs mt-1">
                {Math.round(hour.pop * 100)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
