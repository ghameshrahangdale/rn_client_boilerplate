import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

interface InputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  error?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  className?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  error,
  keyboardType = 'default',
  autoCapitalize = 'none',
  className = '',
}) => {
  const { colors } = useTheme();

  return (
    <View className={`mb-4 ${className}`}>
      {label && (
        <Text className="mb-2 font-rubik-medium text-gray-700">{label}</Text>
      )}
      <TextInput
        className={`border rounded-lg px-4 text-base font-rubik ${
          error ? 'border-red-500' : 'border-gray-300'
        } focus:border-blue-500`}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        style={{
          color: colors.text,
        }}
      />
      {error && <Text className="mt-1 text-red-500 text-sm font-rubik">{error}</Text>}
    </View>
  );
};

export default Input;