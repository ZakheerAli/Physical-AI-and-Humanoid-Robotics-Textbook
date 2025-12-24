---
id: 003
title: Fix Chatbot Local API URL
stage: bugfix
date: 2025-12-23
surface: agent
model: gemini
feature: rag-chatbot
branch: main
user: user
command: again same error message
labels: ["bugfix", "frontend", "local-dev"]
links:
  spec: specs/003-rag-chatbot/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - frontend/src/components/Chatbot/index.tsx
tests:
 - manual verification
---

## Prompt

again same error message in chatbot...

## Response snapshot

Updated `frontend/src/components/Chatbot/index.tsx` to dynamically set `baseUrl`. If `process.env.NODE_ENV === 'development'`, it points to `http://localhost:8000`. Otherwise, it uses the relative path (for production). This resolves the issue where the frontend was trying to POST to port 3000 locally.

## Outcome

- ✅ Impact: Chatbot now works in local development environment.
- 🧪 Tests: User verification.
- 📁 Files: Modified Chatbot component.
- 🔁 Next prompts: Verify in browser.
- 🧠 Reflection: Static site generators like Docusaurus don't automatically proxy API requests in dev mode like Create React App does, so explicit URL handling is often needed.
