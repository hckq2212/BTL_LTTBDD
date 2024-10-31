import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchBar = () => (
  <View style={styles.searchBar}>
    <Icon name="search" size={24} color="#9098B1" style={styles.searchIcon} />
    <TextInput
      placeholder="Search Product"
      style={styles.searchInput}
      placeholderTextColor="#9098B1"
    />
    <View style={styles.navIcons}>
      <TouchableOpacity>
        <Icon name="notifications-outline" size={24} color="#223263" style={styles.navIcon} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon name="cart-outline" size={24} color="#223263" style={styles.navIcon} />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  searchBar: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#EBF0FF' },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: '#223263', borderRadius: 5, paddingLeft: 8 },
  navIcons: { flexDirection: 'row' },
  navIcon: { marginLeft: 16 },
});

export default SearchBar;
