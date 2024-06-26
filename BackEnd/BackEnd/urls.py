from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings
from django.urls import path
from MyApp.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/continents/', continent_list, name='continent-list'),
    path('api/continents/<int:pk>/', continent_details, name='continent-details'),
    path('api/pays/', pays_list, name='pays-list'),
    path('api/pays/<int:pk>/', pays_details, name='pays-details'),
    path('api/equipes/', equipe_list, name='equipe-list'),
    path('api/equipes/<int:pk>/', equipe_detail, name='equipe-detail'),
    path('api/joueurs/', joueur_list, name='joueurs-list'),
    path('api/joueurs/<int:pk>/', joueur_detail, name='joueurs-detail'),
    path('api/roles/', roles_list, name='roles-list'),
    path('api/roles/<int:pk>', roles_details, name='roles-details'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
