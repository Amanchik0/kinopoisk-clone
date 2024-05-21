import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteFilm, loadFilms } from '../../features/films/filmsSlice';
import { logout } from '../../features/user/userSlice';
import { RootState, AppDispatch } from '../../app/store';
import { Genre, Film, User } from '../../app/types';

const AdminProfile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { genres, films, user } = useSelector((state: RootState) => ({
    genres: state.genres.items || [],
    films: state.films.items || [],
    user: state.user.currentUser
  }));
  const navigate = useNavigate();

  useEffect(() => {
    if (!films.length) {
      dispatch(loadFilms());
    }
  }, [dispatch, films.length]);

  const handleDelete = (filmId: number) => {
    dispatch(deleteFilm(filmId));
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
          {genres.map((genre: Genre) => (
            <Link key={genre.id} to={`/${genre.id}`}>{genre.name}</Link>
          ))}
        </div>
        <div className="main-content">
          <h3>Профиль</h3>
          <div className="profile">
            <div className="profile-img">
              <img src={user?.image || ''} alt="Profile" />
            </div>
            <div className="profile-info">
              <p><span>Полное имя: </span> {user?.fullName}</p>
              <p><span>E-mail: </span> {user?.email}</p>
              <Link to="/editprofile" className="profile-info-editButton">Редактировать профиль</Link>
              <button onClick={handleLogout} className="profile-info-exitButton">Выход</button>
            </div>
          </div>
          <h3>Фильмы</h3>
          <Link to='/addfilm' className="add-button">Добавить фильм</Link>
          <Link to='/addganre' className='add-button'>Добавить жанр</Link>
          {films.map((item: Film) => (
            <div key={item.id} className="main-card">
              <div className="main-card-left">
                <div className="main-film-img">
                  <img src={item.imageUrl} alt={item.titleRus} />
                </div>
                <div className="main-film-info">
                  <Link to={`/detail/${item.id}`}>{item.titleRus}</Link>
                  <p>{item.titleEng}, {item.year}, {item.time} мин</p>
                  <p> {item.genre?.name}</p>
                  <button className="main-card-info-button">
                    Смотреть
                  </button>
                </div>
              </div>
              <div className="main-card-right">
                <div className="main-card-right-rate">
                  <p>{item.averageRating ? item.averageRating.toFixed(1) : 'N/A'}</p>
                </div>
                <div className="main-film-buttons">
                  <Link to={`/edit/${item.id}`}>Редактировать</Link>
                  <button className="profile-info-exitButton" onClick={() => handleDelete(item.id)}>
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
