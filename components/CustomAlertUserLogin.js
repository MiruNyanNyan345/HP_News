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
          props.navigation.navigate('DrawerNavSignIn');
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
