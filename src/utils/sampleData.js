// Pre-populated demo tasks to showcase all features
export const getInitialDemoTasks = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 5);

  const formatDate = (date) => date.toISOString().split('T')[0];

  return [
    {
      id: 'demo-1',
      text: 'Finalize quarterly performance review',
      description: 'Prepare metrics on system uptime, incident response times, and customer satisfaction scores for Q3.',
      status: 'In Progress',
      priority: 'Urgent',
      dueDate: formatDate(today),
      tags: ['Work', 'Reporting'],
      subtasks: [
        { id: 'st-1', text: 'Gather metrics from monitoring dashboards', completed: true },
        { id: 'st-2', text: 'Draft executive summary slides', completed: true },
        { id: 'st-3', text: 'Review feedback with team lead', completed: false }
      ],
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
    },
    {
      id: 'demo-2',
      text: 'Implement drag-and-drop workflow in Kanban',
      description: 'Upgrade the UI columns to allow fluid card dragging using HTML5 drag-and-drop APIs.',
      status: 'Complete',
      priority: 'High',
      dueDate: formatDate(yesterday),
      tags: ['Dev', 'UI/UX'],
      subtasks: [
        { id: 'st-4', text: 'Define draggable attributes on task cards', completed: true },
        { id: 'st-5', text: 'Handle onDragOver and onDrop column handlers', completed: true }
      ],
      createdAt: new Date(Date.now() - 86400000 * 4).toISOString()
    },
    {
      id: 'demo-3',
      text: 'Research automated regression test tools',
      description: 'Evaluate Playwright vs Cypress for end-to-end user journey validations.',
      status: 'Planned',
      priority: 'Medium',
      dueDate: formatDate(nextWeek),
      tags: ['Testing', 'Dev'],
      subtasks: [
        { id: 'st-6', text: 'Test setup time for Playwright', completed: false },
        { id: 'st-7', text: 'Compare CI execution runtimes', completed: false }
      ],
      createdAt: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: 'demo-4',
      text: 'Customer onboarding documentation refinement',
      description: 'Clarify OAuth credentials setup and environment variables troubleshooting guide.',
      status: 'Planned',
      priority: 'Low',
      dueDate: '',
      tags: ['Docs'],
      subtasks: [],
      createdAt: new Date().toISOString()
    }
  ];
};
