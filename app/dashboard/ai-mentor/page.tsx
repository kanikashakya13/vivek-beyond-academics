"use client";
import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Send, Sparkles, User, Copy, Trash2, CheckCircle2 } from "lucide-react";

export default function AIMentor() {
  const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string }[]>([
    {
      role: "ai",
      content: "Hello! I am your VIVEK Growth Assistant powered by Gemini. I can help you summarize student observations, suggest classroom activities, or create weekly development goals. What would you like to focus on today?"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    // 1. Add user message to UI immediately
    const newMessages = [...messages, { role: "user" as const, content: text }];
    setMessages(newMessages);
    setInputValue("");
    setIsLoading(true);

    // 2. Add a temporary loading message
    setMessages(prev => [...prev, { role: "ai", content: "Thinking..." }]);

    try {
      // 3. Call the real Gemini API route you created
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      const data = await res.json();
      
      // 4. Replace "Thinking..." with the real AI response
      setMessages(prev => {
        const withoutLoading = prev.slice(0, -1);
        return [...withoutLoading, { role: "ai", content: data.response }];
      });
    } catch (error) {
      // Handle errors (e.g., if API key is missing or internet is down)
      setMessages(prev => {
        const withoutLoading = prev.slice(0, -1);
        return [...withoutLoading, { role: "ai", content: "Error connecting to AI. Please check your API key in the .env.local file." }];
      });
    } finally {
      setIsLoading(false);
    }
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
            <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3 h-3" /> LIVE AI
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
              className="cursor-pointer border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all group bg-white"
              onClick={() => handleSend(prompt)}
            >
              <CardContent className="p-4 text-sm text-slate-700 font-medium group-hover:text-emerald-700">
                "{prompt}"
              </CardContent>
            </Card>
          ))}
          
          <div className="mt-8 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">System Status</h4>
            <p className="text-xs text-slate-500 leading-relaxed flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse"></span>
              Connected to Gemini API
            </p>
          </div>
        </div>

        {/* Right Panel: Chat Interface */}
        <Card className="w-full lg:w-3/4 flex flex-col border-slate-200 shadow-sm overflow-hidden bg-white">
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50 scroll-smooth"
          >
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "ai" && (
                  <div className={`w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 ${msg.content === "Thinking..." ? "animate-pulse" : ""}`}>
                    <Bot className="w-6 h-6 text-emerald-600" />
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

                  {msg.role === "ai" && msg.content !== "Thinking..." && (
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
                className="w-full pl-4 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all disabled:opacity-50"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(inputValue)}
                disabled={isLoading}
              />
              <Button 
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white w-10 h-10 p-0 flex items-center justify-center disabled:opacity-50"
                onClick={() => handleSend(inputValue)}
                disabled={!inputValue.trim() || isLoading}
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