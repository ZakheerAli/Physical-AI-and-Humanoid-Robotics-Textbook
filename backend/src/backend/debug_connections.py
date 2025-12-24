import sys
import os
# Ensure we can import from backend
sys.path.append(os.path.join(os.path.dirname(__file__), ".."))

from backend.config import settings
from qdrant_client import QdrantClient
from openai import OpenAI
from sentence_transformers import SentenceTransformer
import psycopg

def test_qdrant():
    print("\n--- Testing Qdrant connection ---")
    try:
        client = QdrantClient(url=settings.QDRANT_URL, api_key=settings.QDRANT_API_KEY)
        collections = client.get_collections()
        print("✅ Qdrant connection successful.")
        print(f"Collections: {collections}")
    except Exception as e:
        print(f"❌ Qdrant connection failed: {e}")

def test_neon():
    print("\n--- Testing Neon DB connection ---")
    try:
        conn = psycopg.connect(settings.NEON_DATABASE_URL)
        conn.close()
        print("✅ Neon DB connection successful.")
    except Exception as e:
        print(f"❌ Neon DB connection failed: {e}")

def test_embeddings():
    print("\n--- Testing Embeddings model ---")
    try:
        print("Loading model (this might take a moment)...")
        model = SentenceTransformer("all-MiniLM-L6-v2")
        vector = model.encode("test")
        print("✅ Embeddings model loaded and working.")
        print(f"Vector dimension: {len(vector)}")
    except Exception as e:
        print(f"❌ Embeddings model failed: {e}")

def test_gemini():
    print("\n--- Testing Gemini API via OpenAI SDK ---")
    try:
        client = OpenAI(
            api_key=settings.OPENAI_API_KEY,
            base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
        )
        response = client.chat.completions.create(
            model="gemini-1.5-flash",
            messages=[{"role": "user", "content": "Hello, are you working?"}],
        )
        print("✅ Gemini API successful.")
        print(f"Response: {response.choices[0].message.content}")
    except Exception as e:
        print(f"❌ Gemini API failed: {e}")

if __name__ == "__main__":
    print("Starting diagnostics...")
    test_qdrant()
    test_neon()
    test_embeddings()
    test_gemini()
    print("\nDiagnostics complete.")
