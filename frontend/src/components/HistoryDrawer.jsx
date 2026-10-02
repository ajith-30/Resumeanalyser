import React from 'react';
import { X, History, ArrowRight, Award } from 'lucide-react';

export default function HistoryDrawer({ isOpen, onClose, historyList = [], onSelectRecord }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-dark-900 border-l border-slate-800 h-full p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
        
        <div>
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <History className="w-5 h-5 text-indigo-400" />
              <h3 className="text-base font-bold text-white">Analysis History</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg bg-dark-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs text-slate-400 mb-4">
            Saved job match runs from local session and database
          </p>

          <div className="space-y-3 overflow-y-auto max-h-[70vh] pr-1">
            {historyList.length === 0 ? (
              <div className="text-center py-10 text-slate-500 text-xs">
                No past analysis records found yet. Run an analysis to store history!
              </div>
            ) : (
              historyList.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => onSelectRecord(item)}
                  className="p-4 rounded-xl bg-dark-800/60 border border-slate-800 hover:border-indigo-500/50 cursor-pointer transition-all space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {item.target_role || "Software Engineer"}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {new Date(item.timestamp || item.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800/60">
                    <div className="flex items-center space-x-2">
                      <span className="font-extrabold text-emerald-400">
                        {item.metrics?.overall_match || item.overall_match}% Match
                      </span>
                      <span className="text-slate-500">|</span>
                      <span className="text-slate-400">
                        Key: {item.metrics?.keyword_match || item.keyword_match}%
                      </span>
                    </div>

                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 text-center">
          <p className="text-[11px] text-slate-500">
            Records automatically sync with PostgreSQL / SQLite DB
          </p>
        </div>

      </div>
    </div>
  );
}
