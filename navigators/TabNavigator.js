import Ionicons from 'react-native-vector-icons/Ionicons';
import ChannelStack from './ChannelStack';
import NewsNavigator from './NewsStack';
import ForumStack from './ForumStack';
import AmebloStack from './AmebloStack';
import TwitterNavigator from './TwitterStack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import React from 'react';

const Tab = createBottomTabNavigator();

const TabNavigator = props => {
  return (
    <Tab.Navigator
      screenOptions={({route, navigation}) => {
        return {
          tabBarActiveTintColor: '#ee5253',
          tabBarInactiveTintColor: '#576574',
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'TabNavNews') {
              iconName = focused ? 'newspaper' : 'newspaper-outline';
            } else if (route.name === 'TabNavAmeblo') {
              iconName = focused ? 'logo-rss' : 'logo-rss';
            } else if (route.name === 'TabNavForum') {
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
            } else if (route.name === 'TabNavTwitter') {
              iconName = focused ? 'logo-twitter' : 'logo-twitter';
            } else if (route.name === 'TabNavChannel') {
              iconName = focused ? 'logo-youtube' : 'logo-youtube';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        };
      }}
      initialRouteName={'TabNavChannel'}>
      <Tab.Screen
        name="TabNavChannel"
        component={ChannelStack}
        options={{headerShown: false, title: 'Channel'}}
      />
      <Tab.Screen
        name="TabNavNews"
        component={NewsNavigator}
        options={{headerShown: false, title: 'News'}}
      />
      <Tab.Screen
        name="TabNavForum"
        component={ForumStack}
        options={{headerShown: false, title: 'Forum'}}
      />
      <Tab.Screen
        name="TabNavAmeblo"
        component={AmebloStack}
        options={{headerShown: false, title: 'Ameblo'}}
      />
      <Tab.Screen
        name="TabNavTwitter"
        component={TwitterNavigator}
        options={{headerShown: false, title: 'Twitter'}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
