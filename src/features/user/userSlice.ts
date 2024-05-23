import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Film, User } from '../../app/types';
import { handleError } from '../../components/errorHandling';

export enum UserActionTypes {
  REGISTER = 'user/register',
  LOGIN = 'user/login',
  LOGOUT = 'user/logout',
  ADD_TO_WATCH = 'user/addToWatch',
  REMOVE_FROM_TO_WATCH = 'user/removeFromToWatch',
  UPDATE_USER = 'user/updateUser',
}

interface UserState {
  users: User[];
  currentUser: User | null;
  isAuthenticated: boolean;
  error: string | null;
  watchList: Film[];
}

const initialUsers: User[] = [
  {
    id: 'admin123',
    username: 'admin',
    email: 'admin@example.com',
    password: 'adminpass',
    fullName: 'Admin User',
    isAdmin: true
  }
];

const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
const users = savedUsers.length > 0 ? savedUsers : initialUsers;

const initialState: UserState = {
  users,
  currentUser: JSON.parse(localStorage.getItem('currentUser') || 'null'),
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  error: null,
  watchList: JSON.parse(localStorage.getItem('watchList') || '[]')
};

if (savedUsers.length === 0) {
  localStorage.setItem('users', JSON.stringify(initialUsers));
}

export const register = createAsyncThunk(
  UserActionTypes.REGISTER,
  async ({ username, password, email, fullName }: Omit<User, 'id' | 'isAdmin'>, { getState, rejectWithValue }) => {
    try {
      const state: RootState = getState() as RootState;
      const existingUser = state.user.users.find(user => user.email === email);
      if (existingUser) {
        return rejectWithValue('User with this email already exists');
      }
      const newUser: User = {
        id: Date.now().toString(),
        username,
        email,
        password,
        fullName,
        isAdmin: false
      };
      return newUser;
    } catch (error: any) {
      return rejectWithValue('Unable to register');
    }
  }
);

export const login = createAsyncThunk(
  UserActionTypes.LOGIN,
  async ({ email, password }: { email: string; password: string }, { getState, rejectWithValue }) => {
    try {
      const state: RootState = getState() as RootState;
      const user = state.user.users.find(user => user.email === email && user.password === password);
      if (user) {
        return user;
      } else {
        return rejectWithValue('Invalid username/email or password');
      }
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.currentUser = null;
      state.isAuthenticated = false;
      localStorage.removeItem('currentUser');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('watchList');
    },
    addToWatch(state, action: PayloadAction<Film>) {
      if (action.payload && !state.watchList.some(item => item.id === action.payload.id)) {
        state.watchList.push(action.payload);
        localStorage.setItem('watchList', JSON.stringify(state.watchList));
      }
    },
    removeFromToWatch(state, action: PayloadAction<Film>) {
      state.watchList = state.watchList.filter(item => item.id !== action.payload.id);
      localStorage.setItem('watchList', JSON.stringify(state.watchList));
    },
    updateUser(state, action: PayloadAction<Partial<User>>) {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
        const updatedUsers = state.users.map(user =>
          user.id === state.currentUser!.id ? { ...user, ...action.payload } : user
        );
        state.users = updatedUsers;
        localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
        localStorage.setItem('users', JSON.stringify(updatedUsers));
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.users.push(action.payload);
        localStorage.setItem('users', JSON.stringify(state.users));
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem('currentUser', JSON.stringify(action.payload));
        localStorage.setItem('isAuthenticated', 'true');
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  }
});

export const { logout, addToWatch, removeFromToWatch, updateUser } = userSlice.actions;
export default userSlice.reducer;
