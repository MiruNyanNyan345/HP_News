import React from 'react';
import ChannelScreen from '../screens/ChannelScreen';
import {createStackNavigator} from '@react-navigation/stack';
import CustomButton from '../components/CustomButton';

const stack = createStackNavigator();

const PlaylistStack = props => {
  return (
    <stack.Navigator
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
      <stack.Screen
        name="Channels"
        component={ChannelScreen}
        options={{title: 'Channel'}}
      />
    </stack.Navigator>
  );
};

export default PlaylistStack;
