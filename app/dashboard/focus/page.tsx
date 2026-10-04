"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Target, Brain, CheckCircle2 } from "lucide-react";

export default function FocusJourney() {
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Reflection states
  const [focusRating, setFocusRating] = useState(0);
  const [reflectionText, setReflectionText] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && isPaused === false && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setIsCompleted(true);
      clearInterval(interval!);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isPaused, timeLeft]);

  const startTimer = (minutes: number) => {
    setSelectedDuration(minutes);
    setTimeLeft(minutes * 60);
    setIsActive(true);
    setIsPaused(false);
    setIsCompleted(false);
    setSaved(false);
    setFocusRating(0);
    setReflectionText("");
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleRestart = () => {
    if (selectedDuration) {
      setTimeLeft(selectedDuration * 60);
      setIsActive(true);
      setIsPaused(false);
    }
  };

  const saveReflection = () => {
    setSaved(true);
    // In production, this would save to global context/Supabase
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Focus Journey</h1>
        <p className="text-slate-500 mt-2">
          Train your concentration using focused time blocks. Remember, true learning requires an unbroken mind.
        </p>
      </div>

      {!isActive && !isCompleted && !saved && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { mins: 1, title: "Quick Focus", desc: "1-minute centering practice", color: "text-blue-500", bg: "bg-blue-50" },
            { mins: 3, title: "Deep Dive", desc: "3-minute concentration", color: "text-orange-500", bg: "bg-orange-50" },
            { mins: 5, title: "Flow State", desc: "5-minute endurance run", color: "text-emerald-500", bg: "bg-emerald-50" }
          ].map((mode) => (
            <Card key={mode.mins} className="cursor-pointer hover:border-orange-500 hover:shadow-md transition-all" onClick={() => startTimer(mode.mins)}>
              <CardContent className="p-6 text-center space-y-4">
                <div className={`w-16 h-16 mx-auto rounded-full ${mode.bg} flex items-center justify-center`}>
                  <Target className={`w-8 h-8 ${mode.color}`} />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-slate-900">{mode.title}</h3>
                  <p className="text-sm text-slate-500">{mode.desc}</p>
                </div>
                <Button className="w-full bg-slate-900 text-white hover:bg-slate-800">Start Session</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {(isActive || (isCompleted && !saved)) && (
        <Card className="border-slate-200">
          <CardContent className="p-12 flex flex-col items-center justify-center space-y-8">
            <div className="relative">
              <svg className="w-64 h-64 transform -rotate-90">
                <circle cx="128" cy="128" r="120" stroke="#f1f5f9" strokeWidth="8" fill="transparent" />
                <circle 
                  cx="128" cy="128" r="120" 
                  stroke="#f97316" strokeWidth="8" fill="transparent"
                  strokeDasharray={754}
                  strokeDashoffset={isActive ? 754 - (754 * timeLeft) / (selectedDuration! * 60) : 0}
                  className="transition-all duration-1000 ease-linear"
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="text-5xl font-extrabold text-slate-900 tracking-tighter">
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>

            {isActive ? (
              <div className="flex gap-4">
                <Button onClick={handlePauseResume} variant="outline" className="w-16 h-16 rounded-full p-0 flex items-center justify-center">
                  {isPaused ? <Play className="w-6 h-6 text-green-600" /> : <Pause className="w-6 h-6 text-slate-600" />}
                </Button>
                <Button onClick={handleRestart} variant="outline" className="w-16 h-16 rounded-full p-0 flex items-center justify-center">
                  <RotateCcw className="w-6 h-6 text-orange-500" />
                </Button>
              </div>
            ) : (
              <div className="w-full max-w-lg space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-bold text-slate-900">Session Complete!</h3>
                  <p className="text-slate-500">Reflect on your focus to build your Growth DNA.</p>
                </div>
                
                <div className="space-y-4 bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-3">How focused did you feel? (1-5)</label>
                    <div className="flex justify-between gap-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button 
                          key={num} 
                          onClick={() => setFocusRating(num)}
                          className={`flex-1 py-3 rounded-lg border font-bold transition-all ${focusRating === num ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-slate-600 border-slate-200 hover:border-orange-300'}`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-2">What distracted you, or what helped you concentrate?</label>
                    <textarea 
                      className="w-full p-3 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-orange-500 min-h-[100px]"
                      value={reflectionText}
                      onChange={(e) => setReflectionText(e.target.value)}
                      placeholder="I felt distracted by..."
                    />
                  </div>
                  <Button 
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white" 
                    onClick={saveReflection}
                    disabled={focusRating === 0 || reflectionText.length < 5}
                  >
                    Save Reflection
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {saved && (
        <Card className="border-slate-200 text-center py-12 animate-in zoom-in">
          <CardContent className="space-y-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Great Job!</h3>
            <p className="text-slate-500">Your focus time and reflection have been added to your profile.</p>
            <Button onClick={() => setSaved(false)} variant="outline" className="mt-4">
              Return to Focus Menu
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}