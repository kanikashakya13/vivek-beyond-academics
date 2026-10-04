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
  login: (role: 'teacher' | 'admin', customName?: string) => void;
  logout: () => void;
  students: Student[];
  addStudent: (name: string, studentClass: string, focus: number, confidence: number, resilience: number) => Promise<void>;
  isLoading: boolean;
  saveReflection: (content: string) => Promise<boolean>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      const { data, error } = await supabase.from('students').select('*');
      if (data && !error) {
        setStudents(data);
      }
      setIsLoading(false);
    };
    fetchStudents();
  }, []);

  const login = (role: 'teacher' | 'admin', customName?: string) => {
    const defaultName = role === 'admin' ? 'System Administrator' : 'Demo Teacher';
    setUser({ name: customName && customName.trim() !== '' ? customName : defaultName, role });
  };

  const logout = () => setUser(null);

  const addStudent = async (name: string, studentClass: string, focus: number, confidence: number, resilience: number) => {
    const newStudent = {
      id: `VBA-00${students.length + 1}`,
      name,
      class: studentClass,
      focusScore: focus,
      confidence,
      resilience,
    };
    
    setStudents((prev) => [newStudent, ...prev]);
    
    const { error } = await supabase.from('students').insert([newStudent]);
    if (error) console.error("Error saving student to Supabase:", error);
  };

  const saveReflection = async (content: string) => {
    const { error } = await supabase.from('reflections').insert([{ content }]);
    if (error) {
      console.error("Supabase reflection error:", error);
      return false;
    }
    return true;
  };

  return (
    <AppContext.Provider value={{ user, login, logout, students, addStudent, isLoading, saveReflection }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) throw new Error('useApp must be used within an AppProvider');
  return context;
}