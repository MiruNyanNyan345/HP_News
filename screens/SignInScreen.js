import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../components/CustomButton';

const SignInScreen = props => {
  const navigate = useNavigation();
  const [signInInfo, setSignInInfo] = useState({
    email: '',
    password: '',
  });

  const signIn = () => {
    fetch('http://127.0.0.1:8000/user/token/obtain/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signInInfo),
    })
      .then(async response => {
        const auth = await response.json();
        if (response.ok) {
          await AsyncStorage.setItem('auth', JSON.stringify(auth));
          Alert.alert('LOGIN SUCCESSFUL!', 'WELCOME ' + auth.username, () => {
            navigate.navigate('PostsScreen');
          });
        } else {
          Object.keys(auth).forEach(key => {
            Alert.alert(key, auth[key].toString());
          });
        }
      })
      .catch(error => {
        const err_msg = error.message;
        console.log('Error: ' + err_msg);
      });
  };
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
        }}>
        <View style={{flex: 1, padding: 30}}>
          <View>
            <Text style={{fontWeight: '400', fontSize: 30, color: '#ee5253'}}>
              Welcome!
            </Text>
          </View>
          <View style={styles.signUpFormContainer}>
            <View style={styles.signUpFormItem}>
              <Ionicons name={'mail-outline'} size={22} color={'#ff6b6b'} />
              <TextInput
                placeholder={'Enter your email ...'}
                style={styles.signUpFormInput}
                autoCapitalize="none"
                onChangeText={email => {
                  setSignInInfo({...signInInfo, email: email});
                }}
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
                onChangeText={password => {
                  setSignInInfo({...signInInfo, password: password});
                }}
              />
            </View>

            <CustomButton
              title={'Sign-In'}
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
                signIn();
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
                Create an account?
              </Text>
              <CustomButton
                buttonTextStyle={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  color: '#ee5253',
                  textAlign: 'center',
                  marginLeft: 5,
                }}
                title="Sign-up now!"
                onPress={() => {
                  navigate.navigate('Sign Up');
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

export default SignInScreen;
