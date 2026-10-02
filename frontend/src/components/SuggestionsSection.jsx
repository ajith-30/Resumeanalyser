import React, { useState } from 'react';
import { Lightbulb, Copy, Check, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';

export default function SuggestionsSection({ suggestions = [] }) {
  const [copiedId, setCopiedId] = useState(null);

  if (!suggestions || suggestions.length === 0) return null;

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="glass-panel rounded-2xl p-6">
      
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <Lightbulb className="w-5 h-5 text-amber-400" />
            <span>AI Resume Improvement Suggestions</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Actionable optimization steps to boost ATS score and interview callback rates
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center space-x-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{suggestions.length} Recommendations</span>
        </span>
      </div>

      <div className="space-y-4">
        {suggestions.map((sug, idx) => {
          let priorityStyle = "bg-amber-500/10 text-amber-400 border-amber-500/20";
          if (sug.priority === "High") {
            priorityStyle = "bg-rose-500/10 text-rose-400 border-rose-500/20";
          } else if (sug.priority === "Low") {
            priorityStyle = "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
          }

          return (
            <div
              key={sug.id || idx}
              className="p-4 rounded-xl bg-dark-900/70 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md border ${priorityStyle}`}>
                    {sug.priority} Priority
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    Category: {sug.category}
                  </span>
                </div>
                <span className="text-xs text-slate-500 font-mono">Tip #{idx + 1}</span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-100 flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <span>{sug.title}</span>
                </h4>
                <p className="text-xs text-slate-300 mt-1 pl-6 leading-relaxed">
                  {sug.description}
                </p>
              </div>

              {sug.actionable_bullet && (
                <div className="mt-2 pl-6">
                  <div className="p-3 rounded-lg bg-dark-950 border border-indigo-500/30 text-xs font-mono text-indigo-200 flex items-start justify-between gap-3 group">
                    <p className="leading-relaxed flex-1 select-all">
                      {sug.actionable_bullet}
                    </p>
                    <button
                      onClick={() => copyToClipboard(sug.actionable_bullet, sug.id)}
                      className="p-1.5 rounded-md bg-indigo-900/40 hover:bg-indigo-600 text-indigo-300 hover:text-white transition-colors flex items-center space-x-1 flex-shrink-0"
                      title="Copy bullet point to clipboard"
                    >
                      {copiedId === sug.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-[10px] font-bold text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="text-[10px]">Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
