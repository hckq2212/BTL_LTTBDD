import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import ProductCard from './ProductCard';

const ProductCarousel = ({ title, products }) => {
  return (
    <View style={styles.productCarousel}>
      <View style={styles.carouselHeader}>
        <Text style={styles.carouselTitle}>{title}</Text>
      </View>
      <FlatList
        horizontal
        data={products}
        renderItem={({ item }) => (
          <ProductCard
            id={item.id}
            name={item.name}
            price={item.salePrice || item.price}
            oldPrice={item.sale ? item.price : null}
            discount={item.sale}
            imageUrl={item.image}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
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
