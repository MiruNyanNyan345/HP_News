import React from 'react';
import ChannelScreen from '../screens/ChannelScreen';
import {createStackNavigator} from '@react-navigation/stack';
import VideosScreen from '../screens/VideosScreen';

const channelStack = createStackNavigator();

const ChannelStack = props => {
  return (
    <channelStack.Navigator screenOptions={props.options}>
      <channelStack.Screen name="Channels" component={ChannelScreen} options={{headerShown: false}}/>
      <channelStack.Screen name="Videos" component={VideosScreen} />
    </channelStack.Navigator>
  );
};

export default ChannelStack;
