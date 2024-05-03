import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../features/user/userSlice';

const EditProfile = () => {
    const user = useSelector(state => state.user.currentUser);
    const [formData, setFormData] = useState({
        fullName: user.fullName,
        email: user.email,
        image: user.image || '',
        password: '',
        confirmPassword: ''
    });

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Пароли не совпадают!');
            return;
        }
        dispatch(updateUser(formData));
        localStorage.setItem('currentUser', JSON.stringify({ ...user, ...formData }));
        alert('Профиль обновлен!');
    };

    return (
        <div className="container">
            <div className="main">
                <form className="form" onSubmit={handleSubmit}>
                    <h3>Редактировать профиль</h3>
                    <fieldset className="fieldset">
                        <label>Полное имя</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Введите полное имя"
                        />
                        <label>E-mail</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Введите email"
                        />
                        <label>Изображение профиля</label>
                        <input
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="Ссылка на изображение"
                        />
                    </fieldset>
                    <fieldset className="fieldset">
                        <label>Новый пароль</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Введите новый пароль"
                        />
                        <label>Подтвердите пароль</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Подтвердите новый пароль"
                        />
                    </fieldset>
                    <fieldset className="fieldset">
                        <button type="submit">Сохранить изменения</button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
