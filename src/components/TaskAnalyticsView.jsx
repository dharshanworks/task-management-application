import React from 'react';
import { FiCheckCircle, FiClock, FiAlertTriangle, FiList, FiPieChart, FiTrendingUp } from 'react-icons/fi';

const TaskAnalyticsView = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'Complete').length;
  const inProgress = tasks.filter(t => t.status === 'In Progress').length;
  const planned = tasks.filter(t => t.status === 'Planned').length;
  
  const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

  // Overdue check
  const todayStr = new Date().toISOString().split('T')[0];
  const overdueCount = tasks.filter(t => t.dueDate && t.dueDate < todayStr && t.status !== 'Complete').length;
  const dueTodayCount = tasks.filter(t => t.dueDate === todayStr && t.status !== 'Complete').length;

  // Subtask metrics
  let totalSubtasks = 0;
  let doneSubtasks = 0;
  tasks.forEach(t => {
    if (t.subtasks && t.subtasks.length > 0) {
      totalSubtasks += t.subtasks.length;
      doneSubtasks += t.subtasks.filter(s => s.completed).length;
    }
  });
  const subtaskRate = totalSubtasks === 0 ? 0 : Math.round((doneSubtasks / totalSubtasks) * 100);

  // Priority counts
  const priorities = {
    Urgent: tasks.filter(t => t.priority === 'Urgent').length,
    High: tasks.filter(t => t.priority === 'High').length,
    Medium: tasks.filter(t => t.priority === 'Medium').length,
    Low: tasks.filter(t => t.priority === 'Low').length
  };

  // Tags breakdown
  const tagCounts = {};
  tasks.forEach(t => {
    if (t.tags) {
      t.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    }
  });

  return (
    <div className="analytics-container animate-fade-in">
      {/* KPI Cards */}
      <div className="analytics-kpi-grid">
        <div className="analytics-card glass-panel">
          <div className="analytics-card-icon" style={{ backgroundColor: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary-color)' }}>
            <FiTrendingUp size={24} />
          </div>
          <div className="analytics-card-info">
            <span className="analytics-card-label">Completion Rate</span>
            <h3 className="analytics-card-val">{completionRate}%</h3>
            <span className="analytics-card-sub">{completed} of {total} tasks completed</span>
          </div>
        </div>

        <div className="analytics-card glass-panel">
          <div className="analytics-card-icon" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6' }}>
            <FiClock size={24} />
          </div>
          <div className="analytics-card-info">
            <span className="analytics-card-label">In Progress</span>
            <h3 className="analytics-card-val">{inProgress}</h3>
            <span className="analytics-card-sub">Active tasks in flight</span>
          </div>
        </div>

        <div className="analytics-card glass-panel">
          <div className="analytics-card-icon" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger-color)' }}>
            <FiAlertTriangle size={24} />
          </div>
          <div className="analytics-card-info">
            <span className="analytics-card-label">Needs Attention</span>
            <h3 className="analytics-card-val" style={{ color: overdueCount > 0 ? 'var(--danger-color)' : 'inherit' }}>
              {overdueCount}
            </h3>
            <span className="analytics-card-sub">
              {overdueCount} overdue · {dueTodayCount} due today
            </span>
          </div>
        </div>

        <div className="analytics-card glass-panel">
          <div className="analytics-card-icon" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success-color)' }}>
            <FiCheckCircle size={24} />
          </div>
          <div className="analytics-card-info">
            <span className="analytics-card-label">Subtasks Progress</span>
            <h3 className="analytics-card-val">{subtaskRate}%</h3>
            <span className="analytics-card-sub">{doneSubtasks}/{totalSubtasks} checklist items</span>
          </div>
        </div>
      </div>

      {/* Deep Dives: Status and Priority breakdowns */}
      <div className="analytics-charts-grid">
        {/* Status Distribution */}
        <div className="glass-panel analytics-section">
          <h3 className="analytics-section-title">
            <FiPieChart style={{ marginRight: '6px' }} /> Status Distribution
          </h3>
          
          <div className="analytics-stacked-bar">
            <div 
              style={{ width: `${total ? (planned / total) * 100 : 0}%`, backgroundColor: '#94A3B8' }} 
              title={`Planned: ${planned}`} 
            />
            <div 
              style={{ width: `${total ? (inProgress / total) * 100 : 0}%`, backgroundColor: 'var(--primary-color)' }} 
              title={`In Progress: ${inProgress}`} 
            />
            <div 
              style={{ width: `${total ? (completed / total) * 100 : 0}%`, backgroundColor: 'var(--success-color)' }} 
              title={`Complete: ${completed}`} 
            />
          </div>

          <div className="analytics-legend">
            <div className="legend-item">
              <span className="legend-dot" style={{ backgroundColor: '#94A3B8' }} />
              <span>Planned: <strong>{planned}</strong></span>
            </div>
            <div className="legend-item">
              <span className="legend-dot" style={{ backgroundColor: 'var(--primary-color)' }} />
              <span>In Progress: <strong>{inProgress}</strong></span>
            </div>
            <div className="legend-item">
              <span className="legend-dot" style={{ backgroundColor: 'var(--success-color)' }} />
              <span>Complete: <strong>{completed}</strong></span>
            </div>
          </div>
        </div>

        {/* Priority Breakdown */}
        <div className="glass-panel analytics-section">
          <h3 className="analytics-section-title">
            <FiList style={{ marginRight: '6px' }} /> Priorities Overview
          </h3>

          <div className="priority-bars-list">
            <div className="priority-bar-row">
              <span className="priority-bar-label" style={{ color: '#DC2626' }}>Urgent</span>
              <div className="priority-bar-track">
                <div 
                  className="priority-bar-fill" 
                  style={{ width: `${total ? (priorities.Urgent / total) * 100 : 0}%`, backgroundColor: '#DC2626' }} 
                />
              </div>
              <span className="priority-bar-count">{priorities.Urgent}</span>
            </div>

            <div className="priority-bar-row">
              <span className="priority-bar-label" style={{ color: '#EF4444' }}>High</span>
              <div className="priority-bar-track">
                <div 
                  className="priority-bar-fill" 
                  style={{ width: `${total ? (priorities.High / total) * 100 : 0}%`, backgroundColor: '#EF4444' }} 
                />
              </div>
              <span className="priority-bar-count">{priorities.High}</span>
            </div>

            <div className="priority-bar-row">
              <span className="priority-bar-label" style={{ color: '#D97706' }}>Medium</span>
              <div className="priority-bar-track">
                <div 
                  className="priority-bar-fill" 
                  style={{ width: `${total ? (priorities.Medium / total) * 100 : 0}%`, backgroundColor: '#F59E0B' }} 
                />
              </div>
              <span className="priority-bar-count">{priorities.Medium}</span>
            </div>

            <div className="priority-bar-row">
              <span className="priority-bar-label" style={{ color: '#059669' }}>Low</span>
              <div className="priority-bar-track">
                <div 
                  className="priority-bar-fill" 
                  style={{ width: `${total ? (priorities.Low / total) * 100 : 0}%`, backgroundColor: '#10B981' }} 
                />
              </div>
              <span className="priority-bar-count">{priorities.Low}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tags Breakdown */}
      {Object.keys(tagCounts).length > 0 && (
        <div className="glass-panel analytics-section" style={{ marginTop: '1.5rem' }}>
          <h3 className="analytics-section-title">🏷️ Tasks by Tag</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.75rem' }}>
            {Object.entries(tagCounts).map(([tag, count]) => (
              <div key={tag} className="tag-stat-chip">
                <span>#{tag}</span>
                <span className="tag-stat-count">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskAnalyticsView;
