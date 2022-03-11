import TabNavigator from './TabNavigator';
import SignInStack from './SignInStack';
import React from 'react';
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

const drawerNavigator = createDrawerNavigator();
const DrawerNavigator = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
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
                        dispatch(setSignOut());
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
