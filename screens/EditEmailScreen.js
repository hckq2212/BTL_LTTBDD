import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateAccount } from '../reduxToolkit/productsSlice'; 

const EditEmailScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.products.profile);
  const accountLoggedIn = useSelector((state) => state.products.accountLoggedIn);

  const userProfile = profiles.find(profile => profile.account_id === (accountLoggedIn ? accountLoggedIn.id : null));
  const [email, setEmail] = useState(accountLoggedIn?.email); 

  const handleSave = () => {
    if (!email) {
      Alert.alert("Validation Error", "Email cannot be empty");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      Alert.alert("Validation Error", "Invalid email format. Please enter a valid email address.");
      return;
    }

    dispatch(updateAccount({ id: userProfile.id, updatedData: { email } }));

    if (accountLoggedIn && accountLoggedIn.id === userProfile.id) {
      dispatch(updateAccount({ id: accountLoggedIn.id, updatedData: { email } }));
    }

    navigation.navigate('ProfileScreen', { updatedValue: email, field: 'Email' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Your New Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholder="Enter your new email"
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
  label: {
    fontSize: 18,
    marginBottom: 10,
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

export default EditEmailScreen;
