# User Guide - TaskFlow Application

Welcome to TaskFlow! This guide walks you through every feature of the application to ensure you get the maximum value and ease of use.

---

## 1. Accessing the Application

1. Open your terminal in the project directory.
2. Run `npm run dev` to start Vite.
3. Open `http://localhost:5173` in any modern web browser.

### Signing In
- **Option A: Sign in with Google:** Click the official "Sign in with Google" button. Select your account from the Google popup.
- **Option B: Guest Demo Mode:** If you do not have a Google Client ID configured or want to test immediately, click **"Guest Demo Mode"** or **"Continue with Demo Guest Access"**. This opens the app with preloaded sample data immediately.

---

## 2. Managing Tasks

### Creating Tasks
- **Quick Add:** Type in the top input box (`What needs to be done?`) and press **Enter** or click **Add**. The task is instantly created in the **Planned** state.
- **Detailed Creation Modal:** Click the `+ New Task` button in the top navigation bar or the `+` icon in any Kanban column header. This allows setting:
  - Task Title & Description
  - Status (`Planned`, `In Progress`, `Complete`)
  - Priority (`Urgent`, `High`, `Medium`, `Low`)
  - Due Date
  - Custom Tags & Labels
  - Subtask checklist steps

### Editing Tasks
- Click on any task card or table row to open the full edit modal.
- Modify any field and click **Save Changes**.

### Updating Status
Tasks support the three core assessment states:
1. `Planned`
2. `In Progress`
3. `Complete`

You can update statuses in three different ways:
1. **Drag and Drop (Kanban Board):** Click and drag a task card to any column.
2. **Step Navigation Buttons:** Click the bottom arrow buttons (e.g. `In Progress →` or `✓ Complete`) on any card.
3. **Table Dropdown / Checkbox (List View):** In the List view, check the checkbox to toggle between Planned and Complete, or use the inline status select menu.

### Subtasks Checklist
- Tasks can have multiple granular subtasks.
- Check off subtasks directly inside the task modal. The card will display a progress counter (e.g., `✓ 2/3`).

---

## 3. Views & Navigation

Use the top navigation bar to switch between three specialized views:
- **Board View:** Visual 3-column Kanban layout ideal for sprint execution and drag-and-drop management.
- **List View:** Compact, spreadsheet-style table with sortable columns, inline status selectors, and priority indicators.
- **Overview (Analytics):** High-level productivity dashboard showing completion rate %, in-flight tasks, overdue alerts, status distribution, and tag velocity.

---

## 4. Search, Filter & Sort

The toolbar allows filtering your view in real time:
- **Search Bar:** Type any keyword to instantly filter tasks by title, description, or tag.
- **Status Filter:** Filter by Planned, In Progress, or Complete.
- **Priority Filter:** Filter by Urgent, High, Medium, or Low.
- **Tag Filter:** Filter by any active tag label (e.g. `#Work`, `#Testing`).
- **Sort By:** Sort by Due Date (earliest first), Priority (urgent first), Recently Created, or Alphabetical.
- **Clear Filters:** A one-click button appears whenever filters are active to quickly reset.

---

## 5. Data Backup & Tools

Located on the right side of the toolbar:
- **Export:** Downloads all your tasks into a structured JSON backup file (`tasks-backup-YYYY-MM-DD.json`).
- **Import:** Uploads a JSON backup file to restore or migrate tasks across devices.
- **Sample Tasks:** Appends realistic sample tasks with various priorities and subtasks for demonstration.
- **Clear Complete:** Removes all completed tasks in one click with a confirmation prompt.

---

## 6. Assumptions & Limitations

- **Local Storage Sandbox:** Data is stored in the browser's `localStorage` scoped per user email. This guarantees 100% privacy and blazing speed without requiring an external database backend.
- **Cross-Device Sync:** Because data is stored in your local browser sandbox, switching computers or browsers will not automatically sync without using the Export/Import JSON tool.
