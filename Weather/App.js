import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Position from './Position';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Weather on your location</Text>
      <Position />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 50,
    fontWeight: 'bold',
  },
});