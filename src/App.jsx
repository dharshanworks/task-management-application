import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import Login from './components/Login';
import TaskManager from './components/TaskManager';

// TODO: Replace with your actual Google Client ID
const GOOGLE_CLIENT_ID = "462747547434-dfji2t9ihlapeuis0ne8mkt6958dt90q.apps.googleusercontent.com";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in from local storage
    const storedUser = localStorage.getItem('taskApp_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    const userData = {
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture
    };
    setUser(userData);
    localStorage.setItem('taskApp_user', JSON.stringify(userData));
  };

  const handleLoginError = () => {
    console.error('Login Failed');
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
        <Login onSuccess={handleLoginSuccess} onError={handleLoginError} />
      )}
    </GoogleOAuthProvider>
  );
}

export default App;
