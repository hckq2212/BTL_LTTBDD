import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, StyleSheet, Image, View, TouchableOpacity, FlatList, ScrollView, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite, addToCart } from '../reduxToolkit/productsSlice';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProductDetailScreen = ({ route }) => {
  const { productId } = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const product = useSelector((state) => state.products.products.find((p) => p.id === productId));

  // Kiểm tra nếu product không tồn tại
  useEffect(() => {
    if (!product) {
      Alert.alert('Error', 'Product not found');
      navigation.goBack();
    }
  }, [product]);

  const similarProducts = useSelector((state) => state.products.products.filter((p) => p.category === product?.category && p.id !== productId));

  const [selectedImage, setSelectedImage] = useState(product?.image);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(productId));
  };

  const handleColorChange = (colorImage) => {
    setSelectedImage(colorImage);
  };

  const handleColorSelection = (color) => {
    setSelectedColor(color);
  };

  const handleSizeSelection = (size) => {
    setSelectedSize(size);
    Alert.alert('Size Selected', `You selected size: ${size}`);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      Alert.alert('Select Size', 'Please select a size before adding to cart.');
      return;
    }
    if (!selectedColor) {
      Alert.alert('Select Color', 'Please select a color before adding to cart.');
      return;
    }

    dispatch(addToCart({ productId, size: selectedSize, color: selectedColor.name }));
    Alert.alert('Added to Cart', `${product.name} (Size: ${selectedSize}, Color: ${selectedColor.name}) has been added to your cart.`);
  };

  const renderSimilarProduct = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetailScreen', { productId: item.id })}
      style={styles.similarProduct}
    >
      <Image source={item.image} style={styles.similarImage} />
      <Text style={styles.similarName} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.similarPrice}>${item.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  if (!product) return null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image source={selectedImage} style={styles.productImage} />
        <View style={styles.detailsContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.productName}>{product.name}</Text>
            <TouchableOpacity onPress={handleToggleFavorite}>
              <Icon
                name={product.isFavorite ? 'heart' : 'heart-o'}
                size={24}
                color={product.isFavorite ? '#FF6347' : '#ccc'}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
          <Text style={styles.productDescription}>Category: {product.category}</Text>

          <Text style={styles.sizeTitle}>Select Size:</Text>
          <View style={styles.sizeOptions}>
            {product.sizes.map((size, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSizeSelection(size)}
                style={[
                  styles.sizeButton,
                  selectedSize === size && styles.selectedSizeButton,
                ]}
              >
                <Text
                  style={[
                    styles.sizeText,
                    selectedSize === size && styles.selectedSizeText,
                  ]}
                >
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.colorTitle}>Select Color:</Text>
          <View style={styles.colorOptions}>
            {product.colors.map((color, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  handleColorChange(color.image);
                  handleColorSelection(color);
                }}
                style={[styles.colorCircle, { backgroundColor: color.name }]}
              />
            ))}
          </View>

          <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.similarTitle}>Similar Products</Text>
        <FlatList
          horizontal
          data={similarProducts}
          renderItem={renderSimilarProduct}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.similarList}
        />
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  productImage: {
    width: '100%',
    height: 350,
    resizeMode: 'cover',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    elevation: 5,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#223263',
  },
  productPrice: {
    fontSize: 22,
    color: '#40BFFF',
    marginVertical: 8,
  },
  productDescription: {
    fontSize: 16,
    color: '#666',
    marginVertical: 4,
  },
  sizeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 12,
    color: '#223263',
  },
  sizeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },
  sizeButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#EBF0FF',
    borderRadius: 5,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  selectedSizeButton: {
    borderColor: '#40BFFF',
    backgroundColor: '#E6F4FF',
  },
  sizeText: {
    fontSize: 14,
    color: '#223263',
  },
  selectedSizeText: {
    color: '#40BFFF',
    fontWeight: 'bold',
  },
  colorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 12,
    color: '#223263',
  },
  colorOptions: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 2,
    borderColor: '#EBF0FF',
  },
  addToCartButton: {
    marginTop: 16,
    backgroundColor: '#40BFFF',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  similarTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    margin: 16,
    color: '#223263',
  },
  similarProduct: {
    width: 150,
    marginRight: 16,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 10,
    borderColor: '#EBF0FF',
    borderWidth: 1,
    alignItems: 'center',
    elevation: 3,
  },
  similarImage: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  similarName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#223263',
    textAlign: 'center',
  },
  similarPrice: {
    fontSize: 14,
    color: '#40BFFF',
  },
  similarList: {
    paddingHorizontal: 16,
  },
});

export default ProductDetailScreen;
