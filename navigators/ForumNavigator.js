import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ForumScreen from '../screens/ForumScreen';
import PostScreen from '../screens/PostScreen';


const forumStack = createStackNavigator();

const ForumNavigator = props => {
  return (
    <forumStack.Navigator
      screenOptions={props.options}
      initialRouteName="Posts">
      <forumStack.Screen
        name="Posts"
        component={ForumScreen}
        options={{headerLeft: props.stackHeaderLeftButton}}
      />
      <forumStack.Screen name="Title" component={PostScreen} />
    </forumStack.Navigator>
  );
};

export default ForumNavigator;
