# OpenRouter Migration Guide

## ✅ Migration Complete!

Successfully migrated from **Google Gemini API** to **OpenRouter** using **LiteLLM**.

---

## 🔄 Changes Made

### 1. **Environment Variables** (`.env`)
- ✅ `OPEN_ROUTER_API_KEY` already added
- ℹ️ `GOOGLE_API_KEY` kept for backward compatibility (optional now)

### 2. **Configuration** (`src/app/core/config.py`)
Added OpenRouter settings:
```python
# OpenRouter Settings
OPEN_ROUTER_API_KEY: str
OPENROUTER_API_BASE: str = "https://openrouter.ai/api/v1"
OPENROUTER_MODEL: str = "openrouter/deepseek/deepseek-r1"
```

### 3. **Dependencies** (`pyproject.toml`)
Added LiteLLM:
```toml
"litellm>=1.57.11"
```

### 4. **Agent Core** (`src/app/agent/core.py`)
Migrated from:
- ❌ `google.adk.Agent` with Gemini models
- ❌ `adk.tools.FunctionTool` wrapper

To:
- ✅ `google.adk.agents.LlmAgent` with LiteLLM
- ✅ Direct function passing to tools
- ✅ OpenRouter DeepSeek R1 model

---

## 🚀 Usage

The agent now uses **OpenRouter's free DeepSeek R1 model** instead of Gemini.

### Current Model
```
openrouter/deepseek/deepseek-r1
```

### To Change Models
Update the `.env` file:
```env
OPENROUTER_MODEL=openrouter/meta-llama/llama-3.3-70b-instruct:free
```

Or any other free model from [OpenRouter's model list](https://openrouter.ai/models).

---

## 🧪 Testing

Test the agent initialization:
```bash
uv run python -c "from src.app.agent.core import educator_agent; print('Agent loaded successfully!')"
```

Expected output:
```
🔧 Initializing EducatorAgent with OpenRouter model: openrouter/deepseek/deepseek-r1
✅ EducatorAgent initialized successfully with OpenRouter!
Agent loaded successfully!
```

---

## 📋 Available Free Models on OpenRouter

Some popular free models you can use:
- `openrouter/deepseek/deepseek-r1` (Current)
- `openrouter/meta-llama/llama-3.3-70b-instruct:free`
- `openrouter/google/gemini-2.0-flash-exp:free`
- `openrouter/mistralai/mistral-7b-instruct:free`
- `openrouter/qwen/qwen-2.5-72b-instruct:free`

Visit [OpenRouter Models](https://openrouter.ai/models?order=newest&supported_parameters=tools) for the full list.

---

## 🔧 Troubleshooting

### API Key Issues
If you get API key errors, verify:
```bash
# Check .env file
cat .env | grep OPEN_ROUTER_API_KEY
```

### Model Not Found
If the model is unavailable:
1. Check [OpenRouter status](https://openrouter.ai/models)
2. Try a different model
3. Update `OPENROUTER_MODEL` in `.env`

---

## 💡 Benefits of OpenRouter

1. **Free Models**: Access to multiple free models
2. **No Quota Limits**: Unlike Gemini's quota restrictions
3. **Model Flexibility**: Easy to switch between different providers
4. **LiteLLM Integration**: Unified interface for multiple LLM providers
5. **Cost Tracking**: OpenRouter provides usage analytics

---

## 📝 Notes

- The old Gemini code has been completely replaced
- All tools work the same way with the new setup
- The agent interface remains unchanged for the rest of the application
- You can still add `GOOGLE_API_KEY` back if needed (it's optional now)

---

**Migration Date**: January 6, 2026  
**Status**: ✅ Complete and Tested
