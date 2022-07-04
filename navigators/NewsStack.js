import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WebViewScreen from '../screens/WebViewScreen';
import NewsScreen from '../screens/NewsScreen';
import CustomButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';

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
      <newsStack.Screen name="NewsStackScreen" component={NewsScreen} options={{headerTitle: 'Latest News'}}/>
      <newsStack.Screen
        name="NewsWebView"
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
                onPress={() => props.navigation.navigate('NewsStackScreen')}
              />
            );
          },
        }}
        component={WebViewScreen}
      />
    </newsStack.Navigator>
  );
};

export default NewsStack;
