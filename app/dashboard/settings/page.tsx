"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";

export default function AdminSettings() {
  const { user } = useApp();
  
  if (user?.role !== 'admin') return <div>Unauthorized</div>;

  return (
    <div className="space-y-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-slate-900">Platform Settings</h1>
      <p className="text-slate-500">System-wide configurations for VIVEK.</p>
      
      <Card>
        <CardHeader><CardTitle>Data Management</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center p-4 border rounded-lg bg-slate-50">
            <div>
              <p className="font-bold">Offline Sync Fallback</p>
              <p className="text-sm text-slate-500">Allow shared tablets to cache data locally without WiFi.</p>
            </div>
            <Button variant="outline" className="text-green-600 border-green-200 bg-green-50">Enabled</Button>
          </div>
          <div className="flex justify-between items-center p-4 border rounded-lg border-red-100 bg-red-50">
            <div>
              <p className="font-bold text-red-700">Reset Demo Data</p>
              <p className="text-sm text-red-500">Wipe all student mock data and restore defaults.</p>
            </div>
            <Button variant="destructive">Factory Reset</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}