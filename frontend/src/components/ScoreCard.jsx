import React from 'react';
import { Target, Zap, Cpu, Award, TrendingUp } from 'lucide-react';

export default function ScoreCard({ metrics }) {
  if (!metrics) return null;

  const {
    overall_match = 0,
    keyword_match = 0,
    technical_match = 0,
    soft_skills_match = 0,
    experience_match = "Good"
  } = metrics;

  // Determine theme color based on overall match
  let scoreColor = "text-emerald-400 border-emerald-500/30 bg-emerald-500/10";
  let strokeColor = "#10b981"; // green
  if (overall_match < 60) {
    scoreColor = "text-rose-400 border-rose-500/30 bg-rose-500/10";
    strokeColor = "#f43f5e";
  } else if (overall_match < 75) {
    scoreColor = "text-amber-400 border-amber-500/30 bg-amber-500/10";
    strokeColor = "#f59e0b";
  }

  // Radial calculation (r=45, circ = 2 * pi * 45 ≈ 282.7)
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overall_match / 100) * circumference;

  return (
    <div className="glass-panel-glow rounded-2xl p-6 relative overflow-hidden">
      
      {/* Background Decorative Blur */}
      <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
        
        {/* Main Score Radial Meter */}
        <div className="md:col-span-1 flex flex-col items-center justify-center p-4 rounded-xl bg-dark-900/60 border border-slate-800">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full radial-progress" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="text-slate-800"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r={radius}
                stroke={strokeColor}
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="radial-progress-circle"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-extrabold text-white tracking-tight">
                {overall_match}%
              </span>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Overall Match
              </span>
            </div>
          </div>

          <div className="mt-3 flex items-center space-x-1.5 px-3 py-1 rounded-full border text-xs font-bold ${scoreColor}">
            <Award className="w-3.5 h-3.5" />
            <span>Experience: {experience_match}</span>
          </div>
        </div>

        {/* Breakdown Metric Gauges */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Keyword Match */}
          <div className="p-4 rounded-xl bg-dark-900/60 border border-slate-800/80 flex flex-col justify-between hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Keyword Match</span>
              <Zap className="w-4 h-4 text-amber-400" />
            </div>
            <div className="mt-3">
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="text-2xl font-bold text-white">{keyword_match}%</span>
                <span className="text-xs text-slate-400">TF-IDF Vector</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-1000"
                  style={{ width: `${keyword_match}%` }}
                />
              </div>
            </div>
          </div>

          {/* Technical Match */}
          <div className="p-4 rounded-xl bg-dark-900/60 border border-slate-800/80 flex flex-col justify-between hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Technical Match</span>
              <Cpu className="w-4 h-4 text-brand-400" />
            </div>
            <div className="mt-3">
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="text-2xl font-bold text-white">{technical_match}%</span>
                <span className="text-xs text-slate-400">Skills Overlap</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-brand-500 to-indigo-500 rounded-full transition-all duration-1000"
                  style={{ width: `${technical_match}%` }}
                />
              </div>
            </div>
          </div>

          {/* Experience & Soft Skills */}
          <div className="p-4 rounded-xl bg-dark-900/60 border border-slate-800/80 flex flex-col justify-between hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Soft Skills Match</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="mt-3">
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="text-2xl font-bold text-white">{soft_skills_match}%</span>
                <span className="text-xs text-slate-400">Domain Alignment</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-1000"
                  style={{ width: `${soft_skills_match}%` }}
                />
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
