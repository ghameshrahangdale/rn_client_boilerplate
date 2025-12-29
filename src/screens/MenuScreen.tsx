import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Share,
  Platform,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Feather from 'react-native-vector-icons/Feather';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/ui/Header';
import { getVersion, getApplicationName } from 'react-native-device-info';
import { package as packageName } from '../../app.json';
import Avatar from '../components/ui/Avatar';
import Toast from 'react-native-toast-message';
import ConfirmationPopup from '../components/ui/ConfirmationPopup';
import { AuthService } from '../services/auth';

const MenuScreen: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigation = useNavigation();
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [showLogout, setShowLogout] = useState(false);
  const { colors } = useTheme();

  const handleShareApp = async () => {
    try {
      const appName = getApplicationName();
      const message =
        Platform.OS === 'android'
          ? `Check out ${appName} on Google Play Store: https://play.google.com/store/apps/details?id=rn_boilerplate`
          : `Check out ${appName} on App Store: https://apps.apple.com/app/id`;
      await Share.share({ message });
    } catch (error) {
      Alert.alert('Error', 'Unable to share the app.');
    }
  };



  const handleLogout = async () => {

    try {
      await AuthService.logout();
      

      Toast.show({
        type: 'success',
        text1: 'Logged out',
        text2: 'You have been logged out successfully',
        position: 'bottom',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Logout failed',
        text2: 'Please try again',
        position: 'bottom',
      });
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <Header
        title="Account & Menu"
        avatarImageUrl={photoURL || user?.photoURL || undefined}
      />

      <ScrollView>
        {/* Profile Card */}
        <View className="bg-white mx-4 mt-6 p-5 rounded-2xl shadow-sm flex-row items-center">
          {/* Avatar */}
          <Avatar
            imageUrl={photoURL || user?.photoURL || undefined}
            size="xl"
          />

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
            onPress={() => navigation.navigate('AppInfo' as never)}

          />
          <MenuItem
            icon="share-2"
            label="Share App"
            color={colors.primary}
            onPress={handleShareApp}
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
            onPress={() => setShowLogout(true)}
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

       <ConfirmationPopup
        visible={showLogout}
        title="Logout"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        onCancel={() => setShowLogout(false)}
        onConfirm={() => {
          setShowLogout(false);
          handleLogout();
        }}
      />
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
