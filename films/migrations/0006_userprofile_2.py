# Generated by Django 4.2.5 on 2023-09-25 17:32

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('films', '0005_comment'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserProfile_2',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('favorite_films_2', models.ManyToManyField(related_name='favorited_by', to='films.film')),
                ('user_2', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]