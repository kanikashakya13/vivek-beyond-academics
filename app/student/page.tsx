"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Target, Brain, Shield, LogOut, Mic, Play, Pause, RotateCcw, CheckCircle2, ShieldAlert, PenTool } from "lucide-react";

export default function StudentPortal() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("focus");

  // Timer State
  const [timeLeft, setTimeLeft] = useState(300);
  const [timerActive, setTimerActive] = useState(false);
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive && timeLeft > 0) interval = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    else if (timeLeft === 0) setTimerActive(false);
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  // UI States
  const [isRecording, setIsRecording] = useState(false);
  const [recordSaved, setRecordSaved] = useState(false);
  const [puzzleAnswer, setPuzzleAnswer] = useState("");
  const [puzzleFeedback, setPuzzleFeedback] = useState("");
  const [reflection, setReflection] = useState("");
  const [scenarioDone, setScenarioDone] = useState(false);

  const handlePuzzleSubmit = () => {
    setPuzzleFeedback(puzzleAnswer.toLowerCase().trim() === "echo" ? "Correct! Great job persevering." : "Not quite. Try again!");
  };

  return (
    <div className="flex h-screen bg-[#FDFBF7] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col z-10 shadow-sm">
        <div className="h-20 flex items-center px-6 border-b border-slate-100">
          <BookOpen className="text-orange-500 w-6 h-6 mr-2" />
          <span className="font-bold text-lg text-slate-900">Student Portal</span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <button onClick={() => setActiveTab("focus")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'focus' ? 'bg-orange-50 text-orange-700' : 'text-slate-600 hover:bg-slate-50'}`}><Target className="w-5 h-5" /> Focus Journey</button>
          <button onClick={() => setActiveTab("confidence")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'confidence' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}><Brain className="w-5 h-5" /> Confidence Mirror</button>
          <button onClick={() => setActiveTab("resilience")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'resilience' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'}`}><Shield className="w-5 h-5" /> Never Give Up</button>
          <button onClick={() => setActiveTab("challenge")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'challenge' ? 'bg-purple-50 text-purple-700' : 'text-slate-600 hover:bg-slate-50'}`}><ShieldAlert className="w-5 h-5" /> Challenge Lab</button>
          <button onClick={() => setActiveTab("journal")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'journal' ? 'bg-pink-50 text-pink-700' : 'text-slate-600 hover:bg-slate-50'}`}><PenTool className="w-5 h-5" /> Reflection Journal</button>
        </nav>
        <div className="p-4 border-t border-slate-100">
          <button onClick={() => router.push("/")} className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg text-slate-600 hover:bg-red-50 hover:text-red-600"><LogOut className="w-5 h-5" /> Exit Portal</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-12 relative">
        {/* FOCUS */}
        {activeTab === "focus" && (
          <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">Focus Journey</h1>
            <Card className="bg-white"><CardContent className="p-12 flex flex-col items-center justify-center space-y-8">
              <div className="text-7xl font-extrabold tabular-nums">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</div>
              <div className="flex gap-4">
                <Button onClick={() => setTimerActive(!timerActive)} className="bg-orange-500 hover:bg-orange-600 w-32 text-white">{timerActive ? <Pause className="w-4 h-4 mr-2"/> : <Play className="w-4 h-4 mr-2"/>} {timerActive ? "Pause" : "Start"}</Button>
                <Button variant="outline" onClick={() => { setTimeLeft(300); setTimerActive(false); }}><RotateCcw className="w-4 h-4" /></Button>
              </div>
            </CardContent></Card>
          </div>
        )}

        {/* CONFIDENCE */}
        {activeTab === "confidence" && (
          <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">Confidence Mirror</h1>
            <Card className="bg-white"><CardContent className="p-12 text-center space-y-6">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto transition-colors ${isRecording ? 'bg-red-100 animate-pulse' : 'bg-blue-100'}`}><Mic className={`w-12 h-12 ${isRecording ? 'text-red-500' : 'text-blue-500'}`} /></div>
              <h3 className="text-2xl font-bold">"Explain your favorite hobby"</h3>
              {recordSaved ? (
                <div className="flex flex-col items-center text-green-600 gap-2 font-bold py-4"><CheckCircle2 className="w-8 h-8" /> Recording Saved!</div>
              ) : (
                <Button onClick={() => { setIsRecording(!isRecording); if(isRecording) setRecordSaved(true); }} className={`w-full py-6 text-lg text-white ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-700'}`}>{isRecording ? "Stop Recording" : "Start Recording"}</Button>
              )}
            </CardContent></Card>
          </div>
        )}

        {/* RESILIENCE */}
        {activeTab === "resilience" && (
          <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">Never Give Up</h1>
            <Card className="bg-white"><CardContent className="p-6 space-y-4">
              <p className="text-lg font-medium p-6 bg-emerald-50 text-emerald-900 rounded-xl">"I speak without a mouth... What am I?"</p>
              <input type="text" placeholder="Type answer..." className="w-full p-4 border rounded-xl" value={puzzleAnswer} onChange={(e) => setPuzzleAnswer(e.target.value)} />
              {puzzleFeedback && <p className="font-bold text-emerald-600">{puzzleFeedback}</p>}
              <Button onClick={handlePuzzleSubmit} className="w-full bg-emerald-600 text-white py-6 rounded-xl">Submit Answer</Button>
            </CardContent></Card>
          </div>
        )}

        {/* CHALLENGE LAB */}
        {activeTab === "challenge" && (
          <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">Challenge Lab</h1>
            <Card className="bg-white"><CardContent className="p-8 space-y-6">
              <div className="p-6 bg-purple-50 rounded-xl"><h3 className="text-xl font-bold text-purple-900 mb-2">The Lost Item</h3><p className="text-purple-800">"You find a valuable item in the corridor. What do you do?"</p></div>
              {!scenarioDone ? (
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start py-6" onClick={() => setScenarioDone(true)}>A. Give it to a teacher.</Button>
                  <Button variant="outline" className="w-full justify-start py-6" onClick={() => setScenarioDone(true)}>B. Try to identify the owner.</Button>
                  <Button variant="outline" className="w-full justify-start py-6" onClick={() => setScenarioDone(true)}>C. Ignore it.</Button>
                </div>
              ) : (
                <div className="text-center p-6 bg-green-50 rounded-xl text-green-700 font-bold"><CheckCircle2 className="w-12 h-12 mx-auto mb-2"/> Decision Recorded. Your reflection is saved in your Growth DNA.</div>
              )}
            </CardContent></Card>
          </div>
        )}

        {/* JOURNAL */}
        {activeTab === "journal" && (
          <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">Reflection Journal</h1>
            <Card className="bg-white"><CardContent className="p-8 space-y-4">
              <label className="font-bold text-slate-700">What did you learn today?</label>
              <textarea placeholder="Write your thoughts..." className="w-full p-4 border rounded-xl min-h-[150px]" value={reflection} onChange={(e) => setReflection(e.target.value)} />
              <Button onClick={() => { setReflection(""); alert("Journal entry saved securely."); }} className="bg-pink-600 hover:bg-pink-700 text-white w-full py-6">Save Entry</Button>
            </CardContent></Card>
          </div>
        )}
      </main>
    </div>
  );
}