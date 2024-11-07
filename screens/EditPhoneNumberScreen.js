import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateAccount } from '../reduxToolkit/productsSlice';

const EditPhoneNumberScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.products.profile);
  const accountLoggedIn = useSelector((state) => state.products.accountLoggedIn);

  const userProfile = profiles.find(profile => profile.account_id === (accountLoggedIn ? accountLoggedIn.id : null));
  const [phoneNumber, setPhoneNumber] = useState(userProfile.phoneNumber); 

  const handleSave = () => {
    if (!phoneNumber) {
      Alert.alert("Validation Error", "Phone number cannot be empty");
      return;
    }

    const phoneNumberRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
    if (!phoneNumberRegex.test(phoneNumber)) {
      Alert.alert("Validation Error", "Invalid phone number format");
      return;
    }

    dispatch(updateAccount({ id: userProfile.id, updatedData: { phoneNumber } }));

    if (accountLoggedIn && accountLoggedIn.id === userProfile.id) {
      dispatch(updateAccount({ id: accountLoggedIn.id, updatedData: { phoneNumber } }));
    }

    navigation.navigate('ProfileScreen', { updatedValue: phoneNumber, field: 'PhoneNumber' });
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
