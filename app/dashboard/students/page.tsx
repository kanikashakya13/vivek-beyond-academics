"use client";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, UserPlus, Target, Brain, Shield, Zap, Users } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

export default function StudentManagement() {
  const { students } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDNAData = (student: any) => [
    { category: 'Concentration', score: student.focusScore },
    { category: 'Confidence', score: student.confidence },
    { category: 'Perseverance', score: student.resilience },
    { category: 'Initiative', score: 85 },
    { category: 'Collaboration', score: 78 },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-8rem)]">
      {/* Left Panel: Directory */}
      <div className="w-full lg:w-1/3 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-900">Student Profiles</h2>
          <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
            <UserPlus className="w-4 h-4 mr-2" /> Add Demo
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name or ID..." 
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
          {filteredStudents.map(student => (
            <div 
              key={student.id}
              onClick={() => setSelectedStudent(student)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedStudent?.id === student.id ? 'border-orange-500 bg-orange-50' : 'border-slate-200 bg-white hover:border-orange-300'}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-900">{student.name}</h3>
                  <p className="text-xs text-slate-500">ID: {student.id} • Class {student.class}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-sm">
                  {student.name.charAt(0)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel: Student Growth DNA */}
      <div className="w-full lg:w-2/3 bg-white border border-slate-200 rounded-2xl p-6 overflow-y-auto">
        {selectedStudent ? (
          <div className="space-y-8">
            <div className="flex justify-between items-start border-b border-slate-100 pb-6">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">{selectedStudent.name}</h2>
                <p className="text-slate-500">Class {selectedStudent.class} • Active Learner</p>
              </div>
              <Button variant="outline">Edit Profile</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* DNA Chart */}
              <Card className="border-none shadow-none bg-slate-50">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-700">Growth DNA Profile</CardTitle>
                </CardHeader>
                <CardContent className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={getDNAData(selectedStudent)}>
                      <PolarGrid stroke="#cbd5e1" />
                      <PolarAngleAxis dataKey="category" tick={{ fill: '#475569', fontSize: 11 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                      <Radar name="Student" dataKey="score" stroke="#f97316" fill="#f97316" fillOpacity={0.4} />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-700">Recent Development</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                    <Target className="w-5 h-5 text-orange-500 mb-2" />
                    <p className="text-2xl font-bold text-slate-900">{selectedStudent.focusScore}%</p>
                    <p className="text-xs text-slate-600">Focus Retention</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <Brain className="w-5 h-5 text-blue-500 mb-2" />
                    <p className="text-2xl font-bold text-slate-900">{selectedStudent.confidence}%</p>
                    <p className="text-xs text-slate-600">Confidence Mirror</p>
                  </div>
                  <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                    <Shield className="w-5 h-5 text-emerald-500 mb-2" />
                    <p className="text-2xl font-bold text-slate-900">{selectedStudent.resilience}%</p>
                    <p className="text-xs text-slate-600">Perseverance Index</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                    <Users className="w-5 h-5 text-purple-500 mb-2" />
                    <p className="text-2xl font-bold text-slate-900">12</p>
                    <p className="text-xs text-slate-600">Peer Endorsements</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Teacher Observations */}
            <div>
              <h3 className="font-semibold text-slate-700 mb-4">Latest Teacher Observations</h3>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <p className="text-sm text-slate-700">"Showed excellent initiative during the group science project. Took time to listen to classmates' ideas before proposing a solution."</p>
                <p className="text-xs text-slate-500">— Logged 2 days ago by Demo Teacher</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-400">
            <Users className="w-16 h-16 mb-4 opacity-20" />
            <p>Select a student from the directory to view their Growth DNA.</p>
          </div>
        )}
      </div>
    </div>
  );
}