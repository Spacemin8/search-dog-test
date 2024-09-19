import React, { createContext, useState, ReactNode } from 'react';

// Define the context type
interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

// Create the context
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// Create a provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Login function
  const login = () => {
    setIsLoggedIn(true);
  };

  // Logout function
  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
