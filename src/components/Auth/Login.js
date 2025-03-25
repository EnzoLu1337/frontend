// src/components/Auth/Login.js
import React, { useCallback, useEffect } from 'react';
import { Formik, Form, useField } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import "./Login.css";
import "../../resource/fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "../../resource/fonts/iconic/css/material-design-iconic-font.min.css";
import "../../resource/vendor/animate/animate.css";
import "../../resource/vendor/css-hamburgers/hamburgers.min.css";
import "../../resource/vendor/animsition/css/animsition.min.css";
import "../../resource/vendor/select2/select2.min.css";
import "../../resource/vendor/daterangepicker/daterangepicker.css";
import "../../resource/css/util.css";
import "../../resource/css/main.css";

// Определение схемы валидации с использованием Yup
const validationSchema = yup.object().shape({
  username: yup.string().required('Имя пользователя является обязательным'),
  password: yup.string().required('Пароль является обязательным'),
});

const ExampleField = ({ name, label, type = "text" }) => {
  const [field, meta] = useField(name);

  return (
    <div>
      {meta.error && meta.touched && (
        <div className="error">{meta.error}</div>
      )}
      <div class="wrap-input100 validate-input">
      <input
        class="input100"
        type={type}
        placeholder={label}
        {...field}
      />
      </div>
    </div>
  );
};

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/tasks');
    }
  }, [navigate]);

  const handleSubmit = useCallback(async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await axios.post('https://enzosite.site/api/login', {
        username: values.username,
        password: values.password,
      });

      // Сохраняем JWT токен в localStorage
      localStorage.setItem('token', response.data.token);

      // Перенаправляем пользователя на страницу с задачами
      navigate('/tasks');
    } catch (error) {
      // Обработка ошибки входа
      if (error.response && error.response.data) {
        setFieldError('username', 'Пользователя с таким username и паролем не существует!');
      } else {
        setFieldError('username', 'Ошибка входа. Пожалуйста, попробуйте снова.');
      }
    } finally {
      setSubmitting(false);
    }
  }, [navigate]);

  return (
    <div class="limiter">
      <div class="container-login100">
        <div class="wrap-login100">
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isValid, isSubmitting }) => (
              <Form class="login100-form validate-form">
                <span class="login100-form-title p-b-26">Аутентификация</span>

                <ExampleField label="Имя пользователя" name="username" />
                <ExampleField label="Пароль" name="password" type="password" />

                <div class="container-login100-form-btn">
                  <div class="wrap-login100-form-btn">
                    <div class="login100-form-bgbtn"></div>
                    <button type="submit" class="login100-form-btn" disabled={!isValid || isSubmitting}>
                      Войти
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>

          <div class="text-center p-t-115">
            <span class="txt1">Нет аккаунта?</span>
            <a class="txt2" href="/register">Регистрация</a>
            <br />
            <button type="button" onClick={() => navigate('/')} className="home-button">
              Домашняя страница
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
