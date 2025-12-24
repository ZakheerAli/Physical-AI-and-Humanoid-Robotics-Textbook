---
id: "004"
title: "Fix Chatbot Selection - Move to onMouseDown"
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
  - "dom-events"
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
its not working (The chatbot feature that answers questions based only on the text selected by the user is not working properly)

# Response
The previous fix using `stopPropagation` on `onClick` was insufficient because the browser's native behavior clears the text selection *before* the `click` event fully propagates to React's handler in many cases (specifically, the `mousedown` part of a click on a non-text element often triggers deselection).

**The Robust Fix:**
I moved the action trigger to `onMouseDown` and added `e.preventDefault()`.

1.  **`onMouseDown`**: Fires immediately when the user presses the button, *before* the browser processes the "end of click" or focus change that clears the text selection.
2.  **`e.preventDefault()`**: Explicitly tells the browser "do not perform the default action for this mouse down," which in this context includes "deselecting the current text to focus this div."

This ensures the `selection` state is captured and transferred to `contextText` before it can be lost.
