import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const FooterNav = ({ navigation }) => {
  const items = [
    { name: 'home-outline', label: 'Home', route: 'HomeScreen' },
    { name: 'compass-outline', label: 'Category', route: 'CategoryScreen' },
    { name: 'cart-outline', label: 'Cart', route: 'CartScreen' },
    { name: 'heart-outline', label: 'Favorite', route: 'FavoriteProduct' },
    { name: 'person-outline', label: 'Account', route: 'ProfileScreen' }
  ];

  return (
    <View style={styles.footer}>
      {items.map((item) => (
        <TouchableOpacity key={item.label} style={styles.footerItem} onPress={() => navigation.navigate(item.route)}>
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
