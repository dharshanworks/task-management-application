# Task Management Application

A simple, premium Task Management application built with React, Vite, and Google Identity Services. This project was developed as part of a Graduate Support Engineer Trainee Assessment.

## Features

- **Google Authentication:** Secure login using the official Google Identity Services package.
- **Task Management:** Create, view, update, and delete tasks.
- **Task States:** Manage task progress by transitioning them between three specific states:
  - `Planned`
  - `In Progress`
  - `Complete`
- **Data Persistence:** Tasks are automatically saved to your browser's local storage so you don't lose data on refresh.
- **Premium UI:** Features a light theme with glassmorphism, responsive design, and micro-animations for an exceptional user experience.

## Setup Instructions

1. Ensure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).
2. Clone this repository or download the source code.
3. Open a terminal in the project root directory.
4. Install the dependencies:
   ```bash
   npm install
   ```

## Configuration

To use the Google Sign-In functionality, you must configure a Google Client ID:

1. Open `src/App.jsx`.
2. Locate line 8:
   ```javascript
   const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID_HERE.apps.googleusercontent.com";
   ```
3. Replace the string with a valid Client ID from your Google Cloud Console. Make sure the "Authorized JavaScript origins" in the console includes `http://localhost:5173`.

## Running the Application

To start the local development server:

```bash
npm run dev
```

Open the provided URL (usually `http://localhost:5173`) in your web browser.

## Documentation

For further details on how to use the application, its assumptions, and limitations, please refer to the [USER_GUIDE.md](./USER_GUIDE.md).

For details on the AI tools used during development, see [AI_USAGE_SUMMARY.md](./AI_USAGE_SUMMARY.md).
