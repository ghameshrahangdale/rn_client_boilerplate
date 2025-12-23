import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AuthService } from '../services/auth';
import { RootState } from '../store/store';
import { useTheme } from '../context/ThemeContext';
import Button from '../components/ui/Button';

const HomeScreen: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await AuthService.logout();
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6">
        {/* Header */}
        <View className="mb-8">
          <Text className="text-3xl font-bold" style={{ color: colors.text }}>
            Welcome{user?.displayName ? `, ${user.displayName}` : ''}!
          </Text>
          <Text className="text-gray-600 mt-2">
            {user?.email || 'User'}
          </Text>
        </View>

        {/* Stats Cards */}
        <View className="flex-row flex-wrap justify-between mb-8">
          <View className="bg-blue-50 p-4 rounded-xl mb-4" style={{ width: '48%' }}>
            <Text className="text-2xl font-bold text-blue-600">12</Text>
            <Text className="text-gray-600 mt-1">Projects</Text>
          </View>
          
          <View className="bg-green-50 p-4 rounded-xl mb-4" style={{ width: '48%' }}>
            <Text className="text-2xl font-bold text-green-600">8</Text>
            <Text className="text-gray-600 mt-1">Completed</Text>
          </View>
          
          <View className="bg-purple-50 p-4 rounded-xl" style={{ width: '48%' }}>
            <Text className="text-2xl font-bold text-purple-600">24</Text>
            <Text className="text-gray-600 mt-1">Tasks</Text>
          </View>
          
          <View className="bg-yellow-50 p-4 rounded-xl" style={{ width: '48%' }}>
            <Text className="text-2xl font-bold text-yellow-600">4</Text>
            <Text className="text-gray-600 mt-1">Pending</Text>
          </View>
        </View>

        {/* Recent Activity */}
        <View className="mb-8">
          <Text className="text-xl font-bold mb-4" style={{ color: colors.text }}>
            Recent Activity
          </Text>
          <View className="bg-gray-50 rounded-xl p-4">
            {['Project X completed', 'Team meeting at 2 PM', 'New task assigned'].map((item, index) => (
              <View
                key={index}
                className={`py-3 ${index < 2 ? 'border-b border-gray-200' : ''}`}
              >
                <Text className="text-gray-800">{item}</Text>
                <Text className="text-gray-500 text-sm mt-1">2 hours ago</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View className="mb-8">
          <Text className="text-xl font-bold mb-4" style={{ color: colors.text }}>
            Quick Actions
          </Text>
          <View className="flex-row flex-wrap justify-between">
            {[
              { label: 'New Project', color: 'blue' },
              { label: 'Add Task', color: 'green' },
              { label: 'Invite Team', color: 'purple' },
              { label: 'Settings', color: 'gray' },
            ].map((action, index) => (
              <TouchableOpacity
                key={index}
                className={`bg-${action.color}-50 p-4 rounded-xl items-center mb-4`}
                style={{ width: '48%' }}
              >
                <View className={`w-12 h-12 rounded-full bg-${action.color}-100 items-center justify-center mb-2`}>
                  <Text className={`text-${action.color}-600 font-bold`}>
                    {action.label.charAt(0)}
                  </Text>
                </View>
                <Text className="text-gray-700 font-medium">{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Logout Button */}
        <Button
          title="Logout"
          onPress={handleLogout}
          variant="outline"
          fullWidth
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;