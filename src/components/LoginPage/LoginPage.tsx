import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../../app/store';

const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const error = useSelector((state: RootState) => state.user.error);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }
    await dispatch(login({ email, password })).unwrap();
    if (isAuthenticated) {
      navigate('/');
    } else {
      alert('Ошибка входа');
    }
  };

  return (
    <div className="container">
      <div className="main">
        <form onSubmit={handleLogin} className="form">
          <h3>Войти</h3>
          <fieldset className="fieldset">
            <label>E-mail</label>
            <input
              type="email"
              placeholder="Введите почту"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </fieldset>
          <fieldset className="fieldset">
            <label>Пароль</label>
            <input
              type="password"
              placeholder="Введите пароль"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="fieldset">Войти</button>
          </fieldset>
          <p>У вас нет аккаунта? <a href="/register">Зарегистрироваться</a></p>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
