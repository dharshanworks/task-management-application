# AI Usage Summary

This document outlines the AI tools and methodologies utilized to build this Task Management Application for the Graduate Support Engineer Trainee Assessment.

## 1. AI Tools Used
- **Google Antigravity (AGY):** Served as the primary autonomous AI coding assistant and agent.
- **Gemini 3.1 Pro (High):** The underlying Large Language Model (LLM) powering the Antigravity agent, providing logic, coding capabilities, and reasoning.

## 2. How the AI Tools Were Used
The AI was utilized in a "Pair Programming" methodology, acting as a collaborative developer to:
1. **Architect the Solution:** Drafted an initial Implementation Plan based on user requirements.
2. **Project Scaffolding:** Executed terminal commands autonomously to initialize the Vite/React project and install dependencies (`@react-oauth/google`, `jwt-decode`, `react-icons`).
3. **Component Generation:** Generated React components (`App.jsx`, `TaskManager.jsx`, `TaskItem.jsx`, `Login.jsx`) and a custom, premium CSS theme using glassmorphism.
4. **Troubleshooting:** Diagnosed and provided step-by-step resolution for a Google OAuth `invalid_client` configuration error based on error screenshots provided by the user.
5. **Requirement Alignment:** When the full assessment requirements were provided, the AI identified the gap (missing 3-state task status) and proposed an architectural update to replace the boolean `completed` state with string states (`Planned`, `In Progress`, `Complete`).
6. **Documentation Generation:** Automatically drafted this file, the `README.md`, and the `USER_GUIDE.md`.

## 3. Example Prompts
The development was guided by the following iterative prompts:

* **Initial Request:** 
  > "Create a simple task management application with light theme and sign in with google option and customer centric and want to ease with application usage and ui and ux experirence"
* **Refinement:**
  > "Do not use firebase and firestore" *(This prompted the AI to shift to a frontend-only OAuth approach with `localStorage` persistence to keep the app simple).*
* **Troubleshooting:**
  > *(User provided a screenshot of Google Auth Error 401: invalid_client)* -> The AI responded with configuration steps for the Google Cloud Console.
* **Final Alignment:**
  > *(User provided the full assignment text)* -> The AI responded by adding the required 3 task states and generating the required documentation.

## 4. What AI-Generated Code Was Modified or Corrected Manually
- **Google Client ID Configuration:** The AI placed a placeholder (`"YOUR_GOOGLE_CLIENT_ID_HERE"`) in `src/App.jsx`. This was manually replaced with a valid Client ID generated from the Google Cloud Console. When a typo occurred during the manual copy-paste (typing `462...` instead of `467...`), the AI identified the typo by comparing the code to a console screenshot, and the ID was manually corrected.
