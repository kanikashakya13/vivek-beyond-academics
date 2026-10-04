"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, RotateCcw, ShieldAlert, Users, BookOpen } from "lucide-react";

// Scenario Data strictly based on the Master Prompt requirements
const SCENARIOS = [
  {
    id: 1,
    title: "The Lost Item",
    icon: ShieldAlert,
    color: "text-orange-500",
    bg: "bg-orange-50",
    situation: "You find a valuable item in the school corridor. What would you do?",
    options: [
      { id: "a", text: "Give it to a teacher.", insight: "A reliable choice that uses established authority to solve the problem." },
      { id: "b", text: "Try to identify its owner.", insight: "Shows initiative and problem-solving, though it requires more personal effort." },
      { id: "c", text: "Ignore it.", insight: "Avoids conflict or responsibility, but misses an opportunity to help." },
      { id: "d", text: "Discuss the situation with a trusted adult.", insight: "Demonstrates careful consideration and seeking guidance before acting." }
    ]
  },
  {
    id: 2,
    title: "The Team Conflict",
    icon: Users,
    color: "text-blue-500",
    bg: "bg-blue-50",
    situation: "Two members of your project team disagree about how to complete an assignment.",
    options: [
      { id: "a", text: "Listen to both sides.", insight: "A great first step in leadership, focusing on understanding before deciding." },
      { id: "b", text: "Suggest a group discussion.", insight: "Promotes democratic problem-solving and team collaboration." },
      { id: "c", text: "Ask for guidance.", insight: "Recognizes when a problem might need external mediation." },
      { id: "d", text: "Avoid the disagreement.", insight: "Keeps immediate peace, but the underlying issue may hurt the project later." }
    ]
  }
];

export default function ChallengeLab() {
  const [activeScenario, setActiveScenario] = useState<any | null>(null);
  const [selectedOption, setSelectedOption] = useState<any | null>(null);
  const [reflection, setReflection] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const handleStart = (scenario: any) => {
    setActiveScenario(scenario);
    setSelectedOption(null);
    setReflection("");
    setIsCompleted(false);
  };

  const handleComplete = () => {
    // In a real app, this pushes to Context/Supabase
    setIsCompleted(true);
  };

  if (activeScenario) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <Button variant="ghost" onClick={() => setActiveScenario(null)} className="text-slate-500 mb-4">
          ← Back to Lab Menu
        </Button>

        <Card className="border-slate-200 overflow-hidden">
          <div className={`${activeScenario.bg} p-8 border-b border-slate-100 flex items-center gap-4`}>
            <div className={`p-4 bg-white rounded-full shadow-sm ${activeScenario.color}`}>
              <activeScenario.icon className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{activeScenario.title}</h2>
              <p className="text-slate-600 font-medium mt-2 text-lg">"{activeScenario.situation}"</p>
            </div>
          </div>

          <CardContent className="p-8">
            {!selectedOption ? (
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-700 mb-4">How would you handle this?</h3>
                {activeScenario.options.map((opt: any) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedOption(opt)}
                    className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-orange-500 hover:bg-orange-50 transition-all group flex justify-between items-center"
                  >
                    <span className="font-medium text-slate-700 group-hover:text-orange-700">{opt.text}</span>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-orange-500" />
                  </button>
                ))}
              </div>
            ) : !isCompleted ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <p className="text-sm text-slate-500 uppercase font-bold tracking-wider mb-2">Your Choice</p>
                  <p className="text-lg font-medium text-slate-900">{selectedOption.text}</p>
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <p className="text-sm text-slate-500 uppercase font-bold tracking-wider mb-2">Outcome Insight</p>
                    <p className="text-slate-700">{selectedOption.insight}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="font-semibold text-slate-700">Why did you choose this approach?</label>
                  <textarea 
                    className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none min-h-[120px]"
                    placeholder="Reflect on your decision here..."
                    value={reflection}
                    onChange={(e) => setReflection(e.target.value)}
                  />
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setSelectedOption(null)}>Choose Differently</Button>
                  <Button 
                    className="bg-orange-500 hover:bg-orange-600 text-white flex-1"
                    onClick={handleComplete}
                    disabled={reflection.length < 10}
                  >
                    Save Reflection
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 space-y-4 animate-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Reflection Saved</h3>
                <p className="text-slate-500 max-w-md mx-auto">
                  There are no wrong answers in the Challenge Lab. Your reflection has been added to your personal Growth DNA profile.
                </p>
                <div className="pt-8">
                  <Button onClick={() => setActiveScenario(null)} className="bg-slate-900 text-white hover:bg-slate-800">
                    Return to Lab Menu
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Vivek Challenge Lab</h1>
        <p className="text-slate-500 max-w-2xl mt-2">
          Explore scenario-based decision-making inspired by self-reliance, leadership, and perseverance. 
          Remember, these exercises evaluate your thought process, not your moral character.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SCENARIOS.map(scenario => (
          <Card key={scenario.id} className="border-slate-200 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleStart(scenario)}>
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className={`p-3 rounded-xl ${scenario.bg} ${scenario.color}`}>
                <scenario.icon className="w-6 h-6" />
              </div>
              <CardTitle className="text-xl">{scenario.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 line-clamp-2">{scenario.situation}</p>
            </CardContent>
            <CardFooter className="pt-0">
              <span className="text-sm font-semibold text-orange-500 flex items-center gap-1 group-hover:gap-2 transition-all">
                Start Scenario <ArrowRight className="w-4 h-4" />
              </span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}