import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ForumScreen from '../screens/ForumScreen';
import PostScreen from '../screens/PostScreen';
import SignUpScreen from '../screens/SignUpScreen';
const forumStack = createStackNavigator();

const ForumNavigator = props => {
  return (
    <forumStack.Navigator screenOptions={props.options}>
      <forumStack.Screen name="Sign-Up" component={SignUpScreen} />
      <forumStack.Screen name="Posts" component={ForumScreen} />
      <forumStack.Screen name="Title" component={PostScreen} />
    </forumStack.Navigator>
  );
};

export default ForumNavigator;
