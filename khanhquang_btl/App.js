import { Text, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CartScreen from './screens/Cart'
import FavoriteProductScreen from './screens/Favorite-product'
import ProductDetailScreen from './screens/Product-detail'
import SearchResultScreen from './screens/SearchResult'
import ShipToScreen from './screens/ShipTo'
import CategoryScreen from './screens/Category'

const Stack = createStackNavigator();

export default function App() {
  return (
<NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SearchResultScreen"
          component={SearchResultScreen}
          options={{ headerShown: false }}
        />        
        <Stack.Screen name="CartScreen" component={CartScreen} />
        <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
        <Stack.Screen name="ShipToScreen" component={ShipToScreen} />
        <Stack.Screen name="FavoriteProductScreen" component={FavoriteProductScreen} />
        <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

