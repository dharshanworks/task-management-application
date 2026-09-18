# AI Usage Summary

This document details the AI-assisted engineering process, tooling, and design iterations undertaken for the Graduate Support Engineer Trainee Assessment.

## 1. AI Tools & Models Used
- **Google Antigravity (AGY):** Primary autonomous pair-programming assistant.
- **Gemini 3.1 Pro (High) & Gemini 3.8 Flash (High):** LLM cognitive engines powering code generation, architectural design, debugging, and refactoring.

## 2. Methodology & Phases of Work

1. **Phase 1: Project Scaffolding & Initial Prototype**
   - Bootstrapped React + Vite environment with zero external database dependencies (respecting the "No Firebase/Firestore" directive).
   - Integrated Google OAuth 2.0 via `@react-oauth/google` and `jwt-decode`.
   - Designed initial glassmorphic light theme.

2. **Phase 2: Troubleshooting Google OAuth & Assessment Alignment**
   - Diagnosed Google OAuth Client ID configuration issues (missing web origin and ID typos) via browser error analysis.
   - Realigned the task state machine to strictly support the 3 assessment states: `Planned`, `In Progress`, and `Complete`.

3. **Phase 3: UX Restructuring into Kanban Sections & Landing Page**
   - Transformed the single list view into a 3-column Kanban layout.
   - Built a customer-centric landing page with value propositions and feature highlights.

4. **Phase 4: Full Feature Integration & Power Productivity Suite**
   - Added HTML5 Drag-and-Drop between Kanban columns.
   - Built a multi-view system: **Board View**, **List / Table View**, and **Analytics Dashboard**.
   - Added rich task metadata: Priorities (`Urgent`, `High`, `Medium`, `Low`), due dates with overdue warnings, custom tag chips, and subtask checklists.
   - Implemented live search, multi-factor filtering, and sorting.
   - Created data backup tools (JSON Export & Import) and instant Guest/Demo mode.

## 3. Example Prompts
- *"Create a simple task management application with light theme and sign in with google option and customer centric and want to ease with application usage and ui and ux experience"*
- *"Do not use firebase and firestore"*
- *"Add different section for everything and make simple and efficient with landing and home page"*
- *"Integrate all features which available in task manager application"*

## 4. Manual vs. AI Contributions
- **AI Automation:** Architected state management, built responsive component hierarchies, crafted custom CSS glassmorphic tokens, implemented drag & drop events, and generated full technical documentation.
- **Human Oversight:** Configured Google Cloud Console credentials, validated localized design preferences, and verified functional workflows across views.
