
from datetime import datetime

from rest_framework import viewsets, permissions
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import api_view, permission_classes,authentication_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import Cita, Servicio
from .serializers import AppointmentSerializer
from .utils import build_availability


class CitaViewSet(viewsets.ModelViewSet):
    queryset = Cita.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ('service', 'start', 'customer')

   

@api_view(['GET'])
@authentication_classes([])   
@permission_classes([AllowAny])
def availability(request):
    service_id = request.query_params.get('service_id')
    date_str   = request.query_params.get('date')

    if not (service_id and date_str):
        return Response(
            {"detail": "Parámetros service_id y date son requeridos"},
            status=400
        )

  
    try:
        servicio = Servicio.objects.get(pk=service_id)
    except Servicio.DoesNotExist:
        return Response(
            {"detail": "Servicio no encontrado"},
            status=404
        )


    try:
        day = datetime.fromisoformat(date_str).date()
    except ValueError:
        return Response(
            {"detail": "Formato de fecha inválido. Usa YYYY-MM-DD."},
            status=400
        )

    free_slots = build_availability(servicio, day)  # lista de "HH:MM"

    return Response({
        "service": servicio.nombre,
        "date": date_str,
        "free": free_slots
    })
