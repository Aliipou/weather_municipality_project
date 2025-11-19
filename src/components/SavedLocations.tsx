import { motion } from 'framer-motion';
import { Bookmark, Trash2 } from 'lucide-react';
import { useWeatherStore } from '../store/useWeatherStore';
import { useWeather } from '../hooks/useWeather';

export const SavedLocations = () => {
  const { savedLocations, removeSavedLocation, weatherData } = useWeatherStore();
  const { fetchWeatherByCoords } = useWeather();

  if (savedLocations.length === 0) return null;

  const handleAddCurrentLocation = () => {
    if (!weatherData) return;

    const { location } = weatherData;
    const newLocation = {
      id: `${location.lat}-${location.lon}`,
      name: location.name,
      country: location.country,
      lat: location.lat,
      lon: location.lon,
      addedAt: Date.now(),
    };

    const { addSavedLocation } = useWeatherStore.getState();
    const exists = savedLocations.some((loc) => loc.id === newLocation.id);

    if (!exists) {
      addSavedLocation(newLocation);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="w-full max-w-4xl mx-auto mb-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-white">Saved Locations</h3>
        <button
          onClick={handleAddCurrentLocation}
          className="flex items-center gap-2 px-4 py-2 bg-white/20 dark:bg-gray-800/50 backdrop-blur-md rounded-xl border border-white/30 dark:border-gray-700 text-white hover:bg-white/30 dark:hover:bg-gray-700/50 transition-all"
        >
          <Bookmark className="w-4 h-4" />
          Save Current
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {savedLocations.map((location) => (
          <div
            key={location.id}
            className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/50 p-4 hover:bg-white/20 dark:hover:bg-gray-700/30 transition-all cursor-pointer group"
            onClick={() => fetchWeatherByCoords(location.lat, location.lon)}
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-white font-bold text-lg">{location.name}</h4>
                <p className="text-white/60 text-sm">{location.country}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeSavedLocation(location.id);
                }}
                className="p-2 rounded-lg bg-red-500/20 text-red-300 opacity-0 group-hover:opacity-100 hover:bg-red-500/30 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export const SaveCurrentLocationButton = () => {
  const { savedLocations, weatherData, addSavedLocation } = useWeatherStore();

  if (!weatherData) return null;

  const handleSave = () => {
    const { location } = weatherData;
    const newLocation = {
      id: `${location.lat}-${location.lon}`,
      name: location.name,
      country: location.country,
      lat: location.lat,
      lon: location.lon,
      addedAt: Date.now(),
    };

    const exists = savedLocations.some((loc) => loc.id === newLocation.id);

    if (!exists) {
      addSavedLocation(newLocation);
    }
  };

  const isSaved = savedLocations.some(
    (loc) => loc.id === `${weatherData.location.lat}-${weatherData.location.lon}`
  );

  return (
    <button
      onClick={handleSave}
      disabled={isSaved}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-md border transition-all ${
        isSaved
          ? 'bg-green-500/20 border-green-500/50 text-green-300 cursor-not-allowed'
          : 'bg-white/20 dark:bg-gray-800/50 border-white/30 dark:border-gray-700 text-white hover:bg-white/30 dark:hover:bg-gray-700/50'
      }`}
    >
      <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
      {isSaved ? 'Saved' : 'Save Location'}
    </button>
  );
};
