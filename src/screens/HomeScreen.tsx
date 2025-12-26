import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useTheme } from '../context/ThemeContext';
import Button from '../components/ui/Button';
import Feather from 'react-native-vector-icons/Feather';
import { name as clientName } from '../../app.json';
import Logo from '../components/common/Logo';
import Avatar from '../components/ui/Avatar';
import { AuthService } from '../services/auth';

const HomeScreen: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { colors } = useTheme();
  const [photoURL] = useState(user?.photoURL || '');

  const surface = '#FFFFFF';
  const textSecondary = '#6B7280';

  const firstName = user?.displayName?.split(' ')[0];

  const handleLogout = async () => {
    await AuthService.logout();
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 32 }}
      className="flex-1 bg-gray-50"
    >
      {/* Header */}
      <View
        className="px-6 pt-6 pb-4 flex-row items-center justify-between shadow-sm"
        style={{ backgroundColor: surface }}
      >
        <View className="flex-row items-center">
          <Logo size="md" />
          <Text
            className="ml-2 text-xl font-rubik-bold"
            style={{ color: colors.text }}
          >
            {clientName}
          </Text>
        </View>

        <Avatar imageUrl={photoURL || undefined} size="md" />
      </View>

      {/* Content */}
      <View className="px-6 mt-6">
        {/* Welcome */}
        <View className="mb-8">
          <Text
            className="text-2xl font-rubik-bold"
            style={{ color: colors.text }}
          >
            Welcome{firstName ? `, ${firstName}` : ''} 👋
          </Text>
          <Text
            className="mt-1 font-rubik"
            style={{ color: textSecondary }}
          >
            {user?.email}
          </Text>
        </View>

        {/* Highlight Card */}
        <View
          className="rounded-2xl p-6 mb-8"
          style={{
            backgroundColor: colors.primary + '12',
          }}
        >
          <Text
            className="text-lg font-rubik-bold mb-2"
            style={{ color: colors.primary }}
          >
            🚀 App Setup Complete
          </Text>
          <Text
            className="font-rubik leading-relaxed"
            style={{ color: colors.text }}
          >
            This boilerplate is production-ready with authentication,
            profile management, and a scalable architecture. You can now
            focus entirely on business features.
          </Text>
        </View>

        {/* Core Modules */}
        <View className="mb-8">
          <Text
            className="text-lg font-rubik-bold mb-4"
            style={{ color: colors.text }}
          >
            Core Modules
          </Text>

          <View className="flex-row flex-wrap justify-between">
            {[
              { icon: 'shield', title: 'Secure Auth' },
              { icon: 'user', title: 'User Profile' },
              { icon: 'settings', title: 'Config Ready' },
              { icon: 'layers', title: 'Scalable Base' },
            ].map((item, index) => (
              <View
                key={index}
                className="w-[48%] rounded-xl p-4 mb-4"
                style={{
                  backgroundColor: surface,
                  shadowColor: '#000',
                  shadowOpacity: 0.05,
                  shadowRadius: 8,
                  elevation: 2,
                }}
              >
                <Feather
                  name={item.icon as any}
                  size={22}
                  color={colors.primary}
                />
                <Text
                  className="mt-3 font-rubik-bold"
                  style={{ color: colors.text }}
                >
                  {item.title}
                </Text>
                <Text
                  className="text-sm mt-1 font-rubik"
                  style={{ color: textSecondary }}
                >
                  Ready to extend
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Account Status */}
        <View
          className="rounded-2xl p-6 mb-8"
          style={{ backgroundColor: surface }}
        >
          <Text
            className="text-lg font-rubik-bold mb-4"
            style={{ color: colors.text }}
          >
            Account Status
          </Text>

          <View className="flex-row items-center">
            <View
              className="w-2.5 h-2.5 rounded-full mr-2"
              style={{ backgroundColor: colors.success }}
            />
            <Text
              className="font-rubik-medium"
              style={{ color: colors.success }}
            >
              Active
            </Text>
          </View>
        </View>

        {/* Logout */}
        <Button
          title="Logout"
          variant="outline"
          fullWidth
          onPress={handleLogout}
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
