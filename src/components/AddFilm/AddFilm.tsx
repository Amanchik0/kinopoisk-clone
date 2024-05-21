import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFilm, initializeFilms } from '../../features/films/filmsSlice';
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
  linkForTrailer: string;
  genre: Genre;
  imageUrl: string;
}

const AddFilmForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const films = useSelector((state: RootState) => state.films.items);
  const genres = useSelector((state: RootState) => state.genres.items);
  const [filmData, setFilmData] = useState<Partial<Film>>({
    titleRus: '',
    titleEng: '',
    year: '',
    time: '',
    linkForTrailer: '',
    genre: {} as Genre,
    imageUrl: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const savedFilms = localStorage.getItem('films');
    if (savedFilms) {
      dispatch(initializeFilms(JSON.parse(savedFilms)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('films', JSON.stringify(films));
  }, [films]);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFilmData({ ...filmData, [name]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!filmData.titleRus || !filmData.titleEng || !filmData.genre) {
      setMessage('Пожалуйста, заполните все обязательные поля.');
      return;
    }
    dispatch(addFilm({
      id: Date.now(), // генерация уникального ID для нового фильма
      ...filmData,
      genre: genres.find(genre => genre.id.toString() === filmData.genre?.id.toString())!
    } as Film));
    setMessage('Фильм успешно добавлен!');
    setTimeout(() => setMessage(''), 3000); // Скрыть сообщение после 3 секунд
    setFilmData({
      titleRus: '',
      titleEng: '',
      year: '',
      time: '',
      linkForTrailer: '',
      genre: {} as Genre,
      imageUrl: ''
    });
  };

  return (
    <div className="container">
      <div className="main">
        <form onSubmit={handleSubmit} className="form">
          <h3>Новый фильм</h3>
          <fieldset className="fieldset">
            <label>URL картинки фильма</label>
            <input type="text" name="imageUrl" value={filmData.imageUrl} onChange={handleChange} placeholder="Введите URL изображения" />
          </fieldset>
          <fieldset className="fieldset">
            <label>Название фильма на русском *</label>
            <input type="text" name="titleRus" value={filmData.titleRus} onChange={handleChange} placeholder="Введите название фильма на русском" required />
          </fieldset>
          <fieldset className="fieldset">
            <label>Название фильма на английском *</label>
            <input type="text" name="titleEng" value={filmData.titleEng} onChange={handleChange} placeholder="Введите название фильма на английском" required />
          </fieldset>
          <fieldset className="fieldset">
            <label>Год выпуска</label>
            <input type="text" name="year" value={filmData.year} onChange={handleChange} placeholder="Введите год выпуска фильма" />
          </fieldset>
          <fieldset className="fieldset">
            <label>Длительность фильма</label>
            <input type="text" name="time" value={filmData.time} onChange={handleChange} placeholder="Введите длительность фильма" />
          </fieldset>
          <fieldset className="fieldset">
            <label>Ссылка на трейлер</label>
            <input type="text" name="linkForTrailer" value={filmData.linkForTrailer} onChange={handleChange} placeholder="Введите ссылку на трейлер" />
          </fieldset>
          <fieldset className="fieldset">
            <label>Жанр фильма *</label>
            <select name="genreId" value={filmData.genre?.id.toString()} onChange={handleChange} required>
              <option value="">Выберите жанр</option>
              {genres.map(genre => (
                <option key={genre.id} value={genre.id}>{genre.name}</option>
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
};

export default AddFilmForm;
