import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WebViewScreen from '../screens/WebViewScreen';
import NewsScreen from '../screens/NewsScreen';
import CustomButton from '../components/CustomButton';

const newsStack = createStackNavigator();
const NewsStack = props => {
  return (
    <newsStack.Navigator
      initialRouteName={'News'}
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
      <newsStack.Screen name="Latest News" component={NewsScreen} />
      <newsStack.Screen
        name="Website"
        component={WebViewScreen}
        options={{headerShown: false}}
      />
    </newsStack.Navigator>
  );
};

export default NewsStack;
