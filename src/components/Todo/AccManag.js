import React from 'react';
import axios from 'axios';
import { Formik, Form, useField } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

import "./AccManag.css";
import "../../resource/css/util.css";
import "../../resource/css/main.css";

// Валидация для смены пароля
const passwordValidationSchema = yup.object().shape({
  oldPassword: yup.string().required('Введите текущий пароль'),
  newPassword: yup.string().required('Введите новый пароль').min(6, 'Пароль должен содержать минимум 6 символов'),
});

const PasswordField = ({ name, placeholder }) => {
  const [field, meta] = useField(name);
  return (
    <div className="passwd-container">
      <input className="input100" type="password" placeholder={placeholder} {...field} />
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </div>
  );
};

const UserTasks = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleTask = () => {
    navigate('/tasks');
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.delete('https://enzosite.site/api/deleteacc', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      localStorage.removeItem('token');
      navigate('/register');
    } catch (error) {
      console.error('Ошибка при удалении аккаунта:', error);
      alert('Не удалось удалить аккаунт');
    }
  };

  return (
    <div className="limiter">
      <div className="box">
        <div className="menu-container">
          <button onClick={handleLogout} type="button" className="logout-button">
            Выйти из аккаунта
          </button>
          <br />
          <button onClick={handleTask} type="button" className="acc-button">
            Вернуться обратно
          </button>
        </div>
        
        <div className="list-container">
          <div className="list-name">Управление аккаунтом</div>
          <div className="tasks-container">
            <h3>Изменение пароля</h3>
            <Formik
              initialValues={{ oldPassword: '', newPassword: '' }}
              validationSchema={passwordValidationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  await axios.put('https://enzosite.site/api/editpasswd', {
                    oldPasswd: values.oldPassword,
                    newPasswd: values.newPassword,
                  }, {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                  });
                  alert('Пароль успешно изменен');
                } catch (error) {
                  console.error('Ошибка при изменении пароля:', error);
                  alert('Не удалось изменить пароль');
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <PasswordField name="oldPassword" placeholder="Текущий пароль" />
                  <PasswordField name="newPassword" placeholder="Новый пароль" />
                  <button type="submit" class="editpasswd-button" disabled={isSubmitting}>
                    Сменить пароль
                  </button>
                </Form>
              )}
            </Formik>

            <div className="account-deletion">
              <button onClick={handleDeleteAccount} className="deleteacc-button">
                Удалить аккаунт
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTasks;
