"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Mic } from "lucide-react";

export default function ConfidenceMirror() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Confidence Mirror</h1>
        <p className="text-slate-500 mt-2">Self-confidence development through speaking challenges.</p>
      </div>
      <Card className="max-w-2xl border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Brain className="text-blue-500"/> 60-Second Speaking Challenge</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 text-center space-y-4">
            <Mic className="w-12 h-12 text-blue-500 mx-auto animate-pulse" />
            <p className="text-lg font-medium text-slate-800">"Explain your favorite hobby to the class."</p>
            <p className="text-sm text-slate-500">The teacher will log your participation in the growth tracker.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}