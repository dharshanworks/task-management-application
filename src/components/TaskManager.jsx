import React, { useState, useEffect, useMemo, useRef } from 'react';
import TaskItem from './TaskItem';
import TaskListView from './TaskListView';
import TaskAnalyticsView from './TaskAnalyticsView';
import TaskModal from './TaskModal';
import { getInitialDemoTasks } from '../utils/sampleData';
import { 
  FiPlus, 
  FiLogOut, 
  FiColumns, 
  FiList, 
  FiBarChart2, 
  FiSearch, 
  FiDownload, 
  FiUpload, 
  FiRefreshCw, 
  FiCheckCircle, 
  FiX 
} from 'react-icons/fi';

const TaskManager = ({ user, onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [quickTaskText, setQuickTaskText] = useState('');
  const [viewMode, setViewMode] = useState('board'); // 'board' | 'list' | 'analytics'
  
  // Filtering & Sorting
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [tagFilter, setTagFilter] = useState('All');
  const [sortBy, setSortBy] = useState('created'); // 'created' | 'dueDate' | 'priority' | 'alphabetical'

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [modalInitialStatus, setModalInitialStatus] = useState('Planned');

  // Drag and Drop state
  const [draggingTaskId, setDraggingTaskId] = useState(null);
  const [dragOverCol, setDragOverCol] = useState(null);

  // Toast feedback
  const [toast, setToast] = useState(null);
  const fileInputRef = useRef(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // 1. Initial Data Load from LocalStorage
  useEffect(() => {
    if (user && user.email) {
      const stored = localStorage.getItem(`tasks_${user.email}`);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setTasks(parsed);
        } catch (e) {
          console.error('Failed to parse local storage tasks', e);
        }
      } else {
        // If brand new user, offer starter tasks
        const demo = getInitialDemoTasks();
        setTasks(demo);
        localStorage.setItem(`tasks_${user.email}`, JSON.stringify(demo));
      }
    }
  }, [user]);

  // 2. Persist tasks to LocalStorage
  useEffect(() => {
    if (user && user.email) {
      localStorage.setItem(`tasks_${user.email}`, JSON.stringify(tasks));
    }
  }, [tasks, user]);

  // Handle Quick Add
  const handleQuickAdd = (e) => {
    e.preventDefault();
    if (!quickTaskText.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      text: quickTaskText.trim(),
      description: '',
      status: 'Planned',
      priority: 'Medium',
      dueDate: '',
      tags: [],
      subtasks: [],
      createdAt: new Date().toISOString()
    };

    setTasks([newTask, ...tasks]);
    setQuickTaskText('');
    showToast('Task added to Planned');
  };

  // Handle Save from Modal
  const handleSaveTask = (taskData) => {
    const existingIndex = tasks.findIndex(t => t.id === taskData.id);
    if (existingIndex > -1) {
      const updated = [...tasks];
      updated[existingIndex] = taskData;
      setTasks(updated);
      showToast('Task updated successfully');
    } else {
      setTasks([taskData, ...tasks]);
      showToast(`Task created in ${taskData.status}`);
    }
  };

  // Handle Status Update
  const handleStatusChange = (id, newStatus) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, status: newStatus } : t)));
    showToast(`Moved to ${newStatus}`);
  };

  // Handle Delete Task
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
    showToast('Task deleted');
  };

  // Handle Clear Completed Tasks
  const handleClearCompleted = () => {
    const completedCount = tasks.filter(t => t.status === 'Complete').length;
    if (completedCount === 0) {
      showToast('No completed tasks to clear');
      return;
    }
    if (window.confirm(`Clear all ${completedCount} completed tasks?`)) {
      setTasks(tasks.filter(t => t.status !== 'Complete'));
      showToast(`Cleared ${completedCount} completed tasks`);
    }
  };

  // Load Demo Data
  const handleLoadDemoData = () => {
    if (window.confirm('Load sample tasks? This will supplement your current board.')) {
      const demo = getInitialDemoTasks();
      // avoid duplicate IDs
      const uniqueDemo = demo.map(d => ({ ...d, id: 'demo-' + Date.now() + Math.random().toString(36).substr(2, 4) }));
      setTasks([...uniqueDemo, ...tasks]);
      showToast('Sample tasks loaded');
    }
  };

  // Export Tasks to JSON
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tasks, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `tasks-backup-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Tasks exported to JSON');
  };

  // Import Tasks from JSON
  const handleImportJSON = (e) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (Array.isArray(parsed)) {
            setTasks(parsed);
            showToast(`Imported ${parsed.length} tasks successfully`);
          } else {
            alert('Invalid file format. JSON array expected.');
          }
        } catch (err) {
          console.error('JSON import error', err);
          alert('Error parsing JSON file.');
        }
      };
    }
  };

  // Drag and Drop Handlers
  const handleDragStart = (e, taskId) => {
    setDraggingTaskId(taskId);
    e.dataTransfer.setData('text/plain', taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, colStatus) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverCol !== colStatus) {
      setDragOverCol(colStatus);
    }
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain') || draggingTaskId;
    if (taskId) {
      handleStatusChange(taskId, targetStatus);
    }
    setDraggingTaskId(null);
    setDragOverCol(null);
  };

  // Open Modal Helpers
  const openNewTaskModal = (status = 'Planned') => {
    setEditingTask(null);
    setModalInitialStatus(status);
    setIsModalOpen(true);
  };

  const openEditTaskModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set();
    tasks.forEach(t => {
      if (t.tags) t.tags.forEach(tag => tagsSet.add(tag));
    });
    return Array.from(tagsSet);
  }, [tasks]);

  // Filtered & Sorted Tasks
  const filteredTasks = useMemo(() => {
    return tasks
      .filter(task => {
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = task.text.toLowerCase().includes(q);
          const matchDesc = task.description && task.description.toLowerCase().includes(q);
          const matchTag = task.tags && task.tags.some(t => t.toLowerCase().includes(q));
          if (!matchTitle && !matchDesc && !matchTag) return false;
        }

        // Status filter
        if (statusFilter !== 'All' && task.status !== statusFilter) {
          return false;
        }

        // Priority filter
        if (priorityFilter !== 'All' && task.priority !== priorityFilter) {
          return false;
        }

        // Tag filter
        if (tagFilter !== 'All') {
          if (!task.tags || !task.tags.includes(tagFilter)) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'dueDate') {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return a.dueDate.localeCompare(b.dueDate);
        }
        if (sortBy === 'priority') {
          const weight = { Urgent: 4, High: 3, Medium: 2, Low: 1 };
          return (weight[b.priority] || 0) - (weight[a.priority] || 0);
        }
        if (sortBy === 'alphabetical') {
          return a.text.localeCompare(b.text);
        }
        // default: created desc
        return (new Date(b.createdAt || 0)) - (new Date(a.createdAt || 0));
      });
  }, [tasks, searchQuery, statusFilter, priorityFilter, tagFilter, sortBy]);

  const hasActiveFilters = searchQuery || statusFilter !== 'All' || priorityFilter !== 'All' || tagFilter !== 'All' || sortBy !== 'created';

  const resetFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setPriorityFilter('All');
    setTagFilter('All');
    setSortBy('created');
  };

  // Render Kanban Column
  const renderColumn = (title, columnStatus, color) => {
    const columnTasks = filteredTasks.filter(t => t.status === columnStatus);
    const isOver = dragOverCol === columnStatus;

    return (
      <div 
        className={`kanban-column ${isOver ? 'kanban-column-over' : ''}`}
        onDragOver={(e) => handleDragOver(e, columnStatus)}
        onDrop={(e) => handleDrop(e, columnStatus)}
        onDragLeave={() => setDragOverCol(null)}
      >
        <div className="kanban-header" style={{ borderBottomColor: color, color }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>{title}</span>
            <span 
              style={{ 
                fontSize: '0.75rem', 
                backgroundColor: color, 
                color: 'white', 
                padding: '0.1rem 0.5rem', 
                borderRadius: '1rem',
                fontWeight: 600
              }}
            >
              {columnTasks.length}
            </span>
          </div>

          <button 
            type="button"
            className="btn-icon btn-icon-sm" 
            onClick={() => openNewTaskModal(columnStatus)}
            title={`Add task to ${title}`}
          >
            <FiPlus size={16} />
          </button>
        </div>

        <div className="kanban-cards-wrapper">
          {columnTasks.length === 0 ? (
            <div className="kanban-empty-dropzone">
              <p>Drag tasks here or click + to add</p>
            </div>
          ) : (
            columnTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onStatusChange={handleStatusChange}
                onDelete={handleDeleteTask}
                onEdit={openEditTaskModal}
                onDragStart={handleDragStart}
                isDragging={draggingTaskId === task.id}
              />
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="task-manager-root">
      {/* Toast Notification */}
      {toast && (
        <div className="floating-toast animate-slide-up">
          <FiCheckCircle size={16} />
          <span>{toast}</span>
        </div>
      )}

      {/* Main App Navigation Bar */}
      <header className="app-nav-bar glass-panel mb-6">
        <div className="app-nav-brand">
          <div className="brand-badge-icon">
            <FiCheckCircle size={20} />
          </div>
          <div>
            <h2 className="brand-heading">TaskFlow</h2>
            <span className="brand-subtext">Productivity Dashboard</span>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="view-mode-tabs">
          <button 
            type="button"
            className={`view-tab-btn ${viewMode === 'board' ? 'active' : ''}`}
            onClick={() => setViewMode('board')}
          >
            <FiColumns size={16} />
            <span>Board</span>
          </button>
          <button 
            type="button"
            className={`view-tab-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            <FiList size={16} />
            <span>List</span>
          </button>
          <button 
            type="button"
            className={`view-tab-btn ${viewMode === 'analytics' ? 'active' : ''}`}
            onClick={() => setViewMode('analytics')}
          >
            <FiBarChart2 size={16} />
            <span>Overview</span>
          </button>
        </div>

        {/* User Profile & Actions */}
        <div className="app-nav-user-actions">
          <button 
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => openNewTaskModal('Planned')}
          >
            <FiPlus size={16} /> New Task
          </button>

          <div className="user-profile-pill">
            {user.picture ? (
              <img src={user.picture} alt="Avatar" className="user-avatar" />
            ) : (
              <div className="user-avatar-placeholder">
                {user.name ? user.name.charAt(0) : 'U'}
              </div>
            )}
            <span className="user-name-display">{user.name ? user.name.split(' ')[0] : 'User'}</span>
          </div>

          <button 
            type="button"
            onClick={onLogout} 
            className="btn-icon" 
            title="Sign Out" 
            aria-label="Sign Out"
          >
            <FiLogOut size={18} />
          </button>
        </div>
      </header>

      {/* Quick Add & Filter Controls Toolbar */}
      {viewMode !== 'analytics' && (
        <section className="glass-panel toolbar-section mb-6">
          <div className="toolbar-row-top">
            {/* Quick Add Input Form */}
            <form onSubmit={handleQuickAdd} className="quick-add-form">
              <input
                type="text"
                placeholder="What needs to be done? Press Enter to add..."
                value={quickTaskText}
                onChange={(e) => setQuickTaskText(e.target.value)}
                className="quick-add-input"
              />
              <button type="submit" className="btn btn-primary" title="Quick Add">
                <FiPlus size={18} /> Add
              </button>
            </form>

            {/* Global Search Bar */}
            <div className="search-input-wrap">
              <FiSearch className="search-icon" size={16} />
              <input
                type="text"
                placeholder="Search tasks, notes, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button 
                  type="button"
                  className="search-clear-btn" 
                  onClick={() => setSearchQuery('')}
                >
                  <FiX size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Secondary Filters Bar: Status, Priority, Tags, Sort, Data tools */}
          <div className="toolbar-row-filters">
            <div className="filters-group">
              <div className="filter-item">
                <span className="filter-label">Status:</span>
                <select 
                  value={statusFilter} 
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="All">All Statuses</option>
                  <option value="Planned">Planned</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Complete">Complete</option>
                </select>
              </div>

              <div className="filter-item">
                <span className="filter-label">Priority:</span>
                <select 
                  value={priorityFilter} 
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="All">All Priorities</option>
                  <option value="Urgent">Urgent</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              {allTags.length > 0 && (
                <div className="filter-item">
                  <span className="filter-label">Tag:</span>
                  <select 
                    value={tagFilter} 
                    onChange={(e) => setTagFilter(e.target.value)}
                    className="filter-select"
                  >
                    <option value="All">All Tags</option>
                    {allTags.map(t => (
                      <option key={t} value={t}>#{t}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="filter-item">
                <span className="filter-label">Sort:</span>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="filter-select"
                >
                  <option value="created">Recently Created</option>
                  <option value="dueDate">Due Date (Earliest)</option>
                  <option value="priority">Priority (Urgent First)</option>
                  <option value="alphabetical">Title (A-Z)</option>
                </select>
              </div>

              {hasActiveFilters && (
                <button 
                  type="button"
                  className="btn btn-sm btn-outline-clear"
                  onClick={resetFilters}
                  title="Reset all filters"
                >
                  <FiX size={14} /> Clear Filters
                </button>
              )}
            </div>

            {/* Data Operations Tools */}
            <div className="data-tools-group">
              <button 
                type="button" 
                className="btn-icon-label" 
                onClick={handleExportJSON}
                title="Backup all tasks as JSON file"
              >
                <FiDownload size={14} /> Export
              </button>

              <button 
                type="button" 
                className="btn-icon-label" 
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                title="Restore tasks from JSON file"
              >
                <FiUpload size={14} /> Import
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImportJSON} 
                accept=".json" 
                style={{ display: 'none' }} 
              />

              <button 
                type="button" 
                className="btn-icon-label" 
                onClick={handleLoadDemoData}
                title="Load realistic sample tasks"
              >
                <FiRefreshCw size={14} /> Sample Tasks
              </button>

              <button 
                type="button" 
                className="btn-icon-label text-danger" 
                onClick={handleClearCompleted}
                title="Remove all completed tasks"
              >
                Clear Complete
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Main View Area */}
      <main className="main-content-area">
        {viewMode === 'board' && (
          <div className="kanban-board">
            {renderColumn('Planned', 'Planned', 'var(--text-muted)')}
            {renderColumn('In Progress', 'In Progress', 'var(--primary-color)')}
            {renderColumn('Complete', 'Complete', 'var(--success-color)')}
          </div>
        )}

        {viewMode === 'list' && (
          <TaskListView
            tasks={filteredTasks}
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteTask}
            onEdit={openEditTaskModal}
          />
        )}

        {viewMode === 'analytics' && (
          <TaskAnalyticsView tasks={tasks} />
        )}
      </main>

      {/* Full Task Create / Edit Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        onDelete={handleDeleteTask}
        task={editingTask}
        initialStatus={modalInitialStatus}
      />
    </div>
  );
};

export default TaskManager;
