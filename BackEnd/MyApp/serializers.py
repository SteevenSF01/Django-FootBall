from rest_framework import serializers
from MyApp.models import *

class JoueursSerializer(serializers.ModelSerializer):
    class Meta:
        model = Joueur
        fields = ['id','nom','prenom','age','telephone','email','genre','pays','role','equipe','photo']
        
class EquipeSerializer(serializers.ModelSerializer):
    joueur = JoueursSerializer(many=True, read_only=True, source='joueur_set')
    class Meta:
        model = Equipe
        fields = ['id','nom','continent','pays','logo','maxJoueurs','joueur']
        
class PaysSerializer(serializers.ModelSerializer):
    joueur = JoueursSerializer(many=True, read_only=True, source='joueur_set')
    equipe = EquipeSerializer(many=True, read_only=True, source='equipe_set')
    class Meta:
        model = Pays
        fields = ['id', 'nom','joueur','equipe']
        
class ContinentSerializer(serializers.ModelSerializer):
    pays = PaysSerializer(many=True, read_only=True, source='pays_set')
    equipe = EquipeSerializer(many=True, read_only= True, source='equipe_set')
    class Meta:
        model = Continent
        fields = ['id', 'nom', 'pays','equipe']
class RoleSerializer(serializers.ModelSerializer):
    joueur = JoueursSerializer(many=True, read_only=True, source='joueur_set')
    
    class Meta:
        model = Role
        fields = ['id', 'nom', 'joueur']
