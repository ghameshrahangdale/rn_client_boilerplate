// hooks/useAuth.ts
import { useEffect, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'; // Import from native module
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setLoading } from '../store/slices/authSlice';
import { RootState } from '../store/store';
import { User } from '../types';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isLoading, isAuthenticated, error } = useSelector(
    (state: RootState) => state.auth
  );
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(
      (firebaseUser: FirebaseAuthTypes.User | null) => {
        dispatch(setUser(firebaseUser));
        setIsInitializing(false); // 🔥 ONLY place loader stops
        
      }
    );

    return unsubscribe;
  }, [dispatch]);

  return {
    user,
    isLoading: isInitializing,
    isAuthenticated,
    error,
  };
};