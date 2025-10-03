# conftest.py
import pytest
from rest_framework.test import APIClient
from django.contrib.auth.models import User

@pytest.fixture
def api_client():
    """Cliente REST para hacer peticiones a la API."""
    return APIClient()

@pytest.fixture
def user(db):
    """Usuario Django válido para autenticación."""
    return User.objects.create_user(username="admin", password="123456")
