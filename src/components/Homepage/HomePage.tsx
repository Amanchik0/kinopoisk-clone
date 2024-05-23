import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { addToWatch, removeFromToWatch } from '../../features/user/userSlice';
import { createSelector } from 'reselect';
import { loadFilms, initializeFilms } from '../../features/films/filmsSlice';
import { loadGenres } from '../../features/genres/genresSlice';
import Pagination from './Pagination';
import { paginate } from './paginate';
import './pagi.css';
import { RootState } from '../../app/store';

interface Genre {
  id: number;
  name: string;
}

interface Film {
  id: number;
  titleRus: string;
  titleEng: string;
  year: string;
  time: string;
  genre: Genre;
  imageUrl: string;
  averageRating?: number; 
}

const selectGenres = createSelector(
  [(state: RootState) => state.genres.items],
  genres => genres
);

const selectFilms = createSelector(
  [(state: RootState) => state.films.items],
  films => films
);

const selectWatchList = createSelector(
  [(state: RootState) => state.user.watchList],
  watchList => watchList
);

const HomePage: React.FC = () => {
  const genres = useSelector(selectGenres);
  const films = useSelector(selectFilms);
  const watchList = useSelector(selectWatchList);
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
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
    } else {
      dispatch(loadFilms());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadGenres());
  }, [dispatch]);

  const toggleWatchList = (film: Film) => {
    if (!isAuthenticated) {
      alert('Вы должны войти в систему, чтобы добавлять фильмы в список.');
      return;
    }
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

  const handlePageChange = (pageNumber: number) => {
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
            .filter((item: Film) => !genreId || item.genre.id === parseInt(genreId))
            .map((item: Film) => (
              <div key={`${item.id}-${item.titleEng}`} className="main-card">
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
                    <p>{item.averageRating ? item.averageRating.toFixed(1) : 'Нет рейтинга'}</p>
                  </div>
                </div>
              </div>
            ))}
          <Pagination
            itemsCount={films.filter((item: Film) => !genreId || item.genre.id === parseInt(genreId)).length}
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
