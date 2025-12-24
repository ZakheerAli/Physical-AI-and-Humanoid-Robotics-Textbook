from openai import OpenAI
import os
from dotenv import load_dotenv

# Path to .env (one level up from src/backend)
base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
dotenv_path = os.path.join(base_dir, ".env")
load_dotenv(dotenv_path)

api_key = os.getenv("OPENAI_API_KEY")
print(f"Using API Key: {api_key[:5]}...{api_key[-5:]}")

client = OpenAI(
    api_key=api_key,
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

try:
    print("Sending request to Gemini...")
    response = client.chat.completions.create(
        model="models/gemini-flash-latest",
        messages=[{"role": "user", "content": "Hello"}],
    )
    print("✅ Success!")
    print(f"Response: {response.choices[0].message.content}")
except Exception as e:
    print(f"❌ Failed: {e}")
