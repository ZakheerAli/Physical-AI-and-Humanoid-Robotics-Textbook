from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from backend.models.chat import ChatRequest
from backend.config import settings
from backend.db import log_conversation
from qdrant_client import QdrantClient
from sentence_transformers import SentenceTransformer
from openai import AsyncOpenAI
import logging
import json
import asyncio

router = APIRouter()
logger = logging.getLogger(__name__)

# Load embedding model once
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")

# Initialize OpenAI client for Gemini
aclient = AsyncOpenAI(
    api_key=settings.OPENAI_API_KEY,
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

qdrant_client = QdrantClient(
    url=settings.QDRANT_URL,
    api_key=settings.QDRANT_API_KEY,
)

async def generate_chat_stream(messages, sources, request_message, mode, selection=None):
    """
    Generator that yields NDJSON lines:
    1. Sources: {"type": "sources", "data": [...]}
    2. Content chunks: {"type": "chunk", "data": "..."}
    """
    full_answer = ""
    
    # 1. Send Sources immediately
    yield json.dumps({"type": "sources", "data": sources}) + "\n"

    try:
        # 2. Stream response from Gemini
        stream = await aclient.chat.completions.create(
            model="models/gemini-flash-latest",
            messages=messages,
            stream=True
        )

        async for chunk in stream:
            if chunk.choices and chunk.choices[0].delta.content:
                content = chunk.choices[0].delta.content
                full_answer += content
                yield json.dumps({"type": "chunk", "data": content}) + "\n"
        
        # 3. Log after completion
        log_conversation(
            user_message=request_message,
            bot_response=full_answer,
            sources=sources,
            selection=selection,
            mode=mode
        )

    except Exception as e:
        logger.error(f"Stream error: {e}")
        yield json.dumps({"type": "error", "data": str(e)}) + "\n"

@router.post("/full")
async def chat_full(request: ChatRequest):
    try:
        # 1. Embed the query
        query_embedding = embedding_model.encode(request.message).tolist()

        # 2. Retrieve from Qdrant
        collection_name = "textbook"
        search_result = qdrant_client.query_points(
            collection_name=collection_name,
            query=query_embedding,
            limit=5
        ).points

        context = "\n---\n".join([res.payload["text"] for res in search_result])
        sources = list(set([res.payload["source"] for res in search_result]))

        # 3. Generate response
        system_prompt = (
            "You are a helpful assistant for the 'Physical AI and Humanoid Robotics' textbook. "
            "Use the following pieces of retrieved context to answer the user's question. "
            "If you don't know the answer, just say that you don't know, don't try to make up an answer. "
            "Keep the answer concise.\n\n"
            f"Context:\n{context}"
        )

        messages = [{"role": "system", "content": system_prompt}]
        if request.history:
            for msg in request.history:
                messages.append({"role": msg.role, "content": msg.content})
        messages.append({"role": "user", "content": request.message})

        return StreamingResponse(
            generate_chat_stream(messages, sources, request.message, "full"),
            media_type="application/x-ndjson"
        )

    except Exception as e:
        logger.error(f"Error in chat_full: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/selected")
async def chat_selected(request: ChatRequest):
    try:
        if not request.selection:
            raise HTTPException(status_code=400, detail="No text selection provided")

        system_prompt = (
            "You are a helpful assistant for the 'Physical AI and Humanoid Robotics' textbook. "
            "The user has selected a specific part of the book and has a question about it. "
            "Use the provided selection as context to answer the user's question. "
            "If the answer is not in the selection, try to answer based on your general knowledge but mention that it was not in the selected text.\n\n"
            f"Selected Text:\n{request.selection}"
        )

        messages = [{"role": "system", "content": system_prompt}]
        if request.history:
            for msg in request.history:
                messages.append({"role": msg.role, "content": msg.content})
        messages.append({"role": "user", "content": request.message})

        return StreamingResponse(
            generate_chat_stream(messages, ["User Selection"], request.message, "selected", request.selection),
            media_type="application/x-ndjson"
        )

    except HTTPException as e:
        raise e
    except Exception as e:
        logger.error(f"Error in chat_selected: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))