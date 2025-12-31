import React from 'react';
import { View, Text, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import Avatar from './Avatar';
import Logo from '../common/Logo';
import { name as clientName } from '../../../app.json';

interface HomeHeaderProps {
  avatarImageUrl?: string;
  avatarName?: string;
  avatarEmail?: string;
  avatarSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | number;
  style?: StyleProp<ViewStyle>;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({
  avatarImageUrl,
  avatarName,
  avatarEmail,
  avatarSize = 'md',
  style,
}) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 24,
          paddingVertical: 16,
          backgroundColor: '#fff',
          elevation: 1,
        },
        style,
      ]}
    >
      {/* Left: Logo + App Name */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Logo size="md" />
        <Text
          style={{
            marginLeft: 8,
            fontSize: 18,
            fontFamily: 'Rubik-Bold',
            color: colors.text,
          }}
        >
          {clientName}
        </Text>
      </View>

      {/* Right: Avatar */}
      {avatarName || avatarEmail || avatarImageUrl ? (
        <Avatar
          name={avatarName}
          email={avatarEmail}
          imageUrl={avatarImageUrl || undefined}
          size={avatarSize as any}
        />
      ) : null}
    </View>
  );
};

export default HomeHeader;
