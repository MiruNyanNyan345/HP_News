/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import ChannelNavigator from './navigators/ChannelNavigator';
import AmebloNavigators from './navigators/AmebloNavigator';
import NewsNavigator from './navigators/NewsNavigator';
import TwitterNavigator from './navigators/TwitterNavigator';
import ForumNavigator from './navigators/ForumNavigator';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => {
          return {
            tabBarActiveTintColor: '#ee5253',
            tabBarInactiveTintColor: '#576574',
            tabBarIcon: ({focused, color, size}) => {
              let iconName;
              if (route.name === 'News') {
                iconName = focused ? 'newspaper' : 'newspaper-outline';
              } else if (route.name === 'Ameblo') {
                iconName = focused ? 'logo-rss' : 'logo-rss';
              } else if (route.name === 'Forum') {
                iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
              } else if (route.name === 'Twitter') {
                iconName = focused ? 'logo-twitter' : 'logo-twitter';
              } else if (route.name === 'Channel') {
                iconName = focused ? 'logo-youtube' : 'logo-youtube';
              }
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            headerShown: false,
          };
        }}
        initialRouteName={'Channel'}>
        <Tab.Screen
          name="Channel"
          children={() => (
            <ChannelNavigator
              options={{
                headerStyle: {backgroundColor: '#ff6b6b'},
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: '800',
                  fontSize: 20,
                },
              }}
            />
          )}
        />
        <Tab.Screen
          name="News"
          children={() => (
            <NewsNavigator
              options={{
                headerStyle: {backgroundColor: '#ff6b6b'},
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: '800',
                  fontSize: 20,
                },
              }}
            />
          )}
        />
        <Tab.Screen
          name="Forum"
          children={() => (
            <ForumNavigator
              options={{
                headerStyle: {backgroundColor: '#ff6b6b'},
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: '800',
                  fontSize: 20,
                },
              }}
            />
          )}
        />
        <Tab.Screen
          name="Ameblo"
          children={() => (
            <AmebloNavigators
              options={{
                headerStyle: {backgroundColor: '#ff6b6b'},
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: '800',
                  fontSize: 20,
                },
              }}
            />
          )}
        />
        <Tab.Screen
          name="Twitter"
          children={() => (
            <TwitterNavigator
              options={{
                headerStyle: {backgroundColor: '#ff6b6b'},
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: '800',
                  fontSize: 20,
                },
              }}
            />
          )}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
