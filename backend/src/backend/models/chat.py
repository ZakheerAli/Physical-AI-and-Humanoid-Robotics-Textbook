from pydantic import BaseModel
from typing import List, Optional

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[ChatMessage]] = []
    selection: Optional[str] = None


class ChatResponse(BaseModel):
    answer: str
    sources: Optional[List[str]] = []
