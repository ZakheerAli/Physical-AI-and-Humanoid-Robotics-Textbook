---
id: "007"
title: "Update Chatbot Selection Behavior to Input Fill"
stage: "refactor"
date: "2025-12-24"
surface: "agent"
model: "gemini-2.0-flash-exp"
feature: "chatbot"
branch: "main"
user: "user"
command: "replace"
labels:
  - "ux"
  - "react"
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - "frontend/src/components/Chatbot/index.tsx"
tests: []
---

# Prompt
Now, a popup appears when the user selects text. I want the selected text to automatically be treated as a user prompt for the chatbot and be displayed directly in the chatbot’s input field, allowing the user to review or submit it without retyping.

# Response
I updated the `handleContextClick` logic in `frontend/src/components/Chatbot/index.tsx`.

**Change:**
*   **Previous:** Clicking "Ask AI" set a special `contextText` state, showing a "Selected: ..." preview above the input, while the input remained empty for the user's question.
*   **New:** Clicking "Ask AI" now directly sets the `input` state to the selected text and clears `contextText`.

**Result:**
The selected text appears immediately in the text box as a draft. The user can edit it or send it directly. The message is processed as a standard `/chat/full` request (utilizing RAG) rather than the specialized `/chat/selected` context mode, which aligns with treating the text as the user's *prompt* rather than just context.
