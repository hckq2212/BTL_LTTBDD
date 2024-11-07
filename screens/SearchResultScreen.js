import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, StyleSheet, Image, View, TouchableOpacity, FlatList, TextInput, Modal, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import star from '../assets/SearchResult/Star.png';
import emptyStar from '../assets/SearchResult/emptyStar.png';
import filter from '../assets/SearchResult/Filter.png';
import sort from '../assets/SearchResult/Sort.png';
import search from '../assets/SearchResult/Search.png';
import downArrow from '../assets/SearchResult/Down.png';

const SearchResultScreen = ({ route, navigation }) => {
  const { searchQuery: initialQuery = '', filters, selectedCategory: initialCategory } = route.params || {};

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSortModalVisible, setSortModalVisible] = useState(false);

  const products = useSelector((state) => state.products.products);
  const categories = [...new Set(products.map((item) => item.category))];

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesPrice = !filters || (product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]);
      return matchesSearch && matchesCategory && matchesPrice;
    })
    .map((product) => ({
      ...product,
      salePrice: product.price - (product.price * product.sale) / 100,
    }))
    .sort((a, b) => (sortOrder === 'asc' ? a.salePrice - b.salePrice : b.salePrice - a.salePrice));

  const handleSearchChange = (query) => setSearchQuery(query);

  const handlePress = (id) => navigation.navigate('ProductDetailScreen', { productId: id });

  const renderResult = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => handlePress(item.id)}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.productImage} />
      </View>
      <Text style={styles.productName}>{item.name}</Text>
      <View style={styles.rating}>
        <Image source={star} />
        <Image source={star} />
        <Image source={star} />
        <Image source={star} />
        <Image source={emptyStar} />
      </View>
      <Text style={styles.salePrice}>${item.salePrice.toFixed(2)}</Text>
      <View style={styles.priceRow}>
        <Text style={styles.originalPrice}>${item.price.toFixed(2)}</Text>
        <Text style={styles.discount}>{item.sale}% Off</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Image source={search} style={styles.icon} />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for products..."
          value={searchQuery}
          onChangeText={handleSearchChange}
          placeholderTextColor="#9098B1"
        />
        <TouchableOpacity onPress={() => setSortModalVisible(true)}>
          <Image source={sort} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('FilterSearchScreen', { searchQuery })}>
          <Image source={filter} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.hr} />

      <View style={styles.resultOverview}>
        <Text style={styles.resultCount}>{filteredProducts.length} items</Text>
        <TouchableOpacity style={styles.categoryDropdown} onPress={() => setModalVisible(true)}>
          <Text style={styles.categoryText}>{selectedCategory || 'Select Category'}</Text>
          <Image source={downArrow} style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>

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
                setSelectedCategory(null);
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalItemText}>All Categories</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

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

      <FlatList
        data={filteredProducts}
        renderItem={renderResult}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        contentContainerStyle={styles.productList}
      />
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
  icon: {
    width: 20,
    height: 20,
    marginHorizontal: 10,
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
    marginHorizontal: 10,
    flex: 1,
  },
  categoryDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#edf1ff',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    marginRight: 10,
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
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#edf1ff',
    borderRadius: 8,
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  productImage: {
    width: 150,
    height: 120,
    resizeMode: 'contain',
  },
  productName: {
    fontWeight: 'bold',
    marginLeft: 7,
    color: '#223263',
  },
  rating: {
    flexDirection: 'row',
    marginBottom: 10,
    marginLeft: 7,
  },
  salePrice: {
    color: '#40BFFF',
    fontWeight: 'bold',
    marginLeft: 7,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: '#9098B1',
    fontSize: 12,
  },
  discount: {
    color: 'red',
    fontSize: 12,
  },
  resultOverview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  resultCount: {
    marginLeft: 20,
    fontSize: 14,
    color: '#223263',
  },
  productList: {
    paddingHorizontal: 10,
  },
});

export default SearchResultScreen;
