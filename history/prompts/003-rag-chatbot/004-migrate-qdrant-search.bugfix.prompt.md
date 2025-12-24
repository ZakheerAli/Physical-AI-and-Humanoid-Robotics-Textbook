---
id: 004
title: Migrate Qdrant search to query_points
stage: bugfix
date: 2025-12-23
surface: agent
model: gemini
feature: rag-chatbot
branch: main
user: user
command: 500 error AttributeError search
labels: ["bugfix", "backend", "qdrant"]
links:
  spec: specs/003-rag-chatbot/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - backend/src/backend/api/chat.py
 - backend/tests/test_chat.py
tests:
 - poetry run pytest
---

## Prompt

Now there is no error message in the chatbot, rather there is no response in the output but this error is there in the browser console : [Failed to load resource: the server responded with a status of 500 (Internal Server Error)
...
ERROR:backend.api.chat:Error in chat_full: 'QdrantClient' object has no attribute 'search'

## Response snapshot

Fixed the `AttributeError` by migrating from the deprecated `qdrant_client.search` to `qdrant_client.query_points` in `backend/src/backend/api/chat.py`. Updated the mock tests in `backend/tests/test_chat.py` to match the new API return structure.

## Outcome

- ✅ Impact: Resolved the crash when querying Qdrant.
- 🧪 Tests: Tests passed locally.
- 📁 Files: Updated chat API and tests.
- 🔁 Next prompts: Verify in browser.
- 🧠 Reflection: Qdrant client v1.10+ introduced major API changes; staying updated with the specific installed version's methods is crucial.
