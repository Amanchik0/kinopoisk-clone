import { createSlice } from '@reduxjs/toolkit';
const storedGenres = JSON.parse(localStorage.getItem('genres'));

export const genresSlice = createSlice({
  name: 'genres',
  initialState: {
    items: [ 
      {
        id:1, 
        name: 'Боевик',
      },
      {
        id:2, 
        name: 'Комедия',
     
      }, 
      {
        id:3, 
        name: 'Драма',
     
      }, 
      {
        id:4, 
        name: 'Фантастика',
     
      },
      {
        id:5, 
        name: 'Ужасы',
     
      },
      {
        id:6, 
        name: 'Триллер',
     
      },
      {
        id:7, 
        name: 'Мелодрама',
     
      },
      {
        id:8, 
        name: 'Детектив',
     
      },
      {
        id:9, 
        name: 'Приключения',
     
      },
      {
        id:10, 
        name: 'Фэнтези',
     
      }
],
  },
  reducers: {
    addGenre: (state, action) => {
      state.items.push(action.payload);
      localStorage.setItem('genres', JSON.stringify(state.items));
    },
    loadGenres: (state) => {
      const genres = JSON.parse(localStorage.getItem('genres'));
      if (genres) {
        state.items = genres;
      }
    },
  },
});

export const { addGenre , loadGenres } = genresSlice.actions;
export default genresSlice.reducer;
