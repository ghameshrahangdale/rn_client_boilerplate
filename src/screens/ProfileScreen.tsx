import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useTheme } from '../context/ThemeContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Loader from '../components/ui/Loader';
import Feather from 'react-native-vector-icons/Feather';
import { updateProfile } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      setPhoneNumber(user.phoneNumber || '');
      setPhotoURL(user.photoURL || '');
    }
  }, [user]);

  const handleSaveProfile = async () => {
    if (!auth.currentUser) return;

    try {
      setIsLoading(true);
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL: photoURL || null,
      });
      Alert.alert('Success', 'Profile updated successfully');
      setIsEditing(false);
    } catch {
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return <Loader fullScreen />;

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 py-4 flex-row items-center justify-between shadow-sm">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={22} color="#111827" />
        </TouchableOpacity>

        <Text className="text-lg font-rubik-bold text-gray-900">
          Profile
        </Text>

        <View className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center">
          <Feather name="user" size={18} color="#111827" />
        </View>
      </View>

      <View className="p-6">
        {/* Avatar */}
        <View className="items-center mb-6">
          <View className="w-28 h-28 rounded-full bg-blue-600 items-center justify-center mb-3">
            <Text className="text-white text-4xl font-rubik-bold">
              {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
            </Text>
          </View>

          {!isEditing && (
            <TouchableOpacity onPress={() => setIsEditing(true)}>
              <Text className="text-blue-600 font-rubik-medium">
                Edit Profile
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Personal Info */}
        <View className="bg-white rounded-2xl p-5 shadow-sm mb-6">
          <Text className="text-lg font-rubik-bold text-gray-900 mb-4">
            Personal Information
          </Text>

          {isEditing ? (
            <>
              <Input
                label="Display Name"
                value={displayName}
                onChangeText={setDisplayName}
                placeholder="Enter your name"
                className="mb-4"
              />
              <Input
                label="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
              />
            </>
          ) : (
            <>
              <InfoRow label="Name" value={user.displayName || 'Not set'} />
              <InfoRow label="Email" value={user.email || 'Not set'} />
              <InfoRow label="Phone" value={user.phoneNumber || 'Not set'} />
              <InfoRow
                label="Email Verified"
                value={user.emailVerified ? 'Verified' : 'Not Verified'}
                valueColor={user.emailVerified ? 'green' : 'red'}
              />
            </>
          )}
        </View>

        {/* Account Settings */}
        <View className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
          {[
            { label: 'Change Password', icon: 'lock' },
            { label: 'Privacy Settings', icon: 'eye' },
            { label: 'Notifications', icon: 'bell' },
            { label: 'Help & Support', icon: 'help-circle' },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              className={`flex-row items-center px-5 py-4 ${
                index < 3 ? 'border-b border-gray-200' : ''
              }`}
            >
              <Feather name={item.icon as any} size={20} color="#2563EB" />
              <Text className="ml-4 text-gray-800 font-rubik flex-1">
                {item.label}
              </Text>
              <Feather name="chevron-right" size={18} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Actions */}
        {isEditing ? (
          <View className="flex-row gap-4 space-x-4">
            <Button
              title="Cancel"
              variant="outline"
              className="flex-1"
              onPress={() => {
                setIsEditing(false);
                setDisplayName(user.displayName || '');
                setPhoneNumber(user.phoneNumber || '');
                setPhotoURL(user.photoURL || '');
              }}
            />
            <Button
              title="Save"
              className="flex-1"
              loading={isLoading}
              onPress={handleSaveProfile}
            />
          </View>
        ) : (
          <Button
            title="Edit Profile"
            variant="outline"
            onPress={() => setIsEditing(true)}
          />
        )}
      </View>
    </ScrollView>
  );
};

const InfoRow: React.FC<{
  label: string;
  value: string;
  valueColor?: string;
}> = ({ label, value, valueColor = 'gray' }) => (
  <View className="flex-row py-3 border-b border-gray-200 last:border-b-0">
    <Text className="text-gray-500 font-rubik flex-1">{label}</Text>
    <Text className={`font-rubik-medium text-${valueColor}-500`}>
      {value}
    </Text>
  </View>
);

export default ProfileScreen;


