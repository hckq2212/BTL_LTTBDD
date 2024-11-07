import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './reduxToolkit/store';

import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditGenderScreen from './screens/EditGenderScreen';
import EditBirthdayScreen from './screens/EditBirthdayScreen';
import EditEmailScreen from './screens/EditEmailScreen';
import EditPhoneNumberScreen from './screens/EditPhoneNumberScreen';
import EditPasswordScreen from './screens/EditPasswordScreen';
import SuccessScreen from './screens/SuccessScreen';
import RegisterScreen from './screens/RegisterScreen';
import PaymentMethodsScreen from './screens/PaymentMethodScreen';
import AddPaymentMethodScreen from './screens/AddPaymentMethodScreen';
import FilterSearchScreen from './screens/FilterSearchScreen';
import SearchScreen from './screens/SearchScreen';
import SearchResultScreen from './screens/SearchResultScreen';
import HomeScreen from './screens/HomeScreen';
import CategoryScreen from './screens/CategoryScreen';
import ProductDetailScreen from './screens/Product-detail';
import FavoriteProduct from './screens/Favorite-product';
import CartScreen from './screens/CartScreen';
import ShipToScreen from './screens/ShipTo';
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerShown: false }} // Hide header if needed
          />
          <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
          <Stack.Screen name="PaymentMethodsScreen" component={PaymentMethodsScreen} />
          <Stack.Screen name="SearchScreen" component={SearchScreen} />
          <Stack.Screen name="SearchResult" component={SearchResultScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
          <Stack.Screen name="AddPaymentMethodScreen" component={AddPaymentMethodScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Gender" component={EditGenderScreen} />
          <Stack.Screen name="Birthday" component={EditBirthdayScreen} />
          <Stack.Screen name="Email" component={EditEmailScreen} />
          <Stack.Screen name="Phone Number" component={EditPhoneNumberScreen} />
          <Stack.Screen name="Password" component={EditPasswordScreen} />
          <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
          <Stack.Screen name="FavoriteProduct" component={FavoriteProduct} />
          <Stack.Screen name="FilterSearchScreen" component={FilterSearchScreen} />
          <Stack.Screen name="CartScreen" component={CartScreen} />
          <Stack.Screen name="ShipToScreen" component={ShipToScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}