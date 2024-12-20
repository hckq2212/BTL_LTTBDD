import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Appbar, RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPaymentMethods, updatePaymentMethod } from '../reduxToolkit/productsSlice';

const AddPaymentMethodScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const paymentMethods = useSelector((state) => state.products.paymentMethods);

  const [selectedCard, setSelectedCard] = useState('visa');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');

  useEffect(() => {
    dispatch(fetchPaymentMethods());
  }, [dispatch]);

  const handleAddCard = () => {
    if (!cardNumber || !expiryDate || !cvv || !cardName) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
      return;
    }

    const selectedMethod = paymentMethods.find(
      (method) => method.name.toLowerCase() === selectedCard
    );

    if (!selectedMethod) {
      Alert.alert('Lỗi', 'Phương thức thanh toán không hợp lệ');
      return;
    }

    const newAccount = `${selectedMethod.name} **** ${cardNumber.slice(-4)}`;
    const updatedAccounts = [...selectedMethod.accounts, newAccount];

    dispatch(
      updatePaymentMethod({
        id: selectedMethod.id,
        updatedData: { ...selectedMethod, accounts: updatedAccounts },
      })
    )
      .unwrap()
      .then(() => {
        Alert.alert('Thành công', 'Thẻ đã được thêm thành công');
        navigation.goBack();
      })
      .catch((error) => {
        console.error('Error updating payment method:', error);
        Alert.alert('Lỗi', 'Không thể thêm thẻ. Vui lòng thử lại.');
      });
  };

  const renderCardInputs = () => (
    <>
      <Text style={styles.label}>Số thẻ</Text>
      <TextInput
        style={styles.input}
        placeholder="1234 5678 9012 3456"
        keyboardType="numeric"
        value={cardNumber}
        onChangeText={setCardNumber}
        placeholderTextColor="#9098b1"
        maxLength={19}
      />
      <View style={styles.row}>
        <View style={styles.halfContainer}>
          <Text style={styles.label}>Ngày hết hạn</Text>
          <TextInput
            style={styles.input}
            placeholder="MM/YY"
            keyboardType="numeric"
            value={expiryDate}
            onChangeText={setExpiryDate}
            placeholderTextColor="#9098b1"
            maxLength={5}
          />
        </View>
        <View style={styles.halfContainer}>
          <Text style={styles.label}>CVV</Text>
          <TextInput
            style={styles.input}
            placeholder="123"
            keyboardType="numeric"
            value={cvv}
            onChangeText={setCvv}
            secureTextEntry
            placeholderTextColor="#9098b1"
            maxLength={3}
          />
        </View>
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Thêm phương thức thanh toán" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.card}>
          <Text style={styles.label}>Chọn loại thẻ</Text>
          <RadioButton.Group onValueChange={setSelectedCard} value={selectedCard}>
            <View style={styles.radioButtonRow}>
              <RadioButton.Item label="Visa" value="visa" />
              <RadioButton.Item label="MasterCard" value="mastercard" />
            </View>
            <View style={styles.radioButtonRow}>
              <RadioButton.Item label="JCB" value="jcb" />
              <RadioButton.Item label="UnionPay" value="unionpay" />
            </View>
          </RadioButton.Group>

          {renderCardInputs()}

          <Text style={styles.label}>Tên trên thẻ</Text>
          <TextInput
            style={styles.input}
            placeholder="Nguyễn Văn A"
            value={cardName}
            onChangeText={setCardName}
            placeholderTextColor="#9098b1"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleAddCard}>
          <Text style={styles.buttonText}>Thêm thẻ</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fa',
  },
  appbar: {
    backgroundColor: '#40bfff',
  },
  scrollView: {
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  label: {
    fontSize: 16,
    color: '#223263',
    fontWeight: '600',
    marginBottom: 8,
    fontFamily: 'Poppins',
  },
  input: {
    backgroundColor: '#f7f8fa',
    padding: 12,
    borderRadius: 5,
    marginBottom: 15,
    borderColor: '#ebf0ff',
    borderWidth: 1,
    color: '#223263',
    fontSize: 14,
    fontFamily: 'Poppins',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfContainer: {
    width: '48%',
  },
  radioButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#40bfff',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Poppins',
  },
});

export default AddPaymentMethodScreen;
