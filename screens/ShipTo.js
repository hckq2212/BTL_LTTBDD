import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, StyleSheet, View, TouchableOpacity, FlatList, Modal, TextInput, Alert, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addDeliveryInfo, updateDeliveryInfo, removeDeliveryInfo, fetchDeliveryInfo } from '../reduxToolkit/productsSlice';
import Icon from 'react-native-vector-icons/FontAwesome';
import left from '../assets/Shipto/Left.png';
import add from '../assets/Shipto/Plus.png';
import { useNavigation } from '@react-navigation/native';

const ShipToScreen = ({ route }) => {
  const navigation = useNavigation();
  const { totalItems, totalPrice } = route.params;
  const dispatch = useDispatch();
  const deliveryInfo = useSelector((state) => state.products.deliveryInfo);
  const accountLoggedIn = useSelector((state) => state.products.accountLoggedIn);

  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAddress, setCurrentAddress] = useState({ id: null, name: '', address: '', number: '' });
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  useEffect(() => {
    if (accountLoggedIn) {
      dispatch(fetchDeliveryInfo(accountLoggedIn));
    }
  }, [dispatch, accountLoggedIn]);

  const handleSave = () => {
    const nameRegex = /^[a-zA-Z\s]{2,}$/;
    const phoneRegex = /^[0-9]{9,15}$/;

    if (!currentAddress.name || !nameRegex.test(currentAddress.name)) {
      Alert.alert('Invalid Name', 'Name must contain only letters and at least 2 characters.');
      return;
    }

    if (!currentAddress.address || currentAddress.address.length < 5) {
      Alert.alert('Invalid Address', 'Address must be at least 5 characters long.');
      return;
    }

    if (!currentAddress.number || !phoneRegex.test(currentAddress.number)) {
      Alert.alert('Invalid Phone Number', 'Phone number must be numeric and between 9 to 15 digits.');
      return;
    }

    if (isEditing) {
      dispatch(updateDeliveryInfo({ uid: accountLoggedIn, id: currentAddress.id, updatedInfo: currentAddress }));
    } else {
      dispatch(addDeliveryInfo({ uid: accountLoggedIn, deliveryInfo: { ...currentAddress, id: Date.now().toString() } }));
    }

    setModalVisible(false);
    setCurrentAddress({ id: null, name: '', address: '', number: '' });
  };

  const handleEdit = (item) => {
    setCurrentAddress(item);
    setIsEditing(true);
    setModalVisible(true);
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this address?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => dispatch(removeDeliveryInfo({ uid: accountLoggedIn, id })) },
      ]
    );
  };

  const handleNext = () => {
    if (!selectedAddressId) {
      Alert.alert('Select Address', 'Please select an address to proceed.');
      return;
    }
    navigation.navigate('PaymentMethodsScreen', {
      totalItems, totalPrice,
      selectedAddress: deliveryInfo.find((address) => address.id === selectedAddressId)
    });
  };

  const renderDelivery = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => setSelectedAddressId(item.id)} style={styles.radioButton}>
        <Icon
          name={item.id === selectedAddressId ? 'dot-circle-o' : 'circle-o'}
          size={24}
          color={item.id === selectedAddressId ? '#40BFFF' : '#ccc'}
        />
      </TouchableOpacity>
      <View style={styles.addressDetails}>
        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{item.name}</Text>
        <Text style={{ marginTop: 5 }}>{item.address}</Text>
        <Text style={{ marginTop: 5, marginBottom: 10 }}>{item.number}</Text>
      </View>
      <View style={styles.option}>
        <TouchableOpacity style={styles.edit} onPress={() => handleEdit(item)}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Icon name="trash" size={20} color="#FF6347" style={{ marginTop: 8 }} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.header}>
        <SafeAreaView style={styles.headerLeft}>
          <TouchableOpacity>
            <Image source={left} style={{ marginLeft: 10, marginRight: 10 }} />
          </TouchableOpacity>
          <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Ship To</Text>
        </SafeAreaView>
        <SafeAreaView>
          <TouchableOpacity onPress={() => { setIsEditing(false); setModalVisible(true); }}>
            <Image source={add} style={{ marginRight: 15 }} />
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaView>
      <View style={styles.hr} />

      <SafeAreaView style={styles.deliveryView}>
        <FlatList
          data={deliveryInfo}
          renderItem={renderDelivery}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>

      <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Next</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <SafeAreaView style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{isEditing ? 'Edit Address' : 'Add New Address'}</Text>
          <TextInput
            placeholder="Enter Name"
            placeholderTextColor={'#ccc'}
            value={currentAddress.name}
            onChangeText={(text) => setCurrentAddress({ ...currentAddress, name: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Enter Address"
            placeholderTextColor={'#ccc'}
            value={currentAddress.address}
            onChangeText={(text) => setCurrentAddress({ ...currentAddress, address: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Enter Phone Number"
            placeholderTextColor={'#ccc'}
            value={currentAddress.number}
            onChangeText={(text) => setCurrentAddress({ ...currentAddress, number: text })}
            style={styles.input}
            keyboardType="phone-pad"
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={{ color: 'white' }}>{isEditing ? 'Update' : 'Save'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setModalVisible(false);
                setCurrentAddress({ id: null, name: '', address: '', number: '' });
              }}
            >
              <Text style={{ color: 'white' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  headerLeft: {
    marginTop: 20,
    flexDirection: 'row',
    marginBottom: 15,
  },
  hr: {
    width: '100%',
    borderBottomColor: '#edf1ff',
    borderBottomWidth: 2,
  },
  item: {
    marginTop: 20,
    marginLeft: 20,
    borderWidth: 2,
    borderColor: '#EBF0FF',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    borderRadius: 8,
  },
  radioButton: {
    marginRight: 10,
  },
  addressDetails: {
    flex: 1,
  },
  deliveryView: {
    flex: 1,
  },
  option: {
    flexDirection: 'row',
  },
  edit: {
    width: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#40BFFF',
    height: 40,
    borderRadius: 6,
    marginRight: 10,
    marginBottom: 15,
  },
  nextBtn: {
    flexDirection: 'row',
    width: 300,
    backgroundColor: '#40BFFF',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 6,
    marginBottom: 20,
  },
  modalContainer: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#40BFFF',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
});

export default ShipToScreen;
