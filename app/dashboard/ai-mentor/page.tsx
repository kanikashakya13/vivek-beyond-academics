"use client";
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Send, Sparkles, User, Copy, Trash2, CheckCircle2 } from "lucide-react";

export default function AIMentor() {
  const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string }[]>([
    {
      role: "ai",
      content: "Hello! I am your VIVEK Growth Assistant. I can help you summarize student observations, suggest classroom activities, or create weekly development goals. What would you like to focus on today?"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const newMessages = [...messages, { role: "user" as const, content: text }];
    setMessages(newMessages);
    setInputValue("");

    // Simulate AI processing delay
    setTimeout(() => {
      let aiResponse = "";
      const lowerText = text.toLowerCase();

      // Rule-based demo responses
      if (lowerText.includes("aarav") || lowerText.includes("focus")) {
        aiResponse = "Based on Aarav's recent Focus Journey data, his concentration drops after 3 minutes. **Recommendation:** Offer shorter, 2-minute focus blocks and encourage him to take brief stretch breaks in between to build endurance gradually.";
      } else if (lowerText.includes("confidence") || lowerText.includes("shy")) {
        aiResponse = "For students struggling with confidence, I recommend the 'Explain Your Favorite Topic' activity from the Confidence Mirror. Letting them speak for 60 seconds about a topic they already love (like a hobby or sport) drastically lowers anxiety.";
      } else if (lowerText.includes("goal") || lowerText.includes("class 10-a")) {
        aiResponse = "**Weekly Goal for Class 10-A:** \n1. Complete two 5-minute Focus Journeys.\n2. Have every student leave at least one Peer Endorsement for a classmate.\n3. Log one Reflection Journal entry on 'What challenged me this week?'";
      } else {
        aiResponse = "That is a great observation. To support this, try breaking the task into smaller steps and asking the student to reflect on which specific part feels most challenging. Would you like me to generate a specific activity for this?";
      }

      setMessages([...newMessages, { role: "ai", content: aiResponse }]);
    }, 1000);
  };

  const handleCopy = (content: string, index: number) => {
    navigator.clipboard.writeText(content);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const SUGGESTED_PROMPTS = [
    "Summarize Aarav's focus trends.",
    "Suggest an activity to build confidence.",
    "Generate a weekly goal for Class 10-A."
  ];

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-8rem)] flex flex-col space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-slate-900">AI Mentor</h1>
            <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Demo AI
            </span>
          </div>
          <p className="text-slate-500">Personalized insights and activity recommendations for your classroom.</p>
        </div>
        <Button variant="outline" onClick={() => setMessages([messages[0]])} className="text-slate-500 hover:text-red-500">
          <Trash2 className="w-4 h-4 mr-2" /> Clear Chat
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        {/* Left Panel: Suggested Actions */}
        <div className="w-full lg:w-1/4 space-y-4">
          <h3 className="font-semibold text-slate-700 text-sm uppercase tracking-wider">Suggested Prompts</h3>
          {SUGGESTED_PROMPTS.map((prompt, i) => (
            <Card 
              key={i} 
              className="cursor-pointer border-slate-200 hover:border-orange-500 hover:shadow-md transition-all group bg-white"
              onClick={() => handleSend(prompt)}
            >
              <CardContent className="p-4 text-sm text-slate-700 font-medium group-hover:text-orange-700">
                "{prompt}"
              </CardContent>
            </Card>
          ))}
          
          <div className="mt-8 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Privacy Note</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              This demo utilizes a local rule-based engine. No student personal data is being transmitted to external servers.
            </p>
          </div>
        </div>

        {/* Right Panel: Chat Interface */}
        <Card className="w-full lg:w-3/4 flex flex-col border-slate-200 shadow-sm overflow-hidden bg-white">
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50"
          >
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "ai" && (
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                    <Bot className="w-6 h-6 text-orange-600" />
                  </div>
                )}
                
                <div className={`group relative max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user" 
                    ? "bg-slate-900 text-white rounded-tr-sm" 
                    : "bg-white border border-slate-200 text-slate-700 rounded-tl-sm shadow-sm"
                }`}>
                  {msg.content.split('\n').map((line, i) => (
                    <span key={i}>
                      {line.includes('**') 
                        ? <strong className="font-bold text-slate-900">{line.replace(/\*\*/g, '')}</strong> 
                        : line}
                      <br/>
                    </span>
                  ))}

                  {msg.role === "ai" && (
                    <button 
                      onClick={() => handleCopy(msg.content, idx)}
                      className="absolute -right-10 top-2 p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Copy to clipboard"
                    >
                      {copiedIndex === idx ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  )}
                </div>

                {msg.role === "user" && (
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                    <User className="w-6 h-6 text-slate-600" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-100">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Ask the Growth Assistant a question..."
                className="w-full pl-4 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(inputValue)}
              />
              <Button 
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white w-10 h-10 p-0 flex items-center justify-center"
                onClick={() => handleSend(inputValue)}
                disabled={!inputValue.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}