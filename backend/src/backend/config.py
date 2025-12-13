from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    APP_NAME: str = "Physical AI Backend"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "your-secret-key"  # TODO: Generate a strong secret key
    ENVIRONMENT: str = "development"


settings = Settings()
