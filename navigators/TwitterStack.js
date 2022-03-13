import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WebViewHTMLScreen from '../screens/WebViewHTMLScreen';
import TwitterScreen from '../screens/TwitterScreen';

const twitterStack = createStackNavigator();
const TwitterStack = props => {
  return (
    <twitterStack.Navigator>
      <twitterStack.Screen
        name="TwitterScreen"
        component={TwitterScreen}
        options={{headerShown: false}}
      />
      <twitterStack.Screen
        name="WebsiteScreen"
        component={WebViewHTMLScreen}
        options={{
          headerShown: false,
          title: null,
        }}
      />
    </twitterStack.Navigator>
  );
};

export default TwitterStack;
