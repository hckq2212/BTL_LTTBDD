import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { auth } from '../firebaseConfig';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';

const EditPasswordScreen = ({ navigation }) => {
  const [oldPasswordInput, setOldPasswordInput] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = async () => {
    if (!oldPasswordInput) {
      Alert.alert('Validation Error', 'Old password cannot be empty');
      return;
    }

    if (!newPassword) {
      Alert.alert('Validation Error', 'New password cannot be empty');
      return;
    }

    if (newPassword.length < 8 || newPassword.length > 15) {
      Alert.alert(
        'Validation Error',
        'New password must be between 8 and 15 characters long'
      );
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
    if (!passwordRegex.test(newPassword)) {
      Alert.alert(
        'Validation Error',
        'New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      );
      return;
    }

    if (!confirmPassword) {
      Alert.alert('Validation Error', 'Confirm password cannot be empty');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Validation Error', 'New passwords do not match');
      return;
    }

    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user.email, oldPasswordInput);

    try {
      // Xác thực lại
      await reauthenticateWithCredential(user, credential);
      // Cập nhật mật khẩu mới
      await updatePassword(user, newPassword);
      Alert.alert('Success', 'Password updated successfully');
      navigation.navigate('ProfileScreen');
    } catch (error) {
      console.error('Error updating password:', error);
      Alert.alert('Error', error.message || 'Failed to update password');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={oldPasswordInput}
        onChangeText={setOldPasswordInput}
        placeholder="Old Password"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        value={newPassword}
        onChangeText={setNewPassword}
        placeholder="New Password"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm New Password"
        secureTextEntry
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

export default EditPasswordScreen;
