import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ForumScreen from '../screens/ForumScreen';
const forumStack = createStackNavigator();

const ForumNavigator = props => {
  return (
    <forumStack.Navigator>
      <forumStack.Screen
        name="Forum"
        component={ForumScreen}
        options={{
          headerStyle: {backgroundColor: '#ff6b6b'},
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '800',
            fontSize: 20,
          },
        }}
      />
    </forumStack.Navigator>
  );
};

export default ForumNavigator;
