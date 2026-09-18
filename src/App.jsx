import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import Login from './components/Login';
import TaskManager from './components/TaskManager';

// Replace with actual Google Client ID from Google Cloud Console
const GOOGLE_CLIENT_ID = "462747547434-dfji2t9ihlapeuis0ne8mkt6958dt90q.apps.googleusercontent.com";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in from local storage
    const storedUser = localStorage.getItem('taskApp_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user', e);
      }
    }
  }, []);

  const handleLoginSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const userData = {
        name: decoded.name || 'User',
        email: decoded.email,
        picture: decoded.picture || ''
      };
      setUser(userData);
      localStorage.setItem('taskApp_user', JSON.stringify(userData));
    } catch (err) {
      console.error('Error decoding credential', err);
    }
  };

  const handleLoginError = () => {
    console.error('Google Sign-In failed');
  };

  const handleGuestLogin = () => {
    const guestUser = {
      name: 'Guest User',
      email: 'guest@taskflow.demo',
      picture: ''
    };
    setUser(guestUser);
    localStorage.setItem('taskApp_user', JSON.stringify(guestUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('taskApp_user');
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {user ? (
        <TaskManager user={user} onLogout={handleLogout} />
      ) : (
        <Login 
          onSuccess={handleLoginSuccess} 
          onError={handleLoginError} 
          onGuestLogin={handleGuestLogin}
        />
      )}
    </GoogleOAuthProvider>
  );
}

export default App;
