import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WebViewScreen from '../screens/WebViewScreen';
import AmebloScreen from '../screens/AmebloScreen';

const amebloStack = createStackNavigator();
const AmebloStack = () => {
  return (
    <amebloStack.Navigator>
      <amebloStack.Screen name="Blog" component={AmebloScreen} />
      <amebloStack.Screen name="Website" component={WebViewScreen} />
    </amebloStack.Navigator>
  );
};

export default AmebloStack;
