from django.db import models

# Create your models here.


class Realisateur(models.Model):
    nom = models.CharField(max_length=255)

    def __str__(self):
        return self.nom

class Film(models.Model):
    titre = models.CharField(max_length=255)
    budget = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    revenu = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    popularite = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    duree = models.PositiveIntegerField(null=True, blank=True)
    note_moyenne = models.DecimalField(max_digits=3, decimal_places=1, null=True, blank=True)
    nombre_votes = models.PositiveIntegerField(null=True, blank=True)
    genres = models.ManyToManyField('Genre', related_name='films', blank=True)
    mots_cles = models.ManyToManyField('MotCle', related_name='films', blank=True)
    description = models.TextField(null=True, blank=True)
    date_sortie = models.PositiveIntegerField(null=True, blank=True)
    pays_production = models.ManyToManyField('PaysProduction', related_name='films', blank=True)
    langues_parlees = models.ManyToManyField('LangueParlee', related_name='films', blank=True)
    acteurs = models.ManyToManyField('Acteur', related_name='films', blank=True)
    equipe = models.ManyToManyField('MembreEquipe', related_name='films', blank=True)
    realisateur = models.ForeignKey(Realisateur, on_delete=models.SET_NULL, null=True, blank=True)

    image = models.CharField(max_length=2000, null=True, blank=True)

    def __str__(self):
        return self.titre

class Genre(models.Model):
    nom = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.nom

class MotCle(models.Model):
    mot_cle = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.mot_cle
    
class PaysProduction(models.Model):
    nom = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.nom

class LangueParlee(models.Model):
    nom = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.nom

class MembreEquipe(models.Model):
    nom = models.CharField(max_length=255)

    def __str__(self):
        return self.nom
    
class Acteur(models.Model):
    nom = models.CharField(max_length=255)
    date_naissance = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.nom