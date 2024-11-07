import React from 'react';
import { View, StyleSheet, SafeAreaView, Image, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import SearchBar from '../components/SearchBar';
import CategoryList from '../components/CategoryList';
import ProductCarousel from '../components/ProductCarousel';
import FooterNav from '../components/FooterNav';
import ProductCard from '../components/ProductCard';

const HomeScreen = () => {
  const products = useSelector((state) => state.products.products);
  console.log('Profiles:', useSelector((state) => state.products.profile));

  const flashSaleProducts = products.filter(product => product.isFlashSale);
  const megaSaleProducts = products.filter(product => product.isMegaSale);
  const recommendedProducts = products.slice(0, 10);

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
        style={styles.flatList}
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
  flatList: {
    paddingHorizontal: 16,
    flex: 1,
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
