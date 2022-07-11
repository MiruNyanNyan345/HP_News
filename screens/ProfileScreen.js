import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectIsLoggedIn,
  selectUserEmail,
  selectUserName,
  setSignOut,
} from '../redux/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {HP_News_API_ADDRESS} from '../Constants';
import {tokenExpired, verifyToken} from '../services/auth';

const ProfileScreen = props => {
  const dispatch = useDispatch();

  const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectUserEmail);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    console.log('isLoggedIn: ' + isLoggedIn);
    console.log('userEmail: ' + userEmail);
    console.log('userName: ' + userName);
  }, []);

  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [editUsername, setEditUsername] = useState(false);
  const [editUserEmail, setEditUserEmail] = useState(false);

  const [curPassword, setCurPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmaNewPassword, setConfirmaNewPassword] = useState('');
  const [resetPassword, setResetPassword] = useState(false);

  const changeProfileInfo = async () => {
    const access = JSON.parse(await AsyncStorage.getItem('auth')).access;
    fetch(
      editUsername
        ? 'http://' + HP_News_API_ADDRESS + '/user/token/change_username/'
        : 'http://' + HP_News_API_ADDRESS + '/user/token/change_email/',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: 'JWT ' + access,
          'Content-Type': 'application/json',
        },
        body: editUsername
          ? JSON.stringify({username: newUserName})
          : JSON.stringify({email: newUserEmail}),
      },
    )
      .then(async r => {
        if (r.status === 200) {
          Alert.alert(
            editUsername ? 'Updated Username' : 'Updated Email',
            'Please sign in again.',
            [
              {
                text: 'Leave',
                onPress: async () => {
                  await AsyncStorage.removeItem('auth');
                  dispatch(setSignOut());
                  props.navigation.navigate('DrawerNavSignIn');
                },
              },
            ],
          );
        } else {
          const valid_err = await r.json();
          Object.keys(valid_err).forEach(k => {
            Alert.alert(k, valid_err[k][0]);
          });
        }
      })
      .catch(error => {
        const err_msg = error.message;
        console.log('Error: ' + err_msg);
      });
  };

  const changePassword = async () => {
    const access = JSON.parse(await AsyncStorage.getItem('auth')).access;
    fetch('http://' + HP_News_API_ADDRESS + '/user/token/change_password/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: 'JWT ' + access,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: curPassword,
        new_password: newPassword,
        confirm_new_password: confirmaNewPassword,
      }),
    })
      .then(async r => {
        if (r.status === 200) {
          Alert.alert('Updated Password', 'Please sign in again.', [
            {
              text: 'Leave',
              onPress: async () => {
                await AsyncStorage.removeItem('auth');
                dispatch(setSignOut());
                props.navigation.navigate('DrawerNavSignIn');
              },
            },
          ]);
        } else {
          const valid_err = await r.json();
          Object.keys(valid_err).forEach(k => {
            Alert.alert(k, valid_err[k][0]);
          });
        }
      })
      .catch(error => {
        const err_msg = error.message;
        console.log('Error: ' + err_msg);
      });
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
          <View style={styles.profileIconContainer}>
            <Image
              source={require('../res/user.png')}
              style={styles.userIcon}
            />
          </View>
          <View style={styles.userInfoContainer}>
            <View style={styles.userInfoFieldContainer}>
              <Text style={styles.userInfoLabel}>Username:</Text>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <TextInput
                    defaultValue={userName}
                    editable={editUsername}
                    style={
                      editUsername && editUserEmail === false
                        ? styles.editAbleUserInfoText
                        : styles.editDisableUserInfoText
                    }
                    onChangeText={name => {
                      setNewUserName(name);
                    }}
                  />
                </View>
                <CustomButton
                  isIconBG
                  buttonIconName={'create-outline'}
                  buttonIconSize={25}
                  buttonIconColor={
                    editUserEmail || resetPassword ? '#b2c1d1' : '#ee5253'
                  }
                  onPress={async () => {
                    const tokenIsValid = await verifyToken();
                    if (tokenIsValid) {
                      editUsername === false
                        ? setEditUsername(true)
                        : setEditUsername(false);
                    } else {
                      tokenExpired({
                        dispatch: dispatch,
                        navigation: props.navigation,
                      });
                    }
                  }}
                  disabled={editUserEmail || resetPassword}
                />
              </View>
            </View>
            <View style={styles.userInfoFieldContainer}>
              <Text style={styles.userInfoLabel}>E-mail:</Text>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <TextInput
                    defaultValue={userEmail}
                    editable={editUserEmail}
                    onChangeText={email => setNewUserEmail(email)}
                    style={
                      editUserEmail && editUsername === false
                        ? styles.editAbleUserInfoText
                        : styles.editDisableUserInfoText
                    }
                  />
                </View>
                <CustomButton
                  isIconBG
                  buttonIconName={'create-outline'}
                  buttonIconSize={25}
                  buttonIconColor={
                    editUsername || resetPassword ? '#b2c1d1' : '#ee5253'
                  }
                  onPress={async () => {
                    const tokenIsValid = await verifyToken();
                    if (tokenIsValid) {
                      editUserEmail === false
                        ? setEditUserEmail(true)
                        : setEditUserEmail(false);
                    } else {
                      tokenExpired({
                        dispatch: dispatch,
                        navigation: props.navigation,
                      });
                    }
                  }}
                  disabled={editUsername || resetPassword}
                />
              </View>
            </View>

            {resetPassword === false ? (
              <View style={styles.profileButtonsContainer}>
                {editUsername || editUserEmail ? (
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <CustomButton
                      buttonContainerStyle={{
                        ...styles.profileButtonContainer,
                        marginHorizontal: 10,
                        flex: 1,
                      }}
                      buttonTextStyle={styles.profileButtonText}
                      title={'Save'}
                      onPress={() => {
                        changeProfileInfo();
                      }}
                    />
                    <CustomButton
                      buttonContainerStyle={{
                        ...styles.profileButtonContainer,
                        flex: 1,
                        marginHorizontal: 10,
                      }}
                      buttonTextStyle={styles.profileButtonText}
                      title={'Cancel'}
                      onPress={() => {
                        editUserEmail
                          ? setEditUserEmail(false)
                          : editUsername
                          ? setEditUsername(false)
                          : null;
                      }}
                    />
                  </View>
                ) : (
                  <View>
                    <CustomButton
                      buttonContainerStyle={styles.profileButtonContainer}
                      buttonTextStyle={styles.profileButtonText}
                      title={'Reset Password'}
                      onPress={async () => {
                        const tokenIsValid = await verifyToken();
                        if (tokenIsValid) {
                          resetPassword === false
                            ? setResetPassword(true)
                            : setResetPassword(false);
                        } else {
                          tokenExpired({
                            dispatch: dispatch,
                            navigation: props.navigation,
                          });
                        }
                      }}
                    />
                    <CustomButton
                      buttonContainerStyle={styles.profileButtonContainer}
                      buttonTextStyle={styles.profileButtonText}
                      title={'Logout'}
                      onPress={() =>
                        Alert.alert('Sign Out?', '', [
                          {
                            text: 'Leave',
                            onPress: async () => {
                              await AsyncStorage.removeItem('auth');
                              dispatch(setSignOut());
                              props.navigation.navigate('DrawerNavSignIn');
                            },
                          },
                          {
                            text: 'Cancel',
                          },
                        ])
                      }
                    />
                  </View>
                )}
              </View>
            ) : (
              <View>
                <View>
                  <View style={styles.userInfoFieldContainer}>
                    <Text style={styles.userInfoLabel}>Current Password:</Text>
                    <TextInput
                      secureTextEntry={true}
                      style={styles.editAbleUserInfoText}
                      onChangeText={pwd => setCurPassword(pwd)}
                    />
                  </View>
                  <View style={styles.userInfoFieldContainer}>
                    <Text style={styles.userInfoLabel}>New Password:</Text>
                    <TextInput
                      secureTextEntry={true}
                      style={styles.editAbleUserInfoText}
                      onChangeText={pwd => setNewPassword(pwd)}
                    />
                  </View>
                  <View style={styles.userInfoFieldContainer}>
                    <Text style={styles.userInfoLabel}>Confirm Password:</Text>
                    <TextInput
                      secureTextEntry={true}
                      style={styles.editAbleUserInfoText}
                      onChangeText={pwd => setConfirmaNewPassword(pwd)}
                    />
                  </View>
                </View>

                {/*<View style={styles.profileButtonsContainer}>*/}
                {/*  <CustomButton*/}
                {/*    buttonContainerStyle={styles.profileButtonContainer}*/}
                {/*    buttonTextStyle={styles.profileButtonText}*/}
                {/*    title={'Save'}*/}
                {/*    onPress={() => {*/}
                {/*      changePassword();*/}
                {/*    }}*/}
                {/*  />*/}
                {/*</View>*/}
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <CustomButton
                    buttonContainerStyle={{
                      ...styles.profileButtonContainer,
                      marginHorizontal: 10,
                      flex: 1,
                    }}
                    buttonTextStyle={styles.profileButtonText}
                    title={'Save'}
                    onPress={() => {
                      changePassword();
                    }}
                  />
                  <CustomButton
                    buttonContainerStyle={{
                      ...styles.profileButtonContainer,
                      flex: 1,
                      marginHorizontal: 10,
                    }}
                    buttonTextStyle={styles.profileButtonText}
                    title={'Cancel'}
                    onPress={() => {
                      resetPassword ? setResetPassword(false) : null;
                    }}
                  />
                </View>
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  profileIconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfoLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#5f27cd',
  },
  editAbleUserInfoText: {
    paddingVertical: 5,
    fontSize: 17,
    fontWeight: '600',
    borderBottomWidth: 0.6,
    borderColor: '#ff6b6b',
    color: '#000',
  },
  editDisableUserInfoText: {
    paddingVertical: 5,
    fontSize: 17,
    fontWeight: '600',
    borderBottomWidth: 0.6,
    borderColor: '#ff6b6b',
    color: '#b2c1d1',
  },
  userInfoContainer: {
    flexDirection: 'column',
    flex: 1,
    marginHorizontal: 70,
    marginBottom: 400,
  },
  userInfoFieldContainer: {flexDirection: 'column', marginVertical: 10},
  userIcon: {
    width: 100,
    height: 100,
  },
  profileButtonsContainer: {
    // paddingBottom: 150,
    flexDirection: 'column',
    marginHorizontal: 10,
  },
  profileButtonContainer: {
    borderWidth: 0.5,
    borderColor: '#ee5253',
    backgroundColor: '#ee5253',
    marginTop: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  profileButtonText: {
    fontSize: 16,
    paddingVertical: 5,
    fontWeight: '600',
    color: '#fff',
  },
});

export default ProfileScreen;
