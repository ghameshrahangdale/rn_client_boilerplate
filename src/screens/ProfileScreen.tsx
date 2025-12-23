import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useTheme } from '../context/ThemeContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Loader from '../components/ui/Loader';
import { updateProfile } from 'firebase/auth';
import { auth } from '../config/firebase';

const ProfileScreen: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { colors } = useTheme();
  
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
    } catch (error: any) {
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

 

  if (!user) {
    return <Loader fullScreen />;
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6">
        {/* Profile Header */}
        <View className="items-center mb-8">
          {/* <TouchableOpacity onPress={isEditing ? pickImage : undefined}>
            <View className="w-32 h-32 rounded-full bg-gray-200 items-center justify-center overflow-hidden mb-4">
              {photoURL ? (
                <Image
                  source={{ uri: photoURL }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              ) : (
                <Text className="text-4xl font-bold text-gray-600">
                  {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                </Text>
              )}
              {isEditing && (
                <View className="absolute inset-0 bg-black/50 items-center justify-center">
                  <Text className="text-white font-medium">Change</Text>
                </View>
              )}
            </View>
          </TouchableOpacity> */}
          
          {!isEditing && (
            <TouchableOpacity onPress={() => setIsEditing(true)}>
              <Text className="text-blue-500 font-bold">Edit Profile</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* User Info */}
        <View className="mb-8">
          <Text className="text-xl font-bold mb-4" style={{ color: colors.text }}>
            Personal Information
          </Text>
          
          <View className="bg-gray-50 rounded-xl p-4">
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
                  className="mb-4"
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
                <InfoRow label="User ID" value={user.uid.substring(0, 8) + '...'} />
              </>
            )}
          </View>
        </View>

        {/* Account Settings */}
        <View className="mb-8">
          <Text className="text-xl font-bold mb-4" style={{ color: colors.text }}>
            Account Settings
          </Text>
          
          <View className="bg-gray-50 rounded-xl overflow-hidden">
            {[
              { label: 'Change Password', icon: '🔒' },
              { label: 'Privacy Settings', icon: '👁️' },
              { label: 'Notification Preferences', icon: '🔔' },
              { label: 'Help & Support', icon: '❓' },
            ].map((item, index) => (
              <TouchableOpacity
                key={index}
                className={`flex-row items-center p-4 ${
                  index < 3 ? 'border-b border-gray-200' : ''
                }`}
              >
                <Text className="text-2xl mr-4">{item.icon}</Text>
                <Text className="text-gray-700 flex-1">{item.label}</Text>
                <Text className="text-gray-400">›</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        {isEditing ? (
          <View className="flex-row space-x-4">
            <Button
              title="Cancel"
              onPress={() => {
                setIsEditing(false);
                setDisplayName(user.displayName || '');
                setPhoneNumber(user.phoneNumber || '');
                setPhotoURL(user.photoURL || '');
              }}
              variant="outline"
              className="flex-1"
            />
            <Button
              title="Save Changes"
              onPress={handleSaveProfile}
              loading={isLoading}
              className="flex-1"
            />
          </View>
        ) : (
          <Button
            title="Edit Profile"
            onPress={() => setIsEditing(true)}
            variant="outline"
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
    <Text className="text-gray-600 flex-1">{label}</Text>
    <Text className={`font-medium text-${valueColor}-600`}>{value}</Text>
  </View>
);

export default ProfileScreen;