import { createSlice } from '@reduxjs/toolkit';

export const genresSlice = createSlice({
  name: 'genres',
  initialState: {
    items: [ 
  {
    id:1, 
    name: 'Боевик',
  },
   {
    id:2 , 
    name: 'Комедия',
 
  }, 
  {
    id:3 , 
    name: 'Драма',
 
  }, 
  {
    id:4 , 
    name: 'Фантастика',
 
  }, 
],
  },
  reducers: {
    addGenre: (state, action) => {
      state.items.push(action.payload);
    },
  },
});

export const { addGenre } = genresSlice.actions;
export default genresSlice.reducer;
