import React from 'react';
import ChannelScreen from '../screens/ChannelScreen';
import {createStackNavigator} from '@react-navigation/stack';
import VideosScreen from '../screens/VideosScreen';
import CustomButton from '../components/CustomButton';

const channelStack = createStackNavigator();

const ChannelStack = props => {
  return (
    <channelStack.Navigator
      screenOptions={({route, navigation}) => {
        return {
          headerStyle: {backgroundColor: '#ff6b6b'},
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '800',
            fontSize: 20,
          },
          headerLeft: () => {
            return (
              <CustomButton
                isIconBG={true}
                buttonContainerStyle={{paddingLeft: 10}}
                buttonIconName={'menu'}
                buttonIconSize={30}
                buttonIconColor={'#fff'}
                onPress={() => props.navigation.openDrawer()}
              />
            );
          },
        };
      }}>
      <channelStack.Screen
        name="Channels"
        component={ChannelScreen}
        options={{title: 'Channel'}}
      />
      <channelStack.Screen name="Videos" component={VideosScreen} />
    </channelStack.Navigator>
  );
};

export default ChannelStack;
