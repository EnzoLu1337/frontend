// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Home from './components/Home';
import UserTasks from './components/Todo/TodoList';
import AddTask from './components/Todo/TodoAdd';
import AccManag from './components/Todo/AccManag';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tasks" element={<UserTasks />} />
        <Route path="/tasks/add" element={<AddTask />} />
        <Route path="/account-management" element={<AccManag />} />
      </Routes>
    </Router>
  );
}

export default App;
