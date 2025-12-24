import pytest
from fastapi.testclient import TestClient
import sys
import os
from unittest.mock import MagicMock, patch

# Add src to sys.path
sys.path.append(os.path.join(os.path.dirname(os.path.dirname(__file__)), 'src'))

# Mock dependencies before any imports that might use them
with patch('sentence_transformers.SentenceTransformer'), \
     patch('qdrant_client.QdrantClient'), \
     patch('openai.OpenAI'), \
     patch('backend.db.log_conversation'):
    from backend.main import app

client = TestClient(app)

def test_chat_full():
    with patch('backend.api.chat.embedding_model') as mock_embedding_model, \
         patch('backend.api.chat.qdrant_client') as mock_qdrant_client, \
         patch('backend.api.chat.client') as mock_openai_client:
        
        # Mock embedding - encode should return something with .tolist()
        mock_embedding = MagicMock()
        mock_embedding.tolist.return_value = [0.1] * 384
        mock_embedding_model.encode.return_value = mock_embedding
        
        # Mock Qdrant search
        mock_res = MagicMock()
        mock_res.payload = {"text": "Physical AI is cool.", "source": "chapter1.mdx"}
        
        mock_query_response = MagicMock()
        mock_query_response.points = [mock_res]
        mock_qdrant_client.query_points.return_value = mock_query_response
        
        # Mock OpenAI chat completion
        mock_choice = MagicMock()
        mock_choice.message.content = "Physical AI is indeed cool."
        mock_openai_client.chat.completions.create.return_value.choices = [mock_choice]
        
        response = client.post(
            "/api/v1/chat/full",
            json={"message": "What is physical AI?"}
        )
        
        assert response.status_code == 200
        assert response.json()["answer"] == "Physical AI is indeed cool."
        assert "chapter1.mdx" in response.json()["sources"]

def test_chat_selected():
    with patch('backend.api.chat.client') as mock_openai_client:
        mock_choice = MagicMock()
        mock_choice.message.content = "This selection explains robotics."
        mock_openai_client.chat.completions.create.return_value.choices = [mock_choice]
        
        response = client.post(
            "/api/v1/chat/selected",
            json={
                "message": "Explain this",
                "selection": "Robotics is the study of robots."
            }
        )
        
        assert response.status_code == 200
        assert response.json()["answer"] == "This selection explains robotics."
        assert "User Selection" in response.json()["sources"]

def test_chat_selected_no_selection():
    response = client.post(
        "/api/v1/chat/selected",
        json={"message": "Explain this"}
    )
    assert response.status_code == 400
