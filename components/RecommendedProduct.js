import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const RecommendedProduct = () => (
  <View style={styles.recommended}>
    <Image source={{ uri: 'https://placehold.co/343x196/png?text=Recommended+Product&font=Montserrat' }} style={styles.recommendedImage} />
    <View style={styles.recommendedContent}>
      <Text style={styles.recommendedTitle}>Recommended Product</Text>
      <Text style={styles.recommendedSubtitle}>We recommend the best for you</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  recommended: { marginHorizontal: 16, marginBottom: 16, borderRadius: 5, overflow: 'hidden' },
  recommendedImage: { width: '100%', height: 196 },
  recommendedContent: { position: 'absolute', top: 20, left: 20 },
  recommendedTitle: { fontSize: 24, fontWeight: 'bold', color: '#FFF' },
  recommendedSubtitle: { fontSize: 14, color: '#FFF', top: 30 },
});

export default RecommendedProduct;
