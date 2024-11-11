import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { IconButton, Divider } from 'react-native-paper';
import SuccessIcon from '../components/SuccessIcon';
const SuccessScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Destructure parameters and provide default values if necessary
  const {
    subtotal = 0,
    tax = 0,
    totalItems = 0,
    selectedAccount = {},
    selectedAddress = {}
  } = route.params;

  // Calculate total amount (Subtotal + Tax)
  const totalAmount = parseFloat(subtotal) + parseFloat(tax);

  return (
    <View style={styles.container}>
      <SuccessIcon />
      <View style={styles.summaryContainer}>
        <View style={styles.row}>
          <Text style={styles.label}>Subtotal</Text>
          <Text style={styles.value}>${parseFloat(subtotal).toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Tax (10%)</Text>
          <Text style={styles.value}>${parseFloat(tax).toFixed(2)}</Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}>Shipping Address</Text>
          <Text style={styles.addressText}>
            {selectedAddress?.address || 'No address selected'}
          </Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}>Payment Method</Text>
          <View style={styles.cardInfo}>
            <Image
              source={{ uri: `${selectedAccount?.methodIcon || 'https://via.placeholder.com/24'}.jpg` }}
              style={styles.cardIcon}
            />
            <Text style={styles.cardText}>{selectedAccount?.account || 'No card selected'}</Text>
          </View>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}>Total</Text>
          <View style={styles.totalContainer}>
            <Text style={styles.successLabel}>Success</Text>
            <Text style={styles.totalAmount}>${totalAmount.toFixed(2)}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.feedbackText}>How was your experience?</Text>
      <View style={styles.starsContainer}>
        {[...Array(5)].map((_, index) => (
          <IconButton key={index} icon="star" color="#ffcc00" size={24} />
        ))}
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('HomeScreen')}
      >
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f8fa',
    justifyContent: 'space-between',
  },
  summaryContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#555',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  addressText: {
    fontSize: 14,
    color: '#777',
    flex: 1,
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 10,
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  cardText: {
    fontSize: 16,
    color: '#555',
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  successLabel: {
    fontSize: 14,
    color: '#28a745',
    marginRight: 10,
    backgroundColor: '#e6f7e6',
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 4,
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  feedbackText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginBottom: 10,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#40bfff',
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SuccessScreen;
