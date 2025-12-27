import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AppNavigator from './AppNavigator';
import AppInfoScreen from '../screens/AppInfoScreen';



export type AppStackParamList = {
  Tabs: undefined;
  Settings: undefined;
    AppInfo: undefined;
};

const Stack = createStackNavigator<AppStackParamList>();

const AppStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Bottom Tabs */}
      <Stack.Screen name="Tabs" component={AppNavigator} />

      {/* Screens NOT in bottom tabs */}
      <Stack.Screen name="AppInfo" component={AppInfoScreen} />
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
