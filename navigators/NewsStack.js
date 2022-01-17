import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WebViewScreen from '../screens/WebViewScreen';
import NewsScreen from '../screens/NewsScreen';

const newsStack = createStackNavigator();
const NewsStack = () => {
  return (
    <newsStack.Navigator initialRouteName={'News'}>
      <newsStack.Screen name="Latest News" component={NewsScreen} />
      <newsStack.Screen name="Website" component={WebViewScreen} />
    </newsStack.Navigator>
  );
};

export default NewsStack;
