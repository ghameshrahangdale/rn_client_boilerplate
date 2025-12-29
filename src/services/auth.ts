import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  User as FirebaseUser,
  GoogleAuthProvider,
  signInWithCredential,
  AuthCredential,
  OAuthCredential
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { store } from '../store/store';
import { setUser, setError, setLoading } from '../store/slices/authSlice';
import { User } from '../types';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

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
      store.dispatch(setError(''));
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = mapFirebaseUser(userCredential.user);
      store.dispatch(setUser(user as any));
      return Promise.resolve();
    } catch (error: any) {
      console.log('Login error:', error);
      const errorCode = error?.code || error?.message || 'unknown-error';
      const errorMessage = this.getErrorMessage(errorCode);
      
      // Set error WITHOUT clearing user state
      store.dispatch(setError(errorMessage));
      
      // Keep loading false but don't reset user
      store.dispatch(setLoading(false));
      
      return Promise.reject(new Error(errorMessage));
    }
  },

  // Email/Password Signup (NO AUTO LOGIN)
async signupWithEmail(
  email: string,
  password: string,
  displayName: string
): Promise<void> {
  try {
    store.dispatch(setLoading(true));
    store.dispatch(setError(null));

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(userCredential.user, { displayName });

    await signOut(auth);
  } catch (error: any) {
    const errorCode =
      typeof error?.code === 'string'
        ? error.code
        : typeof error?.message === 'string'
        ? error.message
        : 'unknown-error';

    const errorMessage = this.getErrorMessage(errorCode);
    store.dispatch(setError(errorMessage));

    return;
  } finally {
    store.dispatch(setLoading(false));
  }
}
,

  // Google Sign-In
  
  async signInWithGoogle(credential: AuthCredential): Promise<void> {
    try {
      store.dispatch(setLoading(true));
      
      const userCredential = await signInWithCredential(auth, credential);
      const user = mapFirebaseUser(userCredential.user);
      store.dispatch(setUser(user as any));
      return Promise.resolve();
    } catch (error: any) {
      const errorCode = error?.code || error?.message || 'unknown-error';
      const errorMessage = this.getErrorMessage(errorCode);
      
      // Set error without clearing user state
      store.dispatch(setError(errorMessage));
      store.dispatch(setLoading(false));
      
      return Promise.reject(new Error(errorMessage));
    }
  },
  
  // Add this method to explicitly handle logout
  async clearError(): Promise<void> {
    store.dispatch(setError(null));
  },

  // Logout
  async logout(): Promise<void> {
    try {
      // Sign out from Firebase
      await signOut(auth);
      
      try {
        await GoogleSignin.signOut();
      } catch (error) {
        // Ignore Google sign out errors
      }
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
  const errorMessages: Record<string, string> = {
    'auth/invalid-email': 'Invalid email address',
    'auth/user-disabled': 'This account has been disabled',
    'auth/user-not-found': 'No account found with this email',
    'auth/wrong-password': 'Incorrect password',
    'auth/invalid-credential': 'Incorrect email or password',
    'auth/email-already-in-use': 'Email already in use',
    'auth/weak-password': 'Password should be at least 6 characters',
    'auth/network-request-failed': 'Network error. Please check your connection',
    'auth/too-many-requests': 'Too many attempts. Please try again later',
    'auth/account-exists-with-different-credential':
      'Account already exists with different credentials',
  };

  // 🔥 Handle message-based errors fallback
  if (errorCode.includes('invalid-credential')) {
    return 'Incorrect email or password';
  }

  return errorMessages[errorCode] || 'An error occurred. Please try again.';
}

};