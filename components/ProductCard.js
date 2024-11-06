import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProductCard = ({ id, name, price, oldPrice, discount, imageUrl }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('ProductDetailScreen', { productId: id });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.productCard}>
      <Image source={imageUrl} style={styles.productImage} />
      <Text style={styles.productName}>{name}</Text>
      <Text style={styles.price}>${price.toFixed(2)}</Text>
      {oldPrice && (
        <View style={styles.discountContainer}>
          <Text style={styles.oldPrice}>${oldPrice.toFixed(2)}</Text>
          <Text style={styles.discount}>{discount}% Off</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 5,
    width: 150,
    padding: 8,
    marginHorizontal: 8,
    borderColor: '#EBF0FF',
    borderWidth: 1,
    marginBottom: 16,
  },
  productImage: {
    width: 133,
    height: 133,
    marginBottom: 8,
  },
  productName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#223263',
  },
  price: {
    fontSize: 12,
    fontWeight: '700',
    color: '#40BFFF',
  },
  discountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  oldPrice: {
    fontSize: 10,
    color: '#9098B1',
    textDecorationLine: 'line-through',
    marginRight: 4,
  },
  discount: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FB7181',
  },
});

export default ProductCard;
