import os
import logging
from typing import Optional
from google.adk.agents import LlmAgent
from google.adk.models.lite_llm import LiteLlm
from google.genai import types
from .tools import initialize_quiz_session, get_educational_context
from .prompts import SYSTEM_INSTRUCTION
from ..core.config import settings

logger = logging.getLogger(__name__)

# Global agent instance
_educator_agent: Optional[LlmAgent] = None

def create_educator_agent() -> LlmAgent:
    """
    Creates an educator agent using OpenRouter's free models via LiteLLM.
    This replaces the previous Gemini-based implementation.
    """
    try:
        # 1. Define the tools for the agent
        tools = [
            initialize_quiz_session,
            get_educational_context
        ]

        # 2. Validate OpenRouter API key
        if not settings.OPEN_ROUTER_API_KEY:
            raise ValueError("OPEN_ROUTER_API_KEY is missing! Please add it to your .env file")
        
        logger.info(f"🔧 Initializing EducatorAgent with OpenRouter model: {settings.OPENROUTER_MODEL}")
        logger.info(f"📊 Token limit: {settings.OPENROUTER_MAX_TOKENS}, Temperature: {settings.OPENROUTER_TEMPERATURE}")

        # 3. Create the LiteLLM model configuration for OpenRouter
        lite_llm_model = LiteLlm(
            model=settings.OPENROUTER_MODEL,
            api_key=settings.OPEN_ROUTER_API_KEY,
            api_base=settings.OPENROUTER_API_BASE,
            max_tokens=settings.OPENROUTER_MAX_TOKENS,
            temperature=settings.OPENROUTER_TEMPERATURE
        )
        
        # 4. Create generation config to limit token usage
        generation_config = types.GenerateContentConfig(
            temperature=settings.OPENROUTER_TEMPERATURE,
            max_output_tokens=settings.OPENROUTER_MAX_TOKENS,
        )
        
        # 5. Create the LlmAgent with LiteLLM
        agent = LlmAgent(
            name="EducatorAgent",
            model=lite_llm_model,
            tools=tools,
            instruction=SYSTEM_INSTRUCTION,
            generate_content_config=generation_config
        )
        
        logger.info("✅ EducatorAgent initialized successfully with OpenRouter!")
        return agent
    
    except Exception as e:
        logger.error(f"❌ Failed to initialize EducatorAgent: {str(e)}")
        raise

def get_educator_agent() -> LlmAgent:
    """
    Lazy-loads the educator agent on first use.
    This prevents blocking during app startup.
    """
    global _educator_agent
    if _educator_agent is None:
        _educator_agent = create_educator_agent()
    return _educator_agent

# For backward compatibility, create a property-like access
educator_agent = None

def __getattr__(name):
    if name == "educator_agent":
        return get_educator_agent()
    raise AttributeError(f"module '{__name__}' has no attribute '{name}'")
