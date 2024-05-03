import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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
    }],
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
      if (!state.watchList.includes(action.payload)) {
        state.watchList.push(action.payload);
        localStorage.setItem('watchList', JSON.stringify(state.watchList));
      }
    },
    removeFromToWatch: (state, action) => {
      state.watchList = state.watchList.filter(item => item !== action.payload);
      localStorage.setItem('watchList', JSON.stringify(state.watchList));
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

export const { logout, addToWatch, removeFromToWatch } = userSlice.actions;
export default userSlice.reducer;
