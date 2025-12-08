# Research Tasks

This document outlines the research tasks required to resolve the "NEEDS CLARIFICATION" items identified in the `plan.md` file.

## 1. Language Versions

*   **Task:** Determine the specific versions of Python, TypeScript, and C++ to be used in the project.
*   **Research:**
    *   Check the versions of these languages supported by the primary dependencies (ROS 2, Docusaurus, etc.).
    *   Identify the latest stable versions of these languages.
    *   Consider any compatibility issues between the different language versions.
*   **Decision:**
    *   **Python:** 3.10 (as recommended for ROS 2 Humble)
    *   **TypeScript:** 5.1+ (latest stable version will be used)
    *   **C++:** C++17 (as required by ROS 2 Humble)
*   **Rationale:** These versions are required by the project's primary dependencies and represent stable, well-supported choices.
*   **Alternatives considered:** Using older or newer versions of these languages, but this would risk incompatibility with the core dependencies.

## 2. Storage for Dynamic/User Data

*   **Task:** Determine the storage requirements for any dynamic or user data.
*   **Research:**
    *   Investigate options for storing user data on a Docusaurus site (e.g., using a backend service, a cloud database, or a static site generator with a headless CMS).
    *   Consider the security and privacy implications of each option.
    *   Evaluate the scalability and cost of each option.
*   **Decision:** An external backend service is required for user authentication, authorization, and any other dynamic user data. The specific technologies for this backend (e.g., Node.js/Express, Python/FastAPI) and its database are yet to be determined and represent a new set of architectural decisions.
*   **Rationale:** Docusaurus is a static site generator and cannot handle dynamic user data or advanced security requirements on its own. The "Advanced security" requirement from the clarification session necessitates a backend service.
*   **Alternatives considered:** Using a headless CMS or a BaaS (Backend as a Service) like Firebase/Supabase, but a custom backend provides the most control to meet the advanced security requirements.

## 3. Testing Frameworks and Coverage Targets

*   **Task:** Determine the specific testing frameworks and coverage targets to be used for Python and TypeScript.
*   **Research:**
    *   Investigate the most popular and well-supported testing frameworks for Python (e.g., pytest, unittest) and TypeScript (e.g., Jest, Mocha, Cypress).
    *   Determine appropriate code coverage targets for unit, integration, and end-to-end tests.
    *   Consider how to integrate the testing frameworks into the development workflow.
*   **Decision:**
    *   **TypeScript/React (Frontend):** Jest for unit tests, and Playwright for E2E tests.
    *   **Python (Code examples, backend):** `pytest` for unit and integration tests.
    *   **Linting:** Prettier for both frontend and backend code.
    *   **CI/CD:** GitHub Actions to run all tests automatically.
    *   **Coverage Targets:** A target of 80% code coverage for unit tests will be established as a baseline.
*   **Rationale:** These are modern, well-supported, and widely used tools that are appropriate for the tech stack of this project.
*   **Alternatives considered:** Mocha and Chai for frontend, `unittest` for Python, but Jest and `pytest` are generally considered more modern and have a better developer experience.
