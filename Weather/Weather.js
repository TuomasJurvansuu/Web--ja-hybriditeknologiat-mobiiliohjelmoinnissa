import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';

const api = {
  url: process.env.EXPO_PUBLIC_API_URL,
  keys: process.env.EXPO_PUBLIC_API_KEY,
  icons: process.env.EXPO_PUBLIC_ICONS_URL,
};

const Weather = ({ latitude, longitude }) => {
  const [temp, setTemp] = useState(6);
  const [icon, setIcon] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const API_URL = `${api.url}lat=${latitude}&lon=${longitude}&units=metric&appid=${api.keys}`;

    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setTemp(data.main.temp);
        setDescription(data.weather[0].description);
        setIcon(`${api.icons}${data.weather[0].icon}@2x.png`);
      })
      .catch((error) => {
        setDescription('Error retrieving weather information.');
        console.log(error);
      });
  }, [latitude, longitude]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Current Weather</Text>
      <Text style={styles.temp}>{temp} °C</Text>
      {icon && <Image source={{ uri: icon }} style={styles.icon} />}
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Platform.OS === 'ios' ? '#7FDBFF' : '#FFDC00',
    paddingVertical: 50,
    borderRadius: 30,
    margin: 30,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  temp: {
    fontSize: 100,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  description: {
    fontSize: 20,
    color: '#fff',
  },
});

export default Weather;
