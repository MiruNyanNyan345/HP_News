/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import NewsStack from './navigators/NewsStack';
import AmebloStack from './navigators/AmebloStack';
import TwitterStack from './navigators/TwitterStack';
import YoutubeStack from './navigators/YoutubeStack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarActiveTintColor: 'red',
          tabBarInactiveTintColor: 'gray',
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'News') {
              iconName = focused ? 'newspaper' : 'newspaper-outline';
            } else if (route.name === 'Ameblo') {
              iconName = focused ? 'logo-rss' : 'logo-rss';
            } else if (route.name === 'Twitter') {
              iconName = focused ? 'logo-twitter' : 'logo-twitter';
            } else if (route.name === 'Youtube') {
              iconName = focused ? 'logo-youtube' : 'logo-youtube';
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        // tabBarOptions={{
        //   activeTintColor: 'red',
        //   inactiveTintColor: 'gray',
        // }}
        initialRouteName={'Youtube'}>
        <Tab.Screen
          name="Youtube"
          component={YoutubeStack}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="News"
          component={NewsStack}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Ameblo"
          component={AmebloStack}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Twitter"
          component={TwitterStack}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
