import React, { Component } from 'react';
import { Link, NavigateFunction } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { logout, addToWatch, removeFromToWatch } from '../../features/user/userSlice';
import { Film, Genre, User } from '../../app/types';

interface UserProfileProps extends PropsFromRedux {
  navigate: NavigateFunction;
}

class UserProfile extends Component<UserProfileProps> {
  handleLogout = () => {
    const { logout, navigate } = this.props;
    logout();
    navigate('/');
  };

  toggleWatchList = (film: Film) => {
    const { watchList, addToWatch, removeFromToWatch } = this.props;
    if (watchList.some(item => item.id === film.id)) {
      removeFromToWatch(film);
    } else {
      addToWatch(film);
    }
  };

  render() {
    const { user, watchList, films, genres } = this.props;

    if (!user) {
      return <div>Пользователь не найден</div>;
    }

    return (
      <div className="container">
        <div className="main">
          <div className="main-categories">
            <h3>Жанры</h3>
            {genres.map(genre => (
              <Link key={genre.id} to={`/?genres=${genre.id}`}>{genre.name}</Link>
            ))}
          </div>
          <div className="main-content">
            <h3>Профиль</h3>
            <div className="profile">
              <div className="profile-img">
                <img src={user.image || ''} alt="Profile" />
              </div>
              <div className="profile-info">
                <p>Полное имя: {user.fullName}</p>
                <p>E-mail: {user.email}</p>
                {user.id === user.id && (
                  <>
                    <Link to="/editProfile" className="profile-info-editButton">Редактировать профиль</Link>
                    <button className="profile-info-exitButton" onClick={this.handleLogout}>Выйти</button>
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
                    <button className="main-card-info-button" onClick={() => this.toggleWatchList(film)}>
                      Смотреть
                    </button>
                  </div>
                </div>
                <div className="main-card-right">
                  <div className="main-card-right-rate">
                    <p>{film.averageRating ? film.averageRating.toFixed(1) : 'N/A'}</p>
                  </div>
                  <button className="main-card-info-button" onClick={() => this.toggleWatchList(film)}>
                    Сохранено
                  </button>
                </div>
              </div>
            )) : <p>Нет сохраненных фильмов.</p>}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  user: state.user.currentUser,
  watchList: state.user.watchList,
  films: state.films.items,
  genres: state.genres.items,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  logout: () => dispatch(logout()),
  addToWatch: (film: Film) => dispatch(addToWatch(film)),
  removeFromToWatch: (film: Film) => dispatch(removeFromToWatch(film)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(UserProfile);
