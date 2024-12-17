import requests
from utils.geocoding_api import get_coordinates
import os
from dotenv import load_dotenv

# Load API keys
load_dotenv()
API_KEY = os.getenv("WEATHER_API_KEY")

def get_hourly_weather(city):
    """Fetch 2-day hourly weather forecast for the city."""
    lat, lon = get_coordinates(city)
    if not lat or not lon:
        print("Could not fetch coordinates. Please check the city name.")
        return

    url = "https://api.openweathermap.org/data/2.5/forecast"

    params = {"lat": lat, "lon": lon, "appid": API_KEY, "units": "metric"}

    try:
        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()
        data = response.json()

        print(f"\nHourly Weather Forecast for {city} (Next 2 Days):")
        for forecast in data["list"][:16]:  # Fetch the first 16 timestamps (2 days)
            print(
                f"{forecast['dt_txt']}: {forecast['main']['temp']}°C, "
                f"Weather: {forecast['weather'][0]['description']}"
            )

    except Exception as e:
        print(f"Error fetching weather data: {e}")
