import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainAppScreen from './(tabs)/MainApp';
import axios from 'axios';

// Define the types for navigation
type RootStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  MainAppScreen: undefined; // Ensure MainApp is defined here
};

// LoginScreen component
const LoginScreen = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLogin = async () => {
    if (!emailOrUsername || !password) {
      Alert.alert('Error', 'Please enter both email/username and password.');
      return;
    }

    if (!validateEmail(emailOrUsername)) {
      Alert.alert('Error', 'Please enter a valid email or username.');
      return;
    }

    try {
      const response = await axios.post('http://192.168.1.11/dbapp/login.php', {
        email: emailOrUsername,
        password: password,
      });

      if (response.data.success) {
        const user = response.data.user;
        await AsyncStorage.setItem('userSession', JSON.stringify(user));
        navigation.navigate('MainAppScreen'); // Ensure this matches the registered name
      } else {
        Alert.alert('Error', response.data.error);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Login failed. Please try again.');
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email or Username"
        placeholderTextColor="#000000"
        value={emailOrUsername}
        onChangeText={setEmailOrUsername}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#000000"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
        <Text style={styles.linkText}>Don't have an account? Register here</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    marginBottom: 15,
    color: '#000000',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
  linkText: {
    color: '#007bff',
    marginTop: 15,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
