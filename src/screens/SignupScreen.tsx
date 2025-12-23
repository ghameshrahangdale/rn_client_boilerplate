import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useSelector } from 'react-redux';
import { AuthService } from '../services/auth';
import { RootState } from '../store/store';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Loader from '../components/ui/Loader';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../navigation/AuthNavigator';

type SignupScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Signup'>;

const SignupScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const { isLoading, error } = useSelector((state: RootState) => state.auth);
  const { colors } = useTheme();
  const navigation = useNavigation<SignupScreenNavigationProp>();

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!displayName.trim()) {
      newErrors.displayName = 'Name is required';
    }
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;
    
    try {
      await AuthService.signupWithEmail(email, password, displayName);
      // Navigation will be handled by the navigation container
    } catch (error: any) {
      Alert.alert('Signup Failed', error.message);
    }
  };

  if (isLoading) {
    return <Loader fullScreen />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 px-6 justify-center py-8">
          <View className="mb-8">
            <Text className="text-3xl font-bold mb-2" style={{ color: colors.text }}>
              Create Account
            </Text>
            <Text className="text-gray-600">Sign up to get started</Text>
          </View>

          <Input
            label="Full Name"
            value={displayName}
            onChangeText={setDisplayName}
            placeholder="Enter your full name"
            autoCapitalize="words"
            error={errors.displayName}
          />

          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />

          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Create a password"
            secureTextEntry
            error={errors.password}
          />

          <Input
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm your password"
            secureTextEntry
            error={errors.confirmPassword}
          />

          <Button
            title="Sign Up"
            onPress={handleSignup}
            loading={isLoading}
            fullWidth
            className="mt-4 mb-6"
            variant = 'primary'
          />

          <View className="flex-row justify-center mt-4">
            <Text className="text-gray-600">Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text className="text-blue-500 font-bold">Sign In</Text>
            </TouchableOpacity>
          </View>

          {error && (
            <View className="mt-4 p-3 bg-red-50 rounded-lg">
              <Text className="text-red-600 text-center">{error}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;