from django.shortcuts import render
from .models import Film

# Create your views here.


def home(request):
    # Récupérez les 15 premiers films classés par note_moyenne et nombre_votes
    films = Film.objects.all().order_by('-note_moyenne', '-nombre_votes')[:15]


    # Divisez les films en trois groupes de 5 films chacun
    films1 = films[:5]
    films2 = films[5:10]
    films3 = films[10:15]


    # Passez les groupes de films à votre modèle HTML
    context = {'films1': films1, 'films2': films2, 'films3': films3}

    return render(request, 'Home.html', context)