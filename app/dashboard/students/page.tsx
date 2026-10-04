"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Target, Brain, Shield, LogOut, Mic, Play, Pause, RotateCcw } from "lucide-react";

export default function StudentPortal() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("focus");

  // Focus Timer State
  const [timeLeft, setTimeLeft] = useState(300); // 5 mins
  const [timerActive, setTimerActive] = useState(false);

  // Puzzle State
  const [puzzleAnswer, setPuzzleAnswer] = useState("");
  const [puzzleFeedback, setPuzzleFeedback] = useState("");

  const handlePuzzleSubmit = () => {
    if (puzzleAnswer.toLowerCase().trim() === "echo") {
      setPuzzleFeedback("Correct! Great job persevering.");
    } else {
      setPuzzleFeedback("Not quite. Try again!");
    }
  };

  return (
    <div className="flex h-screen bg-[#FDFBF7] overflow-hidden">
      {/* Student Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="h-20 flex items-center px-6 border-b border-slate-100">
          <BookOpen className="text-orange-500 w-6 h-6 mr-2" />
          <span className="font-bold text-lg text-slate-900">Student Portal</span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <button onClick={() => setActiveTab("focus")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'focus' ? 'bg-orange-50 text-orange-700' : 'text-slate-600 hover:bg-slate-50'}`}>
            <Target className="w-5 h-5" /> Focus Journey
          </button>
          <button onClick={() => setActiveTab("confidence")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'confidence' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}>
            <Brain className="w-5 h-5" /> Confidence Mirror
          </button>
          <button onClick={() => setActiveTab("resilience")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'resilience' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'}`}>
            <Shield className="w-5 h-5" /> Never Give Up
          </button>
        </nav>
        <div className="p-4 border-t border-slate-100">
          <button onClick={() => router.push("/")} className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg text-slate-600 hover:bg-red-50 hover:text-red-600">
            <LogOut className="w-5 h-5" /> Exit Portal
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-12">
        
        {/* TAB 1: FOCUS JOURNEY */}
        {activeTab === "focus" && (
          <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-slate-900">Focus Journey</h1>
            <p className="text-slate-500">Train your concentration using focused time blocks.</p>
            <Card className="border-orange-100 shadow-sm">
              <CardContent className="p-12 flex flex-col items-center justify-center space-y-8">
                <div className="text-6xl font-extrabold text-slate-900 tracking-tighter">
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </div>
                <div className="flex gap-4">
                  <Button onClick={() => setTimerActive(!timerActive)} className="bg-orange-500 hover:bg-orange-600 w-32">
                    {timerActive ? <Pause className="w-4 h-4 mr-2"/> : <Play className="w-4 h-4 mr-2"/>} 
                    {timerActive ? "Pause" : "Start"}
                  </Button>
                  <Button variant="outline" onClick={() => setTimeLeft(300)}>
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* TAB 2: CONFIDENCE MIRROR */}
        {activeTab === "confidence" && (
          <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-slate-900">Confidence Mirror</h1>
            <p className="text-slate-500">Self-confidence development through speaking challenges.</p>
            <Card className="border-blue-100 shadow-sm">
              <CardContent className="p-12 text-center space-y-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Mic className="w-10 h-10 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold">"Explain your favorite hobby"</h3>
                <p className="text-slate-500">Record yourself speaking for 60 seconds. Your teacher will review this to track your confidence growth.</p>
                <Button className="bg-blue-600 hover:bg-blue-700 w-full py-6 text-lg">Start Recording</Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* TAB 3: NEVER GIVE UP (PUZZLE) */}
        {activeTab === "resilience" && (
          <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-slate-900">Never Give Up</h1>
            <p className="text-slate-500">Track your perseverance through difficult logic puzzles.</p>
            <Card className="border-emerald-100 shadow-sm">
              <CardHeader><CardTitle>Daily Logic Puzzle</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg font-medium p-4 bg-slate-50 rounded-lg">
                  "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?"
                </p>
                <input 
                  type="text" 
                  placeholder="Type your answer here..."
                  className="w-full p-3 border border-slate-200 rounded-lg outline-none focus:border-emerald-500"
                  value={puzzleAnswer}
                  onChange={(e) => setPuzzleAnswer(e.target.value)}
                />
                {puzzleFeedback && (
                  <p className={`font-bold ${puzzleFeedback.includes("Correct") ? "text-emerald-600" : "text-red-500"}`}>
                    {puzzleFeedback}
                  </p>
                )}
                <Button onClick={handlePuzzleSubmit} className="w-full bg-emerald-600 hover:bg-emerald-700">Submit Answer</Button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}