import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen'
import ProfileScreen from './screens/ProfileScreen';
import EditGenderScreen from './screens/EditGenderScreen';
import EditBirthdayScreen from './screens/EditBirthdayScreen';
import EditEmailScreen from './screens/EditEmailScreen';
import EditPhoneNumberScreen from './screens/EditPhoneNumberScreen';
import EditPasswordScreen from './screens/EditPasswordScreen';
import SuccessScreen from './screens/SuccessScreen'
import RegisterScreen from './screens/RegisterScreen'
import PaymentMethodsScreen from './screens/PaymentMethodScreen'
import AddPaymentMethodScreen from './screens/AddPaymentMethodScreen'
import FilterSearchScreen from './screens/FilterSearchScreen'
import SearchScreen from './screens/SearchScreen'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="FilterSearchScreen"
          component={FilterSearchScreen}
          options={{ headerShown: false }}
        />        
        <Stack.Screen name="PaymentMethodsScreen" component={PaymentMethodsScreen} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
        <Stack.Screen name="AddPaymentMethodScreen" component={AddPaymentMethodScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />        
        <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
        <Stack.Screen name="AddPaymentMethodScreen" component={AddPaymentMethodScreen} />
        <Stack.Screen name="PaymentMethodsScreen" component={PaymentMethodsScreen} />
        <Stack.Screen name="Gender" component={EditGenderScreen} />
        <Stack.Screen name="Birthday" component={EditBirthdayScreen} />
        <Stack.Screen name="Email" component={EditEmailScreen} />
        <Stack.Screen name="Phone Number" component={EditPhoneNumberScreen} />
        <Stack.Screen name="Password" component={EditPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}