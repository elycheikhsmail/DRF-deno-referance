from rest_framework.serializers import (
    Serializer, FileField, ListField,
    ModelSerializer
)
from .models import Document

# Serializers define the API representation.
class UploadSerializer(Serializer):
    file_uploaded = FileField()
    class Meta:
        fields = ['file_uploaded']


# Serializer for multiple files upload.
class MultipleFilesUploadSerializer(Serializer):
    file_uploaded = ListField()
    class Meta:
        fields = ['file_uploaded']
        



class DocumentSerializer(ModelSerializer):
    class Meta:
        model = Document
        fields = ['id', 'description','document','uploaded_at']
        
