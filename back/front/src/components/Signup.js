import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Check if passwords match
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      // Check for strong password (add your own password strength criteria)
      if (password.length < 8) {
        setError('Password should be at least 8 characters long');
        return;
      }

      const response = await axios.post('/auth/signup', { username, password });
      console.log(response.data.message);

      // Automatically log in the user after signup
      handleLoginAfterSignup();
      navigate("/")
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleLoginAfterSignup = async () => {
    try {
      const response = await axios.post('/auth/login', { username, password });
      const { token, username: loggedInUsername } = response.data;

      setToken(token);
      localStorage.setItem('token', token);
      console.log(`User ${loggedInUsername} logged in successfully after signup.`);
      window.location.reload();
    } catch (error) {
      console.error('Login after signup failed:', error);
      console.error('Response data:', error.response.data);
    }
  };

  return (
    <div className='login-container'>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <label>
          Username:
          <input type="text" value={username} name="username" onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} name="password" onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <label>
          Confirm Password:
          <input type="password" value={confirmPassword} name="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Signup</button>
      </form>
      <div className="error-message">{error && <div>{error}</div>}</div>
    </div>
  );
};

export default Signup;
