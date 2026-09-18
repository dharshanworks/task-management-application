import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import { FiPlus, FiLogOut } from 'react-icons/fi';

const TaskManager = ({ user, onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Load tasks from local storage on mount
  useEffect(() => {
    if (user && user.email) {
      const storedTasks = localStorage.getItem(`tasks_${user.email}`);
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    }
  }, [user]);

  // Save tasks to local storage whenever they change
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
      status: 'Planned', // 'Planned', 'In Progress', 'Complete'
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

  const completedCount = tasks.filter(t => t.status === 'Complete').length;
  const inProgressCount = tasks.filter(t => t.status === 'In Progress').length;
  const totalCount = tasks.length;
  const progress = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return (
    <div style={{ width: '100%' }}>
      {/* Header */}
      <header className="glass-panel mb-8" style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Hello, {user.name.split(' ')[0]} 👋</h1>
          <p style={{ margin: 0, fontSize: '0.875rem' }}>Here are your tasks for today.</p>
        </div>
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

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '2rem' }}>
        
        {/* Main Content */}
        <div>
          {/* Add Task Form */}
          <form onSubmit={handleAddTask} className="glass-panel mb-6 animate-fade-in" style={{ padding: '1.5rem', display: 'flex', gap: '1rem' }}>
            <input
              type="text"
              placeholder="What needs to be done?"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              style={{ flex: 1 }}
            />
            <button type="submit" className="btn btn-primary">
              <FiPlus size={18} /> Add
            </button>
          </form>

          {/* Task List */}
          <div className="task-list">
            {tasks.length === 0 ? (
              <div className="glass-panel text-center animate-fade-in" style={{ padding: '3rem' }}>
                <p style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>You're all caught up!</p>
                <p style={{ fontSize: '0.875rem' }}>Add a task above to get started.</p>
              </div>
            ) : (
              tasks.map(task => (
                <TaskItem 
                  key={task.id} 
                  task={task} 
                  onStatusChange={handleStatusChange} 
                  onDelete={handleDeleteTask} 
                />
              ))
            )}
          </div>
        </div>

        {/* Stats Panel */}
        <div className="glass-panel animate-fade-in" style={{ padding: '2rem', alignSelf: 'start' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Progress</h2>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
            <span>Completed</span>
            <span style={{ fontWeight: 600 }}>{completedCount} / {totalCount}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            <span>In Progress</span>
            <span>{inProgressCount}</span>
          </div>
          
          <div style={{ width: '100%', height: '8px', backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
            <div 
              style={{ 
                height: '100%', 
                width: `${progress}%`, 
                backgroundColor: 'var(--primary-color)',
                transition: 'width 0.5s ease-out',
                borderRadius: '4px'
              }} 
            />
          </div>
          <p className="text-center mt-4" style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary-color)' }}>
            {progress}%
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default TaskManager;
