import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  User as FirebaseUser,
  GoogleAuthProvider,
  signInWithCredential,
  AuthCredential
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { store } from '../store/store';
import { setUser, setError, setLoading } from '../store/slices/authSlice';
import { User } from '../types';
import { Alert } from 'react-native';

// Convert Firebase user to our User type
const mapFirebaseUser = (firebaseUser: FirebaseUser): User => ({
  uid: firebaseUser.uid,
  email: firebaseUser.email,
  displayName: firebaseUser.displayName,
  photoURL: firebaseUser.photoURL,
  phoneNumber: firebaseUser.phoneNumber,
  emailVerified: firebaseUser.emailVerified,
});

export const AuthService = {


  // Email/Password Login
  async loginWithEmail(email: string, password: string): Promise<void> {
    try {
      store.dispatch(setLoading(true));
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = mapFirebaseUser(userCredential.user);
      store.dispatch(setUser(user));
    } catch (error: any) {
      const errorMessage = this.getErrorMessage(error.code);
      store.dispatch(setError(errorMessage));
      throw new Error(errorMessage);
    } finally {
      store.dispatch(setLoading(false));
    }
  },

  // Email/Password Signup
  async signupWithEmail(email: string, password: string, displayName: string): Promise<void> {
    try {
      store.dispatch(setLoading(true));
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with display name
      await updateProfile(userCredential.user, {
        displayName,
      });

      const user = mapFirebaseUser(userCredential.user);
      store.dispatch(setUser(user));
    } catch (error: any) {
      const errorMessage = this.getErrorMessage(error.code);
      store.dispatch(setError(errorMessage));
      throw new Error(errorMessage);
    } finally {
      store.dispatch(setLoading(false));
    }
  },

  // Google Sign-In
  async signInWithGoogle(credential: AuthCredential): Promise<void> {
    try {
      store.dispatch(setLoading(true));
      const userCredential = await signInWithCredential(auth, credential);
      const user = mapFirebaseUser(userCredential.user);
      store.dispatch(setUser(user));
    } catch (error: any) {
      const errorMessage = this.getErrorMessage(error.code);
      store.dispatch(setError(errorMessage));
      throw new Error(errorMessage);
    } finally {
      store.dispatch(setLoading(false));
    }
  },

  // Logout
  async logout(): Promise<void> {
    try {
      await signOut(auth);
      store.dispatch(setUser(null));
    } catch (error: any) {
      store.dispatch(setError(error.message));
    }
  },

  // Get current user
  getCurrentUser(): User | null {
    const state = store.getState();
    return state.auth.user;
  },

  // Error message mapper
  getErrorMessage(errorCode: string): string {
    const errorMessages: { [key: string]: string } = {
      'auth/invalid-email': 'Invalid email address',
      'auth/user-disabled': 'This account has been disabled',
      'auth/user-not-found': 'No account found with this email',
      'auth/wrong-password': 'Incorrect password',
      'auth/email-already-in-use': 'Email already in use',
      'auth/weak-password': 'Password should be at least 6 characters',
      'auth/network-request-failed': 'Network error. Please check your connection',
      'auth/too-many-requests': 'Too many attempts. Please try again later',
    };
    
    return errorMessages[errorCode] || 'An error occurred. Please try again.';
  }
};