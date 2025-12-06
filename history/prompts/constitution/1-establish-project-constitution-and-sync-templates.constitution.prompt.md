---
id: 1
title: Establish Project Constitution and Sync Templates
stage: constitution
date: 2025-12-06
surface: agent
model: Gemini
feature: none
branch: master
user: ZakheerAli
command: /sp.constitution
labels: [constitution, template-sync]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
 - .specify/templates/plan-template.md
 - .specify/templates/spec-template.md
tests:
 - none
---

## Prompt

/sp.constitution # /sp.constitution

**Project:** Physical AI & Humanoid Robotics (Book & Platform)
**Version:** 1.0.0
**Status:** ACTIVE
**Framework:** Spec-Kit Plus
**Maintainer:** Human Architect & AI Agent Swarm (Claude/Gemini)

---

## 1. Preamble & Mission
This Constitution defines the immutable laws, workflows, and standards for the creation, deployment, and maintenance of the "Physical AI & Humanoid Robotics" technical book. All human contributors and AI agents **MUST** adhere to these guidelines to ensure consistency, technical accuracy, and scalability.

**Mission:** To build the definitive, open-source technical reference for Physical AI using a rigorous Spec-Driven Development workflow, deployed via Docusaurus.

---

## 2. Governance & Roles

### 2.1 The Hierarchy of Truth
1.  **The Constitution (`/sp.constitution`):** The highest law. Overrides all other specs.
2.  **The Roadmap (`/sp.roadmap`):** High-level milestones and chapters.
3.  **Feature Specs (`/specs/*.sp.md`):** Detailed execution plans for chapters or components.
4.  **The Codebase:** The implementation (Docusaurus/React/Markdown).

### 2.2 Roles & Responsibilities
| Role | Actor | Responsibility |
| :--- | :--- | :--- |
| **Architect** | Human User | Defines strategy, reviews specs, merges PRs, and provides high-level prompts. |
| **Lead Engineer** | Claude Code CLI | Handles complex logic, Docusaurus configuration, React components, and refactoring. |
| **Content Generator** | Gemini CLI / Pro | Generates heavy text, summaries, initial chapter drafts, and explains complex robotics math. |
| **QA Officer** | Automated/Human | Validates builds, checks for hallucinations, and ensures linting passes. |

---

## 3. Spec-Driven Development (SDD) Rules

### 3.1 The "No Spec, No Code" Rule
* No code or chapter content shall be written without an approved specification file.
* All significant changes must begin with a modification to the relevant `.sp.md` file.

### 3.2 Spec File Structure (Spec-Kit Plus)
All specification files must follow this template:
* **Header:** Title, ID, Status, Priority.
* **Context:** Why are we building this?
* **Requirements:** Bulleted list of "MUST HAVE" features.
* **Prompt Strategy:** Instructions for the AI agent executing the spec.
* **Acceptance Criteria:** Definition of Done (DoD).

### 3.3 Naming Conventions
* **Constitution:** `/sp.constitution` (Root level).
* **Global Roadmap:** `/sp.roadmap`.
* **Chapter Specs:** `/specs/ch01-kinematics.sp.md`.
* **Component Specs:** `/specs/cmp-interactive-arm.sp.md`.

---

## 4. AI Development & Workflow Protocols

### 4.1 Agent Selection
* **Use Claude Code CLI for:** File manipulation, refactoring, Docusaurus configuration, debugging React, and terminal operations.
* **Use Gemini CLI for:** Ideation, generating long-form conceptual explanations, mathematical proofs, and creating extensive bibliographies.

### 4.2 Context Management
* AI Agents **MUST** be fed the `/sp.constitution` context at the start of a major session.
* Agents **MUST NOT** rely on memory from previous sessions unless context is re-injected.

### 4.3 Iterative Generation Cycle
1.  **Draft:** AI generates content based on Spec.
2.  **Review:** Human Architect reviews for technical accuracy (especially robotics physics).
3.  **Refine:** AI applies fixes.
4.  **Commit:** Code is committed only after passing the build check.

---

## 5. Book Content Guidelines

### 5.1 Format & Tone
* **Format:** MDX (Markdown + JSX).
* **Tone:** Professional, Engineering-First, Concise. Avoid fluff.
* **Perspective:** Third-person objective.

### 5.2 Structure of a Chapter
Every chapter **MUST** follow this structure:
1.  **Frontmatter:** `id`, `title`, `sidebar_label`, `description`.
2.  **Introduction:** High-level concept summary.
3.  **Learning Objectives:** Bullet points.
4.  **Core Technical Content:** Text, Math ($LaTeX$), and Code Blocks.
5.  **Interactive Element:** (Optional) React component or Diagram.
6.  **Summary & References.**

### 5.3 Technical Accuracy (Robotics)
* **Math:** All equations (Kinematics, Dynamics, Control Theory) **MUST** use LaTeX formatting (e.g., `$$F = ma$$`).
* **Units:** SI Units (metric) are mandatory.
* **Code Examples:** Python (ROS2/PyTorch) or C++ standard.

---

## 6. Technical Stack & Coding Standards

### 6.1 Docusaurus Configuration
* **Framework:** Docusaurus v3+.
* **Styling:** CSS Modules or Infima (default Docusaurus utility classes).
* **Components:** Custom React components must be placed in `/src/components`.

### 6.2 Documentation Standards (MDX)
* **Admonitions:** Use `:::note`, `:::tip`, `:::warning` explicitly.
* **Headings:** Sentence case. Do not skip levels (e.g., `h2` to `h4` is forbidden).
* **Images:** Store in `/static/img/`. Reference via relative paths.

### 6.3 Automation Scripts
* Scripts for batch processing content (e.g., converting notebooks to MDX) must be stored in `/scripts`.

---

## 7. Version Control & Deployment

### 7.1 Git Workflow
* **Main Branch:** `main` (Production-ready, deployed to GitHub Pages).
* **Dev Branch:** `develop` (Integration branch).
* **Feature Branches:** `feat/chapter-name` or `fix/issue-name`.

### 7.2 Commit Messages (Conventional Commits)
* `feat: add chapter 4 inverse kinematics`
* `fix: correct typos in introduction`
* `docs: update sp.roadmap`
* `chore: upgrade docusaurus version`

### 7.3 Deployment
* Deployment is automated via **GitHub Actions**.
* **Trigger:** Push to `main`.
* **Validation:** Build must pass `npm run build` before deployment triggers.

---

## 8. Quality Assurance & Validation

### 8.1 Automated Checks
* **Broken Links:** Docusaurus build must fail on broken links (`onBrokenLinks: 'throw'`).
* **Linting:** Prettier must be run on all MDX/JS files before commit.

### 8.2 Human Review
* Human Architect MUST verify:
    1.  Physical accuracy of robotics claims.
    2.  Correctness of LaTeX formulas.
    3.  Safety warnings regarding physical hardware.

---

## 9. Ethical & Safety Principles (Robotics Specific)

### 9.1 Safety First
* Any code or tutorial involving physical actuators **MUST** include a `:::danger` warning regarding pinch points, electrical hazards, and emergency stop (E-Stop) protocols.

### 9.2 AI Ethics
* Content must not promote the creation of autonomous weapons systems.
* Discussion of Humanoid Robotics must include sections on alignment, interpretability, and socioeconomic impact.

---

## 10. Collaboration & Maintenance

### 10.1 Updates to Constitution
* This document is a living spec. Updates requires a PR approval from the Human Architect.

### 10.2 Archive
* Obsolete specs must be moved to `/specs/archive` rather than deleted, to preserve project history.

---
**End of Constitution**

## Response snapshot

I have successfully updated the project constitution and synchronized the relevant templates.

## Outcome

- ✅ Impact: The project now has a formal constitution and consistent templates.
- 🧪 Tests: none
- 📁 Files: 3 files modified.
- 🔁 Next prompts: none
- 🧠 Reflection: The process of updating the constitution and then propagating those changes to the templates ensures consistency across the project.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
