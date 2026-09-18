import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { FiCheckCircle, FiLayout, FiTrendingUp } from 'react-icons/fi';

const Login = ({ onSuccess, onError }) => {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4rem', padding: '2rem 0' }}>
      
      {/* Hero Section */}
      <div className="text-center animate-fade-in" style={{ maxWidth: '800px', marginTop: '2rem' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', background: 'linear-gradient(135deg, var(--primary-color), #818CF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Master Your Workflow
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '3rem', lineHeight: '1.6' }}>
          A beautifully simple, incredibly efficient task management board designed to help you plan, track, and complete your goals effortlessly.
        </p>
        
        <div className="glass-panel" style={{ display: 'inline-block', padding: '2rem 3rem', borderRadius: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>Get Started for Free</h2>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <GoogleLogin
              onSuccess={onSuccess}
              onError={onError}
              useOneTap
              shape="pill"
              size="large"
              theme="outline"
              text="continue_with"
            />
          </div>
          <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Secure authentication via Google</p>
        </div>
      </div>

      {/* Feature Highlight Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', width: '100%', maxWidth: '1000px', marginTop: '2rem' }}>
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', padding: '1rem', backgroundColor: 'rgba(79, 70, 229, 0.1)', borderRadius: '50%', color: 'var(--primary-color)', marginBottom: '1rem' }}>
            <FiLayout size={32} />
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Kanban Efficiency</h3>
          <p style={{ color: 'var(--text-muted)' }}>Visualize your progress instantly with distinct stages for planning, executing, and finishing.</p>
        </div>

        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', padding: '1rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', color: 'var(--success-color)', marginBottom: '1rem' }}>
            <FiCheckCircle size={32} />
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Frictionless UI</h3>
          <p style={{ color: 'var(--text-muted)' }}>A premium glassmorphic design that gets out of your way so you can focus on the work.</p>
        </div>

        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '50%', color: 'var(--danger-color)', marginBottom: '1rem' }}>
            <FiTrendingUp size={32} />
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Local First</h3>
          <p style={{ color: 'var(--text-muted)' }}>Lightning fast performance with browser-local persistence. Your data stays with you.</p>
        </div>
      </div>

    </div>
  );
};

export default Login;
