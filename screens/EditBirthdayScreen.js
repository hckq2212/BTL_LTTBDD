import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../reduxToolkit/productsSlice';

const EditBirthdayScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.products.profile);
  const accountLoggedIn = useSelector((state) => state.products.accountLoggedIn);

  const userProfile = profiles.find(profile => profile.account_id === (accountLoggedIn ? accountLoggedIn.id : null));
  const [birthday, setBirthday] = useState(new Date(userProfile.birthdate)); 
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = () => {
    dispatch(updateUserProfile({ id: userProfile.id, updatedData: { birthdate: birthday.toISOString().split('T')[0] } }));
    navigation.navigate('ProfileScreen', { updatedValue: birthday.toISOString().split('T')[0], field: 'Birthday' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Your Birthday:</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateInput}>
        <Text style={styles.dateText}>{birthday.toISOString().split('T')[0]}</Text> 
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={birthday}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setBirthday(selectedDate);
            }
          }}
        />
      )}
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
  dateInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
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

export default EditBirthdayScreen;
