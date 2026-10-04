"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { PlayCircle, ShieldCheck, Award, BookOpen, Brain, Target, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-slate-900 font-sans overflow-x-hidden selection:bg-orange-500 selection:text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center py-5 px-10 bg-white/70 backdrop-blur-xl sticky top-0 z-50 border-b border-orange-100/50">
        <div className="flex items-center gap-3 font-extrabold text-xl tracking-tight cursor-pointer" onClick={() => scrollTo('home')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
            <BookOpen className="w-5 h-5" />
          </div>
          <span>VIVEK <span className="text-orange-600 font-semibold text-xs px-2 py-0.5 bg-orange-50 rounded-full ml-1">Beyond Academics</span></span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
          <button onClick={() => scrollTo('home')} className="hover:text-orange-600 transition-colors">Home</button>
          <button onClick={() => scrollTo('about')} className="hover:text-orange-600 transition-colors">About</button>
          <button onClick={() => scrollTo('philosophy')} className="hover:text-orange-600 transition-colors">Philosophy</button>
          <button onClick={() => scrollTo('features')} className="hover:text-orange-600 transition-colors">Features</button>
        </div>
        <div className="flex gap-4 items-center">
          <Link href="/login">
            <Button variant="ghost" className="text-slate-700 hover:text-orange-600 font-bold">Demo Login</Button>
          </Link>
          <Link href="/login">
            <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-full px-7 shadow-lg shadow-orange-500/25 transition-all hover:scale-105">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main id="home" className="max-w-7xl mx-auto px-10 pt-24 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[85vh]">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-8">
          <div className="inline-flex items-center gap-2 bg-orange-100/80 text-orange-800 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border border-orange-200">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" /> Inspired by Swami Vivekananda
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-[1.1] text-slate-900 tracking-tight">
            Education Is <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500">More Than Marks.</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
            Empower teachers and students to cultivate concentration, confidence, perseverance, and character beyond traditional examinations.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/login">
              <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-9 py-7 text-lg shadow-xl shadow-slate-900/10 hover:scale-105 transition-all">
                Explore Platform
              </Button>
            </Link>
            <Link href="/student">
              <Button variant="outline" className="rounded-full px-8 py-7 text-lg border-2 border-slate-200 gap-3 hover:bg-white hover:border-orange-300 transition-all shadow-sm">
                <PlayCircle className="w-5 h-5 text-orange-500" /> Student Portal
              </Button>
            </Link>
          </div>

          <div className="flex gap-12 pt-8 border-t border-slate-200/60">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 font-bold"><Award className="w-6 h-6"/></div>
              <div><p className="text-2xl font-black text-slate-900">7+</p><p className="text-xs text-slate-500 font-medium">Growth Metrics</p></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold"><ShieldCheck className="w-6 h-6"/></div>
              <div><p className="text-2xl font-black text-slate-900">100%</p><p className="text-xs text-slate-500 font-medium">Privacy Focused</p></div>
            </div>
          </div>
        </motion.div>

        {/* Floating Creative Card Graphic */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-[40px] blur-2xl -z-10"></div>
          <div className="bg-white/80 backdrop-blur-2xl p-8 rounded-[32px] shadow-2xl border border-white relative z-10 space-y-6">
            <div className="flex justify-between items-center">
              <span className="bg-orange-50 text-orange-700 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase">Live Growth DNA</span>
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white space-y-6 shadow-inner">
              <div className="flex justify-between items-center text-sm font-medium text-slate-400">
                <span>Concentration Index</span>
                <span className="text-orange-400 font-bold">92% Optimal</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: "92%" }} transition={{ duration: 1.5, ease: "easeOut" }} className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full" />
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-white/10 p-3.5 rounded-xl backdrop-blur">
                  <p className="text-xs text-slate-400">Perseverance</p>
                  <p className="text-lg font-bold text-amber-300">High Stability</p>
                </div>
                <div className="bg-white/10 p-3.5 rounded-xl backdrop-blur">
                  <p className="text-xs text-slate-400">Confidence</p>
                  <p className="text-lg font-bold text-orange-300">Expanding</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Philosophy Section */}
      <section id="philosophy" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-10 text-center space-y-8 relative z-10">
          <BookOpen className="w-14 h-14 text-orange-500 mx-auto" />
          <h2 className="text-4xl font-black tracking-tight">Swami Vivekananda's Philosophy</h2>
          <blockquote className="text-2xl md:text-3xl font-light italic text-slate-300 leading-relaxed border-l-4 border-orange-500 pl-6 text-left max-w-3xl mx-auto">
            "Education is the manifestation of the perfection already in man. To me the very essence of education is concentration of mind, not the collecting of facts."
          </blockquote>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-10">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900">Holistic Growth Modules</h2>
          <p className="text-slate-600">Designed to nurture the mind, character, and inner resilience of every student.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-1 transition-transform group">
            <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mb-6 group-hover:bg-orange-500 group-hover:text-white transition-colors">
              <Target className="w-7 h-7" />
            </div>
            <h3 className="font-extrabold text-xl mb-3 text-slate-900">Focus Journey</h3>
            <p className="text-slate-600 leading-relaxed">Train concentration through mindful time blocks and qualitative self-reflection.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-1 transition-transform group">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Brain className="w-7 h-7" />
            </div>
            <h3 className="font-extrabold text-xl mb-3 text-slate-900">Confidence Mirror</h3>
            <p className="text-slate-600 leading-relaxed">Build self-assurance via guided speaking milestones and gentle expression prompts.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-1 transition-transform group">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Shield className="w-7 h-7" />
            </div>
            <h3 className="font-extrabold text-xl mb-3 text-slate-900">Never Give Up</h3>
            <p className="text-slate-600 leading-relaxed">Reward perseverance and trial-and-error learning over fixed, rigid test scores.</p>
          </div>
        </div>
      </section>

      <footer className="bg-white py-12 border-t border-slate-200 text-center text-sm text-slate-500">
        <p>VIVEK | Beyond Academics • Built for Vivekananda Innovation Hackathon 2026</p>
      </footer>
    </div>
  );
}