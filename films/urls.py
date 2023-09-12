from django.urls import path
from . import views

urlpatterns = [
    # Vos modèles d'URL ici
    path('', views.home, name='home'),
]