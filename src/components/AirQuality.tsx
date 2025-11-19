import { motion } from 'framer-motion';
import { Wind } from 'lucide-react';
import { useWeatherStore } from '../store/useWeatherStore';
import { getAirQualityLabel } from '../utils/helpers';

export const AirQuality = () => {
  const { weatherData } = useWeatherStore();

  if (!weatherData || !weatherData.airQuality) return null;

  const { aqi, components } = weatherData.airQuality;
  const { label, color } = getAirQualityLabel(aqi);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="w-full max-w-4xl mx-auto mb-6"
    >
      <h3 className="text-2xl font-bold text-white mb-4">Air Quality</h3>
      <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 bg-white/10 dark:bg-gray-700/30 rounded-2xl">
            <Wind className="w-8 h-8 text-white" />
          </div>
          <div>
            <div className="text-sm text-white/60 mb-1">Air Quality Index</div>
            <div className={`text-3xl font-bold ${color}`}>{label}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <PollutantCard label="PM2.5" value={components.pm2_5.toFixed(1)} unit="μg/m³" />
          <PollutantCard label="PM10" value={components.pm10.toFixed(1)} unit="μg/m³" />
          <PollutantCard label="O₃" value={components.o3.toFixed(1)} unit="μg/m³" />
          <PollutantCard label="NO₂" value={components.no2.toFixed(1)} unit="μg/m³" />
        </div>
      </div>
    </motion.div>
  );
};

interface PollutantCardProps {
  label: string;
  value: string;
  unit: string;
}

const PollutantCard = ({ label, value, unit }: PollutantCardProps) => (
  <div className="bg-white/10 dark:bg-gray-700/30 backdrop-blur-md rounded-xl p-3 border border-white/20 dark:border-gray-600/50">
    <div className="text-white/60 text-xs mb-1">{label}</div>
    <div className="text-white font-bold text-lg">{value}</div>
    <div className="text-white/40 text-xs">{unit}</div>
  </div>
);
