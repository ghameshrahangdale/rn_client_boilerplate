import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Feather from 'react-native-vector-icons/Feather';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/ui/Header';

const MenuScreen: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigation = useNavigation();
const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  
  const { colors } = useTheme();

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await signOut(auth);
        },
      },
    ]);
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <Header
  title="Menu"
  avatarImageUrl={photoURL || user?.photoURL || undefined}
/>

      <ScrollView>
        {/* Profile Card */}
        <View className="bg-white mx-4 mt-6 p-5 rounded-2xl shadow-sm flex-row items-center">
          {/* Avatar */}
          <View
            className="w-14 h-14 rounded-full items-center justify-center"
            style={{ backgroundColor: colors.primary }}
          >
            <Text className="text-white text-xl font-rubik-bold">
              {user?.displayName?.charAt(0) ||
                user?.email?.charAt(0) ||
                'U'}
            </Text>
          </View>

          {/* User Info */}
          <View className="ml-4 flex-1">
            <Text className="text-xl font-rubik-bold text-gray-900">
              {user?.displayName || 'User'}
            </Text>
            <Text className="text-sm font-rubik text-gray-500 mt-1">
              {user?.email}
            </Text>
          </View>
        </View>

        {/* Menu Options */}
        <View className="bg-white mx-4 mt-6 rounded-2xl shadow-sm overflow-hidden">
          <MenuItem
            icon="user"
            label="My Profile"
            color={colors.primary}
            onPress={() => navigation.navigate('Profile' as never)}
          />
          <MenuItem
            icon="info"
            label="App Info"
            color={colors.primary}
          />
          <MenuItem
            icon="share-2"
            label="Share App"
            color={colors.primary}
          />
          <MenuItem
            icon="help-circle"
            label="Help & Support"
            color={colors.primary}
          />
        </View>

        {/* Logout */}
        <View className="bg-white mx-4 mt-6 rounded-2xl shadow-sm">
          <TouchableOpacity
            onPress={handleLogout}
            className="flex-row items-center px-5 py-4"
          >
            <Feather
              name="log-out"
              size={20}
              color={colors.error}
            />
            <Text className="ml-4 text-red-500 font-rubik-medium">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const MenuItem = ({
  icon,
  label,
  onPress,
  color,
}: {
  icon: string;
  label: string;
  onPress?: () => void;
  color: string;
}) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex-row items-center px-5 py-4 border-b border-gray-200 last:border-b-0"
  >
    <Feather name={icon as any} size={20} color={color} />
    <Text className="ml-4 text-gray-800 font-rubik flex-1">
      {label}
    </Text>
    <Feather
      name="chevron-right"
      size={18}
      color="#9CA3AF"
    />
  </TouchableOpacity>
);

export default MenuScreen;
