import React from 'react';
import { FiTrash2, FiArrowRight, FiArrowLeft, FiCheck } from 'react-icons/fi';

const TaskItem = ({ task, onStatusChange, onDelete }) => {
  const getNextStatus = () => {
    if (task.status === 'Planned') return 'In Progress';
    if (task.status === 'In Progress') return 'Complete';
    return null;
  };

  const getPrevStatus = () => {
    if (task.status === 'Complete') return 'In Progress';
    if (task.status === 'In Progress') return 'Planned';
    return null;
  };

  return (
    <div className={`task-item glass-panel animate-slide-up ${task.status === 'Complete' ? 'completed' : ''}`} style={{
      display: 'flex',
      flexDirection: 'column',
      padding: '1rem',
      gap: '0.75rem',
      opacity: task.status === 'Complete' ? 0.7 : 1
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
        <span style={{ 
          flex: 1, 
          fontSize: '0.9375rem',
          textDecoration: task.status === 'Complete' ? 'line-through' : 'none',
          color: task.status === 'Complete' ? 'var(--text-muted)' : 'var(--text-main)',
          wordBreak: 'break-word'
        }}>
          {task.text}
        </span>
        
        <button 
          onClick={() => onDelete(task.id)} 
          className="btn-icon text-danger" 
          title="Delete Task"
          style={{ padding: '0.25rem', marginTop: '-0.25rem' }}
        >
          <FiTrash2 size={16} />
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
        {getPrevStatus() ? (
          <button 
            onClick={() => onStatusChange(task.id, getPrevStatus())}
            style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem 0' }}
          >
            <FiArrowLeft size={12} /> {getPrevStatus()}
          </button>
        ) : <div />}

        {getNextStatus() && (
          <button 
            onClick={() => onStatusChange(task.id, getNextStatus())}
            style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: 'var(--primary-color)', background: 'rgba(79, 70, 229, 0.1)', padding: '0.25rem 0.75rem', borderRadius: '1rem', border: 'none', cursor: 'pointer', fontWeight: 500 }}
          >
            {getNextStatus() === 'Complete' ? <FiCheck size={12} /> : <FiArrowRight size={12} />} 
            {getNextStatus()}
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
