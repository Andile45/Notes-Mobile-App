import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { colors, common } from '../../../constants/theme';
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
    <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Stack.Screen options={{ title: 'Profile' }} />
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={colors.muted}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor={colors.muted}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={colors.muted}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.primaryButton} onPress={handleUpdate}>
        <Text style={styles.primaryButtonText}>Update Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryButton} onPress={logout}>
        <Text style={styles.secondaryButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.screen,
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  title: {
    ...common.title,
  },
  label: {
    fontSize: 14,
    color: colors.title,
    fontWeight: '600',
    marginBottom: 6,
    fontFamily: 'Poppins-Regular',
  },
  input: {
    ...common.input,
  },
  primaryButton: {
    ...common.primaryButton,
    marginTop: 8,
    marginBottom: 12,
  },
  primaryButtonText: {
    ...common.primaryButtonText,
  },
  secondaryButton: {
    ...common.secondaryButton,
  },
  secondaryButtonText: {
    ...common.secondaryButtonText,
  },
});

export default ProfileScreen;

