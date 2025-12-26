import React from 'react';
import { View, Text } from 'react-native';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import Logo from '../common/Logo';

const shadow = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.12,
  shadowRadius: 10,
  elevation: 10,
};

export const toastConfig = {
  success: ({ text1, text2 }: any) => (
    <View
      style={[shadow]}
      className="w-[90%] bg-white rounded-2xl px-4 py-3 flex-row items-center"
    >
      <Logo size="sm" />
      <View className="ml-3 flex-1">
        <Text className="text-green-600 font-semibold text-base">
          {text1}
        </Text>
        {text2 ? (
          <Text className="text-gray-600 text-sm mt-0.5">
            {text2}
          </Text>
        ) : null}
      </View>
    </View>
  ),

  error: ({ text1, text2 }: any) => (
    <View
      style={[shadow]}
      className="w-[90%] bg-white rounded-2xl px-4 py-3 flex-row items-center"
    >
      <Logo size="sm" />
      <View className="ml-3 flex-1">
        <Text className="text-red-600 font-semibold text-base">
          {text1}
        </Text>
        {text2 ? (
          <Text className="text-gray-600 text-sm mt-0.5">
            {text2}
          </Text>
        ) : null}
      </View>
    </View>
  ),

  info: ({ text1, text2 }: any) => (
    <View
      style={[shadow]}
      className="w-[90%] bg-white rounded-2xl px-4 py-3 flex-row items-center"
    >
      <Logo size="sm" />
      <View className="ml-3 flex-1">
        <Text className="text-blue-600 font-semibold text-base">
          {text1}
        </Text>
        {text2 ? (
          <Text className="text-gray-600 text-sm mt-0.5">
            {text2}
          </Text>
        ) : null}
      </View>
    </View>
  ),
};
