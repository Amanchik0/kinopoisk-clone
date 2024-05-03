import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addToWatch, logout, removeFromToWatch } from '../../features/user/userSlice';

const UserProfile = () => {
    const user = useSelector(state => state.user.currentUser);
    const watchList = useSelector(state => state.user.watchList);
    const films = useSelector(state => state.films.items);
    const genres = useSelector(state => state.genres.items); // Добавляем жанры из состояния
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const findFilmById = (filmId) => films.find(film => film.id === filmId);

    const toggleWatchList = (film) => { // Изменен аргумент с filmId на film
        if (watchList.some(item => item.id === film.id)) {
            dispatch(removeFromToWatch(film));
        } else {
            dispatch(addToWatch(film));
        }
    };
    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
      };
    return (
        <div className="container">
            <div className="main">
                <div className="main-categories">
                    <h3>Жанры</h3>
                    {genres.map(genre => (
                        <Link key={genre.key} to={`/?genres=${genre.key}`}>{genre.name}</Link>
                    ))}
                </div>
                <div className="main-content">
                    <h3>Профиль</h3>
                    <div className="profile">
                        <div className="profile-img">
                            <img src={user.image} alt="Profile" />
                        </div>
                        <div className="profile-info">
                            <p>Полное имя: {user.name}</p>
                            <p>E-mail: {user.email}</p>
                            {user.id === user.id && ( 
                                <>
                                    <Link to="/editProfile" className="profile-info-editButton">Редактировать профиль</Link>
                                    <button className='profile-info-exitButton ssss' onClick={handleLogout}>Выйти</button>


                                </>
                            )}
                        </div>
                    </div>
                    <h3>Сохраненные фильмы</h3>
                    {watchList.length > 0 ? watchList.map(film => (
                        <div key={film.id} className="main-card">
                            <div className="main-card-left">
                                <div className="main-film-img">
                                    <img src={film.imageUrl} alt={film.titleRus} />
                                </div>
                                <div className="main-film-info">
                                    <Link to={`/detail/${film.id}`}>{film.titleRus}</Link>
                                    <p>{film.titleEng}, {film.year}, {film.time} мин</p>
                                    <p>{film.genre.name}</p>
                                    <button className="main-card-info-button" onClick={() => toggleWatchList(film)}>
                                        Смотреть
                                    </button>
                                </div>
                            </div>
                            <div className="main-card-right">
                                <div className="main-card-right-rate">
                                    <p>7.3</p>
                                </div>
                                <button className="main-card-info-button" onClick={() => toggleWatchList(film)}>
                                    Сохранено
                                </button>
                            </div>
                        </div>
                    )) : <p>Нет сохраненных фильмов.</p>}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
