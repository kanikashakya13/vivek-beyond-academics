"use client";
import { useApp } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { Users, Activity, Target, BrainCircuit, ShieldCheck, Database, Server, RefreshCw } from "lucide-react";
import { useState } from "react";

export default function DashboardOverview() {
  const { user, students } = useApp();
  const [isSyncing, setIsSyncing] = useState(false);

  const handleForceSync = () => {
    setIsSyncing(true);
    // Simulate a database sync delay
    setTimeout(() => {
      setIsSyncing(false);
      alert("Success: All offline classroom data has been synchronized with the cloud database.");
    }, 1500);
  };

  // --- ADMIN VIEW ---
  if (user?.role === 'admin') {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">System Administrator</h1>
            <p className="text-slate-500">Manage platform usage and registered educators.</p>
          </div>
          <Button 
            onClick={handleForceSync} 
            disabled={isSyncing}
            className="bg-purple-600 hover:bg-purple-700 text-white shadow-md"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isSyncing ? "animate-spin" : ""}`} />
            {isSyncing ? "Syncing..." : "Force System Sync"}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-purple-50 border-purple-100">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-purple-800">Active Teachers</CardTitle>
              <ShieldCheck className="w-4 h-4 text-purple-600" />
            </CardHeader>
            <CardContent><p className="text-3xl font-bold text-purple-900">42</p></CardContent>
          </Card>
          <Card className="bg-blue-50 border-blue-100">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-blue-800">Total Students Tracked</CardTitle>
              <Users className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent><p className="text-3xl font-bold text-blue-900">1,204</p></CardContent>
          </Card>
          <Card className="bg-emerald-50 border-emerald-100">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-emerald-800">System Status</CardTitle>
              <Server className="w-4 h-4 text-emerald-600" />
            </CardHeader>
            <CardContent><p className="text-3xl font-bold text-emerald-900">Online</p></CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader><CardTitle>Recent Admin Activity Logs</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-white border rounded-lg flex justify-between items-center">
              <div>
                <p className="font-bold">Database Sync</p>
                <p className="text-sm text-slate-500">All offline focus data synchronized successfully.</p>
              </div>
              <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded">SUCCESS</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // --- TEACHER VIEW ---
  const classAverages = [
    { subject: 'Concentration', A: 85, fullMark: 100 },
    { subject: 'Confidence', A: 78, fullMark: 100 },
    { subject: 'Perseverance', A: 82, fullMark: 100 },
    { subject: 'Initiative', A: 70, fullMark: 100 },
    { subject: 'Collaboration', A: 88, fullMark: 100 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Welcome, {user?.name}</h1>
        <p className="text-slate-500">Here is the holistic growth overview for your classes today.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-slate-600">Total Students</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold">{students.length}</p></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-slate-600">Avg. Focus Score</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold text-green-600">82%</p></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-slate-600">Resilience Index</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold text-purple-600">88%</p></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-slate-600">Active Activities</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold text-blue-600">12</p></CardContent></Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Class Growth DNA</CardTitle></CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={classAverages} outerRadius={90}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                <Radar name="Class 10-A" dataKey="A" stroke="#f97316" fill="#f97316" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}