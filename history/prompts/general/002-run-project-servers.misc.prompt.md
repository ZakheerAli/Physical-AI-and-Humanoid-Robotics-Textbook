---
id: "002"
title: "Run Project Servers"
stage: "misc"
date: "2025-12-24"
surface: "agent"
model: "gemini-2.0-flash-exp"
feature: "none"
branch: "main"
user: "user"
command: "run_shell_command"
labels:
  - "cli"
  - "devops"
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files: []
tests: []
---

# Prompt
now run this project

# Response
I have launched the project servers in two separate PowerShell windows:

1.  **Backend (FastAPI):** Running on `http://localhost:8000`
    *   Command: `cd backend; poetry run uvicorn backend.main:app --reload`
2.  **Frontend (Docusaurus):** Running on `http://localhost:3000`
    *   Command: `cd frontend; npm start`

You can now interact with the application at `http://localhost:3000`.
