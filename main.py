import time
import requests
import os
from dotenv import load_dotenv
from utils.weather_api import get_hourly_weather
from colorama import Fore, Style, init
import wikipediaapi

# Initialize colorama for colored terminal output
init(autoreset=True)

# Load API keys securely
load_dotenv()
WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")

def display_header():
    """Display program header with ASCII art."""
    print(Fore.CYAN + Style.BRIGHT + "=" * 60)
    print(Fore.YELLOW + Style.BRIGHT + r"""
      __        __   _                             
      \ \      / /__| | ___ ___  _ __ ___   ___    
       \ \ /\ / / _ \ |/ __/ _ \| '_ ` _ \ / _ \   
        \ V  V /  __/ | (_| (_) | | | | | |  __/   
         \_/\_/ \___|_|\___\___/|_| |_| |_|\___|  
    """)
    print(Fore.CYAN + Style.BRIGHT + "           🌦️  WEATHER & CITY DESCRIPTION PROGRAM  🌎")
    print(Fore.CYAN + "=" * 60)

def loading_message(message):
    """Simulate a dynamic loading message."""
    print(Fore.MAGENTA + message, end="", flush=True)
    for _ in range(3):
        time.sleep(0.5)
        print(Fore.MAGENTA + ".", end="", flush=True)
    print("\n")

def clear_screen():
    """Clear the terminal screen."""
    os.system('cls' if os.name == 'nt' else 'clear')

def show_help():
    """Display the help menu."""
    print(Fore.GREEN + "\nHELP MENU")
    print(Fore.YELLOW + "-" * 50)
    print("Available commands:")
    print(" - Enter a valid city name to get its weather and description.")
    print(" - 'back'  : Return to the main menu.")
    print(" - 'clear' : Clear the screen.")
    print(" - 'help'  : Show this help menu.")
    print(" - 'exit'  : Exit the program.")
    print(Fore.YELLOW + "-" * 50 + "\n")

def get_description(city):
    """Fetch city description using Wikipedia API."""
    try:
        loading_message("Fetching city description")

        # Initialize Wikipedia API with a valid user agent
        wiki_wiki = wikipediaapi.Wikipedia(
            language="en", 
            user_agent="WeatherDescriptionApp/1.0 (contact: ali@example.com)"
        )

        # Fetch the Wikipedia page
        page = wiki_wiki.page(city)

        # Check if page exists
        if page.exists():
            description = page.summary.split(".")[0] + "."  # Shortened description
            print(Fore.GREEN + "\n📝 City Description:")
            print(Fore.WHITE + Style.BRIGHT + description)
        else:
            print(Fore.RED + "❌ City description not found on Wikipedia.")
    except Exception as e:
        print(Fore.RED + f"Error fetching description: {e}")

def main():
    """Main program loop for fetching weather and city descriptions."""
    display_header()

    while True:
        # Prompt user for input
        city = input(Fore.CYAN + "\n🏙️  Enter the city name (or command): ").strip().lower()

        # Command handling
        if city == 'exit':
            print(Fore.YELLOW + "\nThank you for using the program! 👋 Have a great day!")
            break
        elif city == 'help':
            show_help()
            continue
        elif city == 'clear':
            clear_screen()
            display_header()
            continue
        elif city == 'back':
            print(Fore.YELLOW + "Returning to the main menu...\n")
            time.sleep(1)
            continue

        # Input validation for city name
        if not city.replace(" ", "").isalpha():
            print(Fore.RED + "❌ Invalid input. Please enter a valid city name without numbers or symbols.")
            continue

        # Fetch weather data
        loading_message(f"Fetching weather forecast for {city.title()}")
        get_hourly_weather(city.title())

        # Fetch city description
        get_description(city.title())

        # Add a separator between requests
        print(Fore.CYAN + "\n" + "=" * 60)

if __name__ == "__main__":
    main()
