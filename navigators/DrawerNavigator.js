import TabNavigator from './TabNavigator';
import SignInStack from './SignInStack';
import React, {useEffect} from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Alert} from 'react-native';
import {useSelector} from 'react-redux';
import {selectIsLoggedIn, setSignOut} from '../redux/slices/authSlice';
import {useDispatch} from 'react-redux';
import {setSignIn} from '../redux/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileStack from './ProfileStack';

const drawerNavigator = createDrawerNavigator();
const DrawerNavigator = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    AsyncStorage.getItem('auth').then(auth => {
      const authObj = JSON.parse(auth);
      if (authObj) {
        const user = {
          isLoggedIn: true,
          username: authObj.username,
          email: authObj.email,
        };
        dispatch(setSignIn(user));
      }
    });
  });

  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (isLoggedIn) {
    return (
      <drawerNavigator.Navigator
        initialRouteName={'DrawerNavTabHome'}
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
                      onPress: async () => {
                        await AsyncStorage.removeItem('auth');
                        dispatch(setSignOut());
                        props.navigation.navigate('DrawerNavSignIn');
                      },
                    },
                    {
                      text: 'Cancel',
                    },
                  ])
                }
              />
            </DrawerContentScrollView>
          );
        }}>
        <drawerNavigator.Screen
          name="DrawerNavTabHome"
          component={TabNavigator}
          options={{title: 'Home'}}
        />
        <drawerNavigator.Screen
          name="DrawerNavProfile"
          component={ProfileStack}
          options={{title: 'Profile'}}
        />
      </drawerNavigator.Navigator>
    );
  } else {
    return (
      <drawerNavigator.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={'DrawerNavTabHome'}>
        <drawerNavigator.Screen
          name="DrawerNavTabHome"
          component={TabNavigator}
          options={{title: 'Home'}}
        />
        <drawerNavigator.Screen
          name="DrawerNavSignIn"
          component={SignInStack}
          options={{title: 'Sign In'}}
        />
      </drawerNavigator.Navigator>
    );
  }
};

export default DrawerNavigator;
