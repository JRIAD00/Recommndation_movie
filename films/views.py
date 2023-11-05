from django.shortcuts import render,get_object_or_404,redirect
from django.http import JsonResponse
from sklearn.cluster import KMeans
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from sklearn.preprocessing import MultiLabelBinarizer
import numpy as np
from .models import Film,Comment,UserProfile_2
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
import json

# Create your views here.

def recommendation_utilisateur(favourites_film):

    # S'il y a des films préférés
        if favourites_film:
            # Obtenez les descriptions de tous les films
            all_films = Film.objects.exclude(id__in=favourites_film.values_list('id', flat=True))
            all_film_descriptions = [film.description for film in all_films]

            # Utilisez TF-IDF pour extraire les vecteurs de représentation de texte
            tfidf_vectorizer = TfidfVectorizer()
            tfidf_matrix = tfidf_vectorizer.fit_transform([film.description for film in favourites_film] + all_film_descriptions)

            # Calculez la similarité cosinus
            cosine_similarities = linear_kernel(tfidf_matrix[:len(favourites_film)], tfidf_matrix[len(favourites_film):]).flatten()

            # Triez les films recommandés en fonction de la similarité
            similar_films_indices = cosine_similarities.argsort()[::-1]
            similar_films_indices = [i for i in similar_films_indices if i < len(all_films)]

            recommended_films = [all_films[int(i)] for i in similar_films_indices[:10]]
            recommended_films=recommended_films[:5]
            return recommended_films
        else:
            return []

def home(request):
    # Vérifiez si l'utilisateur est connecté
    users=User.objects.all()
    for u in users:
        print(u.password)
    recommended_films=None
    if request.user.is_authenticated:
        # Faites ce que vous voulez avec le nom d'utilisateur ou d'autres attributs de l'utilisateur
        # L'utilisateur est connecté, vous pouvez accéder à ses informations

        # Obtenez le profil utilisateur correspondant
        user_profile, created = UserProfile_2.objects.get_or_create(user_2=request.user)

        # Obtenez les films préférés de l'utilisateur
        favorite_films = user_profile.favorite_films_2.all()
        
        recommended_films=recommendation_utilisateur(favorite_films)
        if len(recommended_films) ==0:
            recommended_films=None
        
    # Récupérez les 15 premiers films classés par note_moyenne et nombre_votes
    films = Film.objects.all().order_by('-note_moyenne', '-nombre_votes')[:16]
    
    #films[8].delete()
    # Divisez les films en trois groupes de 5 films chacun
    films1 = films[:5]
    films2 = films[5:10]
    films3 = films[10:15]


    # Passez les groupes de films à votre modèle HTML
    context = {'films1': films1, 'films2': films2, 'films3': films3,'user':request.user,'recommended_films': recommended_films}

    return render(request, 'Home.html', context)


def cluster(request):
    recommended_films=None
    if request.user.is_authenticated:
        # L'utilisateur est connecté, vous pouvez accéder à ses informations
        username = request.user.username
        # Faites ce que vous voulez avec le nom d'utilisateur ou d'autres attributs de l'utilisateur
        user_profile, created = UserProfile_2.objects.get_or_create(user_2=request.user)

        # Obtenez les films préférés de l'utilisateur
        favorite_films = user_profile.favorite_films_2.all()
        
        recommended_films=recommendation_utilisateur(favorite_films)
        if len(recommended_films) ==0:
            recommended_films=None
    else:
        # L'utilisateur n'est pas connecté
        username = None

    # Récupérez les films et leurs genres depuis la base de données
    films = Film.objects.all()
    genres = [list(film.genres.all().values_list('nom', flat=True)) for film in films]

    #film = get_object_or_404(Film, titre='Oz: The Great and Powerful')
    #print(film)

    # Triez les noms de genre
    for genre_list in genres:
        genre_list.sort()

    # Utilisez MultiLabelBinarizer pour créer une représentation binaire des genres
    mlb = MultiLabelBinarizer()
    genre_matrix = mlb.fit_transform(genres)

    # Appliquez l'algorithme K-means sur les données binaires
    kmeans = KMeans(n_clusters=3, random_state=0,n_init=10).fit(genre_matrix)

    # Créez trois listes pour stocker les films dans chaque cluster
    cluster1_films = []
    cluster2_films = []
    cluster3_films = []



    # Ajoutez les films aux clusters respectifs en fonction de leurs étiquettes
    for film, label in zip(films, kmeans.labels_):
        if label == 0:
            cluster1_films.append(film)
        elif label == 1:
            cluster2_films.append(film)
        elif label == 2:
            cluster3_films.append(film)
    
    cluster_data = [
        cluster1_films,cluster2_films,cluster3_films
    ]

    context = {
        'Cluster_data':cluster_data,
        'user':request.user,
        'recommended_films': recommended_films,

    }
    return render(request, 'Cluster.html',context)



def get_film_data(request, film_id):
    try:
        film = Film.objects.get(id=film_id)
        # Vous pouvez également sérialiser les données du film si nécessaire

        genres = film.genres.all()

        film_data = {
            'titre': film.titre,
            'image': film.image,
            'date_sortie' :film.date_sortie,
            'vote':film.note_moyenne,
            'description':film.description,
            'genres': [genre.nom for genre in genres] # Si "image" est un champ ImageField
            # Ajoutez d'autres données du film ici
        }
        # Récupérez les commentaires associés à ce film triés par timestamp
        commentaires = Comment.objects.filter(film=film).order_by('timestamp')

        commentaire_list = []

        for commentaire in commentaires:
            print(commentaire.text)
            commentaire_data = {
                'user': commentaire.user.username,
                'Nbstar': commentaire.Nbstar,
                'commentaire': commentaire.text,
                'timestamp': commentaire.timestamp.strftime('%Y-%m-%d %H:%M:%S')
            }
            commentaire_list.append(commentaire_data)

        film_data['commentaires'] = commentaire_list
        return JsonResponse(film_data)
    except Film.DoesNotExist:
        return JsonResponse({'error': 'Film non trouvé'}, status=404)


def movie_detail(request,film_titre):
     

    recommended_films=None

    film = get_object_or_404(Film, titre=film_titre)

    # Obtenez la description du film actuel
    current_film_description = film.description

    # Obtenez les descriptions de tous les films de votre base de données
    all_films = Film.objects.all()
    all_film_descriptions = [film.description for film in all_films]

     # Utilisez TF-IDF pour extraire les vecteurs de représentation de texte
    tfidf_vectorizer = TfidfVectorizer()
    tfidf_matrix = tfidf_vectorizer.fit_transform([current_film_description] + all_film_descriptions)

     # Calculez la similarité cosinus entre le film actuel et tous les autres films
    cosine_similarities = linear_kernel(tfidf_matrix[0:1], tfidf_matrix[1:]).flatten()

    # Triez les films en fonction de leur similarité (du plus similaire au moins similaire)
    similar_films_indices = cosine_similarities.argsort()[::-1][1:]  # Excluez le film actuel
     # Convertissez similar_films_indices en un tableau Python natif
    similar_films_indices = similar_films_indices.tolist()
    similar_films = [all_films[i] for i in similar_films_indices]
     
    if request.user.is_authenticated:
           user_profile, created = UserProfile_2.objects.get_or_create(user_2=request.user)
           user_profile.favorite_films_2.add(film)

           # Obtenez les films préférés de l'utilisateur
           favorite_films = user_profile.favorite_films_2.all()
        
           recommended_films=recommendation_utilisateur(favorite_films)
           if len(recommended_films) ==0:
            recommended_films=None

    commentaires = Comment.objects.filter(film=film).order_by('timestamp')

    context = {
        'film': film,
        'similar_films': similar_films,
        'commentaires':commentaires,
        'recommended_films':recommended_films,
     }


    return render(request,'Movie.html',context)



########inscription d'utilisateur #################




from django.http import JsonResponse

def signup_view(request):

      if request.method == 'POST':
        # Récupérez les données JSON de la requête AJAX
        data = json.loads(request.body)

        # Récupérez les données du formulaire
        username = data['username']
        email = data['email']
        password = data['password']
        confirm_password = data['confirm_password']
        print(data)
        # Vérifiez si les mots de passe correspondent
        if password != confirm_password:
            return JsonResponse({'success': False, 'message': 'Les mots de passe ne correspondent pas.'})

        # Vérifiez si l'utilisateur existe déjà
        if User.objects.filter(username=username).exists():
            print(User.objects.filter(username=username).first())
            return JsonResponse({'success': False, 'message': 'Cet utilisateur existe déjà.'})

        # Créez un nouvel utilisateur
        user = User.objects.create_user(username=username, email=email, password=password)
        user.save()

        return JsonResponse({'success': True, 'message': 'Inscription réussie.'})

      return redirect('home')


def Sign_In_view(request):

    if request.method=='POST':
            # Récupérez les données JSON de la requête AJAX
        data = json.loads(request.body)
        email=data['email']
        passwo=data['password']
        print(passwo)
        print(email)
        # Authentifiez l'utilisateur
        user=User.objects.filter(email=email).first()
        print(user)
        user = authenticate(request,username=user.username,password=passwo)
        print(user)
        if user is not None:
            login(request, user)
            return JsonResponse({'success': True, 'message': 'Connexion réussie.','username':user.username})
        else:
            return JsonResponse({'success': False, 'message': 'Identifiants incorrects.'})

    return redirect('home')

from django.contrib.auth import logout
def logout_view(request):
    logout(request)
    # Redirigez l'utilisateur vers une page de votre choix après la déconnexion
    return redirect('home')  # Remplacez 'home' par le nom de votre page d'accueil si nécessaire




def Post_Comment(request,film_id):
 
  if request.method== 'POST' :
    if not request.user.is_authenticated:
        return JsonResponse({'success': False,'message':'Vous devez vous connecter pour poster un commentaire.'}, status=403)

    # Récupérez les données du formulaire (nom d'utilisateur, nombre d'étoiles, commentaire)
    data = json.loads(request.body)
    username = data['username']
    Nbstar = data['Nbstar']
    commentaire = data['commentaire']
    print(commentaire)



    film= get_object_or_404(Film, id=film_id)
    # Créez un nouvel objet Comment et enregistrez-le dans la base de données
    
    new_comment = Comment(
        user=request.user,
        film=film,  # Utilisez l'ID du film à partir de l'URL ou du formulaire
        text=commentaire,
        Nbstar=Nbstar,
    )
    new_comment.save()
    print(new_comment.film.titre)
    # Renvoyez une réponse JSON avec les données du commentaire enregistré
    response_data = {
        'success': True,
        'comment': {
            'user': new_comment.user.username,
            'Nbstar': Nbstar,
            'commentaire': new_comment.text,
            'timestamp': new_comment.timestamp.strftime('%Y-%m-%d %H:%M:%S'), # Format de date personnalisé
        },
        'filmId': film_id,
 
    }
    return JsonResponse(response_data)
  return redirect('cluster')