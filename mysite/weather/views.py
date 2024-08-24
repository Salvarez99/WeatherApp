from django.http import JsonResponse
from django.conf import settings
import requests

def get_geocode(city):
    """
    Fetch latitude and longitude for a given city.
    """
    limit = 5
    api_key = settings.WEATHER_API_KEY
    url = f'http://api.openweathermap.org/geo/1.0/direct?q={city}&limit={limit}&appid={api_key}'
    
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        if data:
            return data[0]['lat'], data[0]['lon']
        else:
            return None, None
    except requests.exceptions.RequestException as e:
        return None, None

def get_weather(request):
    city = request.GET.get('city', 'New York')
    
    # Get coordinates from geocode
    lat, lon = get_geocode(city)
    
    if lat is None or lon is None:
        return JsonResponse({'error': 'Could not get geocode data'}, status=500)

    api_key = settings.WEATHER_API_KEY
    url = f"http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=imperial&appid={api_key}"

    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        weather_data = {
            "city": data.get("name", "Unknown"),
            "temperature": data.get("main", {}).get("temp", "Unknown"),
            "description": data.get("weather", [{}])[0].get("description", "Unknown"),
            "humidity": data.get("main", {}).get("humidity", "Unknown"),
        }
        return JsonResponse(weather_data)
    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': f'Could not fetch weather data: {str(e)}'}, status=500)
