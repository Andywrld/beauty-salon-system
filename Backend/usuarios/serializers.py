import re
from rest_framework import serializers
from .models import  Usuario
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import check_password




class CustomTokenObtainPairSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    access = serializers.CharField(read_only=True)
    refresh = serializers.CharField(read_only=True)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        try:
            user = Usuario.objects.get(usuario=username)
        except Usuario.DoesNotExist:
            raise serializers.ValidationError('Usuario o contraseña incorrectos.')

        if not check_password(password, user.password):
            raise serializers.ValidationError('Usuario o contraseña incorrectos.')

        refresh = RefreshToken.for_user(user)
        data['access'] = str(refresh.access_token)
        data['refresh'] = str(refresh)
        data['user'] = {
            'id': user.id,
            'username': user.usuario,
            'email': user.correo,
            'rol': user.rol,  # Se incluye el rol para la lógica en el frontend
        }

        return data


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'
        
    def validate_usuario(self, usuario):
      
        if not re.search(r'[a-zA-Z]', usuario):  
            raise serializers.ValidationError("El nombre de usuario debe contener al menos una letra.")
       
        if usuario.isdigit():  
            raise serializers.ValidationError("El nombre de usuario no puede ser solo números.")
        
        return usuario
    
    def validate_correo(self, correo):
        email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
        if not re.match(email_regex, correo):
            raise serializers.ValidationError("El correo electrónico no es válido.")
        return correo
    
    def validate_telefono(self, telefono):
        if not str(telefono).isdigit() :  
            raise serializers.ValidationError("El teléfono debe ser numérico.")
        if telefono <= 0:  
            raise serializers.ValidationError("El teléfono debe ser un número positivo.")
        return telefono
    
    def validate_rol(self, rol):
        mixed_roles = ['cliente', 'admin']
        if rol not in mixed_roles:
            raise serializers.ValidationError("El rol debe ser 'cliente' o 'admin'.")
        return rol
    
  
    
     


