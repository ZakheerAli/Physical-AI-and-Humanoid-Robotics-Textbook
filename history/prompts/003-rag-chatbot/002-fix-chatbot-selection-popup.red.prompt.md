---
id: "003"
title: "Fix Chatbot Selection Popup Interaction"
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
  - "react"
  - "ui"
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
The chatbot feature that answers questions based only on the text selected by the user is not working properly.

# Response
I identified a race condition/event propagation issue in the "Ask AI about this" popup.

**Root Cause:**
When the user clicked the popup, the global `document.addEventListener('mouseup', ...)` listener fired. This listener checks `window.getSelection()`. If the click on the popup caused the browser to lose focus on the text selection (or if the event fired in a way where selection was empty), the listener would immediately call `setSelection(null)`. This often happened before or in conflict with the `onClick` handler of the popup, preventing the context from being captured or closing the popup prematurely.

**Fix:**
I added `onMouseUp={(e) => e.stopPropagation()}` to the `selectionPopup` `div`.
This ensures that interactions with the popup do not bubble up to the document-level listener, preventing the `handleSelection` logic from inadvertently clearing the state while the user is interacting with the tool itself.
