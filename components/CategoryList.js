import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

const CategoryList = () => {
  const categories = ['Man Shirt', 'Dress', 'Man Work Equipment', 'Woman Bag', 'Man Shoes'];
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryList}>
      {categories.map((category) => (
        <View key={category} style={styles.categoryItem}>
          <Image source={{ uri: 'https://placehold.co/48x48/png?text=Category&font=Montserrat' }} style={styles.categoryIcon} />
          <Text style={styles.categoryText}>{category}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryList: { marginVertical: 16, paddingHorizontal: 16 },
  categoryItem: { alignItems: 'center', marginRight: 24 },
  categoryIcon: { width: 48, height: 48, marginBottom: 8 },
  categoryText: { fontSize: 12, color: '#223263' },
});

export default CategoryList;
