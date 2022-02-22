from django.http import Http404
from rest_framework import permissions
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response 
from .models import TodoWithOwner
from .serializers import TodoWithOwnerSerializer
 
 
class TodotList(APIView):
    """
    List all todos with owner, or create a new todo.
    """
    # auth class
    permission_classes =  [permissions.IsAuthenticated]
    def get(self, request, format=None):
        todos = TodoWithOwner.objects.filter(owner=request.user).all()
        serializer = TodoWithOwnerSerializer(todos, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = TodoWithOwnerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 
 
    
class TodoDetail(APIView):
    """
    Retrieve, update or delete a Todo instance.
    """
    permission_classes = [permissions.IsAuthenticated]
    def get_object(self, request, pk): 
        try: 
            return TodoWithOwner.objects.get(pk=pk,owner=request.user)
        except TodoWithOwner.DoesNotExist:
            raise Http404 


    def get(self, request, pk, format=None):
        todo = self.get_object(request,pk)
        serializer = TodoWithOwnerSerializer(todo)
        return Response(serializer.data) 

    def put(self, request, pk, format=None):
        todo = self.get_object(request,pk)
        serializer = TodoWithOwnerSerializer(todo, data=request.data)
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        todo = self.get_object(request,pk)
        todo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
