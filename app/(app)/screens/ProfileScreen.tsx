import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../../contexts/AuthContext';

const ProfileScreen: React.FC = () => {
  const { user, updateUser, logout } = useAuth();
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState(user?.password || '');
  const [username, setUsername] = useState(user?.username || '');

  useEffect(() => {
    setEmail(user?.email || '');
    setPassword(user?.password || '');
    setUsername(user?.username || '');
  }, [user]);

  const handleUpdate = async () => {
    if (user && email && password && username) {
      const success = await updateUser(email, password, username);
      if (success) {
        Alert.alert('Profile Updated', 'Your credentials have been updated successfully.');
      } else {
        Alert.alert('Update Failed', 'Another user already has this email or username.');
      }
    } else {
      Alert.alert('Error', 'Please fill in all fields.');
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Profile' }} />
      <Text style={styles.title}>Profile Management</Text>
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
        <TouchableOpacity onPress={handleUpdate}>
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.logoutButtonContainer}>
        <TouchableOpacity onPress={logout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
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
    backgroundColor: '#3498DB', // Blue update button
    borderRadius: 12,
    paddingVertical: 15,
    marginVertical: 10,
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
    fontFamily: 'Poppins-Regular',
  },
  logoutButtonContainer: {
    backgroundColor: '#E74C3C', // Red logout button
    borderRadius: 12,
    paddingVertical: 15,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
  },
});

export default ProfileScreen;

