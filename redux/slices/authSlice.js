import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    isLoggedIn: false,
    username: null,
    email: null,
};

const authSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    setSignIn: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
    setSignOut: state => {
      state.isLoggedIn = false;
      state.username = null;
      state.email = null;
    },
  },
});

export const {setSignIn, setSignOut} = authSlice.actions;

export const selectIsLoggedIn = state => state.userAuth.isLoggedIn;
export const selectUserName = state => state.userAuth.username;
export const selectUserEmail = state => state.userAuth.email;

export default authSlice.reducer;
