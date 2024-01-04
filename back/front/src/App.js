// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Login from "./components/Login"
import Signup from "./components/Signup"
import TodoList from "./components/TodoList"
import Navbar from "./components/Navbar"
import "./navbar.scss"

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  

  useEffect(() => {
    const fetchUser = async () => {
     
      try {
        if (token) {
          const response = await axios.get('/auth/user', {
            headers: { 'x-auth-token': token },
          });
          setUser(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [token]);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };


  return (
    <Router>
      <header>
        <h1>Todo List</h1>
        <Navbar user={user} handleLogout={handleLogout} />
      </header>
      <Routes>
        <Route path="/signup" element={<Signup setToken={setToken} user={user} />} />
        <Route path="/login" element={<Login setToken={setToken} setIsAuthenticated={setIsAuthenticated} user={user} />} />
        <Route
          path="/"
          element={isAuthenticated ? <TodoList token={token} /> : <Login setToken={setToken} setIsAuthenticated={setIsAuthenticated} user={user} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
