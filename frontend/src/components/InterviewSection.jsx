import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, CheckCircle2 } from 'lucide-react';

export default function InterviewSection({ questions = [] }) {
  const [expandedIds, setExpandedIds] = useState([1]); // open first question by default

  if (!questions || questions.length === 0) return null;

  const toggleExpand = (id) => {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter(i => i !== id));
    } else {
      setExpandedIds([...expandedIds, id]);
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-6">
      
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <HelpCircle className="w-5 h-5 text-indigo-400" />
            <span>AI Interview Question Generator</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Tailored technical and behavioral questions targeting your specific skill gaps and strengths
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center space-x-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{questions.length} Generated Questions</span>
        </span>
      </div>

      <div className="space-y-4">
        {questions.map((q, idx) => {
          const isOpen = expandedIds.includes(q.id || idx + 1);

          let catBadge = "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
          if (q.category === "Technical Gap") {
            catBadge = "bg-rose-500/10 text-rose-400 border-rose-500/20";
          } else if (q.category === "Behavioral & System Design" || q.category === "Behavioral") {
            catBadge = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
          }

          return (
            <div
              key={q.id || idx}
              className="rounded-xl bg-dark-900/70 border border-slate-800 hover:border-slate-700 transition-all overflow-hidden"
            >
              {/* Question Header Accordion Toggle */}
              <button
                onClick={() => toggleExpand(q.id || idx + 1)}
                className="w-full p-4 text-left flex items-start justify-between gap-4 focus:outline-none"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center space-x-2">
                    <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md border ${catBadge}`}>
                      {q.category}
                    </span>
                    <span className="text-xs text-slate-400">Q{idx + 1}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-100 leading-snug">
                    {q.question}
                  </h4>
                  <p className="text-xs text-slate-400 font-medium">
                    Why asked: {q.reasoning}
                  </p>
                </div>

                <div className="p-1 rounded-lg bg-dark-800 text-slate-400 hover:text-white mt-1 flex-shrink-0">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {/* Collapsible Answer & Key Talking Points Body */}
              {isOpen && (
                <div className="px-4 pb-4 pt-2 border-t border-slate-800/80 bg-dark-950/40 space-y-3">
                  
                  {/* Model Answer Box */}
                  <div className="p-3.5 rounded-xl bg-dark-900/90 border border-indigo-500/20">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-400 block mb-1">
                      Recommended Model Answer:
                    </span>
                    <p className="text-xs text-slate-200 leading-relaxed italic">
                      "{q.sample_answer}"
                    </p>
                  </div>

                  {/* Key Points to Emphasize */}
                  {q.key_points && q.key_points.length > 0 && (
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1.5">
                        Key Talking Points:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {q.key_points.map((point, pIdx) => (
                          <span
                            key={pIdx}
                            className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/80 text-slate-300 text-xs font-medium"
                          >
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            <span>{point}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
