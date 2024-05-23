import React, { Component, ChangeEvent, FormEvent, createRef, RefObject } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { addFilm, initializeFilms } from '../../features/films/filmsSlice';
import { Genre, Film } from '../../app/types';

interface AddFilmProps extends PropsFromRedux {}

interface AddFilmState {
  filmData: Partial<Film>;
  message: string;
}

class AddFilm extends Component<AddFilmProps, AddFilmState> {
  private imageUrlRef: RefObject<HTMLInputElement>;

  constructor(props: AddFilmProps) {
    super(props);
    this.state = {
      filmData: {
        titleRus: '',
        titleEng: '',
        year: '',
        time: '',
        linkForTrailer: '',
        genre: {} as Genre,
        imageUrl: ''
      },
      message: ''
    };

    this.imageUrlRef = createRef<HTMLInputElement>();
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const savedFilms = localStorage.getItem('films');
    if (savedFilms) {
      dispatch(initializeFilms(JSON.parse(savedFilms)));
    }
  }

  componentDidUpdate(prevProps: AddFilmProps) {
    const { films } = this.props;
    if (prevProps.films !== films) {
      localStorage.setItem('films', JSON.stringify(films));
    }
  }

  handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    const { genres } = this.props;
    if (name === 'genre') {
      const genre = genres.find(g => g.id.toString() === value);
      this.setState(prevState => ({
        filmData: {
          ...prevState.filmData,
          genre: genre!
        }
      }));
    } else {
      this.setState(prevState => ({
        filmData: {
          ...prevState.filmData,
          [name]: value
        }
      }));
    }
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { addFilm } = this.props;
    const { filmData } = this.state;

    if (!filmData.titleRus || !filmData.titleEng || !filmData.genre) {
      this.setState({ message: 'Пожалуйста, заполните все обязательные поля.' });
      return;
    }

    addFilm({
      id: Date.now(), 
      ...filmData
    } as Film);

    this.setState({ message: 'Фильм успешно добавлен!' });
    setTimeout(() => this.setState({ message: '' }), 3000); 
    this.setState({
      filmData: {
        titleRus: '',
        titleEng: '',
        year: '',
        time: '',
        linkForTrailer: '',
        genre: {} as Genre,
        imageUrl: ''
      }
    });

    if (this.imageUrlRef.current) {
      this.imageUrlRef.current.value = '';
    }
  };

  render() {
    const { filmData, message } = this.state;
    const { genres } = this.props;

    return (
      <div className="container">
        <div className="main">
          <form onSubmit={this.handleSubmit} className="form">
            <h3>Новый фильм</h3>
            <fieldset className="fieldset">
              <label>URL картинки фильма</label>
              <input type="text" name="imageUrl" ref={this.imageUrlRef} value={filmData.imageUrl} onChange={this.handleChange} placeholder="Введите URL изображения" />
            </fieldset>
            <fieldset className="fieldset">
              <label>Название фильма на русском *</label>
              <input type="text" name="titleRus" value={filmData.titleRus} onChange={this.handleChange} placeholder="Введите название фильма на русском" required />
            </fieldset>
            <fieldset className="fieldset">
              <label>Название фильма на английском *</label>
              <input type="text" name="titleEng" value={filmData.titleEng} onChange={this.handleChange} placeholder="Введите название фильма на английском" required />
            </fieldset>
            <fieldset className="fieldset">
              <label>Год выпуска</label>
              <input type="text" name="year" value={filmData.year} onChange={this.handleChange} placeholder="Введите год выпуска фильма" />
            </fieldset>
            <fieldset className="fieldset">
              <label>Длительность фильма</label>
              <input type="text" name="time" value={filmData.time} onChange={this.handleChange} placeholder="Введите длительность фильма" />
            </fieldset>
            <fieldset className="fieldset">
              <label>Ссылка на трейлер</label>
              <input type="text" name="linkForTrailer" value={filmData.linkForTrailer} onChange={this.handleChange} placeholder="Введите ссылку на трейлер" />
            </fieldset>
            <fieldset className="fieldset">
              <label>Жанр фильма *</label>
              <select name="genre" value={filmData.genre?.id?.toString() || ''} onChange={this.handleChange} required>
                <option value="">Выберите жанр</option>
                {genres.map(genre => (
                  <option key={genre.id} value={genre.id.toString()}>{genre.name}</option>
                ))}
              </select>
            </fieldset>
            <fieldset className="fieldset">
              <button type="submit" className="fieldset-button">Добавить</button>
              {message && <div className="message">{message}</div>}
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  films: state.films.items,
  genres: state.genres.items,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  addFilm: (film: Film) => dispatch(addFilm(film)),
  dispatch,
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AddFilm);
