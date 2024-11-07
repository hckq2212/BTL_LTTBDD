import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Alert, SafeAreaView, Modal } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { login, updateAccount } from '../reduxToolkit/productsSlice';
import Icon from 'react-native-vector-icons/FontAwesome';
const { useNavigation } = require('@react-navigation/native');

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

const ForgotPasswordModal = ({ visible, onClose }) => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);
  const accounts = useSelector((state) => state.products.account);
  const dispatch = useDispatch();

  const handleEmailSubmit = () => {
    const accountExists = accounts.find((acc) => acc.email === email);
    if (accountExists) {
      setStep(2);
    } else {
      Alert.alert('Error', 'Email does not exist.');
    }
  };

  const handlePasswordReset = () => {
    if (newPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters.');
      return;
    }

    dispatch(updateAccount({ id: accounts.find((acc) => acc.email === email).id, updatedData: { password: newPassword } }));
    Alert.alert('Success', 'Password has been reset.');
    setEmail('');
    setNewPassword('');
    setStep(1);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {step === 1 ? (
            <>
              <Text style={styles.modalTitle}>Forgot Password</Text>
              <TouchableOpacity style={styles.modalButton} onPress={onClose}>
                <Icon name="close" size={24} />
              </TouchableOpacity>
              <TextInput
                style={styles.modalInput}
                placeholder="Enter your email"
                placeholderTextColor="#9098b1"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              <TouchableOpacity style={styles.modalButton} onPress={handleEmailSubmit}>
                <Text style={styles.modalButtonText}>Next</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.modalTitle}>Reset Password</Text>
              <TouchableOpacity style={styles.modalButton} onPress={onClose}>
                <Icon name="close" size={24} />
              </TouchableOpacity>
              <TextInput
                style={styles.modalInput}
                placeholder="Enter new password"
                placeholderTextColor="#9098b1"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
              />
              <TouchableOpacity style={styles.modalButton} onPress={handlePasswordReset}>
                <Text style={styles.modalButtonText}>Reset Password</Text>
              </TouchableOpacity>
            </>
          )}
          <TouchableOpacity style={[styles.modalButton, styles.modalCancel]} onPress={onClose}>
            <Text style={styles.modalButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [forgotPassVisible, setForgotPassVisible] = useState(false);
  const loginError = useSelector((state) => state.products.loginError);

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
      if (!loginError) {
        navigation.navigate('HomeScreen');
      } else {
        Alert.alert('Login Error', loginError);
      }
    }
  };


  return (
    <View style={styles.screen}>
      <Image source={require('../assets/Login/logo.png')} style={styles.logo} />
      <WelcomeText />
      <View style={styles.inputContainer}>
        <Image source={require('../assets/Login/mail.png')} style={styles.inputIcon} />
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
        <Image source={require('../assets/Login/Password.png')} style={styles.inputIcon} />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#9098b1"
          secureTextEntry={true}
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
      <TouchableOpacity onPress={() => setForgotPassVisible(true)} style={styles.centered}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      <RegisterLink navigation={navigation} />

      <ForgotPasswordModal
        visible={forgotPassVisible}
        onClose={() => setForgotPassVisible(false)}
      />
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ebf0ff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    marginVertical: 10,
    width: 343,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: '#223263',
    fontFamily: 'Poppins',
    height: '100%',
    paddingVertical: 0,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    marginBottom: 10,
    textAlign: 'left',
    width: 343,
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
    textAlign: 'center',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ebf0ff',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: '#40bfff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalCancel: {
    backgroundColor: '#ebf0ff',
  },
});

export default LoginScreen;
