import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Genre, Comment, Film } from '../../app/types';

export enum FilmsActionTypes {
  ADD_FILM = 'films/addFilm',
  DELETE_FILM = 'films/deleteFilm',
  ADD_COMMENT = 'films/addCommentToFilm',
  INITIALIZE_FILMS = 'films/initializeFilms',
  LOAD_FILMS = 'films/loadFilms',
}

interface FilmsState {
  items: Film[];
  loading: boolean;
  error: string | null;
}

const initialFilms: Film[] = [
  {
    id: 1,
    imageUrl: 'https://example.com/image1.jpg',
    titleRus: 'Фильм 1',
    titleEng: 'Film 1',
    year: '2020',
    time: '120 мин',
    genre: { id: 1, name: 'Боевик' },
    comments: [],
    linkForTrailer: 'some-link'
  },
  {
    id: 2,
    imageUrl: 'https://example.com/image2.jpg',
    titleRus: 'Фильм 2',
    titleEng: 'Film 2',
    year: '2021',
    time: '130 мин',
    genre: { id: 2, name: 'Комедия' },
    comments: [],
    linkForTrailer: 'some-link'
  }
];

const initialState: FilmsState = {
  items: JSON.parse(localStorage.getItem('films') || '[]'),
  loading: false,
  error: null
};

if (initialState.items.length === 0) {
  initialState.items = initialFilms;
  localStorage.setItem('films', JSON.stringify(initialState.items));
} else {
  initialState.items = [...initialFilms, ...initialState.items];
}

const calculateAverageRating = (comments: Comment[]): number => {
  const totalRating = comments.reduce((total, comment) => total + comment.rate, 0);
  return totalRating / comments.length;
};

const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    loadFilms(state) {
      const films = JSON.parse(localStorage.getItem('films') || '[]');
      if (films.length > 0) {
        state.items = [...initialFilms, ...films];
      } else {
        state.items = initialFilms;
        localStorage.setItem('films', JSON.stringify(initialFilms));
      }
    },
    addCommentToFilm(state, action: PayloadAction<{ filmId: number; comment: Comment }>) {
      const { filmId, comment } = action.payload;
      const film = state.items.find(film => film.id === filmId);
      if (film) {
        if (!film.comments) {
          film.comments = [];
        }
        film.comments.push(comment);
        film.averageRating = calculateAverageRating(film.comments);
        localStorage.setItem('films', JSON.stringify(state.items));
      }
    },
    addFilm(state, action: PayloadAction<Film>) {
      const newFilm: Film = {
        ...action.payload,
        comments: action.payload.comments || [],
        averageRating: action.payload.averageRating || 0
      };
      state.items.push(newFilm);
      localStorage.setItem('films', JSON.stringify(state.items));
    },
    deleteFilm(state, action: PayloadAction<number>) {
      state.items = state.items.filter(film => film.id !== action.payload);
      localStorage.setItem('films', JSON.stringify(state.items));
    },
    initializeFilms(state, action: PayloadAction<Film[]>) {
      state.items = action.payload;
      localStorage.setItem('films', JSON.stringify(state.items));
    }
  }
});

export const { addFilm, deleteFilm, initializeFilms, loadFilms, addCommentToFilm } = filmsSlice.actions;
export default filmsSlice.reducer;
