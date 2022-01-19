import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WebVieHTMLScreen from '../screens/WebViewHTMLScreen';
import TwitterScreen from '../screens/TwitterScreen';

const twitterStack = createStackNavigator();
const TwitterStack = () => {
  return (
    <twitterStack.Navigator>
      <twitterStack.Screen
        name="Members Twitter"
        component={TwitterScreen}
        options={{
          headerStyle: {backgroundColor: '#ff6b6b'},
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '800',
            fontSize: 20,
          },
        }}
      />
      <twitterStack.Screen
        name="Website"
        component={WebVieHTMLScreen}
        options={{
          headerStyle: {backgroundColor: '#ff6b6b'},
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '800',
            fontSize: 20,
          },
        }}
      />
    </twitterStack.Navigator>
  );
};

export default TwitterStack;
