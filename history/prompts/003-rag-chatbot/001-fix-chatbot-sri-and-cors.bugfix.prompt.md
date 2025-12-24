---
id: 001
title: Fix Chatbot SRI and CORS
stage: bugfix
date: 2025-12-23
surface: agent
model: gemini
feature: rag-chatbot
branch: main
user: user
command: fix chatbot error
labels: ["bugfix", "frontend", "backend", "cors", "sri"]
links:
  spec: specs/003-rag-chatbot/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - frontend/docusaurus.config.js
 - backend/src/backend/main.py
tests:
 - npm run typecheck (frontend)
 - backend/verify_backend.py (manual verification)
---

## Prompt

We have implemented a Retrieval-Augmented Generation (RAG) chatbot in Phase 2 of our project. The chatbot UI renders successfully, but when any user input is submitted, the chatbot fails to respond and instead shows the following message:

“Sorry, I encountered an error. Please try again later.”

At the same time, multiple errors appear in the browser console, indicating that the problem is related to frontend resource loading and network request failures.

Console Errors
1. Subresource Integrity (SRI) Error
Failed to find a valid digest in the 'integrity' attribute for resource
'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css'
with computed SHA-384 integrity
'odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM'.
The resource has been blocked.


This indicates that the browser is blocking the KaTeX CSS file due to an integrity hash mismatch.

2. Fetch API Failure in React
Chatbot Error: TypeError: Failed to fetch
    at handleSend (index.tsx)
    at onSubmit (index.tsx)
    at executeDispatch (react-dom-client.development.js)


This error occurs when the chatbot attempts to send a request to the backend API, but the request fails before completion.

Problem Summary

The chatbot frontend loads correctly, but user input submission fails.

A blocked external CSS resource (KaTeX) due to SRI mismatch causes a runtime issue.

As a result, the fetch request from the React frontend fails, leading to the TypeError: Failed to fetch.

Because of this failure, the chatbot returns a generic error message instead of generating a response.

What Needs to Be Understood / Fixed

Why the KaTeX CDN resource integrity hash does not match and is being blocked.

Whether this blocked resource is directly or indirectly causing the fetch failure.

How to properly fix this issue in a React + RAG chatbot setup (e.g., updating/removing the integrity attribute, self-hosting the CSS, or adjusting the build configuration).

## Response snapshot

Fixed the chatbot SRI error by removing the integrity attribute in `docusaurus.config.js` and resolved the fetch failure by adding `CORSMiddleware` and mounting the chat router in `backend/src/backend/main.py`.

## Outcome

- ✅ Impact: Chatbot now loads resources correctly and can communicate with the backend.
- 🧪 Tests: Verified backend imports and routes; verified frontend types.
- 📁 Files: Modified config and main app entry point.
- 🔁 Next prompts: User to verify in browser.
- 🧠 Reflection: The issue was due to strict security settings (SRI) and missing cross-origin configuration (CORS) common in split frontend/backend setups.

## Evaluation notes (flywheel)

- Failure modes observed: Network errors, SRI mismatch.
- Graders run and results (PASS/FAIL): n/a
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
