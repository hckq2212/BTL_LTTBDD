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
import MainLayout from './components/MainLayout';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="HomeScreen" options={{ headerShown: false }}>
            {(props) => (
              <MainLayout {...props}>
                <HomeScreen />
              </MainLayout>
            )}
          </Stack.Screen>
          <Stack.Screen name="CategoryScreen" options={{ headerShown: false }}>
            {(props) => (
              <MainLayout {...props}>
                <CategoryScreen />
              </MainLayout>
            )}
          </Stack.Screen>
          <Stack.Screen name="CartScreen" options={{ headerShown: false }}>
            {(props) => (
              <MainLayout {...props}>
                <CartScreen />
              </MainLayout>
            )}
          </Stack.Screen>
          <Stack.Screen name="ProfileScreen" options={{ headerShown: false }}>
            {(props) => (
              <MainLayout {...props}>
                <ProfileScreen />
              </MainLayout>
            )}
          </Stack.Screen>
          <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
          <Stack.Screen name="PaymentMethodsScreen" component={PaymentMethodsScreen} />
          <Stack.Screen name="SearchScreen" component={SearchScreen} />
          <Stack.Screen name="SearchResult" component={SearchResultScreen} />
          <Stack.Screen name="SuccessScreen" component={SuccessScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AddPaymentMethodScreen" component={AddPaymentMethodScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Gender" component={EditGenderScreen} />
          <Stack.Screen name="Birthday" component={EditBirthdayScreen} />
          <Stack.Screen name="Email" component={EditEmailScreen} />
          <Stack.Screen name="PhoneNumber" component={EditPhoneNumberScreen} />
          <Stack.Screen name="Password" component={EditPasswordScreen} />
          <Stack.Screen name="FavoriteProduct" options={{ headerShown: false }}>
            {(props) => (
              <MainLayout {...props}>
                <FavoriteProduct />
              </MainLayout>
            )}
          </Stack.Screen>
          <Stack.Screen name="FilterSearchScreen" component={FilterSearchScreen} />
          <Stack.Screen name="ShipToScreen" component={ShipToScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
