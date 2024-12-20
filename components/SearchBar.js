import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const SearchBar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.searchBar}>
      <Icon name="search" size={24} color="#9098B1" style={styles.searchIcon} />
      <TextInput
        placeholder="Search Product"
        style={styles.searchInput}
        placeholderTextColor="#9098B1"
        onFocus={() => navigation.navigate('SearchScreen')}
      />
      <View style={styles.navIcons}>
        <TouchableOpacity onPress={() => navigation.navigate('FavoriteProduct')}>
          <Icon name="heart-outline" size={24} color="#223263" style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
          <Icon name="cart-outline" size={24} color="#223263" style={styles.navIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#EBF0FF',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#223263',
    borderRadius: 5,
    paddingLeft: 8,
  },
  navIcons: {
    flexDirection: 'row',
  },
  navIcon: {
    marginLeft: 16,
  },
});

export default SearchBar;
