import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  isLoggedIn: false,
  username: null,
};

const authSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    setSignIn: (state, action) => {
      state.username = action.payload.username;
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    setSignOut: state => {
      state.username = null;
      state.isLoggedIn = false;
    },
  },
});

export const {setSignIn, setSignOut} = authSlice.actions;

export const selectIsLoggedIn = state => state.userAuth.isLoggedIn;
export const selectUserName = state => state.userAuth.username;;

export default authSlice.reducer;
