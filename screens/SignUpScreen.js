// screens/SignUpScreen.js
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function SignUpScreen({ navigation }) {
  const handleSignUp = () => {
    navigation.navigate('Home');
  };

  return (
    <LinearGradient
      colors={['#ff3131', '#f914d']}
      start={[0, 0]}
      end={[1, 0]}
      style={styles.container}
    >
      <Text style={styles.text}>Sign Up for Dine-On-Time</Text>
      <TextInput placeholder="Username" style={styles.input} />
      <TextInput placeholder="Email" style={styles.input} />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} />
      <Button title="Sign Up" onPress={handleSignUp} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Catamaran_400Regular',
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: 200,
    height: 40,
    backgroundColor: '#fff',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
