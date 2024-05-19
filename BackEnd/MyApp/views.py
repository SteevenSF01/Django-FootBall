from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from MyApp.serializers import *
from MyApp.models import *
from rest_framework.response import Response
# Create your views here.

@api_view(['GET', 'POST'])
def continent_list(request):
    if request.method == 'GET':
        continent = Continent.objects.all()
        serializer = ContinentSerializer(continent, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = ContinentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()   
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
@api_view(['GET', 'POST'])
def pays_list(request):
    if request.method == 'GET':
        pays = Pays.objects.all()
        serializer = PaysSerializer(pays, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = PaysSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()   
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
@api_view(['GET', 'POST'])
def roles_list(request):
    if request.method == 'GET':
        role = Role.objects.all()
        serializer = RoleSerializer(role, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = RoleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()   
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
@api_view(['GET', 'POST'])
def equipe_list(request):
    if request.method == 'GET':
        equipe = Equipe.objects.all()
        serializer = EquipeSerializer(equipe, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = EquipeSerializer(data=request.data)
        if serializer.is_valid():
            if 'logo' not in request.FILES:
                serializer._validated_data['logo'] = 'images/defaultClub.jpg'
            serializer.save()   
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def joueur_list(request):
    if request.method == 'GET':
        joueur = Joueur.objects.all()
        serializer = JoueurSerializer(joueur, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = JoueurSerializer(data=request.data)
        if serializer.is_valid():
            if 'photo' not in request.FILES:
                serializer.validated_data['photo'] = 'images/default.png'
            serializer.save()   
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def equipe_detail(request, pk):
    try:
        equipe = Equipe.objects.get(pk=pk)
    except Equipe.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = EquipeSerializer(equipe)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = EquipeSerializer(equipe, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        equipe.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'PUT', 'DELETE'])
def joueur_detail(request, pk):
    try:
        joueur = Joueur.objects.get(pk=pk)
    except Joueur.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = JoueurSerializer(joueur)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = JoueurSerializer(joueur, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        joueur.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
