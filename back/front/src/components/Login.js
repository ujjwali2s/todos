import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.scss';

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/auth/login', { username, password });
      const { token, username: loggedInUsername } = response.data;

      setToken(token);
      localStorage.setItem('token', token);
      
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error('Login failed:', error);
      console.error('Response data:', error.response.data);

      // Update the error state based on the response data
      setError(error.response.data.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <label>
          Username:
          <input type="text" value={username} name="username" onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} name="password" onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <div>{error && <div className="error-message">{error}</div>}</div>
    </div>
  );
};

export default Login;
