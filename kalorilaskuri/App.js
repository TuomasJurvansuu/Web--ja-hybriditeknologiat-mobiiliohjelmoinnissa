import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [weight, setWeight] = useState(0);
  const [intensity, setIntensity] = useState(1.3);
  const [gender, setGender] = useState('female');
  const [calories, setCalories] = useState(0);

  const intensities = [
    { label: 'Light', value: 1.3 },
    { label: 'Moderate', value: 1.5 },
    { label: 'High', value: 2.2 },
  ];

  const genders = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];

  const calculate = () => {
    let result = 0;
    if (gender === 'male') {
      result = (879 + 10.2 * weight) * intensity;
    } else if (gender === 'female') {
      result = (795 + 7.18 * weight) * intensity;
    }
    setCalories(result);
  };

  return (
    <View style={styles.container}>
      <Text>Weight</Text>
      <View style={styles.field}>
        <TextInput
          onChangeText={(text) => setWeight(text)}
          placeholder="in kilograms"
          keyboardType="number-pad"
        />
      </View>
      <View style={styles.field}>
        <Text>Intensity</Text>
        <Picker
          style={styles.intensity}
          onValueChange={(itemValue) => setIntensity(itemValue)}
          selectedValue={intensity}
        >
          {intensities.map((intensity, index) => (
            <Picker.Item key={index} label={intensity.label} value={intensity.value} />
          ))}
        </Picker>
      </View>
      <View style={styles.field}>
        <Text>Gender</Text>
        <RadioForm
          style={styles.radio}
          buttonSize={30}
          radio_props={genders}
          initial={genders.findIndex((g) => g.value === gender)}
          onPress={(value) => setGender(value)}
        />
      </View>
      <View style={styles.field}>
        <Text>{calories.toFixed(0)}</Text>
      </View>
      <Button title="Calculate" onPress={calculate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    paddingTop: 80,
    margin: 15,
  },
  field: {
    marginBottom: 30,
    marginTop: 15,
  },
  radio: {
    marginTop: 15,
  },
  intensity: {
    alignSelf: 'stretch',
  },
});