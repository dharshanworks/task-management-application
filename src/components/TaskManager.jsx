import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import { FiPlus, FiLogOut } from 'react-icons/fi';

const TaskManager = ({ user, onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    if (user && user.email) {
      const storedTasks = localStorage.getItem(`tasks_${user.email}`);
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    }
  }, [user]);

  useEffect(() => {
    if (user && user.email) {
      localStorage.setItem(`tasks_${user.email}`, JSON.stringify(tasks));
    }
  }, [tasks, user]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    const newTaskObj = {
      id: Date.now().toString(),
      text: newTask.trim(),
      status: 'Planned',
    };
    
    setTasks([newTaskObj, ...tasks]);
    setNewTask('');
  };

  const handleStatusChange = (id, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status: newStatus } : task
    ));
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const renderColumn = (title, statusFilter, color) => {
    const filteredTasks = tasks.filter(t => t.status === statusFilter);
    return (
      <div className="kanban-column">
        <div className="kanban-header" style={{ borderBottomColor: color, color: color }}>
          <span>{title}</span>
          <span style={{ fontSize: '0.875rem', backgroundColor: color, color: 'white', padding: '0.1rem 0.5rem', borderRadius: '1rem' }}>
            {filteredTasks.length}
          </span>
        </div>
        
        {filteredTasks.length === 0 ? (
          <div className="glass-panel text-center" style={{ padding: '2rem 1rem', opacity: 0.6 }}>
            <p style={{ fontSize: '0.875rem' }}>No tasks here</p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onStatusChange={handleStatusChange} 
              onDelete={handleDeleteTask} 
            />
          ))
        )}
      </div>
    );
  };

  return (
    <div style={{ width: '100%', maxWidth: '1200px' }}>
      {/* Header */}
      <header className="glass-panel mb-8" style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Hello, {user.name.split(' ')[0]} 👋</h1>
          <p style={{ margin: 0, fontSize: '0.875rem' }}>Manage your workflow below.</p>
        </div>
        
        {/* Add Task Form (Moved to header area for better Kanban layout) */}
        <form onSubmit={handleAddTask} style={{ display: 'flex', gap: '1rem', flex: 1, maxWidth: '400px', margin: '0 2rem' }}>
          <input
            type="text"
            placeholder="Quick add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            style={{ flex: 1 }}
          />
          <button type="submit" className="btn btn-primary" aria-label="Add Task">
            <FiPlus size={20} />
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {user.picture && (
            <img 
              src={user.picture} 
              alt="Profile" 
              style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid var(--surface-border)' }} 
            />
          )}
          <button onClick={onLogout} className="btn-icon" title="Logout">
            <FiLogOut size={20} />
          </button>
        </div>
      </header>

      {/* Kanban Board */}
      <div className="kanban-board">
        {renderColumn('Planned', 'Planned', 'var(--text-muted)')}
        {renderColumn('In Progress', 'In Progress', 'var(--primary-color)')}
        {renderColumn('Complete', 'Complete', 'var(--success-color)')}
      </div>
    </div>
  );
};

export default TaskManager;
