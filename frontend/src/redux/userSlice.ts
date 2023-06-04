import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
// import type { RootState } from '../redux/store';
import { UserInfo } from '../types/UserInfo';
import { User } from '../types/User';

interface UserState {
  isAuthenticated: boolean;
  user: UserInfo;
}
const initialState: UserState = {
  isAuthenticated: false,
  // user: {
  //   name: '',
  //   email: '',
  //   token: '',
  //   role: '',
  // },
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') || '')
    : {
        name: '',
        email: '',
        token: '',
        role: '',
        gender: '',
        phobe: '',
        dob: '',
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
      state.user = action.payload;
    },
  },
});

export const { setAuth, setCurrentUser } = userSlice.actions;

export default userSlice.reducer;
