import React, { useState } from 'react';
import { View, Text, ScrollView, Switch } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/ui/Header';
import Feather from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const SettingsScreen: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [photoURL] = useState(user?.photoURL || '');
  const { colors } = useTheme();

  return (
    <View className="flex-1 bg-gray-50">
      <Header 
      title="Settings" 
        avatarImageUrl={photoURL || undefined}

       />

      <ScrollView contentContainerStyle={{ padding: 24 }}>
        {/* Preferences */}
        <View className="bg-white rounded-2xl p-5 shadow-sm mb-6">
          <Text className="text-base font-rubik-bold text-gray-900 mb-4">
            Preferences
          </Text>

          <SettingRow
            icon="bell"
            title="Notifications"
            description="Enable or disable app notifications"
            color={colors.primary}
          />
        </View>

        {/* Security */}
        <View className="bg-white rounded-2xl p-5 shadow-sm">
          <Text className="text-base font-rubik-bold text-gray-900 mb-4">
            Security
          </Text>

          <SettingRow
            icon="lock"
            title="App Lock"
            description="Use fingerprint authentication to secure the app"
            color={colors.primary}
            showSwitch
          />
        </View>
      </ScrollView>
    </View>
  );
};

interface SettingRowProps {
  icon: string;
  title: string;
  description: string;
  color: string;
  showSwitch?: boolean;
}

const SettingRow: React.FC<SettingRowProps> = ({
  icon,
  title,
  description,
  color,
  showSwitch = false,
}) => (
  <View className="flex-row items-center py-4 border-b border-gray-200 last:border-b-0">
    <View
      className="w-10 h-10 rounded-full items-center justify-center mr-4"
      style={{ backgroundColor: color + '15' }}
    >
      <Feather name={icon as any} size={20} color={color} />
    </View>

    <View className="flex-1">
      <Text className="font-rubik-medium text-gray-900">
        {title}
      </Text>
      <Text className="text-sm font-rubik text-gray-500 mt-0.5">
        {description}
      </Text>
    </View>

    {showSwitch && (
      <Switch
        value={false}
        onValueChange={() => {}}
        // thumbColor={color.primary}
      />
    )}
  </View>
);

export default SettingsScreen;
