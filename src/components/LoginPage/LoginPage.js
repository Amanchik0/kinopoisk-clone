import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const error = useSelector(state => state.user.error);
    const user = useSelector (state =>state.user)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert("Please enter both email and password");
            return;
        }
        await dispatch(login({ email: email, password }));
        if (isAuthenticated) {
            navigate('/');
            console.log(user);
            console.log(isAuthenticated);
            // localStorage.setItem('user', JSON.stringify(user));
            // localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
            
        } else {
            alert('error');
        }
    };


    return (
        <div className="container">
            <div className="main">
                <form onSubmit={handleLogin} className="form">
                    <h3>Войти</h3>
                    <fieldset className="fieldset">
                        <label>E-mail</label>
                        <input type="email" placeholder="Введите почту" 
                            name="email" value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </fieldset>
                    <fieldset className="fieldset">
                        <label>Пароль</label>
                        <input type="password" placeholder="Введите пароль" 
                            name="password" value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                        <button type="submit" className="fieldset">Войти</button>
                    </fieldset>
                    <p>У вас нету аккаунта? <a href="/register">Зараегистрироваться</a></p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
