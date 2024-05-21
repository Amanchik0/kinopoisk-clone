import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../features/user/userSlice';
import { AppDispatch } from '../../app/store';

const RegistrationPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: ''
  });
  const [error, setError] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await dispatch(register(formData)).unwrap();
    } catch (err) {
      setError('Ошибка регистрации.');
    }
  };

  return (
    <div className="container">
      <div className="main">
        <form onSubmit={handleSubmit} className="form">
          <h3>Регистрация</h3>
          {error && <div className="error">{error}</div>}
          <fieldset className="fieldset">
            <label>Логин</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Введите логин"
              required
            />
            
          </fieldset>
          <fieldset className="fieldset">
            <label>Полное имя</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Введите полное имя"
              required
            />
          </fieldset>
          <fieldset className="fieldset">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Введите email"
              required
            />
          </fieldset>
          <fieldset className="fieldset">
            <label>Пароль</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Введите пароль"
              required
            />
          </fieldset>
          
          <fieldset className="fieldset">
            <button type="submit" className="fieldset-button">Регистрация</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
