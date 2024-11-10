import React from 'react';
import { Text, SafeAreaView, StyleSheet, Image, View, TouchableOpacity, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../reduxToolkit/productsSlice';
import star from '../assets/FavoriteProduct/Star.png';
import emptyStar from '../assets/FavoriteProduct/emptyStar.png';
import trash from '../assets/FavoriteProduct/Trash.png';

const FavoriteProductScreen = () => {
  const dispatch = useDispatch();
  const favoriteProducts = useSelector((state) => state.products.favoriteProducts);

  const handleToggleFavorite = (id) => {
    dispatch(toggleFavorite(id));
  };

  const renderFavProduct = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <View style={styles.rating}>
          {[...Array(4)].map((_, index) => (
            <Image key={index} source={star} style={styles.star} />
          ))}
          <Image source={emptyStar} style={styles.star} />
        </View>
        <Text style={styles.salePrice}>${item.salePrice?.toFixed(2)}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.oldPrice}>${item.price?.toFixed(2)}</Text>
          <Text style={styles.sale}>{item.sale}% Off</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => handleToggleFavorite(item.id)} style={styles.trashButton}>
        <Image source={trash} style={styles.trashIcon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={favoriteProducts}
        renderItem={renderFavProduct}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>No favorite products found.</Text>}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    padding: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#223263',
    marginBottom: 5,
  },
  rating: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  star: {
    width: 16,
    height: 16,
    marginRight: 2,
  },
  salePrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#40BFFF',
    marginBottom: 5,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  oldPrice: {
    fontSize: 14,
    color: '#9098B1',
    textDecorationLine: 'line-through',
    marginRight: 10,
  },
  sale: {
    fontSize: 14,
    color: 'red',
  },
  trashButton: {
    padding: 5,
  },
  trashIcon: {
    width: 24,
    height: 24,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#9098B1',
    marginTop: 20,
  },
});

export default FavoriteProductScreen;
