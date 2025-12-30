import React from 'react';
import { useAuth } from '../hooks/useAuth';
import AuthNavigator from './AuthNavigator';
import AppStackNavigator from './AppStackNavigator';
import Loader from '../components/ui/Loader';

const Navigation: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loader fullScreen />;
  }

  return isAuthenticated ? <AppStackNavigator /> : <AuthNavigator />;
};

export default Navigation;
