import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './screens/ProfileScreen';
import EditGenderScreen from './screens/EditGenderScreen';
import EditBirthdayScreen from './screens/EditBirthdayScreen';
import EditEmailScreen from './screens/EditEmailScreen';
import EditPhoneNumberScreen from './screens/EditPhoneNumberScreen';
import EditPasswordScreen from './screens/EditPasswordScreen';
import SuccessScreen from './screens/SuccessScreen'
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Gender" component={EditGenderScreen} />
        <Stack.Screen name="Birthday" component={EditBirthdayScreen} />
        <Stack.Screen name="Email" component={EditEmailScreen} />
        <Stack.Screen name="Phone Number" component={EditPhoneNumberScreen} />
        <Stack.Screen name="Password" component={EditPasswordScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}