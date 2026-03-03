import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: any;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, username: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUser: (newEmail: string, newPassword: string, newUsername: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null); // Initial user state
  const [loading, setLoading] = useState(true); // Loading state for auth

  useEffect(() => {
    // Check if user is already logged in from AsyncStorage
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          // Auto-login a dummy user for development
          console.log("Auto-logging in dummy user.");
          const dummyUser = { email: "dummy@example.com", username: "dummyuser", id: "dummy123" };
          setUser(dummyUser);
          await AsyncStorage.setItem('user', JSON.stringify(dummyUser));
          // Also add the dummy user to the 'users' array if it doesn't exist
          const storedUsers = await AsyncStorage.getItem('users');
          let users = storedUsers ? JSON.parse(storedUsers) : [];
          if (!users.some((u: any) => u.email === dummyUser.email)) {
            users.push({ ...dummyUser, password: "dummypass" }); // Add password for consistency if needed later
            await AsyncStorage.setItem('users', JSON.stringify(users));
          }
        }
      } catch (error) {
        console.error("Failed to load user from AsyncStorage", error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    // In a real app, you'd send these to a backend for authentication
    const storedUsers = await AsyncStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    const foundUser = users.find((u: any) => u.email === email && u.password === password);

    if (foundUser) {
      setUser(foundUser);
      await AsyncStorage.setItem('user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const register = async (email: string, password: string, username: string) => {
    console.log('Attempting to register new user:', { email, username });
    const storedUsers = await AsyncStorage.getItem('users');
    console.log('Stored users (raw):', storedUsers);
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    console.log('Parsed users array:', users);

    const userExists = users.some((u: any) => u.email === email || u.username === username);
    console.log('User exists check result:', userExists);
    if (userExists) {
      console.log('Registration failed: User with this email or username already exists.');
      return false; // User with this email or username already exists
    }

    const newUser = { email, password, username };
    users.push(newUser);
    await AsyncStorage.setItem('users', JSON.stringify(users));
    setUser(newUser);
    await AsyncStorage.setItem('user', JSON.stringify(newUser));
    return true;
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage cleared!');
    } catch (e) {
      console.error('Failed to clear AsyncStorage:', e);
    }
  };

  // Temporarily call clearAll for testing
  // useEffect(() => {
  //   clearAll();
  // }, []);



  const updateUser = async (newEmail: string, newPassword: string, newUsername: string) => {
    if (!user) return false; // No user logged in

    const storedUsers = await AsyncStorage.getItem('users');
    let users = storedUsers ? JSON.parse(storedUsers) : [];

    const otherUserExists = users.some(
      (u: any) =>
        u.email === newEmail && u.email !== user.email ||
        u.username === newUsername && u.username !== user.username
    );

    if (otherUserExists) {
      return false; // Another user already has this email or username
    }

    const updatedUsers = users.map((u: any) => {
      if (u.email === user.email) {
        return { ...u, email: newEmail, password: newPassword, username: newUsername };
      }
      return u;
    });

    const updatedUser = { ...user, email: newEmail, password: newPassword, username: newUsername };

    await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
    await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

