import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WebViewScreen from '../screens/WebViewScreen';
import NewsScreen from '../screens/NewsScreen';

const newsStack = createStackNavigator();
const NewsStack = () => {
  return (
    <newsStack.Navigator initialRouteName={'News'}>
      <newsStack.Screen
        name="Latest News"
        component={NewsScreen}
        options={{
          headerStyle: {backgroundColor: '#ff6b6b'},
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '800',
            fontSize: 20,
          },
        }}
      />
      <newsStack.Screen
        name="Website"
        component={WebViewScreen}
        options={{
          headerStyle: {backgroundColor: '#ff6b6b'},
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '800',
            fontSize: 20,
          },
        }}
      />
    </newsStack.Navigator>
  );
};

export default NewsStack;
