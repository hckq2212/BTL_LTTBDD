import React, { useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Image, FlatList, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import SearchBar from '../components/SearchBar';
import CategoryList from '../components/CategoryList';
import ProductCarousel from '../components/ProductCarousel';
import ProductCard from '../components/ProductCard';
import { fetchProducts, fetchUserProfile } from '../reduxToolkit/productsSlice';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const userId = useSelector((state) => state.products.accountLoggedIn);

  useEffect(() => {
    dispatch(fetchProducts());
    if (userId) {
      dispatch(fetchUserProfile(userId));
    }
  }, [dispatch, userId]);

  const flashSaleProducts = products?.filter((product) => product.isFlashSale) || [];
  const megaSaleProducts = products?.filter((product) => product.isMegaSale) || [];
  const recommendedProducts = products?.slice(0, 10) || [];

  const renderHeader = () => (
    <>
      <SearchBar />
      <Image source={require('../assets/Home/OfferBanner.png')} style={styles.banner} />
      <CategoryList />
      <ProductCarousel title="Flash Sale" products={flashSaleProducts} />
      <ProductCarousel title="Mega Sale" products={megaSaleProducts} />
      <Image source={require('../assets/Home/RecomendedProductBanner.png')} style={styles.banner} />
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={recommendedProducts}
        renderItem={({ item }) => (
          <ProductCard
            id={item.id}
            name={item.name}
            price={item.salePrice || item.price}
            oldPrice={item.sale ? item.price : null}
            discount={item.sale}
            imageUrl={item.image}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.columnWrapper}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  banner: {
    width: '100%',
    resizeMode: 'contain',
    marginBottom: 16,
  },
  contentContainer: {
    paddingBottom: 80,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    gap: 16,
    paddingHorizontal: 16,
  },
});

export default HomeScreen;
