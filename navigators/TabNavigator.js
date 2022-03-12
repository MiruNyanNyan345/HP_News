import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../components/CustomButton';
import ChannelStack from './ChannelStack';
import NewsNavigator from './NewsStack';
import ForumStack from './ForumStack';
import AmebloStack from './AmebloStack';
import TwitterNavigator from './TwitterStack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import React from 'react';

const Tab = createBottomTabNavigator();

const TabNavigator = props => {
  const stackHeaderOption = () => {};

  return (
    <Tab.Navigator
      screenOptions={({route, navigation}) => {
        return {
          tabBarActiveTintColor: '#ee5253',
          tabBarInactiveTintColor: '#576574',
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'News') {
              iconName = focused ? 'newspaper' : 'newspaper-outline';
            } else if (route.name === 'Ameblo') {
              iconName = focused ? 'logo-rss' : 'logo-rss';
            } else if (route.name === 'Forum') {
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
            } else if (route.name === 'Twitter') {
              iconName = focused ? 'logo-twitter' : 'logo-twitter';
            } else if (route.name === 'Channel') {
              iconName = focused ? 'logo-youtube' : 'logo-youtube';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
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
                onPress={() => navigation.openDrawer()}
              />
            );
          },
        };
      }}
      initialRouteName={'Forum'}>
      <Tab.Screen name="Channel" component={ChannelStack}/>
      <Tab.Screen name="News" component={NewsNavigator} />
      <Tab.Screen name="Forum" component={ForumStack} />
      <Tab.Screen name="Ameblo" component={AmebloStack} />
      <Tab.Screen name="Twitter" component={TwitterNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
