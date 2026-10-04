"use client";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, UserPlus, Loader2, Users } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

export default function StudentManagement() {
  const { students, addDemoStudent, isLoading } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indianNames = ["Rohan Gupta", "Priya Sharma", "Amit Patel", "Sneha Desai", "Karan Singh", "Anjali Verma", "Vikram Malhotra", "Neha Reddy"];
  
  const handleAddDemo = () => {
    const randomName = indianNames[Math.floor(Math.random() * indianNames.length)];
    const newStudent = {
      id: `VBA-00${students.length + 1}`,
      name: randomName,
      class: "10-Demo",
      focusScore: Math.floor(Math.random() * 30) + 65,
      confidence: Math.floor(Math.random() * 30) + 65,
      resilience: Math.floor(Math.random() * 30) + 65,
    };
    
    // Saves securely to Supabase via AppContext
    addDemoStudent(newStudent);
    setSelectedStudent(newStudent);
  };

  const getDNAData = (student: any) => [
    { category: 'Focus', score: student.focusScore }, 
    { category: 'Confidence', score: student.confidence },
    { category: 'Resilience', score: student.resilience }, 
    { category: 'Initiative', score: 85 }, 
    { category: 'Collaboration', score: 78 },
  ];

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-8rem)] flex-col items-center justify-center text-slate-500 gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
        <p className="font-bold text-lg">Syncing with Supabase Cloud...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-8rem)] font-sans">
      {/* Sidebar List */}
      <div className="w-full lg:w-1/3 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Student Profiles</h2>
          <Button onClick={handleAddDemo} size="sm" className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl shadow-lg shadow-orange-500/20 transition-all active:scale-95">
            <UserPlus className="w-4 h-4 mr-2" /> Add Demo
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search by name or ID..." className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-2xl outline-none focus:border-orange-400 transition-colors" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
          {filteredStudents.length === 0 ? (
             <div className="text-center p-8 text-slate-500 border-2 border-dashed border-slate-200 rounded-3xl">
                No students found. Click "Add Demo" to generate one!
             </div>
          ) : (
            filteredStudents.map(student => (
              <div key={student.id} onClick={() => setSelectedStudent(student)} className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${selectedStudent?.id === student.id ? 'border-orange-500 bg-orange-50 shadow-md shadow-orange-500/10' : 'border-slate-200 bg-white hover:border-orange-200'}`}>
                <h3 className="font-bold text-slate-900">{student.name}</h3>
                <p className="text-xs text-slate-500 font-medium">ID: {student.id} • Class {student.class}</p>
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Main DNA Chart Area */}
      <div className="w-full lg:w-2/3 bg-white border-none shadow-xl shadow-slate-200/50 rounded-3xl p-8 overflow-y-auto">
        {selectedStudent ? (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{selectedStudent.name}</h2>
              <p className="text-slate-500 font-medium mt-1">ID: {selectedStudent.id} | Class: {selectedStudent.class}</p>
            </div>
            <Card className="bg-slate-50 shadow-inner border border-slate-100 rounded-3xl">
              <CardHeader><CardTitle className="font-bold text-slate-700">Growth DNA Profile</CardTitle></CardHeader>
              <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={getDNAData(selectedStudent)}>
                    <PolarGrid stroke="#cbd5e1" />
                    <PolarAngleAxis dataKey="category" tick={{ fill: '#475569', fontSize: 13, fontWeight: 600 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                    <Radar name="Student" dataKey="score" stroke="#f97316" strokeWidth={3} fill="#f97316" fillOpacity={0.2} />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
            <Users className="w-16 h-16 text-slate-200" />
            <p className="font-medium text-lg">Select a student to view their Growth DNA</p>
          </div>
        )}
      </div>
    </div>
  );
}