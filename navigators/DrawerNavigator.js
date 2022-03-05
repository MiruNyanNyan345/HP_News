import TabNavigator from './TabNavigator';
import SignInStack from './SignInStack';
import React, {useEffect, useState} from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

const drawerNavigator = createDrawerNavigator();
const DrawerNavigator = () => {
  const initialUserState = {access: '', username: ''};
  const [user, setUser] = useState(initialUserState);
  const [isLoggedIn, setLoggedIn] = useState(false);

  const getAuth = async () => {
    try {
      await AsyncStorage.getItem('auth').then(value => {
        if (value !== null) {
          const auth = JSON.parse(value);
          setLoggedIn(true);
          setUser({access: auth.access, username: auth.username});
        }
      });
    } catch (err) {
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    console.log(isLoggedIn);
    getAuth();
  }, []);

  const removeAuth = async () => {
    try {
      await AsyncStorage.removeItem('auth');
      setLoggedIn(false);
      setUser({...initialUserState});
    } catch (e) {
      console.log(e);
    }
  };

  if (isLoggedIn) {
    return (
      <drawerNavigator.Navigator
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
                        removeAuth();
                        props.navigation.navigate('Home');
                      },
                    },
                  ])
                }
              />
            </DrawerContentScrollView>
          );
        }}>
        <drawerNavigator.Screen name="Home" component={TabNavigator} />
      </drawerNavigator.Navigator>
    );
  } else {
    return (
      <drawerNavigator.Navigator screenOptions={{headerShown: false}}>
        <drawerNavigator.Screen name="Home" component={TabNavigator} />
        <drawerNavigator.Screen name="Sign-In" component={SignInStack} />
      </drawerNavigator.Navigator>
    );
  }
};

export default DrawerNavigator;
