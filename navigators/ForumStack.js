import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import ForumScreen from '../screens/ForumScreen';
import PostCommentsScreen from '../screens/PostCommentsScreen';
import AddPostScreen from '../screens/AddPostScreen';

const forumStack = createStackNavigator();

const ForumStack = props => {
  return (
    <forumStack.Navigator
      screenOptions={props.options}
      initialRouteName="Posts">
      <forumStack.Screen
        name="Posts"
        component={ForumScreen}
        options={{headerShown: false}}
      />

      <forumStack.Screen
        name={'MakePost'}
        component={AddPostScreen}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <forumStack.Screen
        name="Comments"
        component={PostCommentsScreen}
        options={{headerShown: false}}
      />
    </forumStack.Navigator>
  );
};

export default ForumStack;
