import React, { useState } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { DATA } from './Data';
import Row from './Row';

const App = () => {
  const [sortedData, setSortedData] = useState(DATA);

  const sortByName = () => {
    const newData = [...sortedData];
    newData.sort((a, b) => a.lastname.localeCompare(b.lastname));
    setSortedData(newData);
  };

  const sortByFirstName = () => {
    const newData = [...sortedData];
    newData.sort((a, b) => a.firstname.localeCompare(b.firstname));
    setSortedData(newData);
  };

  return (
    <SafeAreaView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={sortByName}>
          <Text>Sort by Last Name</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={sortByFirstName}>
          <Text>Sort by First Name</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={sortedData}
        renderItem={({ item }) => <Row person={item} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#ADD8E6',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
});

export default App;