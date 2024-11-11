import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  SafeAreaView,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { logout, fetchUserProfile } from '../reduxToolkit/productsSlice';

const ProfileInfo = () => {
  const dispatch = useDispatch();
  const accountLoggedIn = useSelector((state) => state.products.accountLoggedIn);
  const profile = useSelector((state) => state.products.profile);

  return (
    <View style={profileInfoStyles.container}>
      <Image
        source={require('../assets/Profile/avatar.png')}
        style={profileInfoStyles.image}
      />
      <View>
        <Text style={profileInfoStyles.name}>{profile?.fullName || 'User Name'}</Text>
        <Text style={profileInfoStyles.username}>{profile?.email || '@username'}</Text>
      </View>
    </View>
  );
};

const ProfileItem = ({ icon, label, value, onPress }) => (
  <TouchableOpacity style={profileItemStyles.card} onPress={onPress}>
    <View style={profileItemStyles.container}>
      <Image source={icon} style={profileItemStyles.icon} />
      <Text style={profileItemStyles.label}>{label}</Text>
      <Text style={profileItemStyles.value} numberOfLines={1}>
        {value}
      </Text>
      <Ionicons name="chevron-forward-outline" size={20} color="#223263" />
    </View>
  </TouchableOpacity>
);

const ProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.products.profile);

  const [userDetails, setUserDetails] = useState({
    gender: profile?.gender || 'Not specified',
    birthday: profile?.birthdate || 'Not specified',
    email: profile?.email || 'Not specified',
    phoneNumber: profile?.phoneNumber || 'Not specified',
  });

  useEffect(() => {
    if (route.params?.updatedValue) {
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        [route.params.field.toLowerCase()]: route.params.updatedValue,
      }));
    }
  }, [route.params]);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        onPress: () => {
          dispatch(logout());
          navigation.navigate('LoginScreen');
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ProfileInfo />
      <ProfileItem
        icon={require('../assets/Profile/Gender.png')}
        label="Gender"
        value={userDetails.gender}
        onPress={() => navigation.navigate('Gender', { value: userDetails.gender, field: 'Gender' })}
      />
      <ProfileItem
        icon={require('../assets/Profile/Date.png')}
        label="Birthday"
        value={userDetails.birthday}
        onPress={() =>
          navigation.navigate('Birthday', { value: userDetails.birthday, field: 'Birthday' })
        }
      />
      <ProfileItem
        icon={require('../assets/Profile/Message.png')}
        label="Email"
        value={userDetails.email}
        onPress={() => navigation.navigate('Email', { value: userDetails.email, field: 'Email' })}
      />
      <ProfileItem
        icon={require('../assets/Profile/Phone.png')}
        label="Phone Number"
        value={userDetails.phoneNumber}
        onPress={() =>
          navigation.navigate('PhoneNumber', { value: userDetails.phoneNumber, field: 'PhoneNumber' })
        }
      />
      <ProfileItem
        icon={require('../assets/Profile/PasswordBlue.png')}
        label="Change Password"
        value="••••••••"
        onPress={() => navigation.navigate('Password', { field: 'Password' })}
      />
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// Styles
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
  },
  username: {
    fontSize: 14,
    color: '#9098b1',
    fontFamily: 'Poppins',
  },
});

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
    padding: 16,
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
  },
  value: {
    fontSize: 14,
    color: '#9098b1',
    fontFamily: 'Poppins',
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
