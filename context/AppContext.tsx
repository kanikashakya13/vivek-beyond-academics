"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

type UserRole = 'teacher' | 'admin' | null;

interface AppState {
  user: { name: string; role: UserRole } | null;
  login: (role: UserRole) => void;
  logout: () => void;
  students: any[];
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ name: string; role: UserRole } | null>(null);
  
  // Seed realistic demo data required by the master prompt
  const [students] = useState([
    { id: 'VBA-001', name: 'Aarav Sharma', class: '10-A', focusScore: 85, resilience: 92, confidence: 78 },
    { id: 'VBA-002', name: 'Diya Patel', class: '10-A', focusScore: 90, resilience: 88, confidence: 85 },
    { id: 'VBA-003', name: 'Kabir Singh', class: '10-B', focusScore: 65, resilience: 70, confidence: 95 },
  ]);

  useEffect(() => {
    const savedUser = localStorage.getItem('vivek_auth');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const login = (role: UserRole) => {
    const session = { name: role === 'teacher' ? 'Demo Teacher' : 'Admin User', role };
    setUser(session);
    localStorage.setItem('vivek_auth', JSON.stringify(session));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vivek_auth');
  };

  return (
    <AppContext.Provider value={{ user, login, logout, students }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};