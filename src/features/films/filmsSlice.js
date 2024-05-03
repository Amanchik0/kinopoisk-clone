import { createSlice } from '@reduxjs/toolkit';

export const filmsSlice = createSlice({
  name: 'films',
  initialState: {
    items: [
      { id: 1,
        image: '',
        titleRus: 'Фильм 1',
        titleEng: 'Film 1',
        year: '2020',
        time: '120 мин',
        genre: { name: 'Боевик' }
      },
      // Добавьте дополнительные фильмы сюда, если нужно
    ],
  },
  
  reducers: {
    addFilm: (state, action) => {
      if (!action.payload.genre || !action.payload.genre.name) {
        console.error('Некорректные данные о жанре');
        return;
      }      
      state.items.push(action.payload);
    },
    initializeFilms: (state, action) => {
      state.items = action.payload;
  },
  },
  
});

export const { addFilm , initializeFilms } = filmsSlice.actions;
export default filmsSlice.reducer;
