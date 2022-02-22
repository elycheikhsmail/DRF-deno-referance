from django.urls import path  
from .import views1, views,views2

urlpatterns = [
    path("",views1.simple_upload),  
    path("home",views2.home,name="home"),
    path("up",views2.model_form_upload ,name="home"),
    
    
    # path('todos/<int:pk>', views_todo.todo_detail),
    path('up2', views.uploadApiView.as_view() ), 
    #  http://127.0.0.1:8080/upload/up2
    # POST
    #  'description','document']
     
]