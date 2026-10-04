"use client";
import { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BookOpen, ShieldCheck, User, GraduationCap } from "lucide-react";

export default function LoginPage() {
  const { login } = useApp();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  
  const [email, setEmail] = useState("teacher@vivek.edu");
  const [password, setPassword] = useState("hackathon2026");

  // Fixes the Hydration Error by waiting for the client to mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleStandardLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes("admin")) login("admin");
    else login("teacher");
    router.push("/dashboard");
  };

  const handleDemoLogin = (role: 'teacher' | 'admin') => {
    login(role);
    router.push("/dashboard");
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#FDFBF7]">
      <div className="hidden md:flex flex-col justify-between bg-slate-900 text-white p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-[150px] opacity-20"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 font-bold text-2xl mb-12"><BookOpen className="text-orange-500" /> VIVEK</div>
          <h1 className="text-5xl font-extrabold leading-tight mb-6">Education Is <br /><span className="text-orange-400">More Than Marks.</span></h1>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center p-8 md:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900">Welcome Back</h2>
            <p className="text-slate-500 mt-2">Sign in to access the platform.</p>
          </div>

          <form onSubmit={handleStandardLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Email or Username</label>
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 outline-none" />
            </div>
            <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white py-6 font-bold">Standard Login</Button>
          </form>

          <Button onClick={() => router.push('/student')} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 flex gap-2">
            <GraduationCap className="w-5 h-5" /> Enter as Student
          </Button>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <Button onClick={() => handleDemoLogin('teacher')} variant="outline" className="py-6 border-orange-200 hover:bg-orange-50 text-orange-700 flex gap-2"><User className="w-4 h-4" /> Teacher Demo</Button>
            <Button onClick={() => handleDemoLogin('admin')} variant="outline" className="py-6 border-purple-200 hover:bg-purple-50 text-purple-700 flex gap-2"><ShieldCheck className="w-4 h-4" /> Admin Demo</Button>
          </div>
        </div>
      </div>
    </div>
  );
}