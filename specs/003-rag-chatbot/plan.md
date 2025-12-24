# Project Plan: RAG Chatbot Integration

## 1. Summary

This plan outlines the architecture and development phases for integrating a Retrieval-Augmented Generation (RAG) chatbot into the *Physical AI and Humanoid Robotics* textbook. The goal is to create a robust, maintainable, and scalable system that enhances the user's learning experience.

## 2. Architecture

The system will be composed of four main components:

*   **Frontend (Docusaurus):** A new React component will be created to serve as the chatbot's UI. This component will be responsible for user interaction, displaying the conversation, and communicating with the backend. It will be designed to be non-intrusive to the reading experience.

*   **Backend (FastAPI):** A Python-based microservice that will orchestrate the RAG pipeline. It will expose RESTful APIs for the frontend to call. This service will handle business logic, including the two retrieval modes (full-book and selected-text).

*   **Vector Database (Qdrant):** A cloud-based Qdrant instance will store the vector embeddings of the book's content. It will be responsible for performing fast and accurate semantic searches to find relevant context for user queries.

*   **Relational Database (Neon PostgreSQL):** A serverless PostgreSQL instance from Neon will be used for storing structured data such as conversation logs, user feedback, and potentially other metadata. This will help in monitoring and improving the chatbot over time.

### High-Level Data Flow:

1.  **Ingestion (Offline Process):**
    *   The book's MDX files are parsed and chunked.
    *   Embeddings are generated for each chunk using a `sentence-transformers` model.
    *   The chunks and their embeddings are stored in Qdrant.

2.  **Retrieval (Online Process):**
    *   A user asks a question through the chatbot UI.
    *   The frontend sends the query to the FastAPI backend.
    *   The backend generates an embedding for the query using the same `sentence-transformers` model.
    *   The backend queries Qdrant to retrieve relevant text chunks.
    *   The backend sends the retrieved chunks and the original query to **Google Gemini via the OpenAI Agents SDK** for generation.
    *   The response is streamed back to the frontend and displayed to the user.
    *   The conversation is logged in the PostgreSQL database.

## 3. Development Phases

The project will be developed in the following phases:

### Phase 2.1: Backend and Database Setup

*   **Objective:** Provision the necessary cloud infrastructure and set up the basic backend service.
*   **Key Activities:**
    *   Set up a new FastAPI project structure.
    *   Provision a Qdrant Cloud instance.
    *   Provision a Neon Serverless PostgreSQL instance.
    *   Establish database connections in the FastAPI application.
    *   Create basic API endpoints for health checks.
    *   Containerize the FastAPI application using Docker.

### Phase 2.2: Content Ingestion Pipeline

*   **Objective:** Develop the system for processing the book's content and populating the vector database.
*   **Key Activities:**
    *   Create a script to read and parse the MDX files from the `frontend/docs` directory.
    *   Implement text chunking strategies.
    *   Integrate with a `sentence-transformers` model (e.g., `all-MiniLM-L6-v2`).
    *   Write the logic to store the embeddings and associated text in Qdrant.

### Phase 2.3: RAG and Backend Logic

*   **Objective:** Implement the core RAG logic in the FastAPI backend.
*   **Key Activities:**
    *   Implement the "full-book" retrieval logic.
    *   Implement the "selected-text" retrieval logic.
    *   Integrate with **Google Gemini using the OpenAI Agents SDK** (configured with custom `base_url`).
    *   Implement conversation history logging to the PostgreSQL database.
    *   Refine the API endpoints to support streaming responses.

### Phase 2.4: Frontend Integration

*   **Objective:** Build the chatbot UI and integrate it into the Docusaurus website.
*   **Key Activities:**
    *   Create a new React component for the chatbot UI.
    *   Style the component to match the book's theme.
    *   Implement state management for the conversation.
    *   Connect the UI to the FastAPI backend.
    *   Implement the text selection feature to trigger the "selected-text" retrieval mode.

### Phase 2.5: Testing and Deployment

*   **Objective:** Thoroughly test the entire system and deploy the backend.
*   **Key Activities:**
    *   Write unit and integration tests for the backend.
    *   Perform end-to-end testing of the chatbot.
    *   Deploy the FastAPI backend to a suitable platform (e.g., Vercel, a container service).
    *   Ensure the frontend is correctly configured to communicate with the deployed backend.

---

## 4. Key Considerations

*   **Security:** API keys and database credentials will be managed securely using environment variables and will not be checked into source control.
*   **Scalability:** The serverless nature of Neon and the cloud-based Qdrant instance will allow the system to scale with usage.
*   **Cost:** The free tiers of Qdrant and Neon will be used initially. Cost implications will be monitored if the project scales.
