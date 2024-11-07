import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const FilterSearchScreen = ({ route, navigation }) => {
  const { searchQuery } = route.params || {};
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [condition, setCondition] = useState(null);
  const [buyingFormat, setBuyingFormat] = useState(null);

  const handleApply = () => {
    const [min, max] = priceRange;

    if (isNaN(min) || isNaN(max) || min < 0 || max < 0) {
      Alert.alert("Validation Error", "Please enter valid positive numbers for prices.");
      return;
    }

    if (min > max) {
      Alert.alert("Validation Error", "Minimum price cannot be greater than maximum price.");
      return;
    }


    navigation.navigate('SearchResult', {
      searchQuery: searchQuery,
      filters: {
        priceRange,
        condition,
        buyingFormat,
      },
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>Filter Search</Text>

        <Text style={styles.label}>Price Range</Text>
        <View style={styles.priceRangeContainer}>
          <TextInput
            style={styles.priceInput}
            value={`$${priceRange[0].toFixed(2)}`}
            editable={false}
            placeholder="Min Price"
          />
          <TextInput
            style={styles.priceInput}
            value={`$${priceRange[1].toFixed(2)}`}
            editable={false}
            placeholder="Max Price"
          />
        </View>
        <MultiSlider
          values={priceRange}
          onValuesChange={setPriceRange}
          min={0}
          max={1000}
          step={10}
          sliderLength={350}
          selectedStyle={{ backgroundColor: '#40bfff' }}
          unselectedStyle={{ backgroundColor: '#dcdcdc' }}
          markerStyle={{
            backgroundColor: '#40bfff',
            height: 24,
            width: 24,
            borderWidth: 2,
            borderColor: '#ffffff',
          }}
          containerStyle={styles.sliderContainer}
        />
        <View style={styles.sliderLabels}>
          <Text style={styles.sliderLabelText}>MIN</Text>
          <Text style={styles.sliderLabelText}>MAX</Text>
        </View>

        <Text style={styles.label}>Condition</Text>
        <View style={styles.optionContainer}>
          {['New', 'Used', 'Not Specified'].map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.optionButton, condition === item && styles.selectedOption]}
              onPress={() => setCondition(item)}
            >
              <Text style={condition === item ? styles.selectedText : styles.optionText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Buying Format</Text>
        <View style={styles.optionContainer}>
          {['All Listings', 'Accepts Offers', 'Auction', 'Buy It Now', 'Classified Ads'].map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.optionButton, buyingFormat === item && styles.selectedOption]}
              onPress={() => setBuyingFormat(item)}
            >
              <Text style={buyingFormat === item ? styles.selectedText : styles.optionText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
        <Text style={styles.applyButtonText}>Apply</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  priceRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  priceInput: {
    borderWidth: 1,
    borderColor: '#dcdcdc',
    padding: 12,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
  },
  sliderContainer: {
    marginTop: 10,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  sliderLabelText: {
    color: '#888',
    fontSize: 12,
    fontWeight: '600',
  },
  optionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  optionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    borderRadius: 20,
    margin: 5,
    backgroundColor: '#f0f0f0',
  },
  optionText: {
    color: '#555',
  },
  selectedOption: {
    backgroundColor: '#40bfff',
    borderColor: '#40bfff',
  },
  selectedText: {
    color: '#fff',
  },
  applyButton: {
    backgroundColor: '#40bfff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FilterSearchScreen;
