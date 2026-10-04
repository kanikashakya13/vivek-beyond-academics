"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Puzzle } from "lucide-react";

export default function ResilienceTracker() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Never Give Up (Resilience)</h1>
        <p className="text-slate-500 mt-2">Track perseverance through difficult tasks.</p>
      </div>
      <Card className="max-w-2xl border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Shield className="text-emerald-500"/> Logic Puzzle Challenge</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 text-center space-y-4">
            <Puzzle className="w-12 h-12 text-emerald-500 mx-auto" />
            <p className="text-lg font-medium text-slate-800">Student Task: Multi-level logic puzzle.</p>
            <p className="text-sm text-slate-500">This module tracks how many times a student retries after failing before asking for a hint.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}