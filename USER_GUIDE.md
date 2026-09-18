# User Guide

Welcome to the Task Management Application! This guide will help you navigate and use the software effectively.

## How to Access and Use the Application

1. Open your terminal in the root directory of the project.
2. Run the command `npm run dev` to start the local server.
3. Open a web browser and navigate to the URL shown in your terminal (typically `http://localhost:5173`).

### Login Instructions

To ensure a secure experience, the application requires you to sign in.

1. On the welcome screen, click the **Sign in with Google** button.
2. A secure Google popup will appear. Select your preferred Google account.
3. Once authenticated, you will be automatically redirected to your personal Task Manager dashboard.
4. To log out, click the logout icon (a door with an arrow) next to your profile picture in the top right corner.

### Managing Tasks

- **Create a Task:** Type your task into the input field at the top labeled "What needs to be done?" and press Enter or click the "Add" button. By default, new tasks are assigned the **Planned** status.
- **Update Status:** Every task has a dropdown menu on its left side. Click it to transition the task between three states:
  - `Planned`: The task is on your radar.
  - `In Progress`: You are currently actively working on the task.
  - `Complete`: The task is finished (it will be visually crossed out).
- **Delete a Task:** Click the red trash can icon on the far right of any task to permanently remove it.
- **Track Progress:** The progress bar on the right side of the screen visually tracks the percentage of tasks that are marked as `Complete`.

## Important Assumptions Made

To adhere to the "simple task management application" requirement and avoid unnecessary scope expansion, the following assumptions were made during development:

1. **Local Storage is Sufficient:** Instead of relying on an external cloud database (like Firebase or PostgreSQL), tasks are stored in the browser's native `localStorage`. This keeps the application incredibly fast, easy to set up, and free of backend deployment dependencies.
2. **Single User Focus:** The application does not support collaborative task sharing. Tasks are tied locally to the specific email address you log in with.

## Known Limitations

- **No Cross-Device Syncing:** Because data is stored in your browser's local storage, your tasks will not sync if you log in from a different computer or a different browser (e.g., switching from Chrome to Firefox).
- **Temporary Data Loss:** If you clear your browser's site data or cache, your tasks will be permanently deleted.

## Important Notes or Warnings for Users

- **Google Client ID Setup:** The "Sign in with Google" button relies on a valid Google Client ID configured in the Google Cloud Console. If the button throws an `invalid_client` or `Authorisation error`, it means the `GOOGLE_CLIENT_ID` in `src/App.jsx` is either incorrect, hasn't propagated, or your local URL isn't added to the "Authorized JavaScript origins" in the Google Cloud Console.
