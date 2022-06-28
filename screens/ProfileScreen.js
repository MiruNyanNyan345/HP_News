import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import {useSelector} from 'react-redux';
import {selectUserEmail, selectUserName} from '../redux/slices/authSlice';

const ProfileScreen = () => {
  const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectUserEmail);
  const [editProfile, setEditProfile] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.profileIconContainer}>
        <Image source={require('../res/user.png')} style={styles.userIcon} />
      </View>
      <View style={styles.userInfoContainer}>
        <View style={styles.userInfoFieldContainer}>
          <Text style={styles.userInfoLabel}>Username:</Text>
          <TextInput
            defaultValue={userName}
            editable={editProfile}
            style={
              editProfile
                ? {...styles.userInfoText, color: '#000'}
                : {...styles.userInfoText, color: '#b2c1d1'}
            }
          />
        </View>
        <View style={styles.userInfoFieldContainer}>
          <Text style={styles.userInfoLabel}>E-mail:</Text>
          <TextInput
            defaultValue={userEmail}
            editable={editProfile}
            style={
              editProfile
                ? {...styles.userInfoText, color: '#000'}
                : {...styles.userInfoText, color: '#b2c1d1'}
            }
          />
        </View>
        {resetPassword ? (
          <View style={styles.profileButtonsContainer}>
            <CustomButton
              buttonContainerStyle={styles.profileButtonContainer}
              buttonTextStyle={styles.profileButtonText}
              title={'Edit Profile'}
              onPress={() => {
                editProfile === false
                  ? setEditProfile(true)
                  : setEditProfile(false);
              }}
            />
            <CustomButton
              buttonContainerStyle={styles.profileButtonContainer}
              buttonTextStyle={styles.profileButtonText}
              title={'Reset Password'}
              onPress={() => {
                resetPassword === false
                  ? setResetPassword(true)
                  : setResetPassword(false);
              }}
            />
            <CustomButton
              buttonContainerStyle={styles.profileButtonContainer}
              buttonTextStyle={styles.profileButtonText}
              title={'Logout'}
            />
          </View>
        ) : (
          <View>
            <View>
              <View style={styles.userInfoFieldContainer}>
                <Text style={styles.userInfoLabel}>Current Password:</Text>
                <TextInput secureTextEntry={true} style={styles.userInfoText} />
              </View>
              <View style={styles.userInfoFieldContainer}>
                <Text style={styles.userInfoLabel}>New Password:</Text>
                <TextInput secureTextEntry={true} style={styles.userInfoText} />
              </View>
              <View style={styles.userInfoFieldContainer}>
                <Text style={styles.userInfoLabel}>Confirm Password:</Text>
                <TextInput style={styles.userInfoText} />
              </View>
            </View>

            <View style={styles.profileButtonsContainer}>
              <CustomButton
                buttonContainerStyle={styles.profileButtonContainer}
                buttonTextStyle={styles.profileButtonText}
                title={'Save'}
                onPress={() => {
                  resetPassword === false
                    ? setResetPassword(true)
                    : setResetPassword(false);
                }}
              />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  profileIconContainer: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfoLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#5f27cd',
  },
  userInfoText: {
    paddingVertical: 5,
    fontSize: 14,
    fontWeight: '600',
    borderBottomWidth: 0.6,
    borderColor: '#ff6b6b',
  },
  userInfoContainer: {flexDirection: 'column', flex: 1, marginHorizontal: 70},
  userInfoFieldContainer: {flexDirection: 'column', marginVertical: 10},
  userIcon: {
    width: 100,
    height: 100,
  },
  profileButtonsContainer: {
    paddingBottom: 150,
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
