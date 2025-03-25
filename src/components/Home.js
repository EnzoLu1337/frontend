// src/components/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';


const Home = () => {

  const navigate = useNavigate(); // Используем хук для перенаправления

  const handleLogin = () => {
    navigate('/login');
  };
  const handleRegister = () => {
    navigate('/register');
  };


  return (
    <div className="limiter">
      <div class="container-home">
        <div class = "wrap-home">
          <span class="home-title">
            Добро пожаловать 
            <br/>в To-do приложение
          </span>
          <div class="text-center">
              <span class="txt1">
                Это приложение поможет вам управлять вашими задачами и повышать продуктивность.
              </span>
              <br/>
              <a class="txt2">
                Чтобы начать, пожалуйста, зарегистрируйтесь или войдите в свою учетную запись.
              </a>
            </div>
            <div class="container-home-form-btn">
              <div class="wrap-home-form-btn">
                <div class="home-form-login"></div>
                <button type="button" onClick={handleLogin} className="home-form-btn">
                  Вход
                </button>
              </div>
            </div>
            <div class="container-home-form-btn">
              <div class="wrap-home-form-btn">
                <div class="home-form-reg"></div>
                <button type="button" onClick={handleRegister} className="home-form-btn">
                  Регистрация
                </button>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Home;
