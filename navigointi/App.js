import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from './HomeScreen';
import SecondScreen from './SecondScreen';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: 'Home',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Second')}
                style={{ marginRight: 10 }}
              >
                <Ionicons name="ios-arrow-forward" size={24} color="black" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Second"
          component={SecondScreen}
          options={({ route }) => ({
            title: 'Second',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  const message = route.params?.message || 'Default Message';
                }}
                style={{ marginRight: 10 }}
              >
                <Ionicons name="ios-checkmark" size={24} color="black" />
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}