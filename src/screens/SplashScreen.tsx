import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../navigation/AuthNavigator';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../context/ThemeContext';

type SplashScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Splash'>;

const SplashScreen: React.FC = () => {
  const { isLoading } = useAuth();
  const { colors } = useTheme();
  const navigation = useNavigation<SplashScreenNavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Navigate to Login screen after 3 seconds
      navigation.navigate('Login');
    }, 3000);

    // Clean up the timer if component unmounts
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <View className="items-center">
        {/* Replace with your app logo */}
        <View 
          className="w-32 h-32 rounded-full mb-8 justify-center items-center"
          style={{ backgroundColor: colors.primary }}
        >
          <Text className="text-white font-rubik-bold text-4xl">LOGO</Text>
        </View>
        
        <Text className="text-3xl font-rubik-semibold mb-2" style={{ color: colors.text }}>
          Client Ready
        </Text>
        <Text className="text-gray-600 font-rubik text-lg">Welcome to Client Ready App</Text>
        
        {isLoading && (
          <View className="mt-8">
            <Text className="text-gray-500 font-rubik">Loading...</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default SplashScreen;