import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

const EditPasswordScreen = ({ navigation, route }) => {
  const [oldPassword] = useState(route.params.value);
  const [oldPasswordInput, setOldPasswordInput] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = () => {
    if (!oldPasswordInput) {
      Alert.alert("Validation Error", "Old password cannot be empty");
      return;
    }
    if (oldPassword !== oldPasswordInput) {
      Alert.alert("Validation Error", "Old password is incorrect");
      return;
    }

    if (!newPassword) {
      Alert.alert("Validation Error", "New password cannot be empty");
      return;
    }
    if (newPassword.length < 8 || newPassword.length > 15) {
      Alert.alert("Validation Error", "New password must be between 8 and 15 characters long");
      return;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
    if (!passwordRegex.test(newPassword)) {
      Alert.alert(
        "Validation Error",
        "New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
      return;
    }

    if (!confirmPassword) {
      Alert.alert("Validation Error", "Confirm password cannot be empty");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Validation Error", "New passwords do not match");
      return;
    }

    navigation.navigate('Profile', { updatedValue: newPassword, field: 'Password' });
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
    backgroundColor: '#00f',
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
