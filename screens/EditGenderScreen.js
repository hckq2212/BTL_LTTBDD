import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DatePicker } from 'react-native-paper'; // Assuming you're using a date picker from react-native-paper

const EditBirthdayScreen = ({ navigation, route }) => {
  const [birthday, setBirthday] = useState(route.params.value);

  const handleSave = () => {
    navigation.navigate('Profile', { updatedValue: birthday, field: 'Birthday' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Your Birthday:</Text>
      <DatePicker
        date={birthday}
        onDateChange={setBirthday}
        mode="date"
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
  saveButton: {
    backgroundColor: '#00f',
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

export default EditBirthdayScreen;
