from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response  
from django.contrib.auth import authenticate
from django.contrib.auth.decorators import login_required
from django.http.response import HttpResponse

#from django.contrib.auth.models import User
from .serializers import UserSerializer


 
 
@api_view(['POST'])
def register_user(request):
    """
    List all todos, or create a new todo.
    """ 
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 
    

 
@api_view(['POST'])
def login_user(request):
    """
    login user -> token.
    """ 
    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(username=username, password=password) 
    if user:
        return Response({"token": user.auth_token.key})
    else:
        return Response({"error": "Wrong Credentials"}, status=status.HTTP_400_BAD_REQUEST)
 
            
 
 
@api_view(['GET'])
def protected_url(request):
    """
    PROTECTED URL.
    """  
    s = request.user.is_authenticated 
    # state of auth
    is_auth = False
    is_valid_token = False
    # retrive token from request
    # is_valid_token == True then user can seeprotected data
    # otherwise permission deny
    return Response({"isAuth": s})
    

@login_required()
def secret_page(request, *args, **kwargs):
    return HttpResponse('Secret contents!', status=200)