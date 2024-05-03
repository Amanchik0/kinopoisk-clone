import React from 'react';
import { useSelector } from 'react-redux';

const AdminProfile = () => {
    const user = useSelector(state => state.user.currentUser);

    if (!user) {
        return <p>Загрузка...</p>;
    }

    return (
        <div className="admin-profile">
            <h1>Административный профиль</h1>
            <p>Имя: {user.name}</p>
            <p>Email: {user.email}</p>
            <h2>Административные функции</h2>
            {/* Ссылки или кнопки для управления пользователями, контентом и т.д. */}
        </div>
    );
};

export default AdminProfile;