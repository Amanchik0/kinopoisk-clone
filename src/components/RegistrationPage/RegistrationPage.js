import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
    const dispatch = useDispatch();
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const navigate = useNavigate();
    const handleAuth = (e) => {
        e.preventDefault();
        if (!username || !password || !email || !fullName || !confirmPassword) {
            alert("Please fill in all fields");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        dispatch(register({ username, password, email, fullName }));
        navigate('/login')
    };

    return (
        <div className="container">
            <div className="main">
                <form onSubmit={handleAuth} className="form">
                    <h3>Регистрация</h3>
                    <fieldset className="fieldset">
                        <label>E-mail</label>
                        <input type="email" placeholder="Введите почту" 
                            name="email" value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </fieldset>
                    <fieldset className="fieldset">
                        <label>Полное имя</label>
                        <input type="text" placeholder="Введите полное имя" 
                            name="full_name" value={fullName}
                            onChange={(e) => setFullName(e.target.value)} />
                    </fieldset>
                    <fieldset className="fieldset">
                        <label>Имя пользователя</label>
                        <input type="text" placeholder="Введите никнейм" 
                            name="username" value={username}
                            onChange={(e) => setUserName(e.target.value)} />
                    </fieldset>
                    <fieldset className="fieldset">
                        <label>Пароль</label>
                        <input type="password" placeholder="Введите пароль" 
                            name="password" value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </fieldset>
                    <fieldset className="fieldset">
                        <label>Подтвердите пароль</label>
                        <input type="password" placeholder="Подтвердите пароль" 
                            name="re_password" value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} />
                        <button type="submit" className="fieldset">Зарегистрироваться</button>
                    </fieldset>
                    <p>У вас уже есть аккаунт? <a href="/login">Войти</a></p>
                </form>
            </div>
        </div>
    );
};

export default RegistrationPage;
