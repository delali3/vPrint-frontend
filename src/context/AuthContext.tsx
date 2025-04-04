// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { User, AuthContextType } from '../types';

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// API base URL - adjust based on your environment
const API_BASE_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:5000/api';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('printshop_auth_token');
        
        if (token) {
          // Set default axios header
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Verify token with backend (optional - depends on your auth strategy)
          try {
            const response = await axios.get(`${API_BASE_URL}/auth/verify`);
            
            if (response.data.success) {
              setCurrentUser(response.data.user);
              setIsAuthenticated(true);
              setIsAdmin(response.data.user.role === 'admin');
            } else {
              // Token invalid - clear localStorage
              localStorage.removeItem('printshop_auth_token');
              delete axios.defaults.headers.common['Authorization'];
            }
          } catch (err) {
            // Error verifying token - clear localStorage
            localStorage.removeItem('printshop_auth_token');
            delete axios.defaults.headers.common['Authorization'];
            console.error('Error verifying token:', err);
          }
        }
        
        setLoading(false);
      } catch (err) {
        setError('Error checking authentication status');
        setLoading(false);
        console.error('Auth check error:', err);
      }
    };
    
    checkLoggedIn();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setError(null);
    
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password
      });
      
      if (response.data.success) {
        // Store token in localStorage
        localStorage.setItem('printshop_auth_token', response.data.token);
        
        // Set default axios header
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        
        // Update state
        setCurrentUser(response.data.user);
        setIsAuthenticated(true);
        setIsAdmin(response.data.user.role === 'admin');
        
        return true;
      } else {
        setError(response.data.message || 'Invalid credentials');
        return false;
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error logging in');
      console.error('Login error:', err);
      return false;
    }
  };

  // For demonstration purposes, let's add a simple admin login function
  // In a real implementation, this would be handled by the standard login function
  const adminLogin = async (email: string, password: string): Promise<boolean> => {
    setError(null);
    
    // For demo purposes, hardcoded admin credentials
    // In a real app, this would validate against your backend
    if (email === 'admin@printshop.com' && password === 'admin123') {
      // Create a mock user and token
      const mockUser: User = {
        id: 1,
        name: 'Admin User',
        email: 'admin@printshop.com',
        role: 'admin'
      };
      
      const mockToken = 'mock_admin_token_' + Date.now();
      
      // Store in localStorage
      localStorage.setItem('printshop_auth_token', mockToken);
      
      // Set default axios header
      axios.defaults.headers.common['Authorization'] = `Bearer ${mockToken}`;
      
      // Update state
      setCurrentUser(mockUser);
      setIsAuthenticated(true);
      setIsAdmin(true);
      
      return true;
    } else {
      setError('Invalid admin credentials');
      return false;
    }
  };

  // Logout function
  const logout = () => {
    // Clear localStorage
    localStorage.removeItem('printshop_auth_token');
    
    // Clear axios header
    delete axios.defaults.headers.common['Authorization'];
    
    // Update state
    setCurrentUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  // Context value
  const value: AuthContextType = {
    currentUser,
    isAuthenticated,
    isAdmin,
    loading,
    error,
    login,
    adminLogin,
    logout,
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};