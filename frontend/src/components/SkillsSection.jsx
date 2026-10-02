import React, { useState } from 'react';
import { CheckCircle2, XCircle, Code2, Layers, Filter } from 'lucide-react';

export default function SkillsSection({ skillsFound = [], missingSkills = [], skillsDetailed = [] }) {
  const [activeTab, setActiveTab] = useState('all');

  const filteredDetailed = skillsDetailed.filter(item => {
    if (activeTab === 'found') return item.found;
    if (activeTab === 'missing') return !item.found;
    return true;
  });

  return (
    <div className="glass-panel rounded-2xl p-6">
      
      {/* Header & Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <Code2 className="w-5 h-5 text-indigo-400" />
            <span>Skills & Requirements Analysis</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Extracted competencies comparing resume against job description
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-dark-900 border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'all'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All ({skillsFound.length + missingSkills.length})
          </button>
          <button
            onClick={() => setActiveTab('found')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'found'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Found ({skillsFound.length})
          </button>
          <button
            onClick={() => setActiveTab('missing')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'missing'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Missing ({missingSkills.length})
          </button>
        </div>
      </div>

      {/* Two Summary Columns: Found vs Missing Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        
        {/* Skills Found (Checkmarks) */}
        <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
          <div className="flex items-center space-x-2 mb-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h4 className="text-sm font-bold text-emerald-300">
              Skills Found ({skillsFound.length})
            </h4>
          </div>
          
          {skillsFound.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No explicit skills extracted from resume.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {skillsFound.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold shadow-sm hover:bg-emerald-500/20 transition-all"
                >
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>{skill}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Missing Skills (Crossmarks) */}
        <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/20">
          <div className="flex items-center space-x-2 mb-3">
            <XCircle className="w-5 h-5 text-rose-400" />
            <h4 className="text-sm font-bold text-rose-300">
              Missing Skills ({missingSkills.length})
            </h4>
          </div>

          {missingSkills.length === 0 ? (
            <p className="text-xs text-slate-400 italic">Great job! All requested job skills are covered in your resume.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {missingSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold shadow-sm hover:bg-rose-500/20 transition-all"
                >
                  <span className="text-rose-400 font-bold">✗</span>
                  <span>{skill}</span>
                </span>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Detailed Skill Matrix Grid */}
      {filteredDetailed.length > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-800">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Categorized Skill Breakdown
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {filteredDetailed.map((item, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                  item.found
                    ? 'bg-dark-900/60 border-slate-800 hover:border-emerald-500/40'
                    : 'bg-dark-900/60 border-slate-800 hover:border-rose-500/40'
                }`}
              >
                <div className="flex items-center space-x-2 truncate">
                  {item.found ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  )}
                  <div className="truncate">
                    <p className="font-semibold text-slate-200 truncate">{item.name}</p>
                    <p className="text-[10px] text-slate-500">{item.category}</p>
                  </div>
                </div>
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                  item.found 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                    : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                }`}>
                  {item.found ? 'MATCH' : 'MISSING'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
