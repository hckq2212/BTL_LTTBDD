import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

const SuccessMessage = () => {
  return (
    <View style={successMessageStyles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={successMessageStyles.icon}
      />
      <Text style={successMessageStyles.title}>Success</Text>
      <Text style={successMessageStyles.subtitle}>
        thank you for shopping using lafyuu
      </Text>
    </View>
  );
};

const successMessageStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  icon: {
    width: 72,
    height: 72,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#223263',
    fontFamily: 'Poppins',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 12,
    color: '#223263',
    fontFamily: 'Poppins',
    opacity: 0.5,
    textAlign: 'center',
    lineHeight: 22,
  }
});

const BackButton = () => {
  return (
    <TouchableOpacity style={backButtonStyles.button}>
      <Text style={backButtonStyles.text}>Back To Order</Text>
    </TouchableOpacity>
  );
};

const backButtonStyles = StyleSheet.create({
  button: {
    backgroundColor: '#40bfff',
    padding: 16,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 343,
    height: 57,
    marginBottom: 40,
  },
  text: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
    fontFamily: 'Poppins',
    lineHeight: 25,
    textAlign: 'center',
  }
});

const SuccessScreen = () => {
  return (
    <View style={styles.screen}>
      <SuccessMessage />
      <BackButton />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SuccessScreen;
