from rest_framework import serializers
from .models import Promocion
from servicios.serializers import ServicioSerializer
from .models import Servicio



class PromocionSerializer(serializers.ModelSerializer):
    
    servicio_id = serializers.PrimaryKeyRelatedField(
        queryset=Servicio.objects.all(),
        source='servicio',   
        write_only=True,
    )
    
    servicio=ServicioSerializer(read_only=True)
    class Meta:
        
        model = Promocion
        fields = [
            'id',
            'nombre',
            'servicio_id',
            'servicio',
            'descripcion',
            'porcientoDesc'
        ]
        
        