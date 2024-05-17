from django.db import models

class Continent(models.Model):
    nom = models.CharField(max_length=50)
    
    def __str__(self):
        return self.nom

class Pays(models.Model):
    nom = models.CharField(max_length=50)
    continent = models.ForeignKey(Continent, on_delete=models.SET_NULL, null=True, related_name='pays')
    
    def __str__(self):
        return self.nom
    
class Equipe(models.Model):
    nom = models.CharField(max_length=50)
    continent = models.ForeignKey(Continent, on_delete=models.SET_NULL, null=True, related_name='equipes')
    pays = models.ForeignKey(Pays, on_delete=models.SET_NULL, null=True, related_name='equipes')
    logo = models.ImageField(upload_to='images/')
    maxJoueurs = models.IntegerField()
    
    def __str__(self):
        return self.nom
    
class Role(models.Model):
    nom = models.CharField(max_length=30)
    
    def __str__(self):
        return self.nom
    
class Joueur(models.Model):
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)
    age = models.PositiveIntegerField()
    telephone = models.CharField(max_length=15)
    email = models.EmailField()
    genre = models.CharField(max_length=15)
    pays = models.ForeignKey(Pays, on_delete=models.SET_NULL, null=True, related_name='joueurs')
    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True, related_name='joueurs')
    equipe = models.ForeignKey(Equipe, on_delete=models.SET_NULL, null=True, blank=True, related_name='joueurs')
    photo = models.ImageField(upload_to='images/', null=True, blank=True, default='images/default.png')
    
    def __str__(self):
        return f"{self.prenom} {self.nom}"

