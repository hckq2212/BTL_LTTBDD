import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import SearchBar from '../components/SearchBar';
import Banner from '../components/Banner';
import CategoryList from '../components/CategoryList';
import ProductCarousel from '../components/ProductCarousel';
import RecommendedProduct from '../components/RecommendedProduct';
import FooterNav from '../components/FooterNav';

const HomeScreen = () => (
  <SafeAreaView style={styles.container}>
    <ScrollView>
      <SearchBar />
      <Banner />
      <CategoryList />
      <ProductCarousel title="Flash Sale" />
      <ProductCarousel title="Mega Sale" />
      <RecommendedProduct />
    </ScrollView>
    <FooterNav />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});

export default HomeScreen;
