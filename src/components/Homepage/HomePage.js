import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToWatch, removeFromToWatch } from '../../features/user/userSlice';
import { createSelector } from 'reselect';
import { initializeFilms } from '../../features/films/filmsSlice';

const selectGenres = createSelector(
  [state => state.genres.items],
  genres => genres
);

const selectFilms = createSelector(
  [state => state.films.items],
  films => films
);

const selectWatchList = createSelector(
  [state => state.user.watchList],
  watchList => watchList
);

const HomePage = () => {
  const genres = useSelector(selectGenres);
  const films = useSelector(selectFilms);
  const watchList = useSelector(selectWatchList);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedFilms = localStorage.getItem('films');
    if (savedFilms) {
      const filmsData = JSON.parse(savedFilms);
    console.log('Загруженные фильмы:', filmsData);
      dispatch(initializeFilms(JSON.parse(savedFilms)));
    }
  }, [dispatch]);

  const toggleWatchList = (id) => {
    console.log(id);
    
    const isInWatchList = watchList.includes(id);
    if (isInWatchList) {
      dispatch(removeFromToWatch(id));
    } else {
      dispatch(addToWatch(id));
    }
  };
  
  console.log(genres);
console.log(watchList);
  
  return (
    <div className="container">
      <div className="main">
        <div className="main-categories">
          <h3>Жанры</h3>
          {genres && genres.map(genre => (
            <Link key={genre.key} to={`/?genres=${genre.key}`}>{genre.name}</Link>
          ))}
        </div>
        <div className="main-content">
          <h3>Фильмы и сериалы</h3>
          {films && films.map(item => (
            <div key={item.id} className="main-card">
              <div className="main-card-left">
                <div className="main-film-img">
                  <img src={item.image} alt={item.titleRus} />
                </div>
                <div className="main-film-info">
                  <Link to={`/detail/${item.id}`}>{item.titleRus}</Link>
                  <span>{item.titleEng}, {item.year}, {item.time} мин</span>
                  <span> {item.genre.name}</span>
                  <button className="main-card-info-button" onClick={() => toggleWatchList(item.id)}>
                    {watchList.includes(item.id) ? 'Удалить из списка' : 'Добавить в список'}
                  </button>
                </div>
              </div>
              <div className="main-card-right">
                <div className="main-card-right-rate">
                  <p>7.3</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
