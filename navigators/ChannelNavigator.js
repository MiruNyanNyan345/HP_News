import React from 'react';
import ChannelScreen from '../screens/ChannelScreen';
import {createStackNavigator} from '@react-navigation/stack';
import VideosScreen from '../screens/VideosScreen';

const channelStack = createStackNavigator();

const ChannelNavigator = props => {
  return (
    <channelStack.Navigator screenOptions={props.options}>
      <channelStack.Screen name="Channels" component={ChannelScreen} />
      <channelStack.Screen name={'Videos'} component={VideosScreen} />
    </channelStack.Navigator>
  );
};

export default ChannelNavigator;
