// Navigation.tsx
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import AuthNavigator from './AuthNavigator';
import AppStackNavigator from './AppStackNavigator';
import Loader from '../components/ui/Loader';
import SplashScreen from '../screens/SplashScreen';

const Navigation: React.FC = () => {
  const { isAuthenticated, isLoading, isSigningUp   } = useAuth();

  if (isLoading) {
    return <SplashScreen />;
  }

  return isAuthenticated && !isSigningUp ? <AppStackNavigator /> : <AuthNavigator />;
};

export default Navigation;