import React from 'react';
import { FiTrash2 } from 'react-icons/fi';

const TaskItem = ({ task, onStatusChange, onDelete }) => {
  const isComplete = task.status === 'Complete';

  const getStatusColor = (status) => {
    switch(status) {
      case 'Complete': return 'var(--success-color)';
      case 'In Progress': return 'var(--primary-color)';
      default: return 'var(--text-muted)';
    }
  };

  return (
    <div 
      className="glass-panel animate-fade-in" 
      style={{ 
        padding: '1rem 1.5rem', 
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'all 0.3s ease',
        opacity: isComplete ? 0.7 : 1,
        transform: isComplete ? 'scale(0.98)' : 'scale(1)',
        backgroundColor: isComplete ? 'rgba(255,255,255,0.4)' : 'var(--surface-color)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
        <select 
          value={task.status} 
          onChange={(e) => onStatusChange(task.id, e.target.value)}
          style={{
            padding: '0.4rem 0.8rem',
            borderRadius: '0.5rem',
            border: `1px solid ${getStatusColor(task.status)}`,
            backgroundColor: 'rgba(255,255,255,0.7)',
            color: getStatusColor(task.status),
            fontWeight: 600,
            cursor: 'pointer',
            outline: 'none'
          }}
        >
          <option value="Planned">Planned</option>
          <option value="In Progress">In Progress</option>
          <option value="Complete">Complete</option>
        </select>
        
        <span style={{ 
          fontSize: '1.125rem',
          textDecoration: isComplete ? 'line-through' : 'none',
          color: isComplete ? 'var(--text-muted)' : 'var(--text-main)',
          transition: 'all 0.3s ease'
        }}>
          {task.text}
        </span>
      </div>

      <button 
        onClick={() => onDelete(task.id)}
        className="btn-icon danger"
        aria-label="Delete task"
      >
        <FiTrash2 size={20} />
      </button>
    </div>
  );
};

export default TaskItem;
