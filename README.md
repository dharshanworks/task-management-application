# TaskFlow - Full-Featured Task Management Suite

A modern, high-velocity Task Management application built with React, Vite, and Google Identity Services. This project was developed as part of a Graduate Support Engineer Trainee Assessment.

## 🌟 Key Features

### 1. Core Workflow & Multi-Views
- **Fluid Kanban Board:** 3 distinct stages (`Planned`, `In Progress`, `Complete`) with native HTML5 Drag-and-Drop and quick step navigation.
- **List / Table View:** Dense spreadsheet-style view with inline status selectors, priority badges, due dates, and quick deletion.
- **Productivity Analytics Dashboard:** Real-time completion rate %, active in-flight tasks counter, overdue warnings, and tag distribution charts.

### 2. Rich Task Metadata
- **Priorities:** `Urgent`, `High`, `Medium`, `Low` with visual indicator flags.
- **Due Dates & Alerts:** Integrated date selector with real-time badges for *Overdue*, *Due Today*, and *Upcoming*.
- **Subtask Checklists:** Interactive subtasks with completion checkboxes and automatic progress percentage tracking.
- **Tags & Labels:** Categorize tasks with tags (`#Work`, `#Dev`, `#Testing`, etc.) and filter by tags.
- **Detailed Notes:** Multiline description support for specifications and reference links.

### 3. Search, Filter & Power Sorting
- **Live Search:** Instant search across titles, descriptions, and tags.
- **Multi-criteria Filtering:** Filter by status, priority level, and tag simultaneously.
- **Smart Sorting:** Sort tasks by due date (earliest first), priority (urgent first), creation date, or alphabetical.

### 4. Data Safety & Portability
- **Local-First Architecture:** 100% private in-browser persistence using `localStorage`. No tracking and no external database lock-in.
- **JSON Export & Import:** One-click backup of all tasks to a `.json` file and instant restoration.
- **Sample Data Loader:** Pre-populated realistic demo tasks to immediately test all views and features.

### 5. Authentication & Customer-Centric UX
- **Google OAuth 2.0:** Secure login via Google Identity Services.
- **Guest / Demo Mode:** 1-click guest access on the landing page for immediate evaluation without requiring cloud credentials.
- **Premium Light Theme:** Custom glassmorphism, responsive mobile/tablet layout, and micro-animations.

---

## 🚀 Setup & Installation

1. Ensure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).
2. Clone this repository or download the source code.
3. Open a terminal in the project root directory and install dependencies:
   ```bash
   npm install
   ```

## ⚙️ Configuration (Google Sign-In)

To use Google Sign-In:
1. Open `src/App.jsx`.
2. Locate line 8:
   ```javascript
   const GOOGLE_CLIENT_ID = "YOUR_CLIENT_ID.apps.googleusercontent.com";
   ```
3. Set your Google Web Client ID from Google Cloud Console. Ensure `http://localhost:5173` is added under **Authorized JavaScript origins**.
4. *Alternatively, click **Guest Demo Mode** on the Landing Page to explore all features instantly without any setup!*

## 🏃 Running the Application

To start the local development server:
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

To build the production bundle:
```bash
npm run build
```

---

## 📚 Documentation
- [User Guide (USER_GUIDE.md)](./USER_GUIDE.md) - Complete instructions, assumptions, and usage patterns.
- [AI Usage Summary (AI_USAGE_SUMMARY.md)](./AI_USAGE_SUMMARY.md) - Overview of AI-assisted engineering methodology and prompts.
