"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTelemetry } from "@/hooks/useTelemetry";

export default function StudentView() {
  const router = useRouter();
  const { focusSeconds, retries, addRetry } = useTelemetry();
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const checkAnswer = () => {
    if (answer.toLowerCase().trim() === "echo") {
      setFeedback("Correct! Great job persevering.");
      setIsComplete(true);
    } else {
      setFeedback("Not quite. Try again!");
      addRetry(); // Logs a failure/retry silently
    }
  };

  const finishTask = () => {
    // Simulate offline save to local DB
    const focusMins = Math.floor(focusSeconds / 60);
    const sessionData = {
      name: "Test Student (You)",
      focusMins: focusMins < 1 ? 1 : focusMins, // Round up to 1 min for demo
      retries: retries,
      badges: 1
    };
    
    // Save to local storage so teacher dashboard can read it
    const existing = JSON.parse(localStorage.getItem("grit_sessions") || "[]");
    localStorage.setItem("grit_sessions", JSON.stringify([...existing, sessionData]));
    
    router.push("/"); // Send back to dashboard
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex flex-col items-center justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Logic Puzzle</CardTitle>
          <p className="text-sm text-gray-500">Read carefully and don't give up!</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg font-medium">"I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?"</p>
          
          <input 
            type="text" 
            placeholder="Type your answer..."
            className="w-full p-2 border rounded"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={isComplete}
          />

          {feedback && (
            <p className={`text-sm font-bold ${isComplete ? "text-green-600" : "text-red-500"}`}>
              {feedback}
            </p>
          )}

          {!isComplete ? (
            <div className="flex gap-2">
              <Button onClick={checkAnswer} className="w-full bg-blue-600 hover:bg-blue-700 text-white">Submit Answer</Button>
            </div>
          ) : (
            <Button onClick={finishTask} className="w-full bg-green-600 hover:bg-green-700 text-white">
              Turn In Assignment
            </Button>
          )}
        </CardContent>
      </Card>
      
      {/* Hidden telemetry display just for the hackathon pitch so judges can see it working */}
      <div className="mt-8 text-xs text-gray-400">
        Telemetry Running: {focusSeconds}s focus | {retries} retries
      </div>
    </div>
  );
}