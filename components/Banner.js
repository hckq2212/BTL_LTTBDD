import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Banner = () => (
  <View style={styles.banner}>
    <Image source={{ uri: 'https://placehold.co/343x196/png?text=Flash+Sale+Banner&font=Montserrat' }} style={styles.bannerImage} />
    <View style={styles.bannerContent}>
      <Text style={styles.bannerTitle}>Super Flash Sale</Text>
      <Text style={styles.bannerDiscount}>50% Off</Text>
      <View style={styles.timerContainer}>
        {['08', '34', '52'].map((time, index) => (
          <View key={index} style={styles.timerBlock}>
            <Text style={styles.timerText}>{time}</Text>
          </View>
        ))}
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  banner: { marginHorizontal: 16, marginTop: 16, borderRadius: 5, overflow: 'hidden' },
  bannerImage: { width: '100%', height: 196 },
  bannerContent: { position: 'absolute', top: 30, left: 20 },
  bannerTitle: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  bannerDiscount: { fontSize: 20, color: '#fff', marginTop: 4 },
  timerContainer: { flexDirection: 'row', marginTop: 12 },
  timerBlock: { backgroundColor: '#fff', padding: 4, borderRadius: 5, marginRight: 4 },
  timerText: { fontSize: 14, fontWeight: 'bold', color: '#223263' },
});

export default Banner;
