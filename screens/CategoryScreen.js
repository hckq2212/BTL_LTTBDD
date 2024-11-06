import React from 'react';
import { Text, SafeAreaView, StyleSheet, Image, View, TouchableOpacity, FlatList } from 'react-native';
import category from '../data/Category';


const renderCategory = ({ item }) => {
  return (
    <TouchableOpacity
      style={styles.item}
      accessible
      accessibilityLabel={`Category: ${item.type}`}
    >
      <Image source={item.image} style={styles.itemImage} />
      <Text style={styles.itemText}>{item.type}</Text>
    </TouchableOpacity>
  );
};

const CategoryScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.header}>
        <TouchableOpacity><Image source={require('../assets/Category/Left.png')} style={{ marginLeft: 10, marginRight: 10 }} /></TouchableOpacity>
        <Text style={styles.headerText}>Category</Text>
      </SafeAreaView>
      <View style={styles.hr} />

      <SafeAreaView style={styles.categoryView}>
        <FlatList
          data={category}
          renderItem={renderCategory}
          keyExtractor={(item) => item.type}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
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
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerIcon: {
    marginLeft: 10,
    marginRight: 10,
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  hr: {
    width: '100%',
    borderBottomColor: '#edf1ff',
    borderBottomWidth: 2,
  },
  categoryView: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 15,
  },
  itemImage: {
    marginRight: 15,
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  itemText: {
    fontSize: 14,
    color: '#333',
  },
});

export default CategoryScreen;
