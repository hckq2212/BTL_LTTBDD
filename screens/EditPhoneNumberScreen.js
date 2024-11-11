import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfileInfo } from '../reduxToolkit/productsSlice';

const EditPhoneNumberScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.products.profile);
  const accountLoggedIn = useSelector((state) => state.products.accountLoggedIn);

  const [phoneNumber, setPhoneNumber] = useState(profile?.phoneNumber || '');

  useEffect(() => {
    if (profile?.phoneNumber) {
      setPhoneNumber(profile.phoneNumber); // Đảm bảo giá trị ban đầu được đồng bộ từ profile
    }
  }, [profile]);

  const handleSave = () => {
    if (!phoneNumber) {
      Alert.alert('Validation Error', 'Phone number cannot be empty');
      return;
    }

    const phoneNumberRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
    if (!phoneNumberRegex.test(phoneNumber)) {
      Alert.alert('Validation Error', 'Invalid phone number format');
      return;
    }

    dispatch(updateProfileInfo({ uid: accountLoggedIn, updatedData: { phoneNumber } }))
      .unwrap()
      .then(() => {
        Alert.alert('Success', 'Phone number updated successfully');
        navigation.navigate('ProfileScreen', { updatedValue: phoneNumber, field: 'PhoneNumber' });
      })
      .catch((error) => {
        console.error('Error updating phone number:', error);
        Alert.alert('Error', 'Failed to update phone number');
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        placeholder="Enter your phone number"
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditPhoneNumberScreen;
