import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, View, StyleSheet, Image, TouchableOpacity, ScrollView, Text } from 'react-native';
import { RadioButton, Divider, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const PaymentMethodsScreen = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [expandedMethod, setExpandedMethod] = useState(null);
  const navigation = useNavigation();

  const subtotal = 2800;
  const tax = subtotal * 0.1;
  const fees = 0;
  const totalAmount = subtotal + tax + fees;

 useEffect(() => {
  const fetchPaymentMethods = async () => {
    try {
      const response = await axios.get('https://67231a7a2108960b9cc6ac7c.mockapi.io/paymentMethods');
      setPaymentMethods(response.data);
    } catch (error) {
      console.error("Lỗi khi gọi API: ", error);
    }
  };

  const unsubscribe = navigation.addListener('focus', fetchPaymentMethods);

  return unsubscribe;
}, [navigation]);


  const handleSelectAccount = (method, account) => {
    setSelectedAccount({
      methodTitle: method.name,
      methodIcon: method.image,
      account
    });
  };

  const renderPaymentMethod = useCallback(({ item }) => {
    const toggleExpand = (methodId) => {
      setExpandedMethod(expandedMethod === methodId ? null : methodId);
    };

    return (
      <View style={styles.paymentMethodContainer}>
        <TouchableOpacity onPress={() => toggleExpand(item.id)} style={styles.paymentHeader}>
          <Image source={{ uri: `${item.image}.jpg` }} style={styles.icon} />
          <Text style={styles.title}>{item.name}</Text>
          <IconButton
            icon={expandedMethod === item.id ? 'chevron-up' : 'chevron-down'}
            size={20}
            color="#223263"
          />
        </TouchableOpacity>

        {expandedMethod === item.id && (
          <View style={styles.accountsContainer}>
            {item.accounts.map((account, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelectAccount(item, account)}
                style={[
                  styles.accountOption,
                  selectedAccount?.account === account && styles.selectedAccountOption
                ]}
              >
                <Text style={styles.accountText}>{account}</Text>
                <RadioButton
                  value={account}
                  status={selectedAccount?.account === account ? 'checked' : 'unchecked'}
                  color="#40bfff"
                  onPress={() => handleSelectAccount(item, account)}
                />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  }, [expandedMethod, selectedAccount]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>TOTAL</Text>
          <Text style={styles.totalAmount}>${totalAmount.toLocaleString()}</Text>
        </View>

        <Text style={styles.header}>Chọn phương thức thanh toán</Text>
        {paymentMethods.map((method, index) => (
          <React.Fragment key={method.id}>
            {renderPaymentMethod({ item: method })}
            {index < paymentMethods.length - 1 && <Divider />}
          </React.Fragment>
        ))}

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SuccessScreen', {
              subtotal,
              tax,
              fees,
              selectedAccount,
            });
          }}
          style={[
            styles.payButton,
            !selectedAccount && styles.disabledPayButton,
          ]}
          disabled={!selectedAccount}
        >
          <Text style={styles.payButtonText}>Pay now</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('AddPaymentMethodScreen')}>
          <Text style={styles.addNewCardText}>+ Add new card</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fa',
    paddingTop:20
  },
  scrollView: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  totalContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 5,
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#223263',
    marginBottom: 20,
  },
  paymentMethodContainer: {
    marginBottom: 20,
  },
  paymentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    color: '#223263',
    fontWeight: '600',
    flex: 1,
  },
  accountsContainer: {
    paddingLeft: 50,
  },
  accountOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 5,
    marginBottom: 5,
  },
  selectedAccountOption: {
    borderColor: '#40bfff',
    backgroundColor: '#e6f7ff',
  },
  accountText: {
    flex: 1,
    fontSize: 14,
    color: '#223263',
  },
  payButton: {
    backgroundColor: '#40bfff',
    borderRadius: 5,
    paddingVertical: 12,
    marginTop: 20,
    alignItems: 'center',
  },
  disabledPayButton: {
    backgroundColor: '#b0c4de',
  },
  payButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  addNewCardText: {
    color: '#40bfff',
    textAlign: 'center',
    marginTop: 15,
    fontSize: 16,
  },
});

export default PaymentMethodsScreen;
