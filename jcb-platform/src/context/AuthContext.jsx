import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Load user data from localStorage or default to hardcoded mock user
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem('jcb_user_data');
    return saved ? JSON.parse(saved) : {
      uid: 'mock-user-123',
      email: 'admin@sribalaji.com',
      fullName: 'Admin User',
      role: 'ADMIN',
      plan: 'Premium',
      adminVerified: true
    };
  });

  React.useEffect(() => {
    localStorage.setItem('jcb_user_data', JSON.stringify(userData));
  }, [userData]);

  const user = {
    uid: 'mock-user-123',
    email: 'admin@sribalaji.com',
    displayName: 'Admin User'
  };

  const isAdmin = () => true;
  const loginWithGoogle = () => Promise.resolve();
  const loginWithEmail = () => Promise.resolve();
  const registerWithEmail = () => Promise.resolve();
  const logout = () => Promise.resolve();
  const changePassword = () => Promise.resolve();

  const value = {
    user,
    userData,
    loading: false,
    isAdmin,
    loginWithGoogle,
    loginWithEmail,
    registerWithEmail,
    logout,
    changePassword,
    setUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};

