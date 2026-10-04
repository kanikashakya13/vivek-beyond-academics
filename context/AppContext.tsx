"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

type User = { name: string; role: 'teacher' | 'admin' } | null;

type Student = {
  id: string;
  name: string;
  class: string;
  focusScore: number;
  confidence: number;
  resilience: number;
};

interface AppContextType {
  user: User;
  login: (role: 'teacher' | 'admin') => void;
  logout: () => void;
  students: Student[];
  addDemoStudent: (student: Student) => void;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Fetch Students from Supabase when the app loads
  useEffect(() => {
    const fetchStudents = async () => {
      const { data, error } = await supabase.from('students').select('*');
      if (data && !error) {
        setStudents(data);
      } else {
        console.error("Failed to load students:", error);
      }
      setIsLoading(false);
    };
    fetchStudents();
  }, []);

  const login = (role: 'teacher' | 'admin') => {
    setUser(role === 'admin' ? { name: 'Admin User', role: 'admin' } : { name: 'Demo Teacher', role: 'teacher' });
  };

  const logout = () => setUser(null);

  // 2. Save new Demo Students to Supabase
  const addDemoStudent = async (newStudent: Student) => {
    // Update UI instantly
    setStudents((prev) => [newStudent, ...prev]);
    
    // Save to database in the background
    await supabase.from('students').insert([{
      id: newStudent.id,
      name: newStudent.name,
      class: newStudent.class,
      focusScore: newStudent.focusScore,
      confidence: newStudent.confidence,
      resilience: newStudent.resilience
    }]);
  };

  return (
    <AppContext.Provider value={{ user, login, logout, students, addDemoStudent, isLoading }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) throw new Error('useApp must be used within an AppProvider');
  return context;
}