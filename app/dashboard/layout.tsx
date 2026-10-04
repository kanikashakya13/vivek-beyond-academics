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
    { name: "Growth Reports", icon: FileText, href: "/dashboard" }, // Routes to main for demo purposes
    { name: "AI Mentor", icon: Bot, href: "/dashboard/ai-mentor" },
  ];

  // FIX: Platform Settings now properly routes to /dashboard/settings
  const adminNav = [
    { name: "System Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Platform Settings", icon: ShieldAlert, href: "/dashboard/settings" },
  ];

  const navItems = user.role === 'admin' ? adminNav : teacherNav;

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col z-20">
        <div className="h-20 flex items-center px-6 border-b border-slate-800">
          <BookOpen className="text-orange-500 w-6 h-6 mr-2" />
          <span className="text-white font-bold text-lg tracking-wider">VIVEK</span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
              <item.icon className="w-5 h-5" /> {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-4 py-3 mb-2 bg-slate-800/50 rounded-xl">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${user.role === 'admin' ? 'bg-purple-600' : 'bg-orange-500'}`}>
              {user.name.charAt(0)}
            </div>
            <div>
              <p className="text-white text-sm font-bold truncate max-w-[120px]">{user.name}</p>
              <p className={`text-xs font-semibold ${user.role === 'admin' ? 'text-purple-400' : 'text-orange-400'}`}>
                {user.role === 'admin' ? 'ADMIN PORTAL' : 'TEACHER PORTAL'}
              </p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg hover:bg-red-900/50 hover:text-red-400 transition-colors">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-8 relative">{children}</main>
    </div>
  );
}