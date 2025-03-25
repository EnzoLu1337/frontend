import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./TodoList.css"

const UserTasks = () => {
  const [tasks, setTasks] = useState([]);

  // Получение задач с бэкенда
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      window.location.href = '/login';
    }
    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://enzosite.site/api/tasks', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setTasks(response.data);
      } catch (error) {
        console.error('Ошибка при получении задач:', error);
      }
    };

    fetchTasks();
  }, []);

  // Удаление задачи
  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`https://enzosite.site/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTasks(tasks.filter((task) => task.id !== id)); // Удаляем задачу из состояния
    } catch (error) {
      console.error('Ошибка при удалении задачи:', error);
    }
  };

  // Изменение статуса задачи
  const handleToggleStatus = async (id, status) => {
    try {
      const response = await axios.put(
        `https://enzosite.site/api/tasks/${id}`,
        { completed: !status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setTasks(
        tasks.map((task) => (task.id === id ? { ...task, completed: response.data.completed } : task))
      );
    } catch (error) {
      console.error('Ошибка при изменении статуса задачи:', error);
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirect to login page
  };

  const handleAccMan = () => {
    window.location.href = '/account-management';
  }

  const handleAddTask = () => {
    window.location.href = '/tasks/add';
  };

  return (

    <div class="limiter">
      
      <div class = "box">
        <div class = "menu-container">
        <button onClick={handleLogout} type="button" class="logout-button">
           Выйти из аккаунта
        </button>
        <br/>
        <button onClick={handleAccMan} type="button" class="acc-button">
          Управление аккаунтом
        </button>
        <button onClick={handleAddTask} type="button" className="taskadd-button">
        <img src="https://cdn.icon-icons.com/icons2/2761/PNG/512/plus_insert_add_rectangle_icon_176436.png" class = "icon-add"></img>
                  Добавить задачу
        </button>
        </div>
      <div class = "list-container">
      <div class = "list-name">
            Ваши задачи
      </div>
      <div class = "tasks-container">
            {tasks.map((task) => (
              <li class = "task-container" key={task.id}>
                <div class = "task-info-container">
                <span
                  class = "task-text"
                  style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                >
                  {task.name}
                </span>
                <div 
                  class={`task-status-container ${task.completed ? 'completed' : 'not-completed'}`}
                >
                  <div class = "task-status-text">
                    {task.completed ? 'Выполнена' : 'Не выполнена'}
                  </div>
                </div>
                <br/>
                <label for="date">Дата:{task.end_date} </label>
                <br/>
                </div>
                <div class = "task-button-container">
                <button type="button" class ="task-edit-status-button" onClick={() => handleToggleStatus(task.id, task.completed)}>
                  Изменить статус
                </button>
                <button type="button" class ="task-delete-button" onClick={() => handleDeleteTask(task.id)}>
                  Удалить
                </button>
                </div>
              </li>
            ))}
            </div>
      </div>
      </div>
    </div>
  );
};

export default UserTasks;
