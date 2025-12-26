import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { AuthService } from '../services/auth';
import { RootState } from '../store/store';
import { useTheme } from '../context/ThemeContext';
import Button from '../components/ui/Button';
import Feather from 'react-native-vector-icons/Feather';
import {name as clientName} from '../../app.json';
import Logo from '../components/common/Logo';
import Avatar from '../components/ui/Avatar';

const HomeScreen: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { colors } = useTheme();
    const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  

  const handleLogout = async () => {
    await AuthService.logout();
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 py-4 flex-row items-center justify-between shadow-sm">
   
        {/* Logo + App Name */}
        <View className="flex-row items-center">
          <Logo size='md'/>
          <Text className="text-xl ml-2 font-rubik-bold text-gray-900">
            {clientName}
          </Text>
        </View>

        {/* Profile Icon */}
        <Avatar
            imageUrl={photoURL || user?.photoURL || undefined}
          />
      </View>

      <View className="p-6">
        {/* Welcome */}
        <View className="mb-6">
          <Text className="text-2xl font-rubik-bold text-gray-900">
            Welcome{user?.displayName ? `, ${user.displayName.split(' ')[0]}` : ''} 👋
          </Text>
          <Text className="text-gray-600 font-rubik mt-1">
            {user?.email}
          </Text>
        </View>

        {/* App Ready Card */}
        <View className="bg-white p-6 rounded-2xl shadow-sm mb-6">
          <Text className="text-xl font-rubik-bold text-gray-900 mb-2">
            🚀 Your App Is Ready
          </Text>
          <Text className="text-gray-600 font-rubik leading-relaxed">
            This application is fully set up and ready for your client.
            Authentication, user management, and core structure are already in place.
            You can now start integrating business-specific features.
          </Text>
        </View>

        {/* Features Section */}
        <View className="mb-6">
          <Text className="text-lg font-rubik-bold text-gray-900 mb-4">
            Available Modules
          </Text>

          <View className="flex-row flex-wrap justify-between">
            {[
              { icon: 'shield', title: 'Secure Auth' },
              { icon: 'user-check', title: 'User Profiles' },
              { icon: 'settings', title: 'App Settings' },
              { icon: 'layers', title: 'Scalable Base' },
            ].map((item, index) => (
              <View
                key={index}
                className="w-[48%] bg-white rounded-xl p-4 mb-4 shadow-sm"
              >
                <Feather
                  name={item.icon as any}
                  size={22}
                  color="#2563EB"
                />
                <Text className="mt-3 text-gray-900 font-rubik-bold">
                  {item.title}
                </Text>
                <Text className="text-gray-500 font-rubik text-sm mt-1">
                  Ready to extend
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Account Info */}
        <View className="bg-white p-6 rounded-2xl shadow-sm mb-6">
          <Text className="text-lg font-rubik-bold text-gray-900 mb-4">
            Account Information
          </Text>

          <View className="space-y-4">
            {user?.displayName && (
              <View>
                <Text className="text-gray-500 font-rubik-medium">
                  Name
                </Text>
                <Text className="text-gray-800 font-rubik text-lg">
                  {user.displayName}
                </Text>
              </View>
            )}

            {user?.email && (
              <View>
                <Text className="text-gray-500 font-rubik-medium">
                  Email
                </Text>
                <Text className="text-gray-800 font-rubik text-lg">
                  {user.email}
                </Text>
              </View>
            )}

            <View>
              <Text className="text-gray-500 font-rubik-medium">
                Status
              </Text>
              <View className="flex-row items-center mt-1">
                <View className="w-2.5 h-2.5 rounded-full bg-green-500 mr-2" />
                <Text className="text-green-700 font-rubik-medium">
                  Active
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Logout */}
        <Button
          title="Logout"
          onPress={handleLogout}
          variant="outline"
          fullWidth
          className="mt-4"
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
