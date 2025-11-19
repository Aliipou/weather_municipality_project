import { motion } from 'framer-motion';
import { useWeatherStore } from '../store/useWeatherStore';
import { formatTemperature, formatDate } from '../utils/helpers';

export const DailyForecast = () => {
  const { weatherData, settings } = useWeatherStore();

  if (!weatherData || !weatherData.forecast) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full max-w-4xl mx-auto mb-6"
    >
      <h3 className="text-2xl font-bold text-white mb-4">7-Day Forecast</h3>
      <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-6">
        <div className="space-y-3">
          {weatherData.forecast.daily.slice(0, 7).map((day) => (
            <div
              key={day.dt}
              className="flex items-center justify-between p-4 bg-white/10 dark:bg-gray-700/30 rounded-xl border border-white/20 dark:border-gray-600/50 hover:bg-white/20 dark:hover:bg-gray-600/30 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="text-white font-medium w-24">
                  {formatDate(day.dt)}
                </div>
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                  alt={day.weather[0].description}
                  className="w-12 h-12"
                />
                <div className="text-white/80 capitalize flex-1">
                  {day.weather[0].description}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-white/60 text-sm">
                  {Math.round(day.pop * 100)}% rain
                </div>
                <div className="flex gap-2">
                  <span className="text-white font-bold">
                    {formatTemperature(day.temp.max, settings.temperatureUnit)}
                  </span>
                  <span className="text-white/60">
                    {formatTemperature(day.temp.min, settings.temperatureUnit)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
