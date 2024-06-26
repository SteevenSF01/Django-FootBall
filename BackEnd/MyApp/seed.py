from django_seeder import Seed
from MyApp.models import *
import requests
import random
from faker import Faker



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
        
def runRole():
    roles = ['Defense','Central','Attaquant','Gardien','Remplacant']
    for role in roles:
        seeder.add_entity(Role,1,{
            'nom': role
        })
    pks = seeder.execute()
    print(pks)
    
def runEquipe():
    
    equipes = [
        
        {
            'nom': 'Al-Ahly',
            'continent_id': 3,
            'pays_id':228,
            'logo': 'images/club/Al-Ahly.png',
            'maxJoueurs' : 13,
        },
        {
            'nom': 'Al-Nassr',
            'continent_id': 5,
            'pays_id':211,
            'logo': 'images/club/Al-Nassr.png',
            'maxJoueurs' : 13,
        },
        {
            'nom': 'AS Roma',
            'continent_id': 1,
            'pays_id':238,
            'logo': 'images/club/AS-Roma.png',
            'maxJoueurs' : 13,
        },
        {
            'nom': 'Atletico Madrid',
            'continent_id': 1,
            'pays_id':196,
            'logo': 'images/club/Atletico-Madrid.png',
            'maxJoueurs' : 13,
        },
        {
            'nom': 'Borussia Dortmund',
            'continent_id': 1,
            'pays_id':196,
            'logo': 'images/club/BVB.png',
            'maxJoueurs' : 13,
        },
        {
            'nom': 'Chelsea',
            'continent_id': 1,
            'pays_id':20,
            'logo': 'images/club/Chelsea.png',
            'maxJoueurs' : 13,
        },
        {
            'nom': 'FC Barcelona',
            'continent_id': 1,
            'pays_id':196,
            'logo': 'images/club/FC-Barcelona.png',
            'maxJoueurs' : 13,
        },
        {
            'nom': 'FC Bayern',
            'continent_id': 1,
            'pays_id':192,
            'logo': 'images/club/FC-Bayern.png',
            'maxJoueurs' : 13,
        },
        {
            'nom': 'Inter Milan',
            'continent_id': 1,
            'pays_id':238,
            'logo': 'images/club/Inter-Milan.png',
            'maxJoueurs' : 13,
        },
        {
            'nom': 'Juventus',
            'continent_id': 1,
            'pays_id':238,
            'logo': 'images/club/Juventus.png',
            'maxJoueurs' : 13,
        },
        {
            'nom': 'LDU Quito',
            'continent_id': 2,
            'pays_id':241,
            'logo': 'images/club/LDU-Quito.png',
            'maxJoueurs' : 13,
        },
        {
            'nom': 'Liverpool',
            'continent_id': 1,
            'pays_id':20,
            'logo': 'images/club/Liverpool.png',
            'maxJoueurs' : 13,
        },
        {
            'nom': 'Vaivase FC',
            'continent_id': 4,
            'pays_id':160,
            'logo': 'images/club/Vaivase-FC.png',
            'maxJoueurs' : 13,
        },
        {
            'nom': 'Wydad AC',
            'continent_id': 3,
            'pays_id':71,
            'logo': 'images/club/Wydad-AC.png',
            'maxJoueurs' : 13,
        },
    ]
    for equipe in equipes:
        seeder.add_entity(Equipe,1, equipe)
    pks = seeder.execute()
    print(pks)

def runJoueur():
    fake = Faker()
    seeder = Seed.seeder()

    genres = ['Male', 'Female']
    emails_male = ['gmail.com', 'yahoo.com', 'hotmail.com']
    emails_female = ['outlook.com', 'icloud.com', 'aol.com']

    for _ in range(40):
        genre = random.choice(genres)
        if genre == 'Male':
            email_domain = random.choice(emails_male)
            photo = 'players/male.png'
        else:
            email_domain = random.choice(emails_female)
            photo = 'players/female.png'

        nom = fake.last_name()
        prenom = fake.first_name_male() if genre == 'Male' else fake.first_name_female()

        equipe_id = random.choice([None] + list(range(1, 16)))  

        joueur = {
            'nom': nom,
            'prenom': prenom,
            'age': random.randint(18, 40),
            'telephone': fake.phone_number(),
            'email': f'{prenom}.{nom}@{email_domain}'.lower(),
            'genre': genre,
            'pays_id': random.randint(1, 250),
            'role_id': random.randint(1, 5),
            'equipe_id': equipe_id,
            'photo': photo,
            'pace': random.randint(1,100),
            'defense': random.randint(1,100),
            'dribbling': random.randint(1,100),
            'passing': random.randint(1,100),
            'physical': random.randint(1,100),
            'shooting': random.randint(1,100),
            'numero': random.randint(1,100),
        }

        seeder.add_entity(Joueur, 1, joueur)

    pks = seeder.execute()
    print(pks)