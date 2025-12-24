---
id: "010"
title: "Fix Backend Streaming Model Name"
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
  - "gemini-api"
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
what have you done? Again this error message is coming in the chatbot: [Sorry, I encountered an error. Please try again later.]

# Response
I investigated the potential causes and identified that the model name change to `gemini-1.5-flash` likely caused the backend to fail if the API key or environment wasn't configured for that specific version alias.

**The Fix:**
I reverted the model name in `backend/src/backend/api/chat.py` back to `models/gemini-flash-latest`, which was verified to be working in previous steps.

This should restore functionality while keeping the new streaming architecture intact.
