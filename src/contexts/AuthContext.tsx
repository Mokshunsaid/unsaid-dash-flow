import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'mentee' | 'mentor' | 'admin' | 'super-admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  isVerified?: boolean;
  createdAt?: string;
  lastLogin?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const LOCAL_STORAGE_KEY = 'unsaidtalks_user';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const loadStoredUser = async () => {
      try {
        const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          // Validate the stored user data
          if (parsedUser.id && parsedUser.email && parsedUser.role) {
            setUser({
              ...parsedUser,
              lastLogin: new Date().toISOString()
            });
          } else {
            // Invalid stored data, clear it
            localStorage.removeItem(LOCAL_STORAGE_KEY);
          }
        }
      } catch (error) {
        console.error('Error loading stored user:', error);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredUser();
  }, []);

  const login = async (userData: User): Promise<void> => {
    try {
      const userWithTimestamp = {
        ...userData,
        lastLogin: new Date().toISOString(),
        isVerified: true
      };

      // Store in localStorage
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userWithTimestamp));
      
      // Update state
      setUser(userWithTimestamp);
      
      // In a real app, you might also want to:
      // - Store JWT tokens
      // - Set up API auth headers
      // - Trigger analytics events
      
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Failed to login');
    }
  };

  const logout = async (): Promise<void> => {
    try {
      // Clear localStorage
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      
      // Clear state
      setUser(null);
      
      // In a real app, you might also want to:
      // - Invalidate JWT tokens on the server
      // - Clear API auth headers
      // - Clear other user-related data
      
    } catch (error) {
      console.error('Logout error:', error);
      throw new Error('Failed to logout');
    }
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    
    // Update localStorage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedUser));
  };

  const hasRole = (roles: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    
    const roleArray = Array.isArray(roles) ? roles : [roles];
    return roleArray.includes(user.role);
  };

  const isAuthenticated = !!user;

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateUser,
    hasRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Helper hooks for specific roles
export const useIsRole = (role: UserRole): boolean => {
  const { hasRole } = useAuth();
  return hasRole(role);
};

export const useIsMentee = (): boolean => useIsRole('mentee');
export const useIsMentor = (): boolean => useIsRole('mentor');
export const useIsAdmin = (): boolean => useIsRole('admin');
export const useIsSuperAdmin = (): boolean => useIsRole('super-admin');

// Helper hook to check if user has admin privileges
export const useIsAdminOrAbove = (): boolean => {
  const { hasRole } = useAuth();
  return hasRole(['admin', 'super-admin']);
};

export default AuthContext;