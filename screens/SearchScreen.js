import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { addHistorySearch, fetchHistorySearch, removeHistorySearch } from '../reduxToolkit/productsSlice';

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const searchRef = useRef(null);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const accountLoggedIn = useSelector((state) => state.products.accountLoggedIn);
  const products = useSelector((state) => state.products.products);
  const historySearch = useSelector((state) => state.products.historySearch);

  // Fetch search history on component mount
  React.useEffect(() => {
    dispatch(fetchHistorySearch(accountLoggedIn))
      .unwrap()
      .then((data) => {
        console.log("Search History:", data);
      })
      .catch((error) => {
        console.error("Error fetching history:", error);
      });
  }, [dispatch]);

  const handleSearch = (term) => {
    setIsLoading(true);
    setError("");

    const historyMatches = historySearch.filter(item =>
      item.search.toLowerCase().includes(term.toLowerCase())
    );

    const productMatches = products.filter(product =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );

    const combinedSuggestions = [
      ...historyMatches.map(item => item.search),
      ...productMatches.map(product => product.name)
    ].slice(0, 5);

    setSuggestions(combinedSuggestions);

    setIsLoading(false);
    if (combinedSuggestions.length === 0) setError("Không tìm thấy kết quả");
  };

  const handleInputChange = (value) => {
    setSearchTerm(value);
    if (value.trim()) handleSearch(value);
    else {
      setSuggestions([]);
      setError("");
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    dispatch(addHistorySearch({ uid: accountLoggedIn, search: suggestion }));
    navigation.navigate('SearchResult', { searchQuery: suggestion });
  };

  const handleSearchNavigation = () => {
    if (searchTerm.trim()) {
      dispatch(addHistorySearch({ uid: accountLoggedIn, search: searchTerm }));
      navigation.navigate('SearchResult', { searchQuery: searchTerm });
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSuggestions([]);
    setError("");
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Search Shoes</Text>
      <View style={styles.searchContainer} ref={searchRef}>
        <TextInput
          style={styles.input}
          value={searchTerm}
          onChangeText={handleInputChange}
          placeholder="Search shoes..."
          placeholderTextColor="#9098b1"
        />
        <View style={styles.iconContainer}>
          {isLoading && <ActivityIndicator size="small" color="#40bfff" />}
          {searchTerm && (
            <TouchableOpacity style={styles.clearIcon} onPress={clearSearch}>
              <Icon name="close" size={20} color="#9098b1" />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={handleSearchNavigation}>
            <Icon name="search" size={20} color="#40bfff" />
          </TouchableOpacity>
        </View>
      </View>

      {suggestions.length > 0 && (
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

      <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>Lịch sử tìm kiếm</Text>
        {historySearch.map((item, index) => (
          <TouchableOpacity key={index} style={styles.historyItem} onPress={() => handleSuggestionClick(item.search)}>
            <Text style={styles.historyText}>{item.search}</Text>
            <TouchableOpacity onPress={() => dispatch(removeHistorySearch({ uid: accountLoggedIn, id: item.id }))}>
              <Icon name="close" size={16} color="#9098b1" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
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
  historyContainer: {
    marginTop: 20,
    width: '100%',
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#223263',
    marginBottom: 10,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    marginBottom: 5,
  },
  historyText: {
    fontSize: 14,
    color: '#223263',
  },
  clearIcon: {
    marginRight: 10,
  },
});

export default SearchScreen;
