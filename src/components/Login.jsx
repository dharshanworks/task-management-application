import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';

const Login = ({ onSuccess, onError }) => {
  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '3rem', textAlign: 'center', maxWidth: '400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Welcome Back</h1>
        <p>Sign in to manage your tasks effectively.</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <GoogleLogin
          onSuccess={onSuccess}
          onError={onError}
          useOneTap
          shape="pill"
          size="large"
          theme="outline"
          text="signin_with"
        />
      </div>
      
      <div style={{ marginTop: '2rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
        <p>Secure authentication via Google</p>
      </div>
    </div>
  );
};

export default Login;
