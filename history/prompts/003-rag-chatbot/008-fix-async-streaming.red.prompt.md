---
id: "011"
title: "Switch to AsyncOpenAI for Streaming"
stage: "red"
date: "2025-12-24"
surface: "agent"
model: "gemini-2.0-flash-exp"
feature: "chatbot"
branch: "main"
user: "user"
command: "replace"
labels:
  - "bugfix"
  - "backend"
  - "async"
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - "backend/src/backend/api/chat.py"
tests: []
---

# Prompt
again same error. This error was not coming before changes.

# Response
The "Server Error" persisted because I was using the synchronous `OpenAI` client within an `async` generator function in FastAPI. This blocks the event loop and can cause the stream to fail or timeout.

**The Fix:**
I updated `backend/src/backend/api/chat.py` to use `AsyncOpenAI`.
*   Changed import to `from openai import AsyncOpenAI`.
*   Initialized `aclient = AsyncOpenAI(...)`.
*   Used `await aclient.chat.completions.create(...)`.
*   Iterated using `async for chunk in stream:`.

This ensures the streaming response is handled completely asynchronously, preventing blocking issues.
