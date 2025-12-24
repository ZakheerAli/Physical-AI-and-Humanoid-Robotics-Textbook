# Project Tasks: RAG Chatbot Integration

This document breaks down the work required to complete the RAG Chatbot integration, as outlined in the `plan.md`.

---

### Phase 2.1: Backend and Database Setup

*   [x] **Task 2.1.1:** Initialize a new Python project with Poetry and create the `backend` directory for the FastAPI application.
*   [x] **Task 2.1.2:** Set up a new project on Qdrant Cloud and obtain the API key and URL.
*   [x] **Task 2.1.3:** Set up a new project on Neon and obtain the PostgreSQL connection string.
*   [x] **Task 2.1.4:** Create a `config.py` in the FastAPI app to manage environment variables for database credentials and API keys.
*   [x] **Task 2.1.5:** Implement a health check endpoint (`/health`) in the FastAPI application.
*   [x] **Task 2.1.6:** Create a `Dockerfile` for the FastAPI application.

---

### Phase 2.2: Content Ingestion Pipeline

*   [x] **Task 2.2.1:** Create a script (`ingest.py`) that can be run from the command line.
*   [x] **Task 2.2.2:** Write a function to find and parse all MDX files from the `frontend/docs` directory.
*   [x] **Task 2.2.3:** Implement a text chunking strategy (e.g., recursive character text splitting).
*   [x] **Task 2.2.4:** Integrate a `sentence-transformers` model to generate embeddings for the text chunks.
*   [x] **Task 2.2.5:** Write a function to upload the text chunks and their corresponding embeddings to Qdrant.

---

### Phase 2.3: RAG and Backend Logic

*   [x] **Task 2.3.1:** Create a new API endpoint (`/chat/full`) for the full-book retrieval mode.
*   [x] **Task 2.3.2:** Implement the logic to query Qdrant and retrieve context for the `full` mode.
*   [x] **Task 2.3.3:** Create a new API endpoint (`/chat/selected`) for the selected-text retrieval mode.
*   [x] **Task 2.3.4:** Implement the logic to take user-selected text and generate an answer without Qdrant retrieval.
*   [x] **Task 2.3.5:** Integrate the **OpenAI Agents SDK** connected to Google Gemini to produce answers based on the retrieved context.
*   [x] **Task 2.3.6:** Set up the database schema for conversation logs in PostgreSQL.
*   [x] **Task 2.3.7:** Implement the logic to log conversations to the PostgreSQL database.

---

### Phase 2.4: Frontend Integration

*   [x] **Task 2.4.1:** Create a new React component `Chatbot.tsx` in the `frontend/src/components` directory.
*   [x] **Task 2.4.2:** Design and style the chatbot UI, including a floating button to open the chat window.
*   [x] **Task 2.4.3:** Implement state management for the chat history and user input.
*   [x] **Task 2.4.4:** Write the client-side logic to call the `/chat/full` endpoint.
*   [x] **Task 2.4.5:** Implement a feature where highlighting text on the page reveals a "ask about this" button, which calls the `/chat/selected` endpoint.


---

### Phase 2.5: Testing and Deployment

*   [x] **Task 2.5.1:** Write unit tests for the FastAPI endpoints.
*   [x] **Task 2.5.2:** Write an integration test for the content ingestion pipeline. (Successfully ran ingestion script).
*   [x] **Task 2.5.3:** Perform end-to-end testing by manually interacting with the chatbot in a local development environment.
*   [x] **Task 2.5.4:** Create a `vercel.json` or similar configuration for deploying the FastAPI backend.
*   [ ] **Task 2.5.5:** Deploy the backend service.
*   [ ] **Task 2.5.6:** Update the frontend to use the deployed backend's URL.
*   [x] **Task 2.5.7:** Run `npm run build` on the `frontend` to ensure the Phase 1 site is unaffected.