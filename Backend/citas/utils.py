# apps/booking/utils.py
from datetime import datetime, time, timedelta
from django.utils import timezone
from .models import Cita

WORK_START = time(9, 0)   # 09:00
WORK_END   = time(18, 0)  # 18:00
STEP       = timedelta(hours=1)

def build_availability(service, day):

    slots = []
    current = datetime.combine(day, WORK_START, tzinfo=timezone.get_current_timezone())
    end_day = datetime.combine(day, WORK_END, tzinfo=timezone.get_current_timezone())
    
    
    
    while current < end_day:
        slots.append(current)
        current += STEP

    
    taken = set(
        Cita.objects.filter(service=service, start__date=day)
        .values_list('start', flat=True)
    )
    
    return [dt.strftime("%H:%M") for dt in slots if dt not in taken]
