from typing import Literal

from fastapi import APIRouter, Request
from pydantic import BaseModel, Field

from private_gpt.settings.settings import settings

# Not authentication or authorization required to get the health status.
health_router = APIRouter()


class HealthResponse(BaseModel):
    status: Literal["ok"] = Field(default="ok")


class ModelInfoResponse(BaseModel):
    llm: str = Field(description="The LLM mode being used")
    model: str = Field(description="The model name being used")


@health_router.get("/health", tags=["Health"])
def health() -> HealthResponse:
    """Return ok if the system is up."""
    return HealthResponse(status="ok")


@health_router.get("/health/model", tags=["Health"])
def model_info(request: Request) -> ModelInfoResponse:
    """Return information about the current model configuration."""
    config = settings()
    
    # Get LLM mode
    llm_mode = config.llm.mode
    
    # Get model name based on mode
    model_name = ""
    if llm_mode == "llamacpp":
        model_name = config.llamacpp.llm_hf_model_file
    elif llm_mode == "openai":
        model_name = config.openai.model
    elif llm_mode == "openailike":
        model_name = config.openai.model
    elif llm_mode == "azopenai":
        model_name = config.azopenai.llm_model
    elif llm_mode == "sagemaker":
        model_name = config.sagemaker.llm_endpoint_name
    elif llm_mode == "ollama":
        model_name = config.ollama.llm_model
    elif llm_mode == "gemini":
        model_name = config.gemini.model
    else:
        model_name = llm_mode
    
    return ModelInfoResponse(llm=llm_mode, model=model_name)