# Weather and Municipality Description Program

## Overview
This program fetches:
1. **Hourly weather forecast** for the next 2 days (3-hour intervals) for a user-given city using OpenWeatherMap API.
2. **AI-free city descriptions** dynamically fetched from Wikipedia.

It features an interactive **command-line interface (CLI)** with enhanced visuals, including:
- Dynamic loading animations
- Clean and colorful output using ASCII art and emojis.

---

## Features
- Retrieves **weather data** using the OpenWeatherMap API.
- Fetches **city descriptions** dynamically using the Wikipedia API.
- Displays a **2-day hourly forecast** with weather details.
- Provides a **visually appealing user interface**:
   - ASCII art headers
   - Dynamic loading effects
   - Clean error handling.
- Includes a **flowchart** file to clearly explain the program's structure.

---

## Technologies Used
- **Language**: Python
- **APIs**:
   - OpenWeatherMap API (Weather forecast)
   - Wikipedia API (City descriptions)
- **Libraries**:
   - `requests` - For HTTP API calls
   - `wikipedia-api` - For fetching Wikipedia city descriptions
   - `python-dotenv` - To load API keys securely
   - `colorama` - For colorful and formatted terminal output

---

## Prerequisites
1. **Python 3.7 or higher** must be installed.
2. Ensure you have a valid OpenWeatherMap API key:
   - Register at [OpenWeatherMap](https://openweathermap.org/api) to get your key.

---

## Installation

1. **Clone the Repository**:
   ```bash
   git clone <repository_url>
   cd weather_municipality_project
