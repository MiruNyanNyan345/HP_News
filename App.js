/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';

import TabNavigator from './navigators/TabNavigator';
import SignInStack from './navigators/SignInStack';
import {Alert} from 'react-native';

const Drawer = createDrawerNavigator();

const App = () => {
  const [username, setUserName] = useState('');
  const [access, setAccess] = useState('');

  useEffect(() => {
    getAuth();
  }, []);

  const getAuth = () => {
    try {
      AsyncStorage.getItem('auth').then(value => {
        if (value !== null) {
          const auth = JSON.parse(value);
          setAccess(auth.access);
          setUserName(auth.username);
        } else {
          console.log('No Access!');
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const removeAuth = () => {
    AsyncStorage.multiRemove();
  };

  if (access) {
    return (
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName={'Home'}
          screenOptions={{headerShown: false}}
          drawerContent={props => {
            return (
              <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem
                  label="Sign-Out"
                  onPress={() =>
                    Alert.alert('Sign Out?', '', [
                      {
                        text: 'Leave',
                        onPress: () => {
                          props.navigation.navigate('Home');
                        },
                      },
                    ])
                  }
                />
              </DrawerContentScrollView>
            );
          }}>
          <Drawer.Screen name="Home" component={TabNavigator} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Drawer.Navigator screenOptions={{headerShown: false}}>
          <Drawer.Screen name="Home" component={TabNavigator} />
          <Drawer.Screen name="Sign-In" component={SignInStack} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
};

export default App;
