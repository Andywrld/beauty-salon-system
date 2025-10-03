from rest_framework import serializers
from .models import Foto



class FotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Foto
        fields = '__all__'
        
    
    def validate_imag(self, value):
        if value and not value.name.endswith(('.jpg', '.jpeg', '.png','webp')):
            raise serializers.ValidationError("La imagen debe ser un archivo JPG o PNG.")
        
        if value == None:
            raise serializers.ValidationError("La imagen es obligatoria.")
        return value

