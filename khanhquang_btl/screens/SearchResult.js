import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, Image, View, TouchableOpacity, FlatList, TextInput, Modal, Pressable } from 'react-native';
import star from '../assets/SearchResult/Star.png';
import emptyStar from '../assets/SearchResult/emptyStar.png';
import filter from '../assets/SearchResult/Filter.png';
import sort from '../assets/SearchResult/Sort.png';
import search from '../assets/SearchResult/Search.png';
import downArrow from '../assets/SearchResult/Down.png';

const result = [
  {
    image: require('../assets/SearchResult/AdiZeroAdios.png'),
    name: 'Adidas Zero Adios',
    price: 534.43,
    sale: 24, // Discount percentage
    category: 'Running Shoes',
  },
  {
    image: require('../assets/SearchResult/NikeMercurialSuperfly9Elite.png'),
    name: 'Nike Mercurial Superfly 9 Elite',
    price: 420.56,
    sale: 20,
    category: 'Football Shoes',
  },
  {
    image: require('../assets/SearchResult/AdiYeezySLide.png'),
    name: 'Adidas Yeezy Slide',
    price: 333.45,
    sale: 30,
    category: 'Slides',
  },
  {
    image: require('../assets/SearchResult/AdiTraeYoung3.png'),
    name: 'Adidas Trae Young 3',
    price: 400.06,
    sale: 25,
    category: 'Basketball Shoes',
  },
];

// Extract unique categories
const categories = [...new Set(result.map(item => item.category))];

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSortModalVisible, setSortModalVisible] = useState(false);
  const [sortOrder, setSortOrder] = useState(null); // 'asc' for low to high, 'desc' for high to low

  // Filter and sort products based on search query, selected category, and sort order
  const filteredProducts = result
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!selectedCategory || product.category === selectedCategory)
    )
    .map(product => ({
      ...product,
      salePrice: product.price - (product.price * product.sale / 100),
    }))
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.salePrice - b.salePrice;
      if (sortOrder === 'desc') return b.salePrice - a.salePrice;
      return 0;
    });

  const renderResult = ({ item }) => {
    return (
      <TouchableOpacity style={styles.item}>
        <View style={styles.imageContainer}>
          <Image source={item.image} style={{ margin: 10, width: 150, height: 120 }} />
        </View>
        <Text style={{ fontWeight: 'bold', marginLeft: 7 }}>{item.name}</Text>
        <View style={styles.rating}>
          <Image source={star} />
          <Image source={star} />
          <Image source={star} />
          <Image source={star} />
          <Image source={emptyStar} />
        </View>
        <Text style={{ color: '#40BFFF', fontWeight: 'bold', marginLeft: 7 }}>${item.salePrice.toFixed(2)}</Text>
        <View style={styles.priceRow}>
          <Text style={{ textDecorationLine: 'line-through', color: '#9098B1', fontSize: 12 }}>${item.price}</Text>
          <Text style={{ color: 'red', fontSize: 12 }}>{item.sale}% Off</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Search and Dropdown */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Image source={search} style={{ marginLeft: 20 }} />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#9098B1"
        />
        <TouchableOpacity onPress={() => setSortModalVisible(true)}>
          <Image source={sort} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={filter} />
        </TouchableOpacity>
      </View>
      <View style={styles.hr} />

      <View style={styles.resultOverview}>
        <Text style={{ marginLeft: 20 }}>{filteredProducts.length} items</Text>

        {/* Category Dropdown */}
        <TouchableOpacity style={styles.categoryDropdown} onPress={() => setModalVisible(true)}>
          <Text style={styles.categoryText}>{selectedCategory || 'Select Category'}</Text>
          <Image source={downArrow} style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>

      {/* Category Modal */}
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {categories.map((category, index) => (
              <Pressable
                key={index}
                style={styles.modalItem}
                onPress={() => {
                  setSelectedCategory(category);
                  setModalVisible(false);
                }}
              >
                <Text style={styles.modalItemText}>{category}</Text>
              </Pressable>
            ))}
            <Pressable
              style={styles.modalItem}
              onPress={() => {
                setSelectedCategory(null); // Clear filter
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalItemText}>All Categories</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Sort Modal */}
      <Modal visible={isSortModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Pressable
              style={styles.modalItem}
              onPress={() => {
                setSortOrder('asc');
                setSortModalVisible(false);
              }}
            >
              <Text style={styles.modalItemText}>Price: Low to High</Text>
            </Pressable>
            <Pressable
              style={styles.modalItem}
              onPress={() => {
                setSortOrder('desc');
                setSortModalVisible(false);
              }}
            >
              <Text style={styles.modalItemText}>Price: High to Low</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Product List */}
      <SafeAreaView style={styles.itemView}>
        <FlatList
          data={filteredProducts}
          renderItem={renderResult}
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
    alignItems: 'center',
  },
  hr: {
    width: '100%',
    borderBottomColor: '#edf1ff',
    borderBottomWidth: 2,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#edf1ff',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    marginVertical: 10,
    marginHorizontal: 15,
    marginLeft: 20,
    width: 250,
  },
  categoryDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#edf1ff',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    marginVertical: 10,
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
  categoryText: {
    fontSize: 16,
    color: '#1F2937',
  },
  arrowIcon: {
    width: 15,
    height: 15,
    tintColor: '#1F2937',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    marginHorizontal: 30,
    padding: 20,
    borderRadius: 8,
  },
  modalItem: {
    paddingVertical: 10,
  },
  modalItemText: {
    fontSize: 16,
    color: '#1F2937',
 
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
  resultOverview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default App;
