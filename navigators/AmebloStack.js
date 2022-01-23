import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WebViewScreen from '../screens/WebViewScreen';
import AmebloScreen from '../screens/AmebloScreen';

const amebloStack = createStackNavigator();
const AmebloStack = props => {
  return (
    <amebloStack.Navigator screenOptions={props.options}>
      <amebloStack.Screen name="Blog" component={AmebloScreen}  options={{headerShown: false}}/>
      <amebloStack.Screen name="Website" component={WebViewScreen} options={{headerShown: false}}/>
    </amebloStack.Navigator>
  );
};

export default AmebloStack;