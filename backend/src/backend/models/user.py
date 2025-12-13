from typing import Optional

from pydantic import BaseModel, Field


class User(BaseModel):
    id: Optional[str] = Field(None, description="Unique identifier for the user.")
    username: str = Field(..., description="The user's chosen username.")
    email: str = Field(..., description="The user's email address.")
    password_hash: str = Field(..., description="The hashed password for the user.")
    role: str = Field(
        "student", description="The user's role ('student', 'educator', 'researcher')."
    )
