import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabsNavigations from './BottomTabsNavigations';
import AppInfoScreen from '../screens/AppInfoScreen';
import ProfileScreen from '../screens/ProfileScreen';

export type AppStackParamList = {
  Tabs: undefined;
  Settings: undefined;
  AppInfo: undefined;
  MyProfile: undefined;
};

const Stack = createStackNavigator<AppStackParamList>();

const AppStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={BottomTabsNavigations} />
      <Stack.Screen name="AppInfo" component={AppInfoScreen} />
      <Stack.Screen name="MyProfile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
