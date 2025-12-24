---
id: 005
title: Implement Selection Context in Chatbot
stage: refactor
date: 2025-12-23
surface: agent
model: gemini
feature: rag-chatbot
branch: main
user: user
command: selected text not appearing in input
labels: ["frontend", "ux", "context"]
links:
  spec: specs/003-rag-chatbot/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - frontend/src/components/Chatbot/index.tsx
 - frontend/src/components/Chatbot/Chatbot.module.css
tests:
 - manual verification
---

## Prompt

Now the chatbot is working fine but the selected text is not appearing in the input field in the chatbot.

## Response snapshot

Implemented a better UX for text selection. Instead of immediately sending a generic query, the chatbot now:
1. Captures the selection into a `contextText` state.
2. Opens the chat window.
3. Displays a "Selected context" preview above the input field.
4. Allows the user to type a custom question.
5. Uses the `/api/v1/chat/selected` endpoint when context is present.

## Outcome

- ✅ Impact: Improved UX for context-aware chat. User can now ask specific questions about highlighted text.
- 🧪 Tests: Component renders correctly.
- 📁 Files: Modified Chatbot component and CSS.
- 🔁 Next prompts: Verify functionality.
- 🧠 Reflection: Allowing the user to edit the query while keeping the selection as context is a standard and preferred AI interaction pattern.
