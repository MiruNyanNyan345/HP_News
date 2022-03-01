import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ForumScreen from '../screens/ForumScreen';
import PostCommentsScreen from '../screens/PostCommentsScreen';

const forumStack = createStackNavigator();

const ForumStack = props => {
  return (
    <forumStack.Navigator
      screenOptions={props.options}
      initialRouteName="PostsScreen">
      <forumStack.Screen
        name="PostsScreen"
        component={ForumScreen}
        options={{headerShown: false}}
      />
      <forumStack.Screen
        name="PostCommentsScreen"
        component={PostCommentsScreen}
      />
    </forumStack.Navigator>
  );
};

export default ForumStack;
