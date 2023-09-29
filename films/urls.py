from django.urls import path
from . import views

urlpatterns = [
    # Vos modèles d'URL ici
    path('', views.home, name='home'),
    path('Cluster/',views.cluster,name='cluster'),
    path('Cluster/<str:film_titre>/', views.movie_detail, name='movie_detail'),
    path('get_film_data/<int:film_id>/', views.get_film_data, name='get_film_data'),
    path('signup/', views.signup_view, name='signup_view'),
    path('signin/', views.Sign_In_view, name='Sign_In_view'),
    path('logout/', views.logout_view, name='logout'),
    path('Post_comment/<int:film_id>/',views.Post_Comment,name='Post_Comment'),
]