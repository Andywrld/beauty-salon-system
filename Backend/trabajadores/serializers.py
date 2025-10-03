from rest_framework import serializers
from .models import Trabajador
from datetime import datetime

class TrabajadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trabajador
        fields = '__all__'


    def validate_ci(self,ci) -> bool:
       
        if len(ci) != 11:
            raise serializers.ValidationError('Ingrese un carnet válido')

      
        fecha_nacimiento = ci[:6]

        
        if not fecha_nacimiento.isdigit():
            raise serializers.ValidationError('Ingrese un carnet válido')

        año = int(fecha_nacimiento[:2])  
        mes = int(fecha_nacimiento[2:4])  
        dia = int(fecha_nacimiento[4:6])  

        if not (1 <= mes <= 12):
            raise serializers.ValidationError('Ingrese un carnet válido')

        if not (1 <= dia <= 31):
            raise serializers.ValidationError('Ingrese un carnet válido')

       
        return ci
    
    def validate_salario(self,salario):
        if salario < 0:
            raise serializers.ValidationError("EL salario no puede ser negativo") 
    
        return salario
        