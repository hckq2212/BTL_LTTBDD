import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfileInfo } from '../reduxToolkit/productsSlice';

const EditEmailScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.products.profile);
  const accountLoggedIn = useSelector((state) => state.products.accountLoggedIn);

  const [email, setEmail] = useState(profile?.email || '');

  const handleSave = () => {
    if (!email) {
      Alert.alert('Validation Error', 'Email cannot be empty');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Validation Error', 'Invalid email format. Please enter a valid email address.');
      return;
    }

    dispatch(updateProfileInfo({ uid: accountLoggedIn, updatedData: { email } }))
      .unwrap()
      .then(() => {
        Alert.alert('Success', 'Email updated successfully');
        navigation.navigate('ProfileScreen', { updatedValue: email, field: 'Email' });
      })
      .catch((error) => {
        Alert.alert('Error', 'Failed to update email');
        console.error('Error updating email:', error);
      });
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
        autoCapitalize="none"
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
