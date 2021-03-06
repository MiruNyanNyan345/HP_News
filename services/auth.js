import {HP_News_API_ADDRESS} from '../Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {setSignOut} from '../redux/slices/authSlice';
import {useDispatch} from 'react-redux';
import jwt_decode from 'jwt-decode';

export const verifyToken = async () => {
  const access = JSON.parse(await AsyncStorage.getItem('auth')).access;
  const decoded = jwt_decode(access);
  const exp_dt = new Date(decoded.exp * 1000).toLocaleString('zh-HK');
  const now_dt = new Date().toLocaleString('zh-HK');
  console.log(
    'Current DateTime: ' + now_dt + '\nToken Expire DateTime: ' + exp_dt,
  );
  if (now_dt > exp_dt) {
    return refreshToken();
  } else {
    return true;
  }
};

export const refreshToken = async () => {
  const refresh = JSON.parse(await AsyncStorage.getItem('auth')).refresh;
  const decoded = jwt_decode(refresh);
  const exp_dt = new Date(decoded.exp * 1000).toLocaleString('zh-HK');
  const now_dt = new Date().toLocaleString('zh-HK');
  if (now_dt > exp_dt) {
    return false;
  } else {
    return fetch('http://' + HP_News_API_ADDRESS + '/user/token/refresh/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({refresh: refresh}),
    })
      .then(async response => {
        const auth = await response.json();
        if (response.ok) {
          await AsyncStorage.setItem('auth', JSON.stringify(auth));
          return true;
        } else {
          return false;
        }
      })
      .catch(error => {
        const err_msg = error.message;
        console.log('Error: ' + err_msg);
      });
  }
};

export const tokenExpired = props => {
  return Alert.alert('Token Expired', '', [
    {
      text: 'OK',
      onPress: async () => {
        await AsyncStorage.removeItem('auth');
        props.dispatch(setSignOut());
        props.navigation.navigate('DrawerNavSignIn');
      },
    },
  ]);
};
