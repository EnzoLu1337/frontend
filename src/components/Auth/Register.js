// src/components/Auth/Register.js
import React, { useCallback } from 'react';
import { Formik, Form, useField } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import "./Register.css";
import "../../resource/fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "../../resource/fonts/iconic/css/material-design-iconic-font.min.css";
import "../../resource/vendor/animate/animate.css";
import "../../resource/vendor/css-hamburgers/hamburgers.min.css";
import "../../resource/vendor/animsition/css/animsition.min.css";
import "../../resource/vendor/select2/select2.min.css";
import "../../resource/vendor/daterangepicker/daterangepicker.css";
import "../../resource/css/util.css";
import "../../resource/css/main.css";

const validationSchema = yup.object().shape({
  username: yup.string().required('Имя пользователя является обязательным'),
  password: yup
    .string()
    .min(8, 'Минимальная длина пароля 8 символов')
    .required('Пароль является обязательным'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Пароли не совпадают')
    .required('Подтверждение пароля является обязательным'),
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

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = useCallback(async (values, { setSubmitting, setFieldError }) => {
    try {
      await axios.post('https://enzosite.site/api/register', {
        username: values.username,
        password: values.password,
      });

      // Перенаправление после успешной регистрации
      navigate('/login');
    } catch (error) {
      // Обработка ошибки регистрации
      if (error.response && error.response.data) {
        setFieldError('username', error.response.data);
      } else {
        setFieldError('username', 'Registration failed. Please try again later.');
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
            initialValues={{ username: '', password: '', confirmPassword: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isValid, isSubmitting }) => (
              <Form class="login100-form validate-form">
                <span class="login100-form-title p-b-26">Регистрация</span>

                <ExampleField label="Имя пользователя" name="username" />
                <ExampleField label="Пароль" name="password" type="password" />
                <ExampleField label="Подтверждение пароля" name="confirmPassword" type="password" />

                <div class="container-reg-form-btn">
                  <div class="wrap-reg-form-btn">
                    <div class="reg-form-reg"></div>
                    <button type="submit" className="reg-form-btn" disabled={!isValid || isSubmitting}>
                      Зарегистрироваться
                    </button>
                </div>
            </div>
              </Form>
            )}
          </Formik>

          <div class="text-center p-t-115">
            <span class="txt1">Есть аккаунт?</span>
            <a class="txt2" href="/login">Аутентификация</a>
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

export default Register;
