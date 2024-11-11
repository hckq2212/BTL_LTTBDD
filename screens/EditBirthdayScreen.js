import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfileInfo } from '../reduxToolkit/productsSlice';

const EditBirthdayScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.products.profile);
  const accountLoggedIn = useSelector((state) => state.products.accountLoggedIn);

  const [birthday, setBirthday] = useState(new Date(profile?.birthdate || Date.now()));
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = () => {
    const formattedDate = birthday.toISOString().split('T')[0];
    dispatch(updateProfileInfo({ uid: accountLoggedIn, updatedData: { birthdate: formattedDate } }))
      .unwrap()
      .then(() => {
        Alert.alert('Success', 'Birthday updated successfully');
        navigation.navigate('ProfileScreen', { updatedValue: formattedDate, field: 'Birthday' });
      })
      .catch((error) => {
        Alert.alert('Error', 'Failed to update birthday');
        console.error('Error updating birthday:', error);
      });
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
          maximumDate={new Date()} // Giới hạn chọn ngày trong quá khứ
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
