import React from 'react';
import { Text, SafeAreaView, StyleSheet, Image, View, TouchableOpacity, FlatList } from 'react-native';
import category from '../data/Category';
import { useNavigation } from '@react-navigation/native';

const CategoryScreen = () => {
  const navigation = useNavigation();

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => navigation.navigate('SearchResult', { searchQuery: '', selectedCategory: item.type })}
      accessible
      accessibilityLabel={`Category: ${item.type}`}
    >
      <Image source={item.image} style={styles.categoryImage} />
      <Text style={styles.categoryText}>{item.type}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/Category/Left.png')}
            style={styles.headerIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Category</Text>
      </View>

      <View style={styles.separator} />

      {/* Categories List */}
      <FlatList
        data={category}
        renderItem={renderCategory}
        keyExtractor={(item) => item.type}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f7f8fa',
  },
  headerIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#223263',
  },
  separator: {
    height: 1,
    backgroundColor: '#edf1ff',
    marginHorizontal: 15,
  },
  categoryList: {
    paddingVertical: 10,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: '#edf1ff',
  },
  categoryImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 15,
  },
  categoryText: {
    fontSize: 16,
    color: '#223263',
    fontWeight: '500',
  },
});

export default CategoryScreen;
