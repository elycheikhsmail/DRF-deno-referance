from django.urls import path
from . import views

urlpatterns = [ 
    # path('todos', views_todo.todo_list),
    # path('todos/<int:pk>', views_todo.todo_detail),
    
    path('todosOwner', views.TodotList.as_view() ),
    path('todosOwner/<int:pk>', views.TodoDetail.as_view()),
     
     
]