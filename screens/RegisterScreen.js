import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, Alert, SafeAreaView, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { addAccount, addUserProfile } from '../reduxToolkit/productsSlice';
import { useNavigation } from '@react-navigation/native';

const SubHeaderText = () => (
  <Text style={styles.subHeaderText}>Let’s Get Started</Text>
);

const HeaderText = () => (
  <Text style={styles.headerText}>Create a new account</Text>
);

const SignInText = ({ navigation }) => (
  <SafeAreaView style={styles.signInContainer}>
    <Text style={styles.signInText}>Have an account? </Text>
    <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
      <Text style={styles.signInLink}>Sign In</Text>
    </TouchableOpacity>
  </SafeAreaView>
);

const InputField = ({ icon, placeholder, value, onChangeText, secureTextEntry, keyboardType, errorMessage }) => (
  <>
    <View style={styles.inputContainer}>
      <Image source={icon} style={styles.inputIcon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#9098b1"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
    {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
  </>
);

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState({});

  const defaultGender = 'Male';
  const defaultDate = '2003-01-01';

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (!passwordAgain.trim()) {
      newErrors.passwordAgain = 'Please re-enter your password';
      isValid = false;
    } else if (password !== passwordAgain) {
      newErrors.passwordAgain = 'Passwords do not match';
      isValid = false;
    }

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be 10 digits';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignUp = () => {
    if (validateForm()) {
      try {
        const accountId = Date.now();
                console.log(accountId)

        dispatch(addAccount({ id: accountId, name: fullName, email, password }));
        console.log(accountId)
        const id=Date.now();
        dispatch(
          addUserProfile({
            id: id, 
            name: fullName,
            phoneNumber,
            gender: defaultGender,
            birthdate: defaultDate,
            account_id: accountId,
          })
        );

        Alert.alert('Success', 'You have successfully signed up!');
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.screen}>
        <View style={styles.iconPlaceholder}>
          <Image source={require('../assets/Register/logo.png')} style={styles.icon} />
        </View>
        <SubHeaderText />
        <HeaderText />

        <InputField
          icon={require('../assets/Register/User.png')}
          placeholder="Enter full name"
          value={fullName}
          onChangeText={setFullName}
          errorMessage={errors.fullName}
        />
        <InputField
          icon={require('../assets/Register/mail.png')}
          placeholder="Your Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          errorMessage={errors.email}
        />
        <InputField
          icon={require('../assets/Register/Password.png')}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          errorMessage={errors.password}
        />
        <InputField
          icon={require('../assets/Register/Password.png')}
          placeholder="Password Again"
          value={passwordAgain}
          onChangeText={setPasswordAgain}
          secureTextEntry
          errorMessage={errors.passwordAgain}
        />
        <InputField
          icon={require('../assets/Register/Phone.png')}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="numeric"
          errorMessage={errors.phoneNumber}
        />

        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <SignInText navigation={navigation} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  screen: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    paddingTop: 44,
  },
  iconPlaceholder: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 64,
    height: 64,
  },
  subHeaderText: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Poppins',
    color: '#223263',
    textAlign: 'center',
    lineHeight: 24,
    letterSpacing: 0.5,
    marginVertical: 20,
  },
  headerText: {
    fontSize: 12,
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: '#9098b1',
    textAlign: 'center',
    lineHeight: 22,
    letterSpacing: 0.5,
    marginVertical: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 343,
    height: 48,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ebf0ff',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  inputIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 12,
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: '#000',
    letterSpacing: 0.5,
    lineHeight: 22,
    paddingLeft: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 10,
    marginBottom: 5,
    textAlign: 'center',
  },
  signUpButton: {
    backgroundColor: '#40bfff',
    padding: 16,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 343,
    height: 57,
  },
  signUpButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
    fontFamily: 'Poppins',
    lineHeight: 25,
    textAlign: 'center',
  },
  signInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  signInText: {
    color: '#5c61f4',
    fontSize: 12,
    fontFamily: 'Poppins',
    letterSpacing: 0.5,
  },
  signInLink: {
    color: '#5c61f4',
    fontSize: 12,
    fontFamily: 'Poppins',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

export default RegisterScreen;
