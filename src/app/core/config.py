from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache

class Settings(BaseSettings):
    # App Settings
    PROJECT_NAME: str = "Agentic Quiz Platform"
    
    # Database Settings
    DATABASE_URL: str
    
    # AI Settings (Legacy - keeping for backward compatibility)
    GOOGLE_API_KEY: str | None = None
    
    # OpenRouter Settings
    OPEN_ROUTER_API_KEY: str
    OPENROUTER_API_BASE: str = "https://openrouter.ai/api/v1"
    OPENROUTER_MODEL: str = "openrouter/deepseek/deepseek-r1"
    OPENROUTER_MAX_TOKENS: int = 2048  # Reduced to stay within credit limits
    OPENROUTER_TEMPERATURE: float = 0.7

    model_config = SettingsConfigDict(env_file=".env", case_sensitive=True)

@lru_cache()
def get_settings():
    return Settings()

settings = get_settings()
