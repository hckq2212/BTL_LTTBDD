import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import ProductCard from "../components/ProductCard";

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  const mockProducts = [
    {
      id: 1,
      name: "Nike Air Max Running Shoes",
      price: "$129.99",
      oldPrice: "$159.99",
      discount: "20% OFF",
      imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    },
    {
      id: 2,
      name: "Adidas Classic Sneakers",
      price: "$89.99",
      oldPrice: "$109.99",
      discount: "18% OFF",
      imageUrl: "https://images.unsplash.com/photo-1608231387042-66d1773070a5"
    },
    {
      id: 3,
      name: "Premium Leather Boots",
      price: "$159.99",
      oldPrice: "$199.99",
      discount: "25% OFF",
      imageUrl: "https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16"
    },
    {
      id: 4,
      name: "Sports Training Shoes",
      price: "$119.99",
      oldPrice: "$149.99",
      discount: "20% OFF",
      imageUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a"
    }
  ];

  const handleSearch = (term) => {
    setIsLoading(true);
    setError("");
    const filteredProducts = mockProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchResults(filteredProducts);
    setSuggestions(filteredProducts.map((product) => product.name).slice(0, 5));
    setIsLoading(false);
    if (filteredProducts.length === 0) setError("Không tìm thấy kết quả");
  };

  const handleInputChange = (value) => {
    setSearchTerm(value);
    setShowSuggestions(true);
    if (value.trim()) handleSearch(value);
    else {
      setSuggestions([]);
      setSearchResults([]);
      setError("");
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    handleSearch(suggestion);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSuggestions([]);
    setSearchResults([]);
    setError("");
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Tìm Kiếm Giày</Text>
      <View style={styles.searchContainer} ref={searchRef}>
        <TextInput
          style={styles.input}
          value={searchTerm}
          onChangeText={handleInputChange}
          placeholder="Tìm kiếm giày..."
          placeholderTextColor="#9098b1"
        />
        <View style={styles.iconContainer}>
          {isLoading && <ActivityIndicator size="small" color="#40bfff" />}
          {searchTerm && (
            <TouchableOpacity onPress={clearSearch}>
              <Icon name="close" size={20} color="#9098b1" />
            </TouchableOpacity>
          )}
          <Icon name="search" size={20} color="#40bfff" />
        </View>
      </View>

      {showSuggestions && suggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          {suggestions.map((suggestion, index) => (
            <TouchableOpacity
              key={index}
              style={styles.suggestionItem}
              onPress={() => handleSuggestionClick(suggestion)}
            >
              <Text style={styles.suggestionText}>{suggestion}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {error && <Text style={styles.errorText}>{error}</Text>}
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <ProductCard
            name={item.name}
            price={item.price}
            oldPrice={item.oldPrice}
            discount={item.discount}
            imageUrl={item.imageUrl}
          />
        )}
        contentContainerStyle={styles.resultsContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#223263',
    fontFamily: 'Poppins',
    marginVertical: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ebf0ff',
    width: '100%',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    fontSize: 12,
    fontFamily: 'Poppins',
    color: '#223263',
    height: 40,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  suggestionsContainer: {
    backgroundColor: '#333',
    borderRadius: 5,
    marginTop: 5,
    width: '100%',
    zIndex: 1,
  },
  suggestionItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  suggestionText: {
    color: '#fff',
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    fontFamily: 'Poppins',
  },
  resultsContainer: {
    paddingTop: 20,
  },
});

export default SearchScreen;
