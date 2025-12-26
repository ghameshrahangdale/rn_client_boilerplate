import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/ui/Header';
import { getVersion, getApplicationName, getBundleId } from 'react-native-device-info';

const AppInfoScreen: React.FC = () => {
  const { colors } = useTheme();

  return (
    <View className="flex-1 bg-gray-50">
      <Header title="App Info" />

      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <View className="bg-white rounded-2xl p-5 shadow-sm mb-6">
          <Text
            className="text-base font-rubik-bold text-gray-900 mb-4"
          >
            Application Information
          </Text>

          <InfoRow label="App Name" value={getApplicationName()} />
          <InfoRow label="Version" value={getVersion()} />
          <InfoRow label="Package Name" value={getBundleId()} />
        </View>
      </ScrollView>
    </View>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <View className="flex-row py-3 border-b border-gray-200 last:border-b-0">
    <Text className="text-gray-500 font-rubik flex-1">{label}</Text>
    <Text className="font-rubik-medium text-gray-800">{value}</Text>
  </View>
);

export default AppInfoScreen;
