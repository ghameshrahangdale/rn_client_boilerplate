import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
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

type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);
  const { colors } = useTheme();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const validateForm = () => {
    let isValid = true;

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email is invalid');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    try {
      await AuthService.loginWithEmail(email, password);
    } catch (error: any) {
      Alert.alert('Login Failed', error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const googleCredential = await signInWithGoogle();
      await AuthService.signInWithGoogle(googleCredential);
    } catch (error: any) {
      Alert.alert('Google Sign-In Failed', error.message);
    }
  };

  return (
    <LinearGradient
      colors={['#0F2027', '#203A43', '#2C5364']}
      className="flex-1"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="px-5">
            {/* Card */}
            <View className="bg-white rounded-3xl px-6 py-8 shadow-2xl">
            <Logo size='2xl'/>
              <Text className="text-3xl mt-4 text-center font-rubik-bold text-gray-900 mb-2">
                Welcome Back 👋
              </Text>
              <Text className="text-gray-500 text-center font-rubik mb-6">
                Login to continue
              </Text>

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

              <TouchableOpacity className="self-end mb-6">
                <Text className="text-blue-600 font-rubik">
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              <Button
                title="Sign In"
                onPress={handleLogin}
                loading={isLoading}
                fullWidth
                // className="mb-5"
              />

              {/* Divider */}
              <View className="flex-row items-center my-4">
                <View className="flex-1 h-px bg-gray-300" />
                <Text className="mx-4 text-gray-400 font-rubik">OR</Text>
                <View className="flex-1 h-px bg-gray-300" />
              </View>

              <Button
                title="Continue with Google"
                onPress={handleGoogleLogin}
                loading={isLoading}
                variant="outline"
                fullWidth
                className="mb-6"
              />

              {/* Signup */}
              <View className="flex-row justify-center">
                <Text className="text-gray-600 font-rubik">
                  Don’t have an account?
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Signup')}
                >
                  <Text className="text-blue-600 font-rubik ml-1">
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>

              {error && (
                <View className="mt-4 p-3 bg-red-50 rounded-xl">
                  <Text className="text-red-600 text-center font-rubik">
                    {error}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default LoginScreen;
