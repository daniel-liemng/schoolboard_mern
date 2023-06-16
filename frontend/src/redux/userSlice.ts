import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
// import type { RootState } from '../redux/store';
import { User } from '../types/User';

interface UserState {
  isAuthenticated: boolean;
  user: User;
}
const initialState: UserState = {
  isAuthenticated: false,
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') || '')
    : {
        _id: '',
        name: '',
        email: '',
        role: '',
        gender: '',
        phobe: '',
        dob: '',
        registeredCourseIds: [],
        avatar: '',
      },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth: (state) => {
      state.isAuthenticated = true;
    },
    setCurrentUser: (state: UserState, action: PayloadAction<User>) => {
      localStorage.setItem('user', JSON.stringify(action.payload));
      state.user = action.payload;
    },
    logout: () => {
      localStorage.removeItem('user');
    },
  },
});

export const { setAuth, setCurrentUser, logout } = userSlice.actions;

export default userSlice.reducer;
