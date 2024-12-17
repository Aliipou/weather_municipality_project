import requests
import os
from dotenv import load_dotenv

# Load API keys
load_dotenv()
API_KEY = os.getenv("WEATHER_API_KEY")

def get_coordinates(city):
    """Fetch latitude and longitude for the given city."""
    url = "http://api.openweathermap.org/geo/1.0/direct"
    params = {"q": city, "limit": 1, "appid": API_KEY}
    response = requests.get(url, params=params)

    if response.status_code == 200 and response.json():
        data = response.json()[0]
        return data["lat"], data["lon"]
    else:
        print("Error fetching coordinates for the city.")
        return None, None
