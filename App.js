/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import TabNavigator from './navigators/TabNavigator';
import SignInStack from './navigators/SignInStack';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={{headerShown: false}}>
        <Drawer.Screen name="Home" component={TabNavigator} />
        <Drawer.Screen name="Sign-In" component={SignInStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
