from openai import OpenAI
import os
from dotenv import load_dotenv

base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
dotenv_path = os.path.join(base_dir, ".env")
load_dotenv(dotenv_path)

api_key = os.getenv("OPENAI_API_KEY")

client = OpenAI(
    api_key=api_key,
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

try:
    print("Listing models...")
    models = client.models.list()
    for model in models:
        print(f"- {model.id}")
except Exception as e:
    print(f"❌ Failed to list models: {e}")
