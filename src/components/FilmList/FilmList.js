import { createSlice } from '@reduxjs/toolkit';

export const filmsSlice = createSlice({
  name: 'films',
  initialState: {
    items: [
      { id: 1, title: 'Фильм 1', year: '2020', genre: 'Боевик' },
      { id: 2, title: 'Фильм 2', year: '2021', genre: 'Комедия' },
    ],
  },
  reducers: {
    addFilm: (state, action) => {
      state.items.push(action.payload);
    },
  },
});

export const { addFilm } = filmsSlice.actions;
export default filmsSlice.reducer;
