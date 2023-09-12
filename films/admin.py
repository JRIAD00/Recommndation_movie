from django.contrib import admin

from .models import Film,Realisateur,MotCle,Genre,PaysProduction,LangueParlee,Acteur

# Register your models here.

admin.site.register(Film)
admin.site.register(Realisateur)
admin.site.register(MotCle)
admin.site.register(Genre)
admin.site.register(PaysProduction)
admin.site.register(LangueParlee)
admin.site.register(Acteur)


