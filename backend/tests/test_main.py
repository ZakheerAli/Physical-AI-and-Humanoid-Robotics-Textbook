from fastapi.testclient import TestClient
import sys
import os

# Add src to sys.path
sys.path.append(os.path.join(os.path.dirname(os.path.dirname(__file__)), 'src'))

from backend.main import app

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert "Welcome to" in response.json()["message"]

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
