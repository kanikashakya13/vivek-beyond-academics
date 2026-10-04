"use client";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, UserPlus } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

export default function StudentManagement() {
  const { students: initialStudents } = useApp();
  const [students, setStudents] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);

  const filteredStudents = students.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.id.toLowerCase().includes(searchTerm.toLowerCase()));

  // FIX: Authentic name generator for the Add Demo button
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
    setStudents([newStudent, ...students]);
    setSelectedStudent(newStudent);
  };

  const getDNAData = (student: any) => [
    { category: 'Focus', score: student.focusScore }, 
    { category: 'Confidence', score: student.confidence },
    { category: 'Resilience', score: student.resilience }, 
    { category: 'Initiative', score: 85 }, 
    { category: 'Collaboration', score: 78 },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-8rem)]">
      <div className="w-full lg:w-1/3 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-900">Student Profiles</h2>
          <Button onClick={handleAddDemo} size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
            <UserPlus className="w-4 h-4 mr-2" /> Add Demo
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search by name or ID..." className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
          {filteredStudents.map(student => (
            <div key={student.id} onClick={() => setSelectedStudent(student)} className={`p-4 rounded-xl border cursor-pointer ${selectedStudent?.id === student.id ? 'border-orange-500 bg-orange-50' : 'border-slate-200 bg-white'}`}>
              <h3 className="font-bold text-slate-900">{student.name}</h3>
              <p className="text-xs text-slate-500">ID: {student.id} • Class {student.class}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full lg:w-2/3 bg-white border border-slate-200 rounded-2xl p-6 overflow-y-auto">
        {selectedStudent ? (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-slate-900">{selectedStudent.name}</h2>
            <Card className="bg-slate-50 shadow-none border-none">
              <CardHeader><CardTitle>Growth DNA</CardTitle></CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={getDNAData(selectedStudent)}>
                    <PolarGrid stroke="#cbd5e1" /><PolarAngleAxis dataKey="category" tick={{ fill: '#475569', fontSize: 12 }} /><PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                    <Radar name="Student" dataKey="score" stroke="#f97316" fill="#f97316" fillOpacity={0.4} />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        ) : (<div className="h-full flex items-center justify-center text-slate-400">Select a student</div>)}
      </div>
    </div>
  );
}