"""setup URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path 
from django.urls import include
from rest_framework.authtoken.views import obtain_auth_token
#
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)



from rest_framework.documentation import include_docs_urls


API_TITLE = 'API title'
API_DESCRIPTION = 'my self teaching django rest api'


urlpatterns = [ 
    path('admin/', admin.site.urls), 
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),  # <-- And here
    
    path('api/token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    # path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    
    path('api/', include('todoSimple.urls')),
    path('api2/', include('todoWithOwner.urls')),
    path('upload/', include('uploadFile.urls')),
    
     path('docs/', include_docs_urls(title=API_TITLE, description=API_DESCRIPTION))
]
 
  
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)