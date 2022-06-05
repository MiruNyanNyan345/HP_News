import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WebViewHTMLScreen from '../screens/WebViewHTMLScreen';
import TwitterScreen from '../screens/TwitterScreen';
import CustomButton from '../components/CustomButton';

const twitterStack = createStackNavigator();
const TwitterStack = props => {
  return (
    <twitterStack.Navigator
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
      <twitterStack.Screen
        name="TwitterStackScreen"
        component={TwitterScreen}
        options={{title: 'Twitter'}}
      />
      <twitterStack.Screen
        name="Website"
        component={WebViewHTMLScreen}
        options={{
          title: null,
        }}
      />
    </twitterStack.Navigator>
  );
};

export default TwitterStack;
