import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Alert,SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../reduxToolkit/productsSlice';
import { useNavigation } from '@react-navigation/native';

const WelcomeText = () => {
  return (
    <SafeAreaView style={styles.welcomeContainer}>
      <Text style={styles.welcomeTitle}>Welcome to Shop</Text>
      <Text style={styles.welcomeSubtitle}>Sign in to continue</Text>
    </SafeAreaView>
  );
};

const GoogleLoginButton = () => {
  return (
    <TouchableOpacity style={styles.socialButton}>
      <Image
        source={require('../assets/Login/google.png')}
        style={styles.socialLogo}
      />
      <Text style={styles.socialText}>Login with Google</Text>
    </TouchableOpacity>
  );
};

const FacebookLoginButton = () => {
  return (
    <TouchableOpacity style={styles.socialButton}>
      <Image
        source={require('../assets/Login/Facebook.png')}
        style={styles.socialLogo}
      />
      <Text style={styles.socialText}>Login with Facebook</Text>
    </TouchableOpacity>
  );
};

const OrLine = () => {
  return (
    <View style={styles.orContainer}>
      <View style={styles.line} />
      <Text style={styles.orText}>OR</Text>
      <View style={styles.line} />
    </View>
  );
};

const RegisterLink = ({ navigation }) => {
  const handlePress = () => {
    navigation.navigate('RegisterScreen');
  };

  return (
    <View style={styles.registerContainer}>
      <Text style={styles.registerText}>Don’t have an account? </Text>
      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.registerLink}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};
const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const loginError = useSelector((state) => state.products.loginError);
  const loginSuccess = useSelector((state) => state.products.loginSuccess);

  useEffect(() => {
    if (loginSuccess) {
      navigation.navigate('HomeScreen');
    } else if (loginError) {
      Alert.alert('Login Error', loginError);
    }
  }, [loginSuccess, loginError, navigation]);

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    if (email.trim() === '') {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (password.trim() === '') {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignIn = () => {
    if (validateForm()) {
      dispatch(login({ email, password }));
    }
  };

  return (
    <View style={styles.screen}>
      <Image source={require('../assets/Login/logo.png')} style={styles.logo} />
      <WelcomeText />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Your Email"
          placeholderTextColor="#9098b1"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Password"
          placeholderTextColor="#9098b1"
          secureTextEntry
          style={styles.textInput}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            <TouchableOpacity style={styles.loginButton} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
<OrLine />
      <GoogleLoginButton />
      <FacebookLoginButton />
            <RegisterLink navigation={navigation} />

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
  logo: {
    width: 72,
    height: 72,
    marginBottom: 20,
  },
  inputContainer: {
    width: '90%',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  textInput: {
    height: 40,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    textAlign: 'left',
    width: '90%',
  },
  loginButton: {
    backgroundColor: '#40bfff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 16,
    color: '#223263',
    fontWeight: '700',
    fontFamily: 'Poppins',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#9098b1',
    textAlign: 'center',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EBF0FF',
    padding: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#EBF0FF',
    marginVertical: 5,
    width: 343,
  },
  socialLogo: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  socialText: {
    fontSize: 14,
    color: '#9098B1',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  line: {
    width: 137,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#9098b1',
    marginHorizontal: 8,
  },
registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  registerText: {
    fontSize: 12,
    color: '#707070',
  },
  registerLink: {
    color: '#5c61f4',
    fontWeight: '700',
  },
});

export default LoginScreen;
