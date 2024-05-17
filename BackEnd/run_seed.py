import django
django.setup()
from MyApp import seed

if __name__ == '__main__':
    # seed.runPays()
    seed.runContinent()