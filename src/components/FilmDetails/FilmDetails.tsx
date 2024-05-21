import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToWatch, removeFromToWatch } from '../../features/user/userSlice';
import { addCommentToFilm, initializeFilms } from '../../features/films/filmsSlice';
import CommentForm from '../Comment/CommentForm';
import CommentList from '../Comment/CommentList';
import { RootState, AppDispatch } from '../../app/store';

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
  comments: Comment[];
  linkForTrailer?: string;
}

interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  image?: string;
  isAdmin: boolean;
}

interface Comment {
  author: string;
  text: string;
  rate: number;
}

const FilmDetail: React.FC = () => {
  const { filmId } = useParams<{ filmId: string }>();
  const films = useSelector((state: RootState) => state.films.items);
  const user = useSelector((state: RootState) => state.user.currentUser);
  const watchList = useSelector((state: RootState) => state.user.watchList);
  const dispatch = useDispatch<AppDispatch>();
  const film = films.find(f => f.id.toString() === filmId);
  const rates = film ? film.comments : [];

  const [isInWatchList, setIsInWatchList] = useState(false);

  useEffect(() => {
    if (watchList.some(item => item.id.toString() === filmId)) {
      setIsInWatchList(true);
    }
  }, [watchList, filmId]);

  useEffect(() => {
    const savedFilms = localStorage.getItem('films');
    if (savedFilms) {
      dispatch(initializeFilms(JSON.parse(savedFilms)));
    }
  }, [dispatch]);

  const toggleWatchList = () => {
    if (film) {
      if (isInWatchList) {
        dispatch(removeFromToWatch(film));
        setIsInWatchList(false);
      } else {
        dispatch(addToWatch(film));
        setIsInWatchList(true);
      }
    }
  };

  if (!film) {
    return <div>Film not found</div>;
  }

  return (
    <div className="container">
      <div className="main-detail">
        <div className="detail">
          <div className="main-film-image">
            <img src={film.imageUrl} alt="" />
          </div>
          <div className="main-film-info-detail">
            <h2>{film.titleRus}, {film.year}</h2>
            <p>{film.titleEng}</p>
            <button className="main-card-info-button" onClick={toggleWatchList}>
              {isInWatchList ? 'Удалить из списка' : 'Добавить в список'}
            </button>
            <h4>О фильме</h4>
            <div className='main-film-details'>
              <p>Год производства</p>
              <p>{film.year}</p>
            </div>
            <div className='main-film-details'>
              <p>Жанр</p>
              <p>{film.genre.name}</p>
            </div>
            <div className='main-film-details'>
              <p>Время</p>
              <p>{film.time} мин</p>
            </div>
            <div className='main-film-details'>
              <p>Рейтинг</p>
              {/* <p>{film.averageRate}</p> */}
              {/* надо будет чуть позже написать  */}
            </div>
          </div>
        </div>
        {film.linkForTrailer && (
          <div className="main-film-player">
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${film.linkForTrailer}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
        <div className="coments">
          <h3>Комментарий</h3>
          <CommentForm filmId={film.id} />
          <CommentList rates={rates || []} />
        </div>
      </div>
    </div>
  );
};

export default FilmDetail;
