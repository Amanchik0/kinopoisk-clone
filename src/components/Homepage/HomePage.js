import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { addToWatch, removeFromToWatch } from '../../features/user/userSlice';
import { createSelector } from 'reselect';
import { initializeFilms } from '../../features/films/filmsSlice';
import { loadGenres } from '../../features/genres/genresSlice';
import Pagination from './Pagination';
import { paginate } from './paginate';
import './pagi.css'
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
  const location = useLocation();
  const genreId = new URLSearchParams(location.search).get('genres');
  const navigate = useNavigate();
  
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3; 
  
  useEffect(() => {
    const savedFilms = localStorage.getItem('films');
    if (savedFilms) {
      dispatch(initializeFilms(JSON.parse(savedFilms)));
    }
  }, [dispatch]);
  useEffect(() => {
    dispatch(loadGenres());
  }, [dispatch]);
  const toggleWatchList = (film) => {
    const isInWatchList = watchList.some(item => item.id === film.id);
    if (isInWatchList) {
      dispatch(removeFromToWatch(film));
    } else {
      dispatch(addToWatch(film));
    }
  };
  const handleResetFilter = () => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete('genres');
    navigate({
      pathname: location.pathname,
      search: searchParams.toString()
    });
  };

  // Функция для обработки смены страницы
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  return (
    <div className="container">
      <div className="main">
        <div className="main-categories">
          <h3>Жанры</h3>
          {genres && genres.map(genre => (
            <Link key={genre.id} to={`/?genres=${genre.id}`}>
              {genre.name}
            </Link>
          ))}
          <button className='main-card-info-button' onClick={handleResetFilter}>Сбросить фильтр</button>
        </div>
        <div className="main-content">
          <h3>Фильмы и сериалы</h3>
          {paginate(films, currentPage, pageSize) 
            .filter(item => !genreId || item.genre.id === parseInt(genreId))
            .map(item => (
              <div key={item.id} className="main-card">
                <div className="main-card-left">
                  <div className="main-film-img">
                    <img src={item.imageUrl} alt={item.titleRus} />
                  </div>
                  <div className="main-film-info">
                    <Link to={`/detail/${item.id}`}>{item.titleRus}</Link>
                    <span>{item.titleEng}, {item.year}, {item.time} мин</span>
                    <span> {item.genre.name}</span>
                    <button className="main-card-info-button" onClick={() => toggleWatchList(item)}>
                      {watchList.some(watchItem => watchItem.id === item.id) ? 'Удалить из списка' : 'Добавить в список'}
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
          {/* Добавляем компонент для отображения пагинации */}
          <Pagination
            itemsCount={films.filter(item => !genreId || item.genre.id === parseInt(genreId)).length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
