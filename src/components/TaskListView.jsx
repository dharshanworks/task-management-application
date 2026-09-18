import React from 'react';
import { FiEdit2, FiTrash2, FiClock, FiCheckSquare } from 'react-icons/fi';

const PRIORITY_BADGES = {
  Urgent: { bg: 'rgba(220, 38, 38, 0.12)', text: '#DC2626' },
  High: { bg: 'rgba(239, 68, 68, 0.12)', text: '#EF4444' },
  Medium: { bg: 'rgba(245, 158, 11, 0.12)', text: '#D97706' },
  Low: { bg: 'rgba(16, 185, 129, 0.12)', text: '#059669' }
};

const STATUS_COLORS = {
  'Planned': { bg: 'rgba(100, 116, 139, 0.12)', text: '#64748B' },
  'In Progress': { bg: 'rgba(79, 70, 229, 0.12)', text: '#4F46E5' },
  'Complete': { bg: 'rgba(16, 185, 129, 0.12)', text: '#10B981' }
};

const TaskListView = ({ tasks, onStatusChange, onDelete, onEdit }) => {
  if (tasks.length === 0) {
    return (
      <div className="glass-panel text-center" style={{ padding: '3rem 2rem' }}>
        <p style={{ color: 'var(--text-muted)' }}>No tasks match your active filters.</p>
      </div>
    );
  }

  return (
    <div className="task-table-container glass-panel">
      <table className="task-table">
        <thead>
          <tr>
            <th style={{ width: '40px' }}>Done</th>
            <th>Task Name</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Due Date</th>
            <th>Tags</th>
            <th style={{ textAlign: 'right', width: '100px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => {
            const isComplete = task.status === 'Complete';
            const priorityBadge = PRIORITY_BADGES[task.priority] || PRIORITY_BADGES.Medium;
            const statusColor = STATUS_COLORS[task.status] || STATUS_COLORS.Planned;
            const completedSubtasks = task.subtasks ? task.subtasks.filter(s => s.completed).length : 0;
            const totalSubtasks = task.subtasks ? task.subtasks.length : 0;

            return (
              <tr key={task.id} className={`task-row ${isComplete ? 'task-row-complete' : ''}`}>
                <td>
                  <input
                    type="checkbox"
                    className="task-checkbox"
                    checked={isComplete}
                    onChange={() => onStatusChange(task.id, isComplete ? 'Planned' : 'Complete')}
                    aria-label={`Mark ${task.text} as ${isComplete ? 'incomplete' : 'complete'}`}
                  />
                </td>

                <td onClick={() => onEdit(task)} style={{ cursor: 'pointer' }}>
                  <div className="task-row-title-wrap">
                    <span className={`task-row-title ${isComplete ? 'line-through text-muted' : ''}`}>
                      {task.text}
                    </span>
                    {totalSubtasks > 0 && (
                      <span className="task-row-subtask-indicator" title={`${completedSubtasks} of ${totalSubtasks} subtasks`}>
                        <FiCheckSquare size={12} /> {completedSubtasks}/{totalSubtasks}
                      </span>
                    )}
                  </div>
                  {task.description && (
                    <span className="task-row-desc">{task.description}</span>
                  )}
                </td>

                <td>
                  <select
                    className="status-select-badge"
                    value={task.status}
                    onChange={(e) => onStatusChange(task.id, e.target.value)}
                    style={{ backgroundColor: statusColor.bg, color: statusColor.text }}
                  >
                    <option value="Planned">Planned</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Complete">Complete</option>
                  </select>
                </td>

                <td>
                  <span 
                    className="badge-priority" 
                    style={{ backgroundColor: priorityBadge.bg, color: priorityBadge.text }}
                  >
                    {task.priority || 'Medium'}
                  </span>
                </td>

                <td>
                  {task.dueDate ? (
                    <span className="task-row-duedate">
                      <FiClock size={13} style={{ display: 'inline', marginRight: '4px' }} />
                      {task.dueDate}
                    </span>
                  ) : (
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>—</span>
                  )}
                </td>

                <td>
                  <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                    {task.tags && task.tags.length > 0 ? (
                      task.tags.map(t => (
                        <span key={t} className="tag-pill tag-pill-sm">#{t}</span>
                      ))
                    ) : (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>—</span>
                    )}
                  </div>
                </td>

                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                    <button
                      type="button"
                      className="btn-icon btn-icon-sm"
                      onClick={() => onEdit(task)}
                      title="Edit Task"
                    >
                      <FiEdit2 size={14} />
                    </button>
                    <button
                      type="button"
                      className="btn-icon btn-icon-sm text-danger"
                      onClick={() => onDelete(task.id)}
                      title="Delete Task"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TaskListView;
