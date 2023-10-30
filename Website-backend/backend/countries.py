from api.models import Country
import requests

# Example API endpoint that provides country data
api_url = "https://restcountries.com/v3.1/all"

try:
    # Send a GET request to the API endpoint
    response = requests.get(api_url)

    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        # Parse the JSON response
        data = response.json()

        # Iterate through the data and create or update Country objects
        for country_info in data:
            name = country_info['name']['common']
            flag_url = country_info['flags']['png']

            # Create or update the Country object
            country, created = Country.objects.get_or_create(country_name=name, country_flag = flag_url)
            country.save()
            print(f"Added {name} to the database.")

    else:
        print("Failed to fetch data. Status code:", response.status_code)

except requests.exceptions.RequestException as e:
    print("An error occurred:", e)