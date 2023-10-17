import React, { useEffect } from 'react';
import { StyleSheet, View, Text, BackHandler, Alert } from 'react-native';

export default function SecondScreen({ route, navigation }) {
  useEffect(() => {
    if (route.params?.message) {
      Alert.alert('Received Message', route.params.message);
    }
  }, [route.params]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Second Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});