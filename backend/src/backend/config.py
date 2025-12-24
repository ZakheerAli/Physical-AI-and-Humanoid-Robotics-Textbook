import os
from pydantic_settings import BaseSettings, SettingsConfigDict

# Determine the absolute path to the project root (assuming .env is in the parent of the parent of this file)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DOTENV_PATH = os.path.join(BASE_DIR, ".env")

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=DOTENV_PATH, extra="ignore")

    APP_NAME: str = "Physical AI Backend"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "your-secret-key"  # TODO: Generate a strong secret key
    ENVIRONMENT: str = "development"

    # Database and API keys
    QDRANT_URL: str
    QDRANT_API_KEY: str
    NEON_DATABASE_URL: str
    OPENAI_API_KEY: str


settings = Settings()
