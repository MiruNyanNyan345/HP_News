import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ForumScreen from '../screens/ForumScreen';
import CommentsScreen from '../screens/CommentsScreen';
import MakePostScreen from '../screens/MakePostScreen';
import CustomButton from '../components/CustomButton';

const forumStack = createStackNavigator();

const ForumStack = props => {
  return (
    <forumStack.Navigator
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
      }}
      initialRouteName="Posts">
      <forumStack.Screen
        name="Posts"
        component={ForumScreen}
        options={{animationEnabled: false}}
      />
      <forumStack.Screen
        name={'MakePost'}
        component={MakePostScreen}
        options={{
          headerShown: false,
          animationEnabled: false,
        }}
      />
      <forumStack.Screen
        name="Comments"
        component={CommentsScreen}
        options={({route, navigation}) => {
          return {
            animationEnabled: false,
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
                  buttonIconName={'chevron-back'}
                  buttonIconSize={30}
                  buttonIconColor={'#fff'}
                  onPress={() => navigation.goBack()}
                />
              );
            },
          };
        }}
      />
    </forumStack.Navigator>
  );
};

export default ForumStack;
