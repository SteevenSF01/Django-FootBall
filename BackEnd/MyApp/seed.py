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

seeder = Seed.seeder()
def runPays():
    for country in data:
        
        # conditionally define variables (au cas où il manque des infos dans l'api)
        country_name = country['name']['common'] if 'name' in country and 'common' in country['name'] else None
        
        if country_name:

            country_seeder = seeder.add_entity(Pays, 1, {
                'nom': country_name
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