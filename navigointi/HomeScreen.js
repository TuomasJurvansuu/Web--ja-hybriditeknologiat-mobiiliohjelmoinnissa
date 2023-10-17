import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [message, setMessage] = useState('Testing');

  const sendMessage = () => {
    navigation.navigate('Second', {
      message: message,
    });
  };

  return (
    <View style={styles.container}>
      <Text>Home screen {message}</Text>
      <TextInput
        onChangeText={(text) => setMessage(text)}
        value={message}
        placeholder="Type message here"
      />
      <Button title="Send Message" onPress={sendMessage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});