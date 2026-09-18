import React from 'react';
import { 
  FiTrash2, 
  FiArrowRight, 
  FiArrowLeft, 
  FiCheck, 
  FiCheckSquare, 
  FiEdit2, 
  FiClock, 
  FiAlertCircle 
} from 'react-icons/fi';

const PRIORITY_STYLES = {
  Urgent: { bg: 'rgba(220, 38, 38, 0.12)', text: '#DC2626', border: 'rgba(220, 38, 38, 0.3)' },
  High: { bg: 'rgba(239, 68, 68, 0.12)', text: '#EF4444', border: 'rgba(239, 68, 68, 0.3)' },
  Medium: { bg: 'rgba(245, 158, 11, 0.12)', text: '#D97706', border: 'rgba(245, 158, 11, 0.3)' },
  Low: { bg: 'rgba(16, 185, 129, 0.12)', text: '#059669', border: 'rgba(16, 185, 129, 0.3)' }
};

const TaskItem = ({ 
  task, 
  onStatusChange, 
  onDelete, 
  onEdit, 
  onDragStart,
  isDragging 
}) => {
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

  const isComplete = task.status === 'Complete';

  // Due date status calculation
  const getDueDateInfo = (dueDateStr) => {
    if (!dueDateStr) return null;
    const due = new Date(dueDateStr + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffDays = Math.round((due - today) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) {
      return { text: `Overdue (${Math.abs(diffDays)}d)`, isOverdue: true };
    } else if (diffDays === 0) {
      return { text: 'Due Today', isToday: true };
    } else if (diffDays === 1) {
      return { text: 'Due Tomorrow', isUpcoming: true };
    } else {
      return { 
        text: due.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }), 
        isUpcoming: true 
      };
    }
  };

  const dueInfo = getDueDateInfo(task.dueDate);
  const priorityStyle = PRIORITY_STYLES[task.priority] || PRIORITY_STYLES.Medium;
  const completedSubtasks = task.subtasks ? task.subtasks.filter(s => s.completed).length : 0;
  const totalSubtasks = task.subtasks ? task.subtasks.length : 0;

  return (
    <div
      className={`task-card glass-panel animate-slide-up ${isComplete ? 'task-card-complete' : ''} ${isDragging ? 'task-dragging' : ''}`}
      draggable
      onDragStart={(e) => onDragStart && onDragStart(e, task.id)}
      style={{ cursor: 'grab' }}
    >
      {/* Top Meta Bar: Priority & Due Date */}
      <div className="task-card-meta">
        <span 
          className="badge-priority" 
          style={{ 
            backgroundColor: priorityStyle.bg, 
            color: priorityStyle.text, 
            borderColor: priorityStyle.border 
          }}
        >
          {task.priority || 'Medium'}
        </span>

        {dueInfo && (
          <span 
            className={`badge-due ${dueInfo.isOverdue && !isComplete ? 'badge-due-overdue' : dueInfo.isToday && !isComplete ? 'badge-due-today' : ''}`}
          >
            {dueInfo.isOverdue && !isComplete ? <FiAlertCircle size={12} /> : <FiClock size={12} />}
            {dueInfo.text}
          </span>
        )}

        <div className="task-actions-quick" style={{ marginLeft: 'auto', display: 'flex', gap: '0.25rem' }}>
          <button 
            type="button"
            onClick={() => onEdit(task)} 
            className="btn-icon btn-icon-sm" 
            title="Edit Task Details"
            aria-label="Edit Task"
          >
            <FiEdit2 size={13} />
          </button>
          <button 
            type="button"
            onClick={() => onDelete(task.id)} 
            className="btn-icon btn-icon-sm text-danger" 
            title="Delete Task"
            aria-label="Delete Task"
          >
            <FiTrash2 size={13} />
          </button>
        </div>
      </div>

      {/* Task Title & Description */}
      <div 
        className="task-card-body"
        onClick={() => onEdit(task)}
        style={{ cursor: 'pointer' }}
      >
        <h4 className={`task-title ${isComplete ? 'line-through text-muted' : ''}`}>
          {task.text}
        </h4>
        {task.description && (
          <p className="task-desc-preview">
            {task.description}
          </p>
        )}
      </div>

      {/* Tags & Subtasks preview */}
      {(task.tags && task.tags.length > 0) || totalSubtasks > 0 ? (
        <div className="task-card-tags-row">
          {task.tags && task.tags.map(tag => (
            <span key={tag} className="tag-pill">
              #{tag}
            </span>
          ))}

          {totalSubtasks > 0 && (
            <span 
              className={`subtask-badge ${completedSubtasks === totalSubtasks ? 'subtask-badge-done' : ''}`}
              title={`${completedSubtasks} of ${totalSubtasks} checklist items completed`}
            >
              <FiCheckSquare size={12} />
              {completedSubtasks}/{totalSubtasks}
            </span>
          )}
        </div>
      ) : null}

      {/* Footer Navigation Buttons */}
      <div className="task-card-footer">
        {getPrevStatus() ? (
          <button 
            type="button"
            onClick={() => onStatusChange(task.id, getPrevStatus())}
            className="btn-step-nav"
            title={`Move back to ${getPrevStatus()}`}
          >
            <FiArrowLeft size={12} /> {getPrevStatus()}
          </button>
        ) : <div />}

        {getNextStatus() && (
          <button 
            type="button"
            onClick={() => onStatusChange(task.id, getNextStatus())}
            className="btn-step-nav btn-step-next"
            title={`Move to ${getNextStatus()}`}
          >
            {getNextStatus() === 'Complete' ? <FiCheck size={12} /> : null}
            <span>{getNextStatus()}</span>
            {getNextStatus() !== 'Complete' ? <FiArrowRight size={12} /> : null}
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
