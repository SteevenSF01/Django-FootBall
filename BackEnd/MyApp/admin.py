from django.contrib import admin
from MyApp.models import Continent, Equipe,Joueur, Pays, Role

# Register your models here.

Models = [Continent, Equipe, Joueur, Pays, Role]

admin.site.register(Models)
