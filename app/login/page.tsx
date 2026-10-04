"use client";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BookOpen, ShieldCheck, User, GraduationCap } from "lucide-react";

export default function LoginPage() {
  const { login } = useApp();
  const router = useRouter();

  const handleDemoLogin = (role: 'teacher' | 'admin') => {
    login(role);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#FDFBF7]">
      <div className="hidden md:flex flex-col justify-between bg-slate-900 text-white p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-[150px] opacity-20 -z-0"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 font-bold text-2xl mb-12">
            <BookOpen className="text-orange-500" /> VIVEK
          </div>
          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            Education Is <br /><span className="text-orange-400">More Than Marks.</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-md">"Education is the manifestation of the perfection already in man." — Swami Vivekananda</p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center p-8 md:p-12 relative">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900">Welcome Back</h2>
            <p className="text-slate-500 mt-2">Sign in to access the platform.</p>
          </div>

          <div className="space-y-4">
            {/* Student Login is now functional */}
            <Button onClick={() => router.push('/student')} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 flex gap-2">
              <GraduationCap className="w-5 h-5" /> Enter as Student
            </Button>
          </div>

          <div className="relative py-6">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-200"></span></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#FDFBF7] px-4 text-slate-400 font-bold">Staff Demo Access</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button onClick={() => handleDemoLogin('teacher')} variant="outline" className="py-6 border-orange-200 hover:bg-orange-50 text-orange-700 flex gap-2">
              <User className="w-4 h-4" /> Teacher Demo
            </Button>
            <Button onClick={() => handleDemoLogin('admin')} variant="outline" className="py-6 border-purple-200 hover:bg-purple-50 text-purple-700 flex gap-2">
              <ShieldCheck className="w-4 h-4" /> Admin Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}