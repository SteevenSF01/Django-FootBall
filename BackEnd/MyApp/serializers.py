from rest_framework import serializers
from MyApp.models import *



# class PaysSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Pays
#         fields = ['id', 'nom', 'continent', 'joueurs', 'equipes']

# class EquipeSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Equipe
#         fields = ['id', 'nom', 'continent', 'pays', 'logo', 'maxJoueurs', 'joueurs']
class JoueurSerializer(serializers.ModelSerializer):
    # equipe = EquipeSerializer(read_only = True)
    # pays = PaysSerializer(read_only = True)
    class Meta:
        model = Joueur
        fields = ['id', 'nom', 'prenom', 'age', 'telephone', 'email', 'genre', 'pays', 'role', 'equipe', 'photo','pace','dribbling','shooting','defense','passing','physical','numero']
        
class EquipeSerializer(serializers.ModelSerializer):
    joueurs = JoueurSerializer(many=True, read_only=True)
    class Meta:
        model = Equipe
        fields = ['id', 'nom', 'continent', 'pays', 'logo', 'maxJoueurs', 'joueurs']
        
class PaysSerializer(serializers.ModelSerializer):
    joueurs = JoueurSerializer(many=True, read_only=True)
    equipes = EquipeSerializer(many=True, read_only=True)
    class Meta:
        model = Pays
        fields = ['id', 'nom', 'continent', 'joueurs', 'equipes']
        
class ContinentSerializer(serializers.ModelSerializer):
    pays = PaysSerializer(many=True, read_only=True)
    equipes = EquipeSerializer(many=True, read_only=True)
    class Meta:
        model = Continent
        fields = ['id', 'nom', 'pays', 'equipes']
        
class RoleSerializer(serializers.ModelSerializer):
    joueurs = JoueurSerializer(many=True, read_only=True)
    class Meta:
        model = Role
        fields = ['id', 'nom', 'joueurs']
