import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setLoading } from '../store/slices/authSlice';
import { RootState } from '../store/store';
import { User } from '../types';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isLoading, isAuthenticated, error } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userData: User = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          phoneNumber: firebaseUser.phoneNumber,
          emailVerified: firebaseUser.emailVerified,
        };
        dispatch(setUser(userData));
      } else {
        dispatch(setUser(null));
      }
      dispatch(setLoading(false));
    });

    return unsubscribe;
  }, [dispatch]);

  return {
    user,
    isLoading,
    isAuthenticated,
    error,
  };
};