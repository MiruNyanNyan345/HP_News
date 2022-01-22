import React from 'react';
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const SignUpScreen = props => {
  const navigate = useNavigation();
  return (
    <SafeAreaView style={styles.safeView}>
      <View style={{flex: 1, overflow: 'visible'}}>
        <View style={{backgroundColor: '#576574'}}>
          <ImageBackground
            source={require('../res/img/morningmusume.jpeg')}
            style={{
              height: Dimensions.get('window').height / 3,
            }}
            imageStyle={{opacity: 0.5}}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 30, color: 'white', fontWeight: '800'}}>
                Hello!Project NEWs
              </Text>
            </View>
          </ImageBackground>
        </View>
      </View>
      <View
        style={{
          borderTopRightRadius: 50,
          borderTopLeftRadius: 50,
          flex: 2,
          backgroundColor: 'white',
          // borderColor: 'red',
          // borderWidth: 5,
        }}>
        <View style={{flex: 1, padding: 30}}>
          <View>
            <Text style={{fontWeight: '400', fontSize: 30, color: '#ee5253'}}>
              Welcome!
            </Text>
          </View>
          <View style={styles.signUpFormContainer}>
            <View style={styles.signUpFormItem}>
              <Ionicons name={'person-outline'} size={22} color={'#ff6b6b'} />
              <TextInput
                placeholder={'Enter your username ...'}
                style={styles.signUpFormInput}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.signUpFormItem}>
              <Ionicons name={'mail-outline'} size={22} color={'#ff6b6b'} />
              <TextInput
                placeholder={'Enter your email ...'}
                style={styles.signUpFormInput}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.signUpFormItem}>
              <Ionicons
                name={'lock-closed-outline'}
                size={22}
                color={'#ff6b6b'}
              />
              <TextInput
                placeholder={'Enter your Password ...'}
                style={styles.signUpFormInput}
                secureTextEntry={true}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.signUpFormItem}>
              <Ionicons
                name={'lock-closed-outline'}
                size={22}
                color={'#ff6b6b'}
              />
              <TextInput
                placeholder={'Enter your Password Again...'}
                style={styles.signUpFormInput}
                secureTextEntry={true}
                autoCapitalize="none"
              />
            </View>
            <CustomButton
              title={'Sign-Up'}
              buttonTextStyle={{
                color: 'white',
                fontSize: 18,
                fontWeight: '700',
              }}
              buttonTextContainer={{margin: 10}}
              buttonContainerStyle={{
                alignSelf: 'center',
                borderRadius: 10,
                overflow: 'hidden',
                margin: 10,
              }}
              buttonStyle={{backgroundColor: '#5f27cd'}}
              onPress={() => {
                console.log('Register');
              }}
            />
            <Text style={{alignSelf: 'center', color: '#576574'}}>Or</Text>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 10,
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 15, textAlign: 'center'}}>
                Already have an account?
              </Text>
              <CustomButton
                buttonTextStyle={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  color: '#ee5253',
                  textAlign: 'center',
                  marginLeft: 5,
                }}
                title="Sign-in now!"
                onPress={() => {
                  navigate.navigate('Sign In');
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
  signUpFormContainer: {
    flex: 1,
    paddingTop: 20,
  },
  signUpFormItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  signUpFormInput: {
    marginHorizontal: 5,
    height: 40,
    borderColor: '#ff6b6b',
    borderBottomWidth: 1,
    flex: 1,
    paddingRight: 30,
  },
});

export default SignUpScreen;
