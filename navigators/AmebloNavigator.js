import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WebViewScreen from '../screens/WebViewScreen';
import AmebloScreen from '../screens/AmebloScreen';

const amebloStack = createStackNavigator();
const AmebloStack = () => {
  return (
    <amebloStack.Navigator>
      <amebloStack.Screen
        name="Blog"
        component={AmebloScreen}
        options={{
          headerStyle: {backgroundColor: '#ff6b6b'},
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '800',
            fontSize: 20,
          },
        }}
      />
      <amebloStack.Screen
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
    </amebloStack.Navigator>
  );
};

export default AmebloStack;
