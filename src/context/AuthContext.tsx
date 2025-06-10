import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, createInitialUserData, db } from '@/lib/firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isSuperadmin: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, isSuperadmin: false });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSuperadmin, setIsSuperadmin] = useState(false);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (!user) {
        // User is logged out
        setIsSuperadmin(false);
        setLoading(false);
      }
      // The role check will be handled by the Firestore snapshot listener below
    });
    
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (user) {
      // Listen for real-time changes to the user's role
      const userDocRef = doc(db, 'users', user.uid);
      const unsubscribeFirestore = onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          const userData = doc.data();
          setIsSuperadmin(userData.role === 'superadmin');
        } else {
          // This case handles a new user sign-up
           createInitialUserData(user.uid, user.email || '');
        }
        setLoading(false);
      });
      return () => unsubscribeFirestore();
    }
  }, [user]);


  const value = { user, loading, isSuperadmin };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};