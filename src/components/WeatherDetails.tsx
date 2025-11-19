import { motion } from 'framer-motion';
import { Sunrise, Sunset, Sun, Thermometer } from 'lucide-react';
import { useWeatherStore } from '../store/useWeatherStore';
import { formatTime, getUVIndexLabel, formatTemperature } from '../utils/helpers';

export const WeatherDetails = () => {
  const { weatherData, settings } = useWeatherStore();

  if (!weatherData) return null;

  const { current } = weatherData;
  const uvIndex = getUVIndexLabel(current.uvi);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="w-full max-w-4xl mx-auto mb-6"
    >
      <h3 className="text-2xl font-bold text-white mb-4">Weather Details</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <DetailCard
          icon={<Sunrise className="w-6 h-6" />}
          label="Sunrise"
          value={formatTime(current.sunrise, settings.timeFormat)}
        />
        <DetailCard
          icon={<Sunset className="w-6 h-6" />}
          label="Sunset"
          value={formatTime(current.sunset, settings.timeFormat)}
        />
        <DetailCard
          icon={<Sun className="w-6 h-6" />}
          label="UV Index"
          value={current.uvi.toFixed(1)}
          subtitle={uvIndex.label}
          subtitleColor={uvIndex.color}
        />
        <DetailCard
          icon={<Thermometer className="w-6 h-6" />}
          label="Dew Point"
          value={formatTemperature(current.dewPoint, settings.temperatureUnit)}
        />
      </div>
    </motion.div>
  );
};

interface DetailCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtitle?: string;
  subtitleColor?: string;
}

const DetailCard = ({ icon, label, value, subtitle, subtitleColor }: DetailCardProps) => (
  <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/50 p-6">
    <div className="flex items-center gap-3 mb-3 text-white/60">
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
    <div className="text-3xl font-bold text-white">{value}</div>
    {subtitle && (
      <div className={`text-sm mt-2 ${subtitleColor || 'text-white/60'}`}>
        {subtitle}
      </div>
    )}
  </div>
);
