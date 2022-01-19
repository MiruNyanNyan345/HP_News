import React from 'react';
import ChannelScreen from '../screens/ChannelScreen';
import {createStackNavigator} from '@react-navigation/stack';
import VideosScreen from '../screens/VideosScreen';

const channelStack = createStackNavigator();

const ChannelNavigator = props => {
  return (
    <channelStack.Navigator>
      <channelStack.Screen
        name="Channel"
        component={ChannelScreen}
        options={{
          headerStyle: {backgroundColor: '#ff6b6b'},
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '800',
            fontSize: 20,
          },
        }}
      />
      <channelStack.Screen
        name={'Videos'}
        component={VideosScreen}
        options={{
            headerStyle: {backgroundColor: '#ff6b6b'},
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: '800',
                fontSize: 20,
            },
        }}
      />
    </channelStack.Navigator>
  );
};

export default ChannelNavigator;
