import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WebViewScreen from '../screens/WebViewScreen';
import AmebloScreen from '../screens/AmebloScreen';
import CustomButton from '../components/CustomButton';

const amebloStack = createStackNavigator();
const AmebloStack = props => {
  return (
    <amebloStack.Navigator
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
      <amebloStack.Screen
        name="AmebloStackScreen"
        options={{headerTitle: 'Ameblo'}}
        component={AmebloScreen}
      />
      <amebloStack.Screen
        name="AmebloWebView"
        component={WebViewScreen}
        options={{
          headerTitle: '',
          headerLeft: () => {
            return (
              <CustomButton
                isIconBG={true}
                buttonContainerStyle={{paddingLeft: 10}}
                buttonIconName={'chevron-back'}
                buttonIconSize={30}
                buttonIconColor={'#fff'}
                onPress={() => props.navigation.navigate('AmebloStackScreen')}
              />
            );
          },
        }}
      />
    </amebloStack.Navigator>
  );
};

export default AmebloStack;
