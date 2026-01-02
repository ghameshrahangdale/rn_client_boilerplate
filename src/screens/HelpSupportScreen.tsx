import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/ui/Header';
import Feather from 'react-native-vector-icons/Feather';

const HelpSupportScreen: React.FC = () => {
  const { colors } = useTheme();

  return (
    <View className="flex-1 bg-gray-50">
      <Header title="Help & Support" />

      <ScrollView contentContainerStyle={{ padding: 24 }}>
        {/* Help Section */}
        <View className="bg-white rounded-2xl p-5 shadow-sm mb-6">
          <Text className="text-base font-rubik-bold text-gray-900 mb-4">
            Need Help?
          </Text>

          <SupportRow
            icon="help-circle"
            title="FAQs"
            description="Find answers to common questions and issues"
            color={colors.primary}
          />

          <SupportRow
            icon="mail"
            title="Contact Support"
            description="Reach out to our support team for assistance"
            color={colors.primary}
          />

          <SupportRow
            icon="file-text"
            title="Documentation"
            description="Explore guides and usage instructions"
            color={colors.primary}
          />
        </View>

        {/* App & Legal */}
        <View className="bg-white rounded-2xl p-5 shadow-sm">
          <Text className="text-base font-rubik-bold text-gray-900 mb-4">
            App & Legal
          </Text>

          <SupportRow
            icon="shield"
            title="Privacy Policy"
            description="Learn how we protect your data"
            color={colors.primary}
          />

          <SupportRow
            icon="book"
            title="Terms & Conditions"
            description="Review our terms of service"
            color={colors.primary}
          />
        </View>
      </ScrollView>
    </View>
  );
};

interface SupportRowProps {
  icon: string;
  title: string;
  description: string;
  color: string;
}

const SupportRow: React.FC<SupportRowProps> = ({
  icon,
  title,
  description,
  color,
}) => (
  <View className="flex-row py-4 border-b border-gray-200 last:border-b-0">
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
  </View>
);

export default HelpSupportScreen;
