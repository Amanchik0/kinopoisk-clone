import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const addFilm = createAsyncThunk(
  'films/addFilm',
  async (filmData, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      filmData.id = Date.now().toString(); // Уникальный ID для фильма
      state.films.push(filmData); // Добавляем фильм в массив
      localStorage.setItem('films', JSON.stringify(state.films)); // Обновляем localStorage
      return filmData; // Возвращаем данные для обновления состояния
    } catch (error) {
      return rejectWithValue('Ошибка при добавлении фильма');
    }
  }
);

export const deleteFilm = createAsyncThunk(
  'films/deleteFilm',
  async (filmId, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const filteredFilms = state.films.filter(film => film.id !== filmId); // Удаляем фильм
      localStorage.setItem('films', JSON.stringify(filteredFilms)); // Обновляем localStorage
      return filmId; // Возвращаем ID удаленного фильма
    } catch (error) {
      return rejectWithValue('Ошибка при удалении фильма');
    }
  }
);

export const register = createAsyncThunk(
  'user/register',
  async ({ username, password, email, fullName }, { rejectWithValue }) => {
    try {
      const newUser = {
        id: Date.now().toString(),
        username,
        email,
        password,
        fullName,
        isAdmin: false
      };
      return newUser;
    } catch (error) {
      return rejectWithValue('Unable to register');
    }
  }
);

export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }, { getState, rejectWithValue }) => {
    const state = getState();
    const user = state.user.users.find(user => (user.email === email) && user.password === password);
    if (user) {
      return user;
    } else {
      return rejectWithValue('Invalid username/email or password');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: JSON.parse(localStorage.getItem('users')) || [{
      id: 'admin123',
      username: 'admin',
      email: 'admin@example.com',
      password: 'adminpass',
      fullName: 'Admin User',
      isAdmin: true
    } ,],
    currentUser: null,
    isAuthenticated: false,
    error: null,
    watchList: JSON.parse(localStorage.getItem('watchList')) || [],
  },
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      localStorage.removeItem('currentUser');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('watchList');
    },
    addToWatch: (state, action) => {
      if (action.payload && !state.watchList.some(item => item.id === action.payload.id)) {
        state.watchList.push(action.payload);
        localStorage.setItem('watchList', JSON.stringify(state.watchList));
      }
    },
    removeFromToWatch: (state, action) => {
      state.watchList = state.watchList.filter(item => item.id !== action.payload.id);
      localStorage.setItem('watchList', JSON.stringify(state.watchList));
    },
    updateUser: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
      const updatedUsers = state.users.map(user =>
        user.id === state.currentUser.id ? { ...user, ...action.payload } : user
      );
      state.users = updatedUsers;
      localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.users.push(action.payload);
        localStorage.setItem('users', JSON.stringify(state.users));
      })
      .addCase(login.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem('currentUser', JSON.stringify(action.payload));
        localStorage.setItem('isAuthenticated', 'true');
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export const { logout, addToWatch, removeFromToWatch, updateUser } = userSlice.actions;
export default userSlice.reducer;
