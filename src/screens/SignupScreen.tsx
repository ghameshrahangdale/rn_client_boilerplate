import React, { useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../navigation/AuthNavigator';
import Toast from 'react-native-toast-message';
import Logo from '../components/common/Logo';

type SignupScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'Signup'
>;

const SignupScreen: React.FC = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { isLoading, error } = useSelector(
    (state: RootState) => state.auth
  );
  const navigation = useNavigation<SignupScreenNavigationProp>();

  const validateForm = () => {
    const e: any = {};
    if (!displayName.trim()) e.displayName = 'Name required';
    if (!email) e.email = 'Email required';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Invalid email';
    if (!password) e.password = 'Password required';
    else if (password.length < 6) e.password = 'Min 6 characters';
    if (password !== confirmPassword)
      e.confirmPassword = 'Passwords do not match';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSignup = async () => {
  if (!validateForm()) return;

  try {
    await AuthService.signupWithEmail(email, password, displayName);

    // 🔑 Redux error check
    if (error) {
      throw new Error(error);
    }

    Toast.show({
      type: 'success',
      text1: 'Account created',
      text2: 'Please login to continue',
    });

    navigation.replace('Login');
  } catch (err: any) {
    const message = err?.message || 'Signup failed';

    Toast.show({
      type: 'error',
      text1: 'Signup Failed',
      text2: message,
    });
  }
};


  return (
    <View className="flex-1 bg-gray-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="px-6">
            <View className="bg-white rounded-3xl px-6 py-8 shadow-xl border border-gray-100">

              <View className="items-center mb-6">
                <Logo size="xl" />
              </View>

              <Text className="text-2xl font-rubik-bold text-center text-gray-900">
                Create your account
              </Text>
              <Text className="text-gray-500 text-center font-rubik mt-1 mb-8">
                It takes less than a minute
              </Text>

              <Input
                label="Full Name"
                value={displayName}
                onChangeText={setDisplayName}
                error={errors.displayName}
                placeholder="John Doe"
              />

              <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                error={errors.email}
                placeholder="eg. example@gmail.com"
              />

              <Input
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                error={errors.password}
                placeholder="••••••••"
              />

              <Input
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                error={errors.confirmPassword}
                placeholder="••••••••"
              />

              <Button
                title="Create Account"
                onPress={handleSignup}
                loading={isLoading}
                fullWidth
                className="mt-4"
              />

              <View className="flex-row justify-center mt-6">
                <Text className="text-gray-600 font-rubik">
                  Already have an account?
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Login')}
                >
                  <Text className="text-blue-600 font-rubik-bold ml-1">
                    Sign in
                  </Text>
                </TouchableOpacity>
              </View>

              {error && (
                <View className="mt-4 bg-red-50 p-3 rounded-xl">
                  <Text className="text-red-600 text-center font-rubik">
                    {error}
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

export default SignupScreen;
