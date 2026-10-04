"use client";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import { BookOpen, Users, Bot, LogOut, LayoutDashboard, ShieldAlert, FileText } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const teacherNav = [
    { name: "Class Overview", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Student Profiles", icon: Users, href: "/dashboard/students" },
    { name: "Growth Reports", icon: FileText, href: "/dashboard" }, 
    { name: "AI Mentor", icon: Bot, href: "/dashboard/ai-mentor" },
  ];

  const adminNav = [
    { name: "System Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Platform Settings", icon: ShieldAlert, href: "/dashboard/settings" },
  ];

  const navItems = user.role === 'admin' ? adminNav : teacherNav;

  return (
    <div className="flex h-screen bg-[#FAF7F2] overflow-hidden font-sans">
      <aside className="w-72 bg-white border-r border-slate-200/80 flex flex-col z-20 shadow-sm">
        <div className="h-24 flex items-center px-8 border-b border-slate-100 gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="font-black text-slate-900 tracking-tight block text-base">VIVEK</span>
            <span className="text-xs text-slate-500 font-bold tracking-wider uppercase">Beyond Academics</span>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className="flex items-center gap-3.5 px-5 py-3.5 rounded-2xl font-bold text-slate-600 hover:bg-orange-50 hover:text-orange-600 transition-all group">
              <item.icon className="w-5 h-5 text-slate-400 group-hover:text-orange-500 transition-colors" /> {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-100">
          <div className="flex items-center gap-4 px-2 mb-6">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-white shadow-lg ${user.role === 'admin' ? 'bg-purple-600 shadow-purple-600/20' : 'bg-orange-500 shadow-orange-500/20'}`}>
              {user.name.charAt(0)}
            </div>
            <div>
              <p className="text-slate-900 text-sm font-black truncate max-w-[120px]">{user.name}</p>
              <p className={`text-[10px] font-bold uppercase tracking-widest ${user.role === 'admin' ? 'text-purple-500' : 'text-orange-500'}`}>
                {user.role} Portal
              </p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-3.5 px-5 py-3.5 w-full text-left rounded-2xl font-bold text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-12 relative">{children}</main>
    </div>
  );
}