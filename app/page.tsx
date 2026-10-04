"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { PlayCircle, ShieldCheck, Award, BookOpen, Brain, Target, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans overflow-x-hidden">
      {/* Restored Navigation */}
      <nav className="flex justify-between items-center py-4 px-8 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight cursor-pointer" onClick={() => scrollTo('home')}>
          <BookOpen className="text-orange-500" />
          <span>VIVEK <span className="text-gray-400 font-normal text-sm">| Beyond Academics</span></span>
        </div>
        <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
          <button onClick={() => scrollTo('home')} className="hover:text-orange-500 transition-colors">Home</button>
          <button onClick={() => scrollTo('about')} className="hover:text-orange-500 transition-colors">About</button>
          <button onClick={() => scrollTo('philosophy')} className="hover:text-orange-500 transition-colors">Philosophy</button>
          <button onClick={() => scrollTo('features')} className="hover:text-orange-500 transition-colors">Features</button>
          <button onClick={() => scrollTo('privacy')} className="hover:text-orange-500 transition-colors">Privacy & Ethics</button>
        </div>
        <div className="flex gap-4">
          <Link href="/login">
            <Button variant="ghost" className="text-red-500 hover:text-red-600 font-bold">Demo Login</Button>
          </Link>
          <Link href="/login">
            <Button className="bg-red-500 hover:bg-red-600 text-white rounded-full px-6">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main id="home" className="max-w-7xl mx-auto px-8 pt-20 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-6">
          <p className="text-sm font-bold text-orange-500 tracking-widest uppercase">Beyond Marks, Building Minds</p>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
            Education Is <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">More Than Marks.</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-lg">
            Discover the potential within every student. Empower teachers to nurture concentration, confidence, perseverance, and character beyond traditional exams.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/login"><Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8 py-6 text-lg">Explore Platform</Button></Link>
            <Link href="/student"><Button variant="outline" className="rounded-full px-8 py-6 text-lg gap-2"><PlayCircle className="w-5 h-5" /> Try Student Portal</Button></Link>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
          <div className="bg-white p-6 rounded-3xl shadow-2xl border border-gray-100 relative z-10">
            <div className="bg-[#fcf5f3] rounded-2xl p-8 aspect-video flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="bg-white px-3 py-1 rounded-full text-xs font-bold text-gray-600">Focus Journey</span>
                <span className="text-xs font-semibold text-orange-500">Student Concentrating</span>
              </div>
              <div className="flex justify-center items-center gap-8 my-8">
                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="w-24 h-24 bg-red-400 rounded-full opacity-80"></motion.div>
                <div className="h-1 flex-1 bg-gradient-to-r from-red-400 to-blue-400 rounded-full relative">
                  <motion.div animate={{ left: ["0%", "100%", "0%"] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-orange-500 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* About & Philosophy Sections */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-8 text-center space-y-6">
          <h2 className="text-3xl font-bold">About VIVEK</h2>
          <p className="text-lg text-gray-600">Traditional academic examinations cannot fully represent a student's personal development. VIVEK is an AI-powered platform that supports teachers in recognizing and nurturing learning habits, confidence, and creativity.</p>
        </div>
      </section>

      <section id="philosophy" className="py-20 bg-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-8 space-y-8">
          <BookOpen className="w-12 h-12 text-orange-500 mx-auto" />
          <h2 className="text-3xl font-bold">Swami Vivekananda's Philosophy</h2>
          <blockquote className="text-2xl font-light italic text-slate-300 border-l-4 border-orange-500 pl-6 mx-auto max-w-2xl text-left">
            "Education is the manifestation of the perfection already in man. To me the very essence of education is concentration of mind, not the collecting of facts."
          </blockquote>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Core Growth Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
              <Target className="w-10 h-10 text-orange-500 mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">Focus Journey</h3>
              <p className="text-gray-500">Train concentration through guided, unbroken time blocks and self-reflection.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
              <Brain className="w-10 h-10 text-blue-500 mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">Confidence Mirror</h3>
              <p className="text-gray-500">Develop self-assurance through 60-second speaking and presentation challenges.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
              <Shield className="w-10 h-10 text-emerald-500 mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">Never Give Up</h3>
              <p className="text-gray-500">Track resilience and perseverance by solving multi-level logic puzzles.</p>
            </div>
          </div>
        </div>
      </section>

      <footer id="privacy" className="bg-white py-12 border-t border-gray-200 text-center">
        <p className="text-gray-500">VIVEK | Privacy & Ethics: We do not use facial recognition. Growth data is private to the classroom.</p>
      </footer>
    </div>
  );
}