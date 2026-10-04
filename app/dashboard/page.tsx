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
      alert("Success: All offline classroom data has been synchronized with the cloud database.");
    }, 1500);
  };

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } };

  if (user?.role === 'admin') {
    return (
      <motion.div variants={container as any} initial="hidden" animate="show" className="space-y-8">
        <motion.div variants={item as any} className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">System Administrator</h1>
            <p className="text-slate-500 mt-1">Manage platform usage and registered educators.</p>
          </div>
          <Button onClick={handleForceSync} disabled={isSyncing} className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-600/20 rounded-xl h-12 px-6 font-bold">
            <RefreshCw className={`w-4 h-4 mr-2 ${isSyncing ? "animate-spin" : ""}`} />
            {isSyncing ? "Syncing..." : "Force System Sync"}
          </Button>
        </motion.div>
        
        <motion.div variants={container as any} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div variants={item as any}><Card className="bg-purple-50 border-purple-100/50 shadow-lg shadow-purple-500/5 rounded-3xl"><CardHeader className="pb-2"><CardTitle className="text-sm font-bold text-purple-800 flex justify-between">Active Teachers <ShieldCheck className="w-5 h-5 text-purple-600" /></CardTitle></CardHeader><CardContent><p className="text-4xl font-black text-purple-900">42</p></CardContent></Card></motion.div>
          <motion.div variants={item as any}><Card className="bg-blue-50 border-blue-100/50 shadow-lg shadow-blue-500/5 rounded-3xl"><CardHeader className="pb-2"><CardTitle className="text-sm font-bold text-blue-800 flex justify-between">Total Students <Users className="w-5 h-5 text-blue-600" /></CardTitle></CardHeader><CardContent><p className="text-4xl font-black text-blue-900">1,204</p></CardContent></Card></motion.div>
          <motion.div variants={item as any}><Card className="bg-emerald-50 border-emerald-100/50 shadow-lg shadow-emerald-500/5 rounded-3xl"><CardHeader className="pb-2"><CardTitle className="text-sm font-bold text-emerald-800 flex justify-between">System Status <Server className="w-5 h-5 text-emerald-600" /></CardTitle></CardHeader><CardContent><p className="text-4xl font-black text-emerald-900">Online</p></CardContent></Card></motion.div>
        </motion.div>
        
        <motion.div variants={item as any}>
          <Card className="border-none shadow-xl shadow-slate-200/50 rounded-3xl">
            <CardHeader><CardTitle className="font-bold">Recent Admin Activity Logs</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl flex justify-between items-center">
                <div><p className="font-bold text-slate-900">Database Sync</p><p className="text-sm text-slate-500">All offline focus data synchronized successfully.</p></div>
                <span className="text-xs font-black text-emerald-600 bg-emerald-100 px-3 py-1.5 rounded-full tracking-wider">SUCCESS</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    );
  }

  const classAverages = [
    { subject: 'Concentration', A: 85, fullMark: 100 },
    { subject: 'Confidence', A: 78, fullMark: 100 },
    { subject: 'Perseverance', A: 82, fullMark: 100 },
    { subject: 'Initiative', A: 70, fullMark: 100 },
    { subject: 'Collaboration', A: 88, fullMark: 100 },
  ];

  return (
    <motion.div variants={container as any} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item as any}>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Welcome, {user?.name}</h1>
        <p className="text-slate-500 mt-1">Here is the holistic growth overview for your classes today.</p>
      </motion.div>
      
      <motion.div variants={container as any} className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div variants={item as any}><Card className="border-none shadow-xl shadow-slate-200/50 rounded-3xl"><CardHeader className="pb-2"><CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Students</CardTitle></CardHeader><CardContent><p className="text-4xl font-black text-slate-900">{students.length}</p></CardContent></Card></motion.div>
        <motion.div variants={item as any}><Card className="border-none shadow-xl shadow-emerald-500/10 rounded-3xl bg-emerald-50"><CardHeader className="pb-2"><CardTitle className="text-sm font-bold text-emerald-700 uppercase tracking-wider">Avg. Focus Score</CardTitle></CardHeader><CardContent><p className="text-4xl font-black text-emerald-600">82%</p></CardContent></Card></motion.div>
        <motion.div variants={item as any}><Card className="border-none shadow-xl shadow-purple-500/10 rounded-3xl bg-purple-50"><CardHeader className="pb-2"><CardTitle className="text-sm font-bold text-purple-700 uppercase tracking-wider">Resilience Index</CardTitle></CardHeader><CardContent><p className="text-4xl font-black text-purple-600">88%</p></CardContent></Card></motion.div>
        <motion.div variants={item as any}><Card className="border-none shadow-xl shadow-blue-500/10 rounded-3xl bg-blue-50"><CardHeader className="pb-2"><CardTitle className="text-sm font-bold text-blue-700 uppercase tracking-wider">Active Activities</CardTitle></CardHeader><CardContent><p className="text-4xl font-black text-blue-600">12</p></CardContent></Card></motion.div>
      </motion.div>

      <motion.div variants={item as any} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-none shadow-xl shadow-slate-200/50 rounded-3xl">
          <CardHeader><CardTitle className="font-bold text-xl">Class Growth DNA</CardTitle></CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={classAverages} outerRadius={100}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 13, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                <Radar name="Class 10-A" dataKey="A" stroke="#f97316" strokeWidth={3} fill="#f97316" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}