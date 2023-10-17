import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'todos';

export default function App() {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    const newKey = String(todos.length);
    const newObject = { key: newKey, description: newTodo };
    const newTodos = [...todos, newObject];
    storeData(newTodos);
    setTodos(newTodos);
    setNewTodo('');
  };

  const clearTodos = () => {
    storeData([]);
    setTodos([]);
  };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue === null) {
        setTodos([]);
        return;
      }
      const data = JSON.parse(jsonValue);
      setTodos(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Todos</Text>
      <TextInput
        style={styles.input}
        placeholder='Kirjota päivän tehtävät...'
        value={newTodo}
        onChangeText={(text) => setNewTodo(text)}
        onSubmitEditing={addTodo}
      />
      <TouchableOpacity style={styles.deleteButton} onPress={clearTodos}>
        <Text style={styles.deleteButtonText}>Poista kaikki tehtävät</Text>
      </TouchableOpacity>
      <FlatList
        style={styles.list}
        data={todos}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => <Text>{item.description}</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F0F0F0',
    borderColor: '#FAFAFA',
    height: 40,
    margin: 8,
  },
  list: {
    margin: 8,
  },
  deleteButton: {
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    margin: 8,
  },
  deleteButtonText: {
    color: '#FFF',
  },
});
