import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Genre } from '../../app/types';

// Перечисление типов действий
export enum GenresActionTypes {
  ADD_GENRE = 'genres/addGenre',
  LOAD_GENRES = 'genres/loadGenres',
}

interface GenresState {
  items: Genre[];
}

const initialGenres: Genre[] = [
  { id: 1, name: 'Боевик' },
  { id: 2, name: 'Комедия' },
  { id: 3, name: 'Драма' },
  { id: 4, name: 'Фантастика' },
  { id: 5, name: 'Ужасы' },
  { id: 6, name: 'Триллер' },
  { id: 7, name: 'Мелодрама' },
  { id: 8, name: 'Детектив' },
  { id: 9, name: 'Приключения' },
  { id: 10, name: 'Фэнтези' }
];

const initialState: GenresState = {
  items: JSON.parse(localStorage.getItem('genres') || '[]')
};

if (initialState.items.length === 0) {
  initialState.items = initialGenres;
  localStorage.setItem('genres', JSON.stringify(initialState.items));
}

const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {
    addGenre(state, action: PayloadAction<Genre>) {
      if (!state.items.some(genre => genre.id === action.payload.id)) {
        state.items.push(action.payload);
        localStorage.setItem('genres', JSON.stringify(state.items));
      }
    },
    loadGenres(state) {
      const genres = JSON.parse(localStorage.getItem('genres') || '[]');
      state.items = genres.length > 0 ? genres : initialGenres;
      if (genres.length === 0) {
        localStorage.setItem('genres', JSON.stringify(initialGenres));
      }
    }
  }
});

export const { addGenre, loadGenres } = genresSlice.actions;
export default genresSlice.reducer;
