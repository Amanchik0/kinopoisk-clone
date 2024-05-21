import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteFilm, loadFilms } from '../../features/films/filmsSlice';
import { logout } from '../../features/user/userSlice';
import { RootState, AppDispatch } from '../../app/store';

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
          {genres.map(genre => (
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
          {films.map(film => (
            <div key={film.id} className="film">
              <h4>{film.titleRus}</h4>
              <button onClick={() => handleDelete(film.id)}>Удалить</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
