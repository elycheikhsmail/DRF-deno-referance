from django.urls import path
from . import views_todo
from . import views_user
from . import views_protected

urlpatterns = [ 
    # path('todos', views_todo.todo_list),
    # path('todos/<int:pk>', views_todo.todo_detail),
    
    path('todos', views_todo.TodotList.as_view() ),
    path('todos/<int:pk>', views_todo.TodoDetail.as_view()),
    
    path('auth/register', views_user.register_user),
    path('auth/login', views_user.login_user),
    path('auth/p', views_user.protected_url),
    path('auth/s', views_user.secret_page),
    
    path('hello/', views_protected.HelloView.as_view(), name='hello'),
    #path('hello/', views_protected.api_view, name='hello'),
     
]