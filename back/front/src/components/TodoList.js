// src/components/TodoList.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./todo.scss"
const TodoList = ({ token }) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('/api/v1/todos', {
          headers: { 'x-auth-token': token },
        });
        setTodos(response.data);
      } catch (error) {
        navigate("/login")
        console.error('Error fetching todos:', error.response.data.message);
      }
    };

    fetchTodos();
  }, [token]);

  const handleCreateTodo = async () => {
    try {
      await axios.post(
        '/api/v1/todos',
        { text: newTodo },
        { headers: { 'x-auth-token': token } }
      );

      // Fetch updated todos after creating a new one
      const response = await axios.get('/api/v1/todos', {
        headers: { 'x-auth-token': token },
      });
      setTodos(response.data);
      setNewTodo('');
    } catch (error) {
      console.error('Error creating todo:', error.response.data.message);
    }
  };

  const handleUpdateTodo = async (id, text, isCompleted) => {
    try {
      await axios.put(
        `/api/v1/todos/${id}`,
        { text, isCompleted },
        { headers: { 'x-auth-token': token } }
      );

      // Fetch updated todos after updating one
      const response = await axios.get('/api/v1/todos', {
        headers: { 'x-auth-token': token },
      });
      setTodos(response.data);
    } catch (error) {
      console.error('Error updating todo:', error.response.data.message);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`/api/v1/todos/${id}`, {
        headers: { 'x-auth-token': token },
      });

      // Fetch updated todos after deleting one
      const response = await axios.get('/api/v1/todos', {
        headers: { 'x-auth-token': token },
      });
      setTodos(response.data);
    } catch (error) {
      console.error('Error deleting todo:', error.response.data.message);
    }
  };

  return (
    <>
    <div className='add-todo'> 
    <h2>Add Your Todo</h2>
        <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        <button onClick={handleCreateTodo}>Add Todo</button>
      </div>
      <div className='todo-list'>
      <h2>Todo List</h2>
      <ul className='ul'>
        {todos.map((todo) => (
          <li key={todo._id}>
           
            <div>{todo.text}</div>
            <div className="checkbox"> <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={(e) => handleUpdateTodo(todo._id, todo.text, e.target.checked)}
            />
             <button onClick={() => handleDeleteTodo(todo._id)} className='delte'>Delete</button>
            </div>
           
          </li>
        ))}
      </ul>
      
    </div>
    </>

  );
};

export default TodoList;
