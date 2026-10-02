import React from 'react';
import { FileSearch, Sparkles, History, Cpu } from 'lucide-react';

export default function Header({ onOpenHistory, historyCount }) {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-500 to-purple-500 p-0.5 shadow-lg shadow-indigo-500/20 animate-pulse-slow">
            <div className="w-full h-full bg-dark-900 rounded-[10px] flex items-center justify-center">
              <FileSearch className="w-6 h-6 text-brand-500" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-extrabold tracking-tight text-white font-sans">
                AI Resume <span className="text-gradient-purple">Matcher</span>
              </h1>
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                v1.0
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              ATS Resume Parser & AI Job Compatibility Analyzer
            </p>
          </div>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-dark-800/80 border border-slate-800 text-xs text-slate-300">
            <Cpu className="w-3.5 h-3.5 text-emerald-400 mr-1.5" />
            <span>AI Engine: <strong className="text-slate-100 font-semibold">TF-IDF & LLM</strong></span>
          </div>

          <button
            onClick={onOpenHistory}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-dark-800 hover:bg-dark-700 text-slate-200 hover:text-white border border-slate-700/60 transition-all shadow-sm active:scale-95 text-sm font-medium"
          >
            <History className="w-4 h-4 text-indigo-400" />
            <span className="hidden sm:inline">History</span>
            {historyCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 text-xs font-bold bg-indigo-600 text-white rounded-full">
                {historyCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
}
