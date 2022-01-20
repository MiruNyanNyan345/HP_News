import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WebVieHTMLScreen from '../screens/WebViewHTMLScreen';
import TwitterScreen from '../screens/TwitterScreen';

const twitterStack = createStackNavigator();
const TwitterStack = (props) => {
  return (
    <twitterStack.Navigator screenOptions={props.options}>
      <twitterStack.Screen name="Members Twitter" component={TwitterScreen} />
      <twitterStack.Screen name="Website" component={WebVieHTMLScreen} />
    </twitterStack.Navigator>
  );
};

export default TwitterStack;
