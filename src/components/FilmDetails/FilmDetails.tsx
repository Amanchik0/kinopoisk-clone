import React, { Component } from 'react';
import { useParams, Link, NavigateFunction } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { addToWatch, removeFromToWatch } from '../../features/user/userSlice';
import { addCommentToFilm, initializeFilms } from '../../features/films/filmsSlice';
import CommentForm from '../Comment/CommentForm';
import CommentList from '../Comment/CommentList';
import { Genre, Film, User, Comment } from '../../app/types';

interface FilmDetailProps extends PropsFromRedux {
  navigate: NavigateFunction;
  filmId: string;
}

interface FilmDetailState {
  isInWatchList: boolean;
}

class FilmDetail extends Component<FilmDetailProps, FilmDetailState> {
  constructor(props: FilmDetailProps) {
    super(props);
    this.state = {
      isInWatchList: false,
    };
  }

  componentDidMount() {
    const { watchList, filmId, dispatch } = this.props;
    if (watchList.some(item => item.id.toString() === filmId)) {
      this.setState({ isInWatchList: true });
    }

    const savedFilms = localStorage.getItem('films');
    if (savedFilms) {
      dispatch(initializeFilms(JSON.parse(savedFilms)));
    }
  }

  toggleWatchList = () => {
    const { film, addToWatch, removeFromToWatch } = this.props;
    const { isInWatchList } = this.state;
    if (film) {
      if (isInWatchList) {
        removeFromToWatch(film);
        this.setState({ isInWatchList: false });
      } else {
        addToWatch(film);
        this.setState({ isInWatchList: true });
      }
    }
  };

  render() {
    const { film, user, rates } = this.props;
    const { isInWatchList } = this.state;

    if (!film) {
      return <div>Фильм не найден</div>;
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
              <button className="main-card-info-button" onClick={this.toggleWatchList}>
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
  }
}

const mapStateToProps = (state: RootState, ownProps: { filmId: string }) => {
  const film = state.films.items.find(f => f.id.toString() === ownProps.filmId);
  const rates = film ? film.comments : [];
  return {
    film,
    user: state.user.currentUser,
    watchList: state.user.watchList,
    rates,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  addToWatch: (film: Film) => dispatch(addToWatch(film)),
  removeFromToWatch: (film: Film) => dispatch(removeFromToWatch(film)),
  dispatch,
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(FilmDetail);
