import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProductCard = ({ name, price, oldPrice, discount, imageUrl }) => (
  <View style={styles.productCard}>
    <Image source={{ uri: imageUrl }} style={styles.productImage} />
    <Text style={styles.productName}>{name}</Text>
    <Text style={styles.price}>{price}</Text>
    <View style={styles.discountContainer}>
      <Text style={styles.oldPrice}>{oldPrice}</Text>
      <Text style={styles.discount}>{discount}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  productCard: { backgroundColor: '#fff', borderRadius: 5, width: 150, padding: 8, marginHorizontal: 8, borderColor: '#EBF0FF', borderWidth: 1 },
  productImage: { width: 133, height: 133, marginBottom: 8 },
  productName: { fontSize: 12, fontWeight: '700', color: '#223263' },
  price: { fontSize: 12, fontWeight: '700', color: '#40BFFF' },
  discountContainer: { flexDirection: 'row', alignItems: 'center' },
  oldPrice: { fontSize: 10, color: '#9098B1', textDecorationLine: 'line-through', marginRight: 4 },
  discount: { fontSize: 10, fontWeight: '700', color: '#FB7181' },
});

export default ProductCard;
