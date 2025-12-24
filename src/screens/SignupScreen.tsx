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
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { AuthService } from '../services/auth';
import { RootState } from '../store/store';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Loader from '../components/ui/Loader';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../navigation/AuthNavigator';

type SignupScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'Signup'
>;

const SignupScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { isLoading, error } = useSelector(
    (state: RootState) => state.auth
  );
  const navigation = useNavigation<SignupScreenNavigationProp>();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!displayName.trim()) newErrors.displayName = 'Name is required';

    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = 'Email is invalid';

    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';

    if (password !== confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    try {
      await AuthService.signupWithEmail(email, password, displayName);

      // ✅ Navigate to Login after successful signup
      navigation.replace('Login');
    } catch (error: any) {
      Alert.alert('Signup Failed', error.message);
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
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="px-5">
            {/* Card */}
            <View className="bg-white rounded-3xl px-6 py-8 shadow-2xl">
              <Text className="text-3xl font-rubik-bold text-gray-900 mb-2">
                Create Account 🚀
              </Text>
              <Text className="text-gray-500 font-rubik mb-6">
                Sign up to get started
              </Text>

              <Input
                label="Full Name"
                value={displayName}
                onChangeText={setDisplayName}
                placeholder="John Doe"
                autoCapitalize="words"
                error={errors.displayName}
              />

              <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="you@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email}
              />

              <Input
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                secureTextEntry
                error={errors.password}
              />

              <Input
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="••••••••"
                secureTextEntry
                error={errors.confirmPassword}
              />

              <Button
                title="Create Account"
                onPress={handleSignup}
                loading={isLoading}
                fullWidth
                className="mt-4 mb-6"
              />

              <View className="flex-row justify-center">
                <Text className="text-gray-600 font-rubik">
                  Already have an account?
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Login')}
                >
                  <Text className="text-blue-600 font-rubik-bold ml-1">
                    Sign In
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

export default SignupScreen;
