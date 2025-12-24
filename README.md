# Physical AI and Humanoid Robotics: An Open-Source Textbook

Welcome to the official repository for **Physical AI and Humanoid Robotics**, a comprehensive, open-source textbook designed for students, researchers, and practitioners. This project provides a deep dive into the convergence of intelligent software and physical robotic systems, with a special focus on humanoid robotics.

![Homepage Screenshot](httpsp://i.imgur.com/YOUR_IMAGE_ID.png) <!-- Replace with a real screenshot once deployed -->

## 🤖 About the Textbook

This textbook offers a project-based learning journey that bridges theory and practice. It covers the core concepts of embodied intelligence, from perception and control to machine learning and system integration. Our goal is to provide a high-quality, accessible, and practical resource for anyone passionate about building the next generation of intelligent robots.

The live version of the textbook is deployed and accessible at:
[https://zakheerali.github.io/Physical-AI-and-Humanoid-Robotics-Textbook/](https://zakheerali.github.io/Physical-AI-and-Humanoid-Robotics-Textbook/)

## ✨ Key Features

- **Comprehensive Content:** Covers everything from foundational principles to advanced topics like sim-to-real transfer and end-to-end project development.
- **Structured Learning:** Organized into clear, progressive chapters and modules to guide your learning journey.
- **Hands-On Approach:** Emphasizes practical application with code examples, simulation guides, and project guidelines.
- **Modern Tech Stack:** Built with Docusaurus, providing a clean, modern, and accessible reading experience with dark mode support.
- **Open Source:** The entire textbook is open-source, encouraging community contributions, corrections, and improvements.

## 📚 Content Structure

The book is organized into seven core chapters, plus appendices for reference:

- **Chapter 1: Foundations of Physical AI:** Core concepts, embodied intelligence, and humanoid robotics overview.
- **Chapter 2: Robot Perception Systems:** Sensors, computer vision, and sensor fusion for robotics.
- **Chapter 3: Motion, Control, and Actuation:** Kinematics, dynamics, control systems, and locomotion.
- **Chapter 4: Learning and Intelligence in Robots:** Machine learning, reinforcement learning, and imitation learning.
- **Chapter 5: Simulation to Real-World Transfer:** Robotics simulators, sim-to-real challenges, and deployment.
- **Chapter 6: System Integration and Architecture:** Robotics middleware (ROS2), AI/control integration, and safety.
- **Chapter 7: Case Studies and Projects:** Real-world case studies, end-to-end projects, and capstone guidelines.
- **Appendices:** Practical guides on Python, Linux, Git, microcontrollers, and more.

## 🚀 Getting Started Locally

To run this project on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ZakheerAli/Physical-AI-and-Humanoid-Robotics-Textbook.git
    cd Physical-AI-and-Humanoid-Robotics-Textbook
    ```

2.  **Navigate to the `frontend` directory:**
    ```bash
    cd frontend
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Start the development server:**
    ```bash
    npm start
    ```

The website will be available at `http://localhost:3000`.

## 🤝 How to Contribute

We welcome contributions from the community! Whether you want to fix a typo, improve an explanation, add a new example, or suggest a new topic, your input is valuable. Please feel free to open an issue or submit a pull request.

## 🤖 Phase 2: Integrated RAG Chatbot

The textbook now features an integrated **Retrieval-Augmented Generation (RAG)** chatbot that helps you interact with the content.

### Key Features
- **Full-Book Search:** Ask questions about any topic covered in the book.
- **Context-Aware Selection:** Highlight any text in the book to ask the assistant for specific clarifications or examples.
- **Explainable AI:** The chatbot provides sources for its answers, pointing you back to the relevant sections of the textbook.

### Tech Stack
- **Backend:** FastAPI (Python)
- **Orchestration:** LangChain & OpenAI Agents SDK
- **LLM:** Google Gemini (Free Tier)
- **Vector DB:** Qdrant Cloud
- **Metadata DB:** Neon Serverless PostgreSQL
- **Embeddings:** Local `sentence-transformers`

### Running the Chatbot Locally

1.  **Configure Environment Variables:**
    Create a `.env` file in the `backend` directory with your credentials:
    ```env
    QDRANT_URL=your_qdrant_url
    QDRANT_API_KEY=your_qdrant_api_key
    NEON_DATABASE_URL=your_neon_url
    OPENAI_API_KEY=your_gemini_api_key
    ```

2.  **Ingest Content:**
    ```bash
    cd backend
    poetry install
    poetry run python -m src.backend.ingest
    ```

3.  **Start the Backend:**
    ```bash
    poetry run python -m backend
    ```

4.  **Run the Frontend:**
    ```bash
    cd ../frontend
    npm start
    ```

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
