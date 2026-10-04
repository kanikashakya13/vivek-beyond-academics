"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { PlayCircle, ShieldCheck, Award, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans overflow-hidden">
      <nav className="flex justify-between items-center py-4 px-8 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <BookOpen className="text-orange-500" />
          <span>VIVEK <span className="text-gray-400 font-normal text-sm">| Beyond Academics</span></span>
        </div>
        <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
          <Link href="#" className="hover:text-orange-500 transition-colors">Home</Link>
          <Link href="#" className="hover:text-orange-500 transition-colors">Philosophy</Link>
        </div>
        <div className="flex gap-4">
          {/* Functional routing to the login/demo page */}
          <Link href="/login">
            <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50 font-bold">Demo Login</Button>
          </Link>
          <Link href="/login">
            <Button className="bg-red-500 hover:bg-red-600 text-white rounded-full px-6 shadow-md">Get Started</Button>
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 pt-20 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Animated Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <p className="text-sm font-bold text-orange-500 tracking-widest uppercase">Beyond Marks, Building Minds</p>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
            Education Is <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">More Than Marks.</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
            Discover the potential within every student. Empower teachers to nurture concentration, confidence, perseverance, self-reliance, and character beyond traditional examinations. 
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/login">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8 py-6 text-lg shadow-lg shadow-orange-200 hover:scale-105 transition-transform">
                Explore Platform
              </Button>
            </Link>
            <Link href="/student">
              <Button variant="outline" className="rounded-full px-8 py-6 text-lg border-gray-300 gap-2 hover:bg-gray-50">
                <PlayCircle className="w-5 h-5 text-gray-500" /> Try Student Puzzle
              </Button>
            </Link>
          </div>

          <div className="flex gap-12 pt-12 border-t border-gray-200 mt-12">
            <motion.div whileHover={{ scale: 1.1 }}>
              <p className="text-3xl font-bold text-gray-900 flex items-center gap-2">7 <Award className="text-yellow-500 w-6 h-6"/></p>
              <p className="text-sm text-gray-500">Badges Earned</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }}>
              <p className="text-3xl font-bold text-gray-900 flex items-center gap-2">100% <ShieldCheck className="text-green-500 w-6 h-6"/></p>
              <p className="text-sm text-gray-500">Focus Retained</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Animated Floating Graphic */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="bg-white p-6 rounded-3xl shadow-2xl border border-gray-100 relative z-10"
          >
            <div className="bg-[#fcf5f3] rounded-2xl p-8 aspect-video flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="bg-white px-3 py-1 rounded-full text-xs font-bold text-gray-600 shadow-sm">Focus Journey</span>
                <span className="text-xs font-semibold text-orange-500 uppercase tracking-wider">Student Concentrating</span>
              </div>
              <div className="flex justify-center items-center gap-8 my-8">
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="w-24 h-24 bg-red-400 rounded-full opacity-80"></motion.div>
                <div className="h-1 flex-1 bg-gradient-to-r from-red-400 to-blue-400 rounded-full relative">
                  <motion.div animate={{ left: ["0%", "100%", "0%"] }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }} className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-orange-500 rounded-full" />
                </div>
                <div className="w-16 h-16 bg-blue-400 rounded-full opacity-80"></div>
              </div>
              <div className="bg-white/80 backdrop-blur p-4 rounded-xl">
                <p className="text-sm font-medium text-gray-800">Measure of Integrity</p>
                <div className="w-full bg-gray-200 h-2 rounded-full mt-2 overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: "85%" }} transition={{ duration: 1.5, delay: 0.5 }} className="bg-green-500 h-full rounded-full" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}