# 🌤️ Advanced Weather App

A modern, feature-rich weather application built with React, TypeScript, and Vite. Get real-time weather data, forecasts, air quality information, and much more with a beautiful, responsive interface.

![Weather App](https://img.shields.io/badge/React-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue)
![Vite](https://img.shields.io/badge/Vite-5.0.8-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.6-cyan)

## ✨ Features

### Core Weather Features
- **Real-time Weather Data**: Current conditions with detailed metrics
- **Hourly Forecast**: 12-hour detailed forecast with precipitation probability
- **7-Day Forecast**: Extended forecast with high/low temperatures
- **Beautiful Weather Icons**: Visual representation of weather conditions
- **Dynamic Backgrounds**: Background changes based on current weather conditions

### Advanced Features
- **Air Quality Index**: Real-time air quality with pollutant breakdown (PM2.5, PM10, O₃, NO₂)
- **UV Index**: Sun exposure levels with color-coded warnings
- **Detailed Metrics**:
  - Wind speed and direction
  - Humidity levels
  - Atmospheric pressure
  - Visibility
  - Dew point
  - "Feels like" temperature
- **Sunrise & Sunset Times**: Daily solar information

### User Experience
- **City Search**: Smart autocomplete search for cities worldwide
- **Geolocation**: Instant weather for your current location
- **Saved Locations**: Bookmark your favorite cities for quick access
- **Theme Toggle**: Light, Dark, and Auto (system preference) modes
- **Unit Conversion**: Switch between Celsius/Fahrenheit and other units
- **Responsive Design**: Perfect on desktop, tablet, and mobile devices
- **Smooth Animations**: Powered by Framer Motion for delightful interactions
- **Loading States**: Beautiful loading animations while fetching data
- **Error Handling**: User-friendly error messages with retry options

### Data Persistence
- **Local Storage**: Saved locations and preferences persist between sessions
- **Settings Management**: Customizable temperature, wind speed, and time format preferences

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- OpenWeatherMap API key ([Get one free here](https://openweathermap.org/api))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Aliipou/weather_municipality_project.git
   cd weather_municipality_project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your OpenWeatherMap API key:
   ```
   VITE_WEATHER_API_KEY=your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Building for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` directory.

To preview the production build:
```bash
npm run preview
```

## 🛠️ Tech Stack

### Frontend Framework
- **React 18.2** - Modern React with hooks
- **TypeScript 5.2** - Type-safe development
- **Vite 5.0** - Lightning-fast build tool

### Styling
- **Tailwind CSS 3.3** - Utility-first CSS framework
- **Framer Motion 10.16** - Smooth animations and transitions
- **Lucide React** - Beautiful, consistent icons

### State Management
- **Zustand 4.4** - Lightweight state management
- **Persist Middleware** - Local storage integration

### Data Visualization
- **Recharts 2.10** - Responsive chart library

### API & Data
- **Axios 1.6** - HTTP client for API requests
- **OpenWeatherMap API** - Weather data provider
  - Current weather
  - One Call API (forecast, hourly, UV, etc.)
  - Air Pollution API
  - Geocoding API

### Utilities
- **date-fns 3.0** - Modern date utility library

## 📁 Project Structure

```
weatherapp/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── SearchBar.tsx
│   │   ├── CurrentWeather.tsx
│   │   ├── HourlyForecast.tsx
│   │   ├── DailyForecast.tsx
│   │   ├── AirQuality.tsx
│   │   ├── WeatherDetails.tsx
│   │   ├── SavedLocations.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── ErrorMessage.tsx
│   ├── hooks/           # Custom React hooks
│   │   ├── useWeather.ts
│   │   └── useTheme.ts
│   ├── services/        # API service layer
│   │   └── weatherApi.ts
│   ├── store/           # State management
│   │   └── useWeatherStore.ts
│   ├── types/           # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/           # Helper functions
│   │   └── helpers.ts
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # App entry point
│   └── index.css        # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## 🎨 Key Components

### SearchBar
Intelligent city search with autocomplete suggestions and current location detection.

### CurrentWeather
Large, prominent display of current conditions with temperature, description, and key metrics.

### HourlyForecast
Horizontal scrollable hourly forecast for the next 12 hours with precipitation probability.

### DailyForecast
7-day extended forecast with high/low temperatures and weather conditions.

### AirQuality
Detailed air quality information with AQI and pollutant breakdown.

### WeatherDetails
Additional weather metrics including sunrise/sunset, UV index, and dew point.

### SavedLocations
Manage and quickly access your favorite locations.

## 🌐 API Usage

This app uses the OpenWeatherMap API with the following endpoints:

- **Current Weather**: `/data/2.5/weather`
- **One Call API**: `/data/2.5/onecall` (forecast, hourly, daily, UV)
- **Air Pollution**: `/data/2.5/air_pollution`
- **Geocoding**: `/geo/1.0/direct`

**Note**: The One Call API 3.0 requires a subscription. For free usage, use One Call API 2.5.

## 🎯 Features Breakdown

### Dynamic Backgrounds
Background gradients automatically adjust based on:
- Current weather conditions (Clear, Clouds, Rain, Snow, etc.)
- Time of day (day/night cycle)

### Theme System
Three theme modes:
- **Light**: Bright, optimized for daytime viewing
- **Dark**: Easy on the eyes for night use
- **Auto**: Automatically matches system preferences

### Unit Conversion
Flexible unit options:
- Temperature: Celsius / Fahrenheit
- Wind Speed: m/s / km/h / mph
- Pressure: hPa / inHg
- Time Format: 12h / 24h

## 🔒 Privacy & Data

- **No user data collection**: The app only stores preferences locally
- **Local storage only**: Saved locations and settings remain on your device
- **API calls**: Weather data is fetched directly from OpenWeatherMap
- **No tracking**: No analytics or third-party tracking scripts

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Weather data powered by [OpenWeatherMap](https://openweathermap.org/)
- Icons by [Lucide](https://lucide.dev/)
- Animations by [Framer Motion](https://www.framer.com/motion/)
- Built with [Vite](https://vitejs.dev/)

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/Aliipou/weather_municipality_project/issues) page
2. Create a new issue with detailed information
3. Provide steps to reproduce any bugs

---

**Made with ❤️ and ☕**

Enjoy using the Advanced Weather App!
