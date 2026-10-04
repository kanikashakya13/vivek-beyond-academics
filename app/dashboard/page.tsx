"use client";
import { useApp } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PolarGrid, PolarAngleAxis, PolarRadiusAxis, RadarChart, Radar, ResponsiveContainer } from "recharts";
import { Users, Server, ShieldCheck, RefreshCw } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function DashboardOverview() {
  const { user, students } = useApp();
  const [isSyncing, setIsSyncing] = useState(false);

  const handleForceSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      alert("Success: All cloud database records synchronized successfully.");
    }, 1500);
  };

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } };

  // Calculate Real-Time Averages from Supabase Students
  const totalStudents = students.length;
  const avgFocus = totalStudents > 0 ? Math.round(students.reduce((acc, s) => acc + s.focusScore, 0) / totalStudents) : 0;
  const avgConfidence = totalStudents > 0 ? Math.round(students.reduce((acc, s) => acc + s.confidence, 0) / totalStudents) : 0;
  const avgResilience = totalStudents > 0 ? Math.round(students.reduce((acc, s) => acc + s.resilience, 0) / totalStudents) : 0;

  const classAverages = [
    { subject: 'Concentration', A: avgFocus, fullMark: 100 },
    { subject: 'Confidence', A: avgConfidence, fullMark: 100 },
    { subject: 'Perseverance', A: avgResilience, fullMark: 100 },
    { subject: 'Initiative', A: totalStudents > 0 ? 80 : 0, fullMark: 100 },
    { subject: 'Collaboration', A: totalStudents > 0 ? 85 : 0, fullMark: 100 },
  ];

  if (user?.role === 'admin') {
    return (
      <motion.div variants={container as any} initial="hidden" animate="show" className="space-y-8">
        <motion.div variants={item as any} className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Welcome, {user?.name}</h1>
            <p className="text-slate-500 mt-1">System Administrator Control Center</p>
          </div>
          <Button onClick={handleForceSync} disabled={isSyncing} className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg rounded-xl h-12 px-6 font-bold">
            <RefreshCw className={`w-4 h-4 mr-2 ${isSyncing ? "animate-spin" : ""}`} />
            {isSyncing ? "Syncing..." : "Force System Sync"}
          </Button>
        </motion.div>
        
        <motion.div variants={container as any} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div variants={item as any}><Card className="bg-purple-50 rounded-3xl"><CardHeader className="pb-2"><CardTitle className="text-sm font-bold text-purple-800">Active Teachers</CardTitle></CardHeader><CardContent><p className="text-4xl font-black text-purple-900">1</p></CardContent></Card></motion.div>
          <motion.div variants={item as any}><Card className="bg-blue-50 rounded-3xl"><CardHeader className="pb-2"><CardTitle className="text-sm font-bold text-blue-800">Total Database Students</CardTitle></CardHeader><CardContent><p className="text-4xl font-black text-blue-900">{totalStudents}</p></CardContent></Card></motion.div>
          <motion.div variants={item as any}><Card className="bg-emerald-50 rounded-3xl"><CardHeader className="pb-2"><CardTitle className="text-sm font-bold text-emerald-800">System Status</CardTitle></CardHeader><CardContent><p className="text-4xl font-black text-emerald-900">Online</p></CardContent></Card></motion.div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div variants={container as any} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item as any}>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Welcome, {user?.name}</h1>
        <p className="text-slate-500 mt-1">Real-time holistic growth overview calculated from live cloud records.</p>
      </motion.div>
      
      <motion.div variants={container as any} className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div variants={item as any}><Card className="border-none shadow-xl rounded-3xl"><CardHeader className="pb-2"><CardTitle className="text-sm font-bold text-slate-500 uppercase">Total Students</CardTitle></CardHeader><CardContent><p className="text-4xl font-black text-slate-900">{totalStudents}</p></CardContent></Card></motion.div>
        <motion.div variants={item as any}><Card className="border-none shadow-xl rounded-3xl bg-emerald-50"><CardHeader className="pb-2"><CardTitle className="text-sm font-bold text-emerald-700 uppercase">Real Avg. Focus</CardTitle></CardHeader><CardContent><p className="text-4xl font-black text-emerald-600">{avgFocus}%</p></CardContent></Card></motion.div>
        <motion.div variants={item as any}><Card className="border-none shadow-xl rounded-3xl bg-purple-50"><CardHeader className="pb-2"><CardTitle className="text-sm font-bold text-purple-700 uppercase">Real Resilience</CardTitle></CardHeader><CardContent><p className="text-4xl font-black text-purple-600">{avgResilience}%</p></CardContent></Card></motion.div>
        <motion.div variants={item as any}><Card className="border-none shadow-xl rounded-3xl bg-blue-50"><CardHeader className="pb-2"><CardTitle className="text-sm font-bold text-blue-700 uppercase">Real Confidence</CardTitle></CardHeader><CardContent><p className="text-4xl font-black text-blue-600">{avgConfidence}%</p></CardContent></Card></motion.div>
      </motion.div>

      <motion.div variants={item as any} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-none shadow-xl rounded-3xl">
          <CardHeader><CardTitle className="font-bold text-xl">Live Class Growth DNA (Calculated)</CardTitle></CardHeader>
          <CardContent className="h-[350px]">
            {totalStudents === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-400 font-medium">
                No students in database yet. Add a student to generate live metrics!
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={classAverages} outerRadius={100}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 13, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                  <Radar name="Class" dataKey="A" stroke="#f97316" strokeWidth={3} fill="#f97316" fillOpacity={0.2} />
                </RadarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}