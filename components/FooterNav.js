import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const FooterNav = () => {
  const items = [
    { name: 'home-outline', label: 'Home' },
    { name: 'compass-outline', label: 'Explore' },
    { name: 'cart-outline', label: 'Cart' },
    { name: 'pricetag-outline', label: 'Offer' },
    { name: 'person-outline', label: 'Account' }
  ];

  return (
    <View style={styles.footer}>
      {items.map((item) => (
        <TouchableOpacity key={item.label} style={styles.footerItem}>
          <Icon name={item.name} size={24} color="#223263" style={styles.footerIcon} />
          <Text style={styles.footerText}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, borderTopWidth: 1, borderTopColor: '#EBF0FF', backgroundColor: '#fff' },
  footerItem: { alignItems: 'center' },
  footerIcon: { marginBottom: 4 },
  footerText: { fontSize: 10, color: '#223263' },
});

export default FooterNav;
