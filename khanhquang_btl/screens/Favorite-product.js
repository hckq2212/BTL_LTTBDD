import { Text, SafeAreaView, StyleSheet, Image, View, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import left from '../assets/FavoriteProduct/Left.png';
import star from '../assets/FavoriteProduct/Star.png';
import emptyStar from '../assets/FavoriteProduct/emptyStar.png';
import trash from '../assets/FavoriteProduct/Trash.png';

const initialFavProduct = [
  {
    image: require('../assets/FavoriteProduct/AdiTraeYoung3.png'),
    name: 'Adidas Trae Young 3',
    salePrice: 299.43,
    price: 534.43,
    sale: '24% Off',
  },
  {
    image: require('../assets/FavoriteProduct/NikeMercurialSuperfly9Elite.png'),
    name: 'Nike Mercurial SuperFly 9 Elite',
    salePrice: 299.43,
    price: 534.43,
    sale: '24% Off',
  },
];

const App = () => {
  const [favProduct, setFavProduct] = useState(initialFavProduct);

  const removeProduct = (name) => {
    setFavProduct(favProduct.filter(item => item.name !== name));
  };

  const renderFavProduct = ({ item }) => {
    return (
      <TouchableOpacity style={styles.item}>
        <View style={styles.imageContainer}>
          <Image source={item.image} style={{ margin: 10, width: 120, height: 100 }} />
        </View>
        <Text style={{ fontWeight: "bold", marginLeft: 7, marginBottom: 10 }}>{item.name}</Text>
        <View style={styles.rating}>
          <Image source={star} />
          <Image source={star} />
          <Image source={star} />
          <Image source={star} />
          <Image source={emptyStar} />
        </View>
        <Text style={{ color: '#40BFFF', fontWeight: 'bold', marginLeft: 7 }}>${item.salePrice}</Text>
        <View style={styles.priceRow}>
          <Text style={{ textDecorationLine: 'line-through', color: '#9098B1', fontSize: 12 }}>
            ${item.price}
          </Text>
          <Text style={{ color: 'red', fontSize: 12 }}>{item.sale}</Text>
          <TouchableOpacity onPress={() => removeProduct(item.name)}>
            <Image source={trash} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.header}>
        <TouchableOpacity>
          <Image source={left} style={{ marginLeft: 10, marginRight: 10 }} />
        </TouchableOpacity>
        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Favorite Product</Text>
      </SafeAreaView>
      <View style={styles.hr} />

      <SafeAreaView style={styles.itemView}>
        <FlatList
          data={favProduct}
          renderItem={renderFavProduct}
          keyExtractor={(item) => item.name}
          showsVerticalScrollIndicator={false}
          numColumns={2}
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
    marginBottom: 15,
  },
  hr: {
    width: '100%',
    borderBottomColor: '#edf1ff',
    borderBottomWidth: 2,
  },
  item: {
    marginTop: 20,
    marginLeft: 15,
    borderWidth: 2,
    borderColor: '#edf1ff',
    flex: 1,
  },
  itemView: {
    flex: 1,
  },
  rating: {
    flexDirection: 'row',
    marginBottom: 10,
    marginLeft: 7,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default App;
