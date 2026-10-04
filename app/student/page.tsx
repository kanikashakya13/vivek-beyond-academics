"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Target, Brain, Shield, LogOut, Mic, Play, Pause, RotateCcw, CheckCircle2, ShieldAlert, PenTool } from "lucide-react";
import { supabase } from "@/lib/supabase"; 
import { motion, AnimatePresence } from "framer-motion"; // <-- The magic

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
  const [isSaving, setIsSaving] = useState(false);

  const handlePuzzleSubmit = () => {
    setPuzzleFeedback(puzzleAnswer.toLowerCase().trim() === "echo" ? "Correct! Great job persevering." : "Not quite. Try again!");
  };

  const handleSaveJournal = async () => {
    if (!reflection.trim()) return;
    setIsSaving(true);
    const { error } = await supabase.from('reflections').insert([{ content: reflection }]);
    if (error) alert("Error saving: " + error.message);
    else { setReflection(""); alert("Journal entry saved securely to the Supabase Cloud!"); }
    setIsSaving(false);
  };

  return (
    <div className="flex h-screen bg-[#FAF7F2] overflow-hidden font-sans">
      <aside className="w-72 bg-white border-r border-slate-200/80 flex flex-col z-10 shadow-sm">
        <div className="h-24 flex items-center px-8 border-b border-slate-100 gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="font-black text-slate-900 tracking-tight block text-base">Student Portal</span>
            <span className="text-xs text-orange-600 font-bold tracking-wider uppercase">Active Session</span>
          </div>
        </div>
        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          <button onClick={() => setActiveTab("focus")} className={`w-full flex items-center gap-3.5 px-5 py-3.5 rounded-2xl font-bold transition-all ${activeTab === 'focus' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'text-slate-600 hover:bg-slate-50'}`}><Target className="w-5 h-5" /> Focus Journey</button>
          <button onClick={() => setActiveTab("confidence")} className={`w-full flex items-center gap-3.5 px-5 py-3.5 rounded-2xl font-bold transition-all ${activeTab === 'confidence' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-600 hover:bg-slate-50'}`}><Brain className="w-5 h-5" /> Confidence Mirror</button>
          <button onClick={() => setActiveTab("resilience")} className={`w-full flex items-center gap-3.5 px-5 py-3.5 rounded-2xl font-bold transition-all ${activeTab === 'resilience' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'text-slate-600 hover:bg-slate-50'}`}><Shield className="w-5 h-5" /> Never Give Up</button>
          <button onClick={() => setActiveTab("challenge")} className={`w-full flex items-center gap-3.5 px-5 py-3.5 rounded-2xl font-bold transition-all ${activeTab === 'challenge' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' : 'text-slate-600 hover:bg-slate-50'}`}><ShieldAlert className="w-5 h-5" /> Challenge Lab</button>
          <button onClick={() => setActiveTab("journal")} className={`w-full flex items-center gap-3.5 px-5 py-3.5 rounded-2xl font-bold transition-all ${activeTab === 'journal' ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/20' : 'text-slate-600 hover:bg-slate-50'}`}><PenTool className="w-5 h-5" /> Reflection Journal</button>
        </nav>
        <div className="p-6 border-t border-slate-100">
          <button onClick={() => router.push("/")} className="flex items-center gap-3 px-5 py-3.5 w-full text-left rounded-2xl font-bold text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"><LogOut className="w-5 h-5" /> Exit Portal</button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-12 relative flex flex-col justify-center max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab} // This makes the animation fire every time the tab changes
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full"
          >
            {/* FOCUS */}
            {activeTab === "focus" && (
              <div className="space-y-6">
                <div><h1 className="text-3xl font-black text-slate-900 tracking-tight">Focus Journey</h1><p className="text-slate-500 mt-1">Train your concentration using unbroken mindful blocks.</p></div>
                <Card className="bg-white border-none shadow-2xl shadow-slate-200/50 rounded-3xl overflow-hidden">
                  <CardContent className="p-16 flex flex-col items-center justify-center space-y-10">
                    <div className="text-8xl font-black text-slate-900 tracking-tighter tabular-nums bg-orange-50 px-10 py-6 rounded-3xl border border-orange-100 shadow-inner">
                      {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                    </div>
                    <div className="flex gap-5">
                      <Button onClick={() => setTimerActive(!timerActive)} className="bg-orange-500 hover:bg-orange-600 w-40 h-14 text-lg font-bold rounded-2xl shadow-lg shadow-orange-500/20 text-white">
                        {timerActive ? <Pause className="w-5 h-5 mr-2"/> : <Play className="w-5 h-5 mr-2"/>} {timerActive ? "Pause" : "Start"}
                      </Button>
                      <Button variant="outline" className="h-14 w-14 rounded-2xl border-2 border-slate-200" onClick={() => { setTimeLeft(300); setTimerActive(false); }}><RotateCcw className="w-5 h-5 text-slate-600" /></Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* CONFIDENCE */}
            {activeTab === "confidence" && (
              <div className="space-y-6">
                <div><h1 className="text-3xl font-black text-slate-900 tracking-tight">Confidence Mirror</h1><p className="text-slate-500 mt-1">Develop self-assurance through guided speaking challenges.</p></div>
                <Card className="bg-white border-none shadow-2xl shadow-slate-200/50 rounded-3xl overflow-hidden">
                  <CardContent className="p-16 text-center space-y-8">
                    <div className={`w-28 h-28 rounded-3xl flex items-center justify-center mx-auto transition-all ${isRecording ? 'bg-red-100 animate-pulse shadow-xl shadow-red-500/20' : 'bg-blue-50 shadow-xl shadow-blue-500/10'}`}>
                      <Mic className={`w-14 h-14 ${isRecording ? 'text-red-500' : 'text-blue-600'}`} />
                    </div>
                    <h3 className="text-2xl font-extrabold text-slate-900">"Explain your favorite hobby to the class."</h3>
                    {recordSaved ? (
                      <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex flex-col items-center text-emerald-600 gap-2 font-bold text-lg py-4">
                        <CheckCircle2 className="w-10 h-10" /> Recording Saved to Profile!
                      </motion.div>
                    ) : (
                      <Button onClick={() => { setIsRecording(!isRecording); if(isRecording) setRecordSaved(true); }} className={`w-full max-w-md py-7 text-lg font-bold rounded-2xl text-white shadow-xl transition-all ${isRecording ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20'}`}>
                        {isRecording ? "Stop Recording" : "Start Recording"}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* RESILIENCE */}
            {activeTab === "resilience" && (
              <div className="space-y-6">
                <div><h1 className="text-3xl font-black text-slate-900 tracking-tight">Never Give Up</h1><p className="text-slate-500 mt-1">Track your perseverance through multi-level logic challenges.</p></div>
                <Card className="bg-white border-none shadow-2xl shadow-slate-200/50 rounded-3xl overflow-hidden">
                  <CardContent className="p-10 space-y-6">
                    <p className="text-xl font-bold p-8 bg-emerald-50 text-emerald-900 rounded-2xl border border-emerald-100 leading-relaxed shadow-inner">
                      "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?"
                    </p>
                    <div className="space-y-4">
                      <input type="text" placeholder="Type your answer here..." className="w-full p-5 border-2 border-slate-200 rounded-2xl outline-none focus:border-emerald-500 text-lg font-medium transition-colors" value={puzzleAnswer} onChange={(e) => setPuzzleAnswer(e.target.value)} />
                      {puzzleFeedback && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`font-bold text-base px-2 ${puzzleFeedback.includes("Correct") ? "text-emerald-600" : "text-red-500"}`}>{puzzleFeedback}</motion.p>}
                      <Button onClick={handlePuzzleSubmit} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-7 text-lg font-bold rounded-2xl shadow-xl shadow-emerald-600/20 transition-all active:scale-95">Submit Answer</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* CHALLENGE LAB */}
            {activeTab === "challenge" && (
              <div className="space-y-6">
                <div><h1 className="text-3xl font-black text-slate-900 tracking-tight">Challenge Lab</h1><p className="text-slate-500 mt-1">Scenario-based decision-making for leadership and initiative.</p></div>
                <Card className="bg-white border-none shadow-2xl shadow-slate-200/50 rounded-3xl overflow-hidden">
                  <CardContent className="p-10 space-y-8">
                    <div className="p-8 bg-purple-50 rounded-2xl border border-purple-100 shadow-inner">
                      <h3 className="text-xl font-black text-purple-900 mb-2">Scenario: The Lost Item</h3>
                      <p className="text-purple-800 text-lg">"You find a valuable item in the school corridor. What would you do?"</p>
                    </div>
                    {!scenarioDone ? (
                      <div className="space-y-4">
                        <Button variant="outline" className="w-full justify-start py-7 px-6 text-base font-bold rounded-2xl border-2 border-slate-200 hover:border-purple-400 hover:bg-purple-50 transition-all hover:scale-[1.01]" onClick={() => setScenarioDone(true)}>A. Give it to a trusted teacher.</Button>
                        <Button variant="outline" className="w-full justify-start py-7 px-6 text-base font-bold rounded-2xl border-2 border-slate-200 hover:border-purple-400 hover:bg-purple-50 transition-all hover:scale-[1.01]" onClick={() => setScenarioDone(true)}>B. Try to identify its rightful owner.</Button>
                        <Button variant="outline" className="w-full justify-start py-7 px-6 text-base font-bold rounded-2xl border-2 border-slate-200 hover:border-purple-400 hover:bg-purple-50 transition-all hover:scale-[1.01]" onClick={() => setScenarioDone(true)}>C. Discuss with an adult mentor.</Button>
                      </div>
                    ) : (
                      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center p-10 bg-emerald-50 rounded-2xl text-emerald-800 font-bold space-y-3">
                        <CheckCircle2 className="w-14 h-14 mx-auto text-emerald-600"/>
                        <p className="text-xl font-black">Decision Recorded Successfully</p>
                        <p className="text-sm font-normal text-emerald-700">Your reflection has been added anonymously to your Growth DNA profile.</p>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* JOURNAL */}
            {activeTab === "journal" && (
              <div className="space-y-6">
                <div><h1 className="text-3xl font-black text-slate-900 tracking-tight">Reflection Journal</h1><p className="text-slate-500 mt-1">Record your daily learnings securely in the cloud database.</p></div>
                <Card className="bg-white border-none shadow-2xl shadow-slate-200/50 rounded-3xl overflow-hidden">
                  <CardContent className="p-10 space-y-6">
                    <label className="font-extrabold text-slate-800 text-lg block">What challenge did you overcome today?</label>
                    <textarea placeholder="Write your reflections here..." className="w-full p-6 border-2 border-slate-200 rounded-2xl outline-none focus:border-pink-500 text-lg min-h-[180px] transition-colors" value={reflection} onChange={(e) => setReflection(e.target.value)} />
                    <Button onClick={handleSaveJournal} disabled={isSaving} className="bg-pink-600 hover:bg-pink-700 text-white w-full py-7 text-lg font-bold rounded-2xl shadow-xl shadow-pink-600/20 disabled:opacity-50 transition-all active:scale-95">
                      {isSaving ? "Saving to Cloud..." : "Save Journal Entry"}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}