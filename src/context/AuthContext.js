import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../services/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState('jobseeker'); // 'jobseeker' or 'employer'

  function signup(email, password, fullName) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return updateProfile(userCredential.user, {
          displayName: fullName
        }).then(() => {
          toast.success('Account created successfully!');
          return userCredential;
        });
      })
      .catch(error => {
        toast.error(`Signup failed: ${error.message}`);
        throw error;
      });
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        toast.success('Logged in successfully!');
        return userCredential;
      })
      .catch(error => {
        toast.error(`Login failed: ${error.message}`);
        throw error;
      });
  }

  function logout() {
    return signOut(auth)
      .then(() => {
        toast.success('Logged out successfully!');
      })
      .catch(error => {
        toast.error(`Logout failed: ${error.message}`);
      });
  }

  function updateUserProfile(updates) {
    return updateProfile(auth.currentUser, updates)
      .then(() => {
        setUser({ ...user, ...updates });
        toast.success('Profile updated successfully!');
      })
      .catch(error => {
        toast.error(`Profile update failed: ${error.message}`);
      });
  }

  function switchRole(newRole) {
    setRole(newRole);
    localStorage.setItem('userRole', newRole);
    toast.success(`Switched to ${newRole} view`);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      
      // Get role from localStorage or default to jobseeker
      const savedRole = localStorage.getItem('userRole') || 'jobseeker';
      setRole(savedRole);
    });
    
    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    role,
    signup,
    login,
    logout,
    updateUserProfile,
    switchRole
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}