import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import category from '../data/Category';

const CategoryList = () => {
  const navigation = useNavigation();

  const handleSeeAll = () => {
    navigation.navigate('CategoryScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.categoryTitle}>Category</Text>
        <TouchableOpacity onPress={handleSeeAll}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
      >
        {category.slice(0, 4).map((item) => (
          <TouchableOpacity
            key={item.type}
            style={styles.categoryItem}
            accessible
            accessibilityLabel={`Category: ${item.type}`}
            onPress={() => navigation.navigate('SearchResult', { searchQuery: '', selectedCategory: item.type })}
          >
            <Image source={item.image} style={styles.categoryIcon} />
            <Text style={styles.categoryText}>{item.type}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryList: {
    paddingHorizontal: 8,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 24,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  categoryText: {
    fontSize: 12,
    color: '#223263',
    textAlign: 'center',
    maxWidth: 90,
  },
  categoryTitle: {
    fontSize: 16,
    color: '#223263',
    fontWeight: '700',
  },
  seeAllText: {
    fontSize: 14,
    color: '#40BFFF',
    fontWeight: '500',
  },
});

export default CategoryList;
