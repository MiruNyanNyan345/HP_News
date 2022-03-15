import {Alert} from 'react-native';
import React from 'react';

const customAlertUserLogin = props => {
  return Alert.alert(
    'Please Login First',
    '',
    [
      {
        text: 'Ok',
        onPress: () => {
          props.navigation.navigate('Sign-In');
        },
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ],
    {cancelable: true},
  );
};

export default customAlertUserLogin;
