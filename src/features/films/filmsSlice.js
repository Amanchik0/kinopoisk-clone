import { createSlice } from '@reduxjs/toolkit';

export const filmsSlice = createSlice({
  name: 'films',
  initialState: {
    items: JSON.parse(localStorage.getItem('films')) || [{
      id: 1,
      image: '', 
      titleRus: 'Фильм 1',
      titleEng: 'Film 1',
      year: '2020',
      time: '120 мин',
      genre: { name: 'Боевик' },
      comments: []  
    }, {
      id: 2,
      image: '', 
      titleRus: 'Фильм 2',
      titleEng: 'Film 2',
      year: '2020',
      time: '120 мин',
      genre: { name: 'Боевик' },
    }],
    loading: false,
    error: null,
  },
  
  
  
  reducers: {
    loadFilms: (state) => {
      const films = JSON.parse(localStorage.getItem('films'));
      if (films) {
        state.items = films;
      }
    },
    addCommentToFilm(state, action) {
      const { filmId, comment } = action.payload;
      const film = state.items.find(film => film.id.toString() === filmId);
      if (film) {
        if (!film.comments) {
          film.comments = [];
        }
        film.comments.push(comment);
        localStorage.setItem('films', JSON.stringify(state.items));

      }
    }
,     
    
    
    addFilm: (state, action) => {
      if (!action.payload.genre || !action.payload.genre.name) {
        console.error('Некорректные данные о жанре');
        return;
      }
      const newFilm = {
        ...action.payload,
        comments: []  
      };
      state.items.push(newFilm);
      localStorage.setItem('films', JSON.stringify(state.items));
    },
    
    deleteFilm: (state, action) => {
        state.items = state.items.filter(film => film.id.toString() !== action.payload.toString());
        localStorage.setItem('films', JSON.stringify(state.items));
    },

    initializeFilms: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { addFilm, deleteFilm, initializeFilms  , loadFilms , addCommentToFilm} = filmsSlice.actions;
export default filmsSlice.reducer;
