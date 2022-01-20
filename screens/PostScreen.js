import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaView, Text} from 'react-native';

const postStack = createStackNavigator;

const PostScreen = props => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Text>PostScreen</Text>
    </SafeAreaView>
  );
};

export default PostScreen;
