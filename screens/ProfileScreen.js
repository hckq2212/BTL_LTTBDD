import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image, SafeAreaView, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../reduxToolkit/productsSlice';

const ProfileInfo = () => {
  const accountLoggedIn = useSelector((state) => state.products.accountLoggedIn);
  const profiles = useSelector((state) => state.products.profile);

  const userProfile = profiles.find(profile => profile.account_id === accountLoggedIn?.id);

console.log('accountLoggedIn:', accountLoggedIn);
console.log('profiles:', profiles);
console.log('userProfile:', userProfile);

  return (
    <View style={profileInfoStyles.container}>
      <Image
        source={require('../assets/Profile/avatar.png')}
        style={profileInfoStyles.image}
      />
      <View>
        <Text style={profileInfoStyles.name}>{userProfile ? userProfile.name : 'User Name'}</Text>
        <Text style={profileInfoStyles.username}>{accountLoggedIn ? `@${accountLoggedIn.name}` : '@username'}</Text>
      </View>
    </View>
  );
};

const profileInfoStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginRight: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#223263',
    fontFamily: 'Poppins',
    marginBottom: 4,
  },
  username: {
    fontSize: 14,
    color: '#9098b1',
    fontFamily: 'Poppins',
    lineHeight: 20,
  }
});

const ProfileItem = ({ icon, label, value, onPress }) => {
  return (
    <TouchableOpacity style={profileItemStyles.card} onPress={onPress}>
      <View style={profileItemStyles.container}>
        <Image source={icon} style={profileItemStyles.icon} />
        <Text style={profileItemStyles.label}>{label}</Text>
        <Text style={profileItemStyles.value} numberOfLines={1}>{value}</Text>
        <Ionicons name="chevron-forward-outline" size={20} color="#223263" style={profileItemStyles.arrow} />
      </View>
    </TouchableOpacity>
  );
};

const ProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const accountLoggedIn = useSelector((state) => state.products.accountLoggedIn);
  const profiles = useSelector((state) => state.products.profile);

  const userProfile = profiles.find(profile => profile.account_id === (accountLoggedIn ? accountLoggedIn.id : null));

  const [gender, setGender] = useState(userProfile?.gender || 'Not specified');
  const [birthday, setBirthday] = useState(userProfile?.birthdate || 'Not specified');
  const [email, setEmail] = useState(accountLoggedIn?.email || 'Not specified');
  const [phoneNumber, setPhoneNumber] = useState(userProfile?.phoneNumber || 'Not specified');

  useEffect(() => {
    if (route.params?.updatedValue) {
      switch (route.params.field) {
        case 'Gender':
          setGender(route.params.updatedValue);
          break;
        case 'Birthday':
          setBirthday(route.params.updatedValue);
          break;
        case 'Email':
          setEmail(route.params.updatedValue);
          break;
        case 'Phone Number':
          setPhoneNumber(route.params.updatedValue);
          break;
        default:
          break;
      }
    }
  }, [route.params]);

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", onPress: () => {
            dispatch(logout()); 
            navigation.navigate('LoginScreen');
          } 
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ProfileInfo />
      <ProfileItem
        icon={require('../assets/Profile/Gender.png')}
        label='Gender'
        value={gender}
        onPress={() => navigation.navigate('Gender', { value: gender, field: 'Gender' })}
      />
      <ProfileItem
        icon={require('../assets/Profile/Date.png')}
        label='Birthday'
        value={birthday}
        onPress={() => navigation.navigate('Birthday', { value: birthday, field: 'Birthday' })}
      />
      <ProfileItem
        icon={require('../assets/Profile/Message.png')}
        label='Email'
        value={email}
        onPress={() => navigation.navigate('Email', { value: email, field: 'Email' })}
      />
      <ProfileItem
        icon={require('../assets/Profile/Phone.png')}
        label='Phone Number'
        value={phoneNumber}
        onPress={() => navigation.navigate('PhoneNumber', { value: phoneNumber, field: 'PhoneNumber' })}
      />
      <ProfileItem
        icon={require('../assets/Profile/PasswordBlue.png')}
        label='Change Password'
        value='••••••••'
        onPress={() => navigation.navigate('Password', { field: 'Password' })}
      />
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const profileItemStyles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 16,
    elevation: 3,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 56,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ebf0ff',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  label: {
    flex: 1,
    fontSize: 14,
    color: '#223263',
    fontFamily: 'Poppins',
    fontWeight: '600',
  },
  value: {
    color: '#9098b1',
    fontFamily: 'Poppins',
    fontSize: 14,
    marginRight: 8,
    textAlign: 'right',
  },
  arrow: {
    marginLeft: 8,
  },
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  logoutButton: {
    backgroundColor: '#FF4D4D',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
