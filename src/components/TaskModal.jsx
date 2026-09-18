import React, { useState, useEffect } from 'react';
import { FiX, FiCheckSquare, FiPlus, FiTrash2, FiTag, FiCalendar, FiFlag, FiAlignLeft } from 'react-icons/fi';

const PRESET_TAGS = ['Work', 'Personal', 'Dev', 'Design', 'Urgent', 'Docs'];
const PRIORITIES = [
  { value: 'Low', label: 'Low', color: '#10B981' },
  { value: 'Medium', label: 'Medium', color: '#F59E0B' },
  { value: 'High', label: 'High', color: '#EF4444' },
  { value: 'Urgent', label: 'Urgent', color: '#DC2626' }
];

const TaskModal = ({ isOpen, onClose, onSave, onDelete, task, initialStatus = 'Planned' }) => {
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(initialStatus);
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtask, setNewSubtask] = useState('');

  useEffect(() => {
    if (task) {
      setText(task.text || '');
      setDescription(task.description || '');
      setStatus(task.status || 'Planned');
      setPriority(task.priority || 'Medium');
      setDueDate(task.dueDate || '');
      setTags(task.tags || []);
      setSubtasks(task.subtasks || []);
    } else {
      setText('');
      setDescription('');
      setStatus(initialStatus || 'Planned');
      setPriority('Medium');
      setDueDate('');
      setTags([]);
      setSubtasks([]);
    }
  }, [task, isOpen, initialStatus]);

  if (!isOpen) return null;

  const handleAddTag = (tagToAdd) => {
    const cleanTag = (tagToAdd || tagInput).trim().replace(/^#/, '');
    if (cleanTag && !tags.includes(cleanTag)) {
      setTags([...tags, cleanTag]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleAddSubtask = (e) => {
    if (e) e.preventDefault();
    if (!newSubtask.trim()) return;
    setSubtasks([
      ...subtasks,
      { id: Date.now().toString(), text: newSubtask.trim(), completed: false }
    ]);
    setNewSubtask('');
  };

  const handleToggleSubtask = (id) => {
    setSubtasks(
      subtasks.map(st => st.id === id ? { ...st, completed: !st.completed } : st)
    );
  };

  const handleDeleteSubtask = (id) => {
    setSubtasks(subtasks.filter(st => st.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    onSave({
      id: task ? task.id : Date.now().toString(),
      text: text.trim(),
      description: description.trim(),
      status,
      priority,
      dueDate,
      tags,
      subtasks,
      createdAt: task ? task.createdAt : new Date().toISOString()
    });
    onClose();
  };

  const completedSubtasks = subtasks.filter(st => st.completed).length;
  const subtaskProgress = subtasks.length === 0 ? 0 : Math.round((completedSubtasks / subtasks.length) * 100);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{task ? 'Edit Task' : 'Create New Task'}</h2>
          <button className="btn-icon" onClick={onClose} title="Close">
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          {/* Title */}
          <div className="form-group">
            <label htmlFor="task-title">Task Title *</label>
            <input
              id="task-title"
              type="text"
              placeholder="e.g. Conduct security audit"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              autoFocus
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="task-desc">
              <FiAlignLeft style={{ display: 'inline', marginRight: '4px' }} /> Description / Notes
            </label>
            <textarea
              id="task-desc"
              rows={3}
              placeholder="Add extra context, steps, or reference links..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Row: Status, Priority, Due Date */}
          <div className="form-row-3">
            <div className="form-group">
              <label htmlFor="task-status">Status</label>
              <select
                id="task-status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Planned">Planned</option>
                <option value="In Progress">In Progress</option>
                <option value="Complete">Complete</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="task-priority">
                <FiFlag style={{ display: 'inline', marginRight: '4px' }} /> Priority
              </label>
              <select
                id="task-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                {PRIORITIES.map(p => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="task-duedate">
                <FiCalendar style={{ display: 'inline', marginRight: '4px' }} /> Due Date
              </label>
              <input
                id="task-duedate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          {/* Tags */}
          <div className="form-group">
            <label>
              <FiTag style={{ display: 'inline', marginRight: '4px' }} /> Tags & Labels
            </label>
            <div className="tag-input-wrapper">
              <input
                type="text"
                placeholder="Type tag & press enter"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => handleAddTag()}>
                Add Tag
              </button>
            </div>

            {/* Quick preset suggestions */}
            <div className="preset-tags">
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Suggestions:</span>
              {PRESET_TAGS.map(pt => (
                <button
                  key={pt}
                  type="button"
                  className={`chip chip-preset ${tags.includes(pt) ? 'active' : ''}`}
                  onClick={() => tags.includes(pt) ? handleRemoveTag(pt) : handleAddTag(pt)}
                >
                  +{pt}
                </button>
              ))}
            </div>

            {/* Selected tags */}
            {tags.length > 0 && (
              <div className="selected-tags">
                {tags.map(t => (
                  <span key={t} className="chip chip-active">
                    #{t}
                    <button type="button" onClick={() => handleRemoveTag(t)}>×</button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Subtasks Checklist */}
          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label style={{ margin: 0 }}>
                <FiCheckSquare style={{ display: 'inline', marginRight: '4px' }} /> Subtasks Checklist
              </label>
              {subtasks.length > 0 && (
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {completedSubtasks}/{subtasks.length} ({subtaskProgress}%)
                </span>
              )}
            </div>

            {subtasks.length > 0 && (
              <div className="subtask-progress-bar">
                <div className="subtask-progress-fill" style={{ width: `${subtaskProgress}%` }} />
              </div>
            )}

            <div className="subtask-list">
              {subtasks.map(st => (
                <div key={st.id} className="subtask-item">
                  <input
                    type="checkbox"
                    checked={st.completed}
                    onChange={() => handleToggleSubtask(st.id)}
                    id={`st-${st.id}`}
                  />
                  <label
                    htmlFor={`st-${st.id}`}
                    style={{
                      flex: 1,
                      textDecoration: st.completed ? 'line-through' : 'none',
                      color: st.completed ? 'var(--text-muted)' : 'var(--text-main)',
                      cursor: 'pointer'
                    }}
                  >
                    {st.text}
                  </label>
                  <button
                    type="button"
                    className="btn-icon danger-hover"
                    onClick={() => handleDeleteSubtask(st.id)}
                    title="Remove subtask"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            <div className="subtask-add-row">
              <input
                type="text"
                placeholder="Add a step / checklist item..."
                value={newSubtask}
                onChange={(e) => setNewSubtask(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSubtask();
                  }
                }}
              />
              <button type="button" className="btn btn-secondary btn-sm" onClick={handleAddSubtask}>
                <FiPlus size={14} /> Add Step
              </button>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="modal-footer">
            {task && onDelete && (
              <button
                type="button"
                className="btn btn-danger-outline"
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this task?')) {
                    onDelete(task.id);
                    onClose();
                  }
                }}
              >
                <FiTrash2 size={16} /> Delete
              </button>
            )}
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.75rem' }}>
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {task ? 'Save Changes' : 'Create Task'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
