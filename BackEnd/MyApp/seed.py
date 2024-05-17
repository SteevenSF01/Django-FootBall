from django_seeder import Seed
from MyApp.models import *
import requests


# Fetch data from country api
url = 'https://restcountries.com/v3.1/all'
response = requests.get(url)
if response.status_code == 200:
    data = response.json()
else:
    print(f"Request failed with status code {response.status_code}")
    exit(1)

continents = Continent.objects.all()

seeder = Seed.seeder()
def runPays():
    for country in data:
        # Conditionally define variables (au cas où il manque des infos dans l'api)
        country_name = country['name']['common'] if 'name' in country and 'common' in country['name'] else None
        region_name = country['region'] if 'region' in country else None

        if country_name:
            matching_continent_country = next((continent for continent in continents if continent.nom == region_name), None)
            
            if matching_continent_country:
                seeder.add_entity(Pays, 1, {
                    'nom': country_name,
                    'continent': lambda x : matching_continent_country
                })
            else:
                seeder.add_entity(Pays, 1, {
                    'nom': country_name,
                    'continent': None
                })
            
            pks = seeder.execute()
            print(pks)

def runContinent():
    continents = ['Europe','Americas','Africa','Oceania','Asia','Antarctic']
    for continent in continents:
        continent_seeder = seeder.add_entity(Continent,1,{
            'nom' : continent
        })
        
        pks = seeder.execute()
        print(pks)