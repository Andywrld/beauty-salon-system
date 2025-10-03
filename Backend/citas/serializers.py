# apps/booking/serializers.py
from django.utils import timezone
from rest_framework import serializers
from .models import Cita
from servicios.models import Servicio
from rest_framework.validators import UniqueTogetherValidator

class AppointmentSerializer(serializers.ModelSerializer):
    service = serializers.PrimaryKeyRelatedField(queryset=Servicio.objects.all(), required=True)
    start = serializers.DateTimeField(required=True)
    
    class Meta:
        model = Cita
        fields = '__all__'
        read_only_fields = ('end', 'created_at')
        validators = [
            UniqueTogetherValidator(
                queryset=Cita.objects.all(),
                fields=['service','start'],
                message="Ese servicio ya está reservado a esa hora. Elige otra fecha."
            )
        ]

    def validate_start(self, value):
        if not value:
            raise serializers.ValidationError("Start time is required")
            
        if value < timezone.now():
            raise serializers.ValidationError(
                "No se puede reservar en fechas u horas pasadas."
            )
        return value

    def create(self, validated_data):
        try:
            return super().create(validated_data)
        except Exception as exc:
            if "unique_service_start" in str(exc):
                raise serializers.ValidationError(
                    "Ese servicio ya está reservado a esa hora. Elige otra fecha."
                )
            raise
