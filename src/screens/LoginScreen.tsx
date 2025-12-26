import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { AuthService } from '../services/auth';
import { RootState } from '../store/store';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../navigation/AuthNavigator';
import { configureGoogleSignIn, signInWithGoogle } from '../services/googleSignIn';
import Logo from '../components/common/Logo';
import Toast from 'react-native-toast-message';

type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [localError, setLocalError] = useState('');

  const { isLoading, error } = useSelector((state: RootState) => state.auth);
  const { colors } = useTheme();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  // Clear errors when user starts typing
  useEffect(() => {
    if (email) setEmailError('');
    if (password) setPasswordError('');
    if (localError) setLocalError('');
  }, [email, password]);

  const validateForm = () => {
    let valid = true;

    if (!email) {
      setEmailError('Email is required');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email');
      valid = false;
    } else setEmailError('');

    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Min 6 characters');
      valid = false;
    } else setPasswordError('');

    return valid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    
    try {
      await AuthService.loginWithEmail(email, password);
      
      // If login is successful, show success message
      Toast.show({
        type: 'success',
        text1: 'Login Successful',
        text2: 'Welcome back 👋',
      });
    } catch (error: any) {
      console.log(error);
      
      setLocalError(error.message);
      
      // Show error toast
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: error.message,
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const credential = await signInWithGoogle();
      if (!credential) {
        Toast.show({
          type: 'error',
          text1: 'Sign In Cancelled',
          text2: 'Google sign in was cancelled',
        });
        return;
      }
      
      await AuthService.signInWithGoogle(credential);
      
      // If login is successful, show success message
      Toast.show({
        type: 'success',
        text1: 'Login Successful',
        text2: 'Welcome back 👋',
      });
    } catch (error: any) {
      // Error is already handled by AuthService and stored in Redux state
      // Show error toast
      Toast.show({
        type: 'error',
        text1: 'Google Login Failed',
        text2: error.message || 'Failed to sign in with Google',
      });
    }
  };

  // Clear error when component unmounts or when navigation happens
  useEffect(() => {
    return () => {
      // You might want to clear auth error when leaving the screen
      // store.dispatch(setError(''));
    };
  }, []);

  return (
    <View className="flex-1 bg-gray-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        >
          <View className="px-6">
            {/* Card */}
            <View className="bg-white rounded-3xl px-6 py-8 shadow-xl border border-gray-100">
              
              {/* Logo */}
              <View className="items-center mb-6">
                <Logo size="xl" />
              </View>

              {/* Title */}
              <Text className="text-2xl font-rubik-bold text-gray-900 text-center">
                Sign in to your account
              </Text>
              <Text className="text-gray-500 text-center font-rubik mt-1 mb-8">
                Welcome back, let's continue
              </Text>

              {/* Inputs */}
              <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="you@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                error={emailError}
              />

              <Input
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                secureTextEntry
                error={passwordError}
              />

              {/* Forgot */}
              <TouchableOpacity 
                className="self-end mb-6"
                // onPress={() => navigation.navigate('ForgotPassword')}
              >
                <Text className="text-sm text-blue-600 font-rubik">
                  Forgot password?
                </Text>
              </TouchableOpacity>

              {/* Login Button */}
              <Button
                title="Sign In"
                onPress={handleLogin}
                loading={isLoading}
                fullWidth
              />

              {/* Divider */}
              <View className="flex-row items-center my-6">
                <View className="flex-1 h-px bg-gray-200" />
                <Text className="mx-3 text-gray-400 font-rubik text-sm">OR</Text>
                <View className="flex-1 h-px bg-gray-200" />
              </View>

              {/* Google */}
              <Button
                title="Continue with Google"
                onPress={handleGoogleLogin}
                loading={isLoading}
                variant="outline"
                fullWidth
              />

              {/* Signup */}
              <View className="flex-row justify-center mt-6">
                <Text className="text-gray-600 font-rubik">
                  Don't have an account?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                  <Text className="text-blue-600 font-rubik-bold ml-1">
                    Sign up
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Error Display - Combined from Redux and local state */}
              {(error || localError) && (
                <View className="mt-4 bg-red-50 p-3 rounded-xl">
                  <Text className="text-red-600 text-center font-rubik">
                    {error || localError}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;