export const formatTemperature = (temp: number, unit: 'celsius' | 'fahrenheit'): string => {
  if (unit === 'fahrenheit') {
    return `${Math.round((temp * 9) / 5 + 32)}°F`;
  }
  return `${Math.round(temp)}°C`;
};

export const formatWindSpeed = (speed: number, unit: 'ms' | 'kmh' | 'mph'): string => {
  switch (unit) {
    case 'kmh':
      return `${Math.round(speed * 3.6)} km/h`;
    case 'mph':
      return `${Math.round(speed * 2.237)} mph`;
    default:
      return `${Math.round(speed)} m/s`;
  }
};

export const formatPressure = (pressure: number, unit: 'hpa' | 'inhg'): string => {
  if (unit === 'inhg') {
    return `${(pressure * 0.02953).toFixed(2)} inHg`;
  }
  return `${pressure} hPa`;
};

export const getWindDirection = (deg: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(deg / 22.5) % 16;
  return directions[index];
};

export const getAirQualityLabel = (aqi: number): { label: string; color: string } => {
  switch (aqi) {
    case 1:
      return { label: 'Good', color: 'text-green-500' };
    case 2:
      return { label: 'Fair', color: 'text-yellow-500' };
    case 3:
      return { label: 'Moderate', color: 'text-orange-500' };
    case 4:
      return { label: 'Poor', color: 'text-red-500' };
    case 5:
      return { label: 'Very Poor', color: 'text-purple-500' };
    default:
      return { label: 'Unknown', color: 'text-gray-500' };
  }
};

export const getUVIndexLabel = (uvi: number): { label: string; color: string } => {
  if (uvi <= 2) return { label: 'Low', color: 'text-green-500' };
  if (uvi <= 5) return { label: 'Moderate', color: 'text-yellow-500' };
  if (uvi <= 7) return { label: 'High', color: 'text-orange-500' };
  if (uvi <= 10) return { label: 'Very High', color: 'text-red-500' };
  return { label: 'Extreme', color: 'text-purple-500' };
};

export const getWeatherBackground = (main: string, icon: string): string => {
  const isNight = icon.endsWith('n');

  switch (main.toLowerCase()) {
    case 'clear':
      return isNight
        ? 'bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900'
        : 'bg-gradient-to-br from-blue-400 via-cyan-400 to-blue-500';
    case 'clouds':
      return isNight
        ? 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900'
        : 'bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500';
    case 'rain':
    case 'drizzle':
      return 'bg-gradient-to-br from-blue-600 via-gray-600 to-blue-800';
    case 'thunderstorm':
      return 'bg-gradient-to-br from-gray-800 via-purple-900 to-gray-900';
    case 'snow':
      return 'bg-gradient-to-br from-blue-100 via-white to-blue-200';
    case 'mist':
    case 'fog':
    case 'haze':
      return 'bg-gradient-to-br from-gray-500 via-gray-400 to-gray-600';
    default:
      return 'bg-gradient-to-br from-blue-500 via-blue-400 to-cyan-400';
  }
};

export const formatTime = (timestamp: number, format: '12h' | '24h'): string => {
  const date = new Date(timestamp * 1000);
  if (format === '12h') {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  }
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
};

export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};
