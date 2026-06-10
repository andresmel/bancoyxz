import { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../data/repository';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Persiste al recargar
    const saved = localStorage.getItem('bancoxyz_user');
    return saved ? JSON.parse(saved) : null;
  });

  const isAuthenticated = !!user;

  const login = (user: User) => {
    setUser(user);
    localStorage.setItem('bancoxyz_user', JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bancoxyz_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};