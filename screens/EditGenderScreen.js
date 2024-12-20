import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfileInfo } from '../reduxToolkit/productsSlice'; // Assume correct function

const EditGenderScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.products.profile); // Directly access if profile is an object
  const accountLoggedIn = useSelector((state) => state.products.accountLoggedIn);

  const [gender, setGender] = useState(profile?.gender || 'Not specified');

  const handleSave = () => {
    if (!gender) {
      Alert.alert('Validation Error', 'Please select a gender');
      return;
    }

    dispatch(updateProfileInfo({ uid: accountLoggedIn, updatedData: { gender } }))
      .unwrap()
      .then(() => {
        Alert.alert('Success', 'Gender updated successfully');
        navigation.navigate('ProfileScreen', { updatedValue: gender, field: 'Gender' });
      })
      .catch((error) => {
        Alert.alert('Error', 'Failed to update gender');
        console.error('Error updating gender:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Your Gender:</Text>
      <RadioButton.Group onValueChange={value => setGender(value)} value={gender}>
        <View style={styles.radioItem}>
          <RadioButton value="Male" />
          <Text style={styles.radioLabel}>Male</Text>
        </View>
        <View style={styles.radioItem}>
          <RadioButton value="Female" />
          <Text style={styles.radioLabel}>Female</Text>
        </View>
        <View style={styles.radioItem}>
          <RadioButton value="Other" />
          <Text style={styles.radioLabel}>Other</Text>
        </View>
      </RadioButton.Group>
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
    fontWeight: '600',
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  radioLabel: {
    fontSize: 16,
    marginLeft: 8,
    color: '#223263',
  },
  saveButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditGenderScreen;
