import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Alert, SafeAreaView } from 'react-native';

const HomeIndicator = () => {
  return (
    <View style={styles.indicatorContainer}>
      <View style={styles.homeIndicator} />
    </View>
  );
};

const WelcomeText = () => {
  return (
    <SafeAreaView style={styles.welcomeContainer}>
      <Text style={styles.welcomeTitle}>Welcome to Shop</Text>
      <Text style={styles.welcomeSubtitle}>Sign in to continue</Text>
    </SafeAreaView>
  );
};

const EmailInput = ({ value, onChangeText, errorMessage }) => {
  return (
    <>
      <View style={styles.inputContainer}>
        <Image
          source={require('../assets/Login/mail.png')}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Your Email"
          placeholderTextColor="#9098b1"
          value={value}
          onChangeText={onChangeText}
          keyboardType="email-address"
        />
      </View>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
    </>
  );
};

const PasswordInput = ({ value, onChangeText, errorMessage }) => {
  return (
    <>
      <View style={styles.inputContainer}>
        <Image
          source={require('../assets/Login/Password.png')}
          style={styles.inputIcon}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#9098b1"
          secureTextEntry={true}
          style={styles.textInput}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
    </>
  );
};

const LoginButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.loginButton} onPress={onPress}>
      <Text style={styles.buttonText}>Sign In</Text>
    </TouchableOpacity>
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

const ForgotPasswordLink = () => {
  const handlePress = () => Alert.alert('Forgot Password', 'Redirecting...');

  return (
    <TouchableOpacity onPress={handlePress} style={styles.centered}>
      <Text style={styles.forgotPassword}>Forgot Password?</Text>
    </TouchableOpacity>
  );
};

const RegisterLink = () => {
  const handlePress = () => {
    Alert.alert('Registration', 'Redirecting to registration page.');
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

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
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignIn = () => {
    if (validateForm()) {
      Alert.alert('Success', 'You have successfully signed in!');
    }
  };

  return (
    <View style={styles.screen}>
      <Image source={require('../assets/Login/logo.png')} style={styles.logo} />
      <WelcomeText />
      <EmailInput value={email} onChangeText={setEmail} errorMessage={errors.email} />
      <PasswordInput value={password} onChangeText={setPassword} errorMessage={errors.password} />
      <LoginButton onPress={handleSignIn} />
      <OrLine />
      <GoogleLoginButton />
      <FacebookLoginButton />
      <ForgotPasswordLink />
      <RegisterLink />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  logo: {
    width: 72,
    height: 72,
    marginBottom: 20,
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ebf0ff',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    marginVertical: 5,
    width: 343,
  },
  inputIcon: {
    width: 20,
    height: 16,
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 12,
    lineHeight: 22,
    color: '#9098b1',
    fontFamily: 'Poppins',
  },
  errorText: {
    color: 'red',
    fontSize: 10,
    marginBottom: 5,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#40bfff',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginVertical: 10,
    width: 343,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
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
  centered: {
    alignItems: 'center',
  },
  forgotPassword: {
    color: '#40bfff',
    fontSize: 12,
    fontWeight: '700',
    marginVertical: 5,
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
  indicatorContainer: {
    width: 375,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeIndicator: {
    width: 134,
    height: 5,
    backgroundColor: '#DFE1E5',
    borderRadius: 2.5,
  },
});

export default LoginScreen;