import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';

const EditGenderScreen = ({ navigation, route }) => {
  const [gender, setGender] = useState(route.params.value);

  const handleSave = () => {
    navigation.navigate('Profile', { updatedValue: gender, field: 'Gender' });
  };

  return (
    <View style={styles.container}>
      <RadioButton.Group onValueChange={value => setGender(value)} value={gender}>
        <View style={styles.radioItem}>
          <RadioButton value="Male" />
          <Text>Male</Text>
        </View>
        <View style={styles.radioItem}>
          <RadioButton value="Female" />
          <Text>Female</Text>
        </View>
        <View style={styles.radioItem}>
          <RadioButton value="Other" />
          <Text>Other</Text>
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
    fontWeight: 'bold',
    marginBottom: 16,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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

export default EditGenderScreen;
