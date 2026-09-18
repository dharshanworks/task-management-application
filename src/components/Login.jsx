import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { 
  FiCheckCircle, 
  FiLayout, 
  FiTrendingUp, 
  FiShield, 
  FiCalendar, 
  FiList, 
  FiDownload, 
  FiUserCheck,
  FiArrowRight 
} from 'react-icons/fi';

const Login = ({ onSuccess, onError, onGuestLogin }) => {
  return (
    <div className="landing-container animate-fade-in">
      {/* Top Navbar */}
      <nav className="landing-nav glass-panel">
        <div className="app-nav-brand">
          <div className="brand-badge-icon">
            <FiCheckCircle size={20} />
          </div>
          <div>
            <h2 className="brand-heading">TaskFlow</h2>
            <span className="brand-subtext">Intuitive Work Management</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button 
            type="button" 
            className="btn btn-secondary btn-sm"
            onClick={onGuestLogin}
            title="Explore with pre-populated demo data"
          >
            <FiUserCheck size={16} /> Guest Demo Mode
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="landing-hero">
        <div className="landing-hero-badge">
          <span>✨ Enterprise-Grade Productivity · 100% Free & Local-First</span>
        </div>

        <h1 className="landing-hero-title">
          Plan with Clarity.<br />
          <span className="gradient-text">Execute with Momentum.</span>
        </h1>

        <p className="landing-hero-desc">
          An ultra-fast, beautifully responsive task management suite. Featuring drag-and-drop Kanban boards, 
          rich subtask checklists, priority tracking, due date alerts, and real-time productivity analytics.
        </p>

        {/* Authentication Card */}
        <div className="landing-auth-card glass-panel">
          <h3 className="auth-card-title">Get Started in Seconds</h3>
          <p className="auth-card-subtitle">Sign in securely with Google or explore in instant guest mode</p>
          
          <div className="auth-buttons-stack">
            <div className="google-auth-wrapper">
              <GoogleLogin
                onSuccess={onSuccess}
                onError={onError}
                shape="pill"
                size="large"
                theme="outline"
                text="continue_with"
                width="280"
              />
            </div>

            <div className="auth-divider">
              <span>OR</span>
            </div>

            <button 
              type="button"
              className="btn btn-guest-mode"
              onClick={onGuestLogin}
            >
              <FiUserCheck size={18} /> Continue with Demo Guest Access <FiArrowRight size={16} />
            </button>
          </div>

          <div className="auth-footer-notes">
            <span><FiShield size={12} style={{ display: 'inline', marginRight: '4px' }} /> Zero tracking · No cloud database lock-in · 100% client-side privacy</span>
          </div>
        </div>
      </section>

      {/* Interactive Mock Preview Card */}
      <section className="landing-preview-section">
        <div className="preview-board-mock glass-panel">
          <div className="preview-mock-header">
            <div className="mock-dots">
              <span className="mock-dot red" />
              <span className="mock-dot yellow" />
              <span className="mock-dot green" />
            </div>
            <span className="mock-title">Interactive TaskFlow Board Preview</span>
          </div>

          <div className="preview-mock-columns">
            <div className="mock-column">
              <div className="mock-col-header" style={{ color: 'var(--text-muted)' }}>
                <span>Planned</span>
                <span className="mock-badge">2</span>
              </div>
              <div className="mock-card">
                <span className="badge-priority" style={{ backgroundColor: 'rgba(245, 158, 11, 0.12)', color: '#D97706' }}>Medium</span>
                <h5>Research test automation frameworks</h5>
                <div className="tag-pill tag-pill-sm">#Testing</div>
              </div>
            </div>

            <div className="mock-column">
              <div className="mock-col-header" style={{ color: 'var(--primary-color)' }}>
                <span>In Progress</span>
                <span className="mock-badge" style={{ backgroundColor: 'var(--primary-color)' }}>1</span>
              </div>
              <div className="mock-card mock-card-active">
                <span className="badge-priority" style={{ backgroundColor: 'rgba(220, 38, 38, 0.12)', color: '#DC2626' }}>Urgent</span>
                <h5>Finalize quarterly performance review</h5>
                <span className="badge-due badge-due-today">Due Today</span>
                <div className="subtask-badge">✓ 2/3 Steps</div>
              </div>
            </div>

            <div className="mock-column">
              <div className="mock-col-header" style={{ color: 'var(--success-color)' }}>
                <span>Complete</span>
                <span className="mock-badge" style={{ backgroundColor: 'var(--success-color)' }}>1</span>
              </div>
              <div className="mock-card" style={{ opacity: 0.75 }}>
                <span className="badge-priority" style={{ backgroundColor: 'rgba(16, 185, 129, 0.12)', color: '#059669' }}>Low</span>
                <h5 className="line-through">Design system glassmorphic tokens</h5>
                <div className="tag-pill tag-pill-sm">#UI/UX</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section className="landing-features-grid">
        <div className="feature-card glass-panel">
          <div className="feature-icon" style={{ backgroundColor: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary-color)' }}>
            <FiLayout size={26} />
          </div>
          <h4>Fluid Kanban Board</h4>
          <p>Organize work into Planned, In Progress, and Complete with HTML5 drag & drop and step navigation.</p>
        </div>

        <div className="feature-card glass-panel">
          <div className="feature-icon" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success-color)' }}>
            <FiList size={26} />
          </div>
          <h4>List & Table Views</h4>
          <p>Switch between board view and dense spreadsheet-like lists for power sorting, filtering, and rapid status toggling.</p>
        </div>

        <div className="feature-card glass-panel">
          <div className="feature-icon" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B' }}>
            <FiCalendar size={26} />
          </div>
          <h4>Due Dates & Priorities</h4>
          <p>Never miss a commitment with color-coded priority flags, overdue warnings, and deadline management.</p>
        </div>

        <div className="feature-card glass-panel">
          <div className="feature-icon" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6' }}>
            <FiTrendingUp size={26} />
          </div>
          <h4>Real-time Analytics</h4>
          <p>Get instant insights on task completion rate, active work items, subtasks velocity, and tag distribution.</p>
        </div>

        <div className="feature-card glass-panel">
          <div className="feature-icon" style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)', color: '#8B5CF6' }}>
            <FiDownload size={26} />
          </div>
          <h4>Export & Backup</h4>
          <p>Download complete JSON snapshots of your boards and import them across machines with one click.</p>
        </div>

        <div className="feature-card glass-panel">
          <div className="feature-icon" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger-color)' }}>
            <FiShield size={26} />
          </div>
          <h4>Zero Server Tracking</h4>
          <p>Your data stays completely private in your browser's local sandbox without third-party database tracking.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>© 2026 TaskFlow · Built for high velocity and effortless task clarity.</p>
      </footer>
    </div>
  );
};

export default Login;
