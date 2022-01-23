import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import signInScreen from '../screens/SignInScreen';
import signUpScreen from '../screens/SignUpScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../components/CustomButton';

const Stack = createStackNavigator();

const SignInStack = props => {
  return (
    <Stack.Navigator
      screenOptions={({route, navigation}) => {
        return {
          headerStyle: {backgroundColor: '#ff6b6b'},
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '800',
            fontSize: 20,
          },
          headerLeft: () => {
            return (
              <CustomButton
                isIconBG={true}
                buttonContainerStyle={{paddingLeft: 10}}
                buttonIconName={'menu'}
                buttonIconSize={30}
                buttonIconColor={'#fff'}
                onPress={() => navigation.openDrawer()}
              />
            );
          },
        };
      }}
      initialRouteName="Sign In">
      <Stack.Screen name="Sign In" component={signInScreen} />
      <Stack.Screen name="Sign Up" component={signUpScreen} />
    </Stack.Navigator>
  );
};

export default SignInStack;
