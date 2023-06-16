import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
// import type { RootState } from '../redux/store';
import { User } from '../types/User';

interface UserState {
  isAuthenticated: boolean;
  user: User | undefined;
}
const initialState: UserState = {
  isAuthenticated: false,
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') || '')
    : undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state: UserState, action: PayloadAction<User>) => {
      localStorage.setItem('user', JSON.stringify(action.payload));
      state.user = action.payload;
      state.isAuthenticated = action.payload ? true : false;
    },
    logout: (state) => {
      localStorage.removeItem('user');
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { setCurrentUser, logout } = userSlice.actions;

export default userSlice.reducer;
