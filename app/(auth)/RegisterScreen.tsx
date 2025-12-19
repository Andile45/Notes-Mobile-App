import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

const RegisterScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const { register } = useAuth();
  const router = useRouter();

  const handleRegister = async () => {
    if (email && password && username) {
      const success = await register(email, password, username);
      if (success) {
        Alert.alert('Registration Successful', 'You can now log in.');
        router.replace('/(auth)/LoginScreen'); // Navigate to login after successful registration
      } else {
        Alert.alert('Registration Failed', 'User with this email or username already exists.');
      }
    } else {
      Alert.alert('Error', 'Please fill in all fields.');
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Register' }} />
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 80, // Increased padding for better distribution
    paddingBottom: 40,
    backgroundColor: '#F0F2F5', // Light Gray background
  },
  title: {
    fontSize: 32, // Larger title
    fontWeight: 'bold',
    marginBottom: 40, // More space below title
    textAlign: 'center',
    color: '#2C3E50', // Darker text for emphasis
    fontFamily: 'Poppins-Regular',
  },
  input: {
    height: 55, // Taller input fields
    borderColor: '#DCDCDC', // Lighter border
    borderWidth: 1,
    borderRadius: 12, // More rounded corners
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    color: '#34495E',
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3, // Elevation for Android
    fontFamily: 'Inter-Regular', // Apply Inter font
  },
  buttonContainer: {
    backgroundColor: '#4CAF50', // Green button
    borderRadius: 12,
    paddingVertical: 12,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular', // Apply Poppins font
  },
});

export default RegisterScreen;

