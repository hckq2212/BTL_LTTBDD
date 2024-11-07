import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const EditBirthdayScreen = ({ navigation, route }) => {
  const [birthday, setBirthday] = useState(route.params.value);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = () => {
    if (!birthday) {
      Alert.alert("Validation Error", "Birthday cannot be empty");
      return;
    }

    const selectedDate = new Date(birthday);
    const currentDate = new Date();
    if (selectedDate > currentDate) {
      Alert.alert("Validation Error", "Birthday cannot be in the future");
      return;
    }

    navigation.navigate('Profile', { updatedValue: birthday, field: 'Birthday' });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <TextInput
          style={styles.input}
          value={birthday}
          editable={false}
        />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={new Date(birthday)}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setBirthday(selectedDate.toISOString().split('T')[0]);
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

export default EditBirthdayScreen;
