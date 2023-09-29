



from django.core.management.base import BaseCommand
import pandas as pd
import os
from decimal import Decimal
from ast import literal_eval
from films.models import Film,Genre,Acteur,Realisateur,PaysProduction,LangueParlee,MotCle,UserProfile_2,Comment


cat=['Action','Adventure','crime','comedy','Horror','Romance','Thriller']


def cleanDf(x):
    try:
        return literal_eval(str(x))   
    except Exception as e:
        return []
    



def acteurs_list(data) :
    list_acteur=[]
    for i,rowi in data.iterrows():
      for c in rowi['actors']:
            if c not in list_acteur:
              list_acteur.append(c)
    return list_acteur

def keywords_list(data):
    list_keywords=[]
    for i,rowi in data.iterrows():
        for key in rowi['keywords']:
            if key not in list_keywords:
                list_keywords.append(key)
    return list_keywords

def langue_list(data):
    list_lang=[]
    for i,rowi in data.iterrows():
        for key in rowi['languages']:
            if key not in list_lang:
                list_lang.append(key)
    return list_lang


def pays_list(data):
    list_pays=[]
    for i,rowi in data.iterrows():
        for key in rowi['countrie']:
            if key not in list_pays:
                list_pays.append(key)
    return list_pays

def genre_list(data):
    list_genre=[]
    for i,rowi in data.iterrows():
        for key in rowi['categories']:
            if key not in list_genre:
                list_genre.append(key)
    return list_genre

def create_objet_acteurs(list_acteur):
        
      for acteur_nom in list_acteur:
            # Vérifiez si un objet Acteur avec le même nom existe déjà dans la base de données
            acteur, created = Acteur.objects.get_or_create(nom=acteur_nom)
    
            # Si l'acteur n'existe pas, créez un nouvel objet Acteur
            if created:
               acteur.save()

       # Vous pouvez utiliser l'objet acteur comme vous le souhaitez ici
      print(f"Acteur créé ou récupéré : {acteur.nom}")


def create_objet_language(list_lang):
        
      for langue in list_lang:
            # Vérifiez si un objet Acteur avec le même nom existe déjà dans la base de données
            lang, created = LangueParlee.objects.get_or_create(nom=langue)
    
            # Si l'acteur n'existe pas, créez un nouvel objet Acteur
            if created:
               lang.save()

       # Vous pouvez utiliser l'objet acteur comme vous le souhaitez ici
      print(f"langue créé ou récupéré : {lang.nom}")

def create_objet_genre(list_genre):
        
      for genre in list_genre:
            # Vérifiez si un objet Acteur avec le même nom existe déjà dans la base de données
            gen, created = Genre.objects.get_or_create(nom=genre)
    
            # Si l'acteur n'existe pas, créez un nouvel objet Acteur
            if created:
               gen.save()

       # Vous pouvez utiliser l'objet acteur comme vous le souhaitez ici
      print(f"genre créé ou récupéré : {gen.nom}")

def create_objet_pays(list_pays):
        
      for pays in list_pays:
            # Vérifiez si un objet Acteur avec le même nom existe déjà dans la base de données
            pays, created = PaysProduction.objects.get_or_create(nom=pays)
    
            # Si l'acteur n'existe pas, créez un nouvel objet Acteur
            if created:
               pays.save()

       # Vous pouvez utiliser l'objet acteur comme vous le souhaitez ici
      print(f"pays créé ou récupéré : {pays.nom}")


class Command(BaseCommand):
    help = 'Import_data'

    def add_arguments(self, parser):
        parser.add_argument('movies.csv', type=str, help=os.path.join(os.path.dirname(os.path.abspath(__file__)), 'movies.csv'))

    def handle(self, *args, **kwargs):
        csv_file_path = kwargs['movies.csv']
        data = pd.read_csv(csv_file_path)
        data=data.dropna()
        params = ['actors', 'keywords', 'categories', 'countrie', 'languages']

        # Nettoyage des paramètres
        for param in params:
            data[param] = data[param].apply(cleanDf)  # Utilisez votre fonction de nettoyage ici
        
        data=data.head(200)

        

        
        create_objet_acteurs(acteurs_list(data))
        create_objet_pays(pays_list(data))
        create_objet_language(langue_list(data))
        create_objet_genre(genre_list(data))
        #Film.objects.all().delete()
        #Acteur.objects.all().delete()
        #Genre.objects.all().delete()
        #LangueParlee.objects.all().delete()
        #PaysProduction.objects.all().delete()
        #UserProfile_2.objects.all().delete()
        #Comment.objects.all().delete()
        data['year'] = data['release_date'].str.split('-').str[0]

        # Convertir la colonne 'year' en entiers
        data['year'] = pd.to_numeric(data['year'], errors='coerce')
        # Parcourez et affichez les noms des acteurs
        #for acteur in acteurs_spider_man:
        #      print(acteur.nom)
        for index,row in data.iterrows():
        #     # print(type(row['actors']))
                # Créez un objet Realisateur avec le nom du réalisateur
            if row['img'] != '0':
        #        print(row['img'])
                realisateur, created = Realisateur.objects.get_or_create(nom=row['director'])
                film=Film()
                film.titre=row['title']
                film.note_moyenne=row['vote']
                film.nombre_votes=int(row['vote_count'])
                film.description=row['description']
                film.image=row['img']
                film.homepage=row['homepage']
                film.date_sortie=int(row['year'])
                film.realisateur=realisateur

                genres = [Genre.objects.get_or_create(nom=categorie)[0] for categorie in row['categories']]
                pays = [PaysProduction.objects.get_or_create(nom=countrie)[0] for countrie in row['countrie']]
                languages = [LangueParlee.objects.get_or_create(nom=lang)[0] for lang in row['languages']]
                acteurs=[Acteur.objects.get_or_create(nom=act)[0] for act in row['actors']]
                
                film.save()
                 #Associez les objets Genre au film
                self.stdout.write(self.style.SUCCESS(f'Film importé avec succès : {film.titre}'))
                film.genres.set(genres)
                film.pays_production.set(pays)
                film.langues_parlees.set(languages)
                film.acteurs.set(acteurs)
        

#Index(['homepage', 'id', 'keywords', 'original_language', 'description',       
#       'popularity', 'release_date', 'vote', 'vote_count', 'title', 'director',
#       'actors', 'categories', 'countrie', 'languages', 'img', 'year',
#       'Cluster'],
#      dtype='object'