---
id: "005"
title: "Fix Chatbot Selection Popup Positioning"
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
  - "css"
  - "react"
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - "frontend/src/components/Chatbot/Chatbot.module.css"
  - "frontend/src/components/Chatbot/index.tsx"
tests: []
---

# Prompt
There is no small button aur popup showing after selecting the text

# Response
The popup was failing to appear because of a positioning context mismatch.

**Root Cause:**
The `selectionPopup` was nested inside `.chatbotContainer`, which has `position: fixed` and is anchored to the bottom-right of the screen (`bottom: 2rem, right: 2rem`).
However, the popup was using `position: absolute` with coordinates calculated relative to the entire document (`rect.top + scrollY`).
Because `absolute` elements position themselves relative to their nearest positioned ancestor (the bottom-right container), the calculated coordinates pushed the popup way off-screen (effectively treating the bottom-right corner as 0,0).

**The Fix:**
1.  **CSS:** Changed `.selectionPopup` to `position: fixed` and increased `z-index`. This breaks it out of the container's coordinate system and positions it relative to the browser viewport.
2.  **JS:** Updated the coordinate calculation in `index.tsx` to remove `window.scrollX` and `window.scrollY`. `getBoundingClientRect()` already returns viewport-relative coordinates, which is exactly what `position: fixed` expects.
