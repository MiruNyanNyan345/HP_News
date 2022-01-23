import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WebViewScreen from '../screens/WebViewScreen';
import NewsScreen from '../screens/NewsScreen';

const newsStack = createStackNavigator();
const NewsStack = props => {
  return (
    <newsStack.Navigator
      initialRouteName={'News'}
      screenOptions={props.options}>
      <newsStack.Screen name="Latest News" component={NewsScreen} options={{headerShown: false}}/>
      <newsStack.Screen name="Website" component={WebViewScreen} options={{title: null}} />
    </newsStack.Navigator>
  );
};

export default NewsStack;
