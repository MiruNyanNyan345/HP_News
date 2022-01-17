import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import YoutubeScreen from '../screens/YoutubeScreen';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const youtubeStack = createStackNavigator();
const YoutubeStack = () => {
  return (
    <youtubeStack.Navigator>
      <youtubeStack.Screen
        name="Youtube Videos"
        component={YoutubeScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                console.log(123);
              }}>
              <Ionicons name="menu" size={30} style={styles.headRightMenu} />
            </TouchableOpacity>
          ),
        }}
      />
    </youtubeStack.Navigator>
  );
};

const styles = StyleSheet.create({
  headRightMenu: {
    paddingRight: 10,
  },
});

export default YoutubeStack;
