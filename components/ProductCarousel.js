import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import ProductCard from './ProductCard';

const ProductCarousel = ({ title }) => {
  const products = [
    { id: '1', name: 'FS - Nike Air Max 270...', price: '$299,43', oldPrice: '$534,33', discount: '24% Off', imageUrl: 'https://placehold.co/133x133/png?text=Product+Image&font=Montserrat' },
    { id: '2', name: 'FS - Adidas Ultraboost...', price: '$199,99', oldPrice: '$300,00', discount: '30% Off', imageUrl: 'https://placehold.co/133x133/png?text=Product+Image&font=Montserrat' },
    { id: '3', name: 'FS - Puma RS-X...', price: '$150,00', oldPrice: '$200,00', discount: '25% Off', imageUrl: 'https://placehold.co/133x133/png?text=Product+Image&font=Montserrat' },
  ];

  return (
    <View style={styles.productCarousel}>
      <View style={styles.carouselHeader}>
        <Text style={styles.carouselTitle}>{title}</Text>
        <TouchableOpacity>
          <Text style={styles.seeMore}>See More</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        data={products}
        renderItem={({ item }) => (
          <ProductCard {...item} />
        )}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  productCarousel: { marginBottom: 16 },
  carouselHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, marginBottom: 8 },
  carouselTitle: { fontSize: 16, fontWeight: 'bold', color: '#223263' },
  seeMore: { fontSize: 14, color: '#40BFFF' },
});

export default ProductCarousel;
