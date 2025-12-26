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
import Avatar from '../components/ui/Avatar'; // <-- import Avatar
import Header from '../components/ui/Header';

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
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <Header
  title="Profile"
  avatarImageUrl={photoURL || user.photoURL || undefined}
/>

      <ScrollView contentContainerStyle={{ padding: 24 }}>
        {/* Avatar */}
        <View className="items-center mb-8">
          

          {!isEditing && (
            <TouchableOpacity onPress={() => setIsEditing(true)}>
              <Text
                className="font-rubik-medium mt-3"
                style={{ color: colors.primary }}
              >
                Edit Profile
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Profile Details */}
        <View className="bg-white rounded-2xl p-5 shadow-sm mb-6">
          <Text className="text-base font-rubik-bold text-gray-900 mb-4">
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
                valueColor={user.emailVerified ? colors.success : colors.error}
              />
            </>
          )}
        </View>

        {/* Actions */}
        {isEditing ? (
          <View className="flex-row gap-4">
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
              title="Save Changes"
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
      </ScrollView>
    </View>
  );
};

const InfoRow = ({
  label,
  value,
  valueColor,
}: {
  label: string;
  value: string;
  valueColor?: string;
}) => (
  <View className="flex-row py-3 border-b border-gray-200 last:border-b-0">
    <Text className="text-gray-500 font-rubik flex-1">{label}</Text>
    <Text
      className="font-rubik-medium"
      style={{ color: valueColor || '#374151' }}
    >
      {value}
    </Text>
  </View>
);

export default ProfileScreen;
