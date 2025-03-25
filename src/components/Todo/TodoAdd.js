import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import "./TodoAdd.css"

const AddTask = () => {
    const [newTask, setNewTask] = useState('');
    const [newDate, setNewDate] = useState(new Date());
    if (!localStorage.getItem('token')) {
      window.location.href = '/login';
    }
  
    // Добавление новой задачи
    const handleAddTask = async (e) => {
      e.preventDefault();
      if (newTask.trim() === '') return;
    
      try {
        const response = await axios.post(
          'https://enzosite.site/api/tasks',
          { name: newTask, endDate: newDate }, // Add endDate property to the request body
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        //setTasks([...tasks, response.data]); // Add the new task to the state
        setNewTask(''); // Clear the input field
        setNewDate(new Date()); // Reset the newDate state
      } catch (error) {
        console.error('Ошибка при добавлении задачи:', error);
      }
    };

    const handleBackToTasks = () => {
      window.location.href = "/tasks"
    }
  
    return (

      <div class="limiter1">
        <div class = "box1">
          <div class = "menu-container1">
            <button onClick={handleBackToTasks} type="button" className="logout-button1">
                      Вернуться обратно
            </button>
          </div>
          <div class = "list-container1">
            <div class = "list-name1">
              Добавление задачи
            </div>
              <form onSubmit={handleAddTask} class = "tasks-container1">
                <div class = "task-info-container1">
                  <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Новая задача"
                  />
                  <br/>
                  <div class = "add-text1">
                    Дата: 
                    <DatePicker selected={newDate} onChange={(date) => setNewDate(date)} dateFormat="dd/MM/yyyy"/>
                  </div>
                </div>
                <button type="submit" class = "task-edit-status-button1">Добавить</button>
              </form>
          </div>
        </div>
      </div>

      /*
      <div>
        <h1>Новая задача</h1>
  
        <form onSubmit={handleAddTask}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Новая задача"
          />
          <DatePicker selected={newDate} onChange={(date) => setNewDate(date)} dateFormat="dd/MM/yyyy"/>
          <button type="submit">Добавить</button>
        </form>
      </div> 
      */
    );
  };
  
  export default AddTask;
  