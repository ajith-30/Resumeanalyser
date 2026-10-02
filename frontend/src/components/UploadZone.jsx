import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, Sparkles, RefreshCw, X } from 'lucide-react';
import { parseResumeFile } from '../services/api';

export default function UploadZone({ 
  resumeText, 
  setResumeText, 
  jobDescription, 
  setJobDescription, 
  targetRole, 
  setTargetRole, 
  onAnalyze, 
  isAnalyzing 
}) {
  const [fileMeta, setFileMeta] = useState(null);
  const [isParsing, setIsParsing] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = async (file) => {
    if (!file) return;
    setIsParsing(true);
    try {
      const parsed = await parseResumeFile(file);
      setResumeText(parsed.cleaned_text || parsed.raw_text);
      setFileMeta({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB',
        wordCount: parsed.word_count,
        email: parsed.email
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsParsing(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const clearFile = () => {
    setFileMeta(null);
    setResumeText('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-6">
      
      {/* Target Role Selector Input */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-dark-800/80 border border-slate-800">
        <label className="text-sm font-semibold text-slate-200 flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-brand-500" />
          <span>Target Job Role:</span>
        </label>
        <input
          type="text"
          value={targetRole}
          onChange={(e) => setTargetRole(e.target.value)}
          placeholder="e.g. Senior Java Full Stack Engineer"
          className="w-full sm:w-96 px-3.5 py-2 rounded-lg bg-dark-900 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
        />
      </div>

      {/* Two Column Grid for Resume Upload & Job Description */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Resume Upload & Text Input */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-white flex items-center space-x-2">
                <FileText className="w-5 h-5 text-indigo-400" />
                <span>Candidate Resume</span>
              </h2>
              {fileMeta && (
                <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Parsed ({fileMeta.size})</span>
                </span>
              )}
            </div>

            {/* Drag & Drop File Zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
                dragOver 
                  ? 'border-indigo-500 bg-indigo-500/10 scale-[1.01]' 
                  : 'border-slate-700/80 hover:border-indigo-500/60 bg-dark-900/60 hover:bg-dark-900'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={(e) => handleFileUpload(e.target.files[0])}
                className="hidden"
              />
              
              <div className="flex flex-col items-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                  {isParsing ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-200">
                    {isParsing ? "Extracting text from file..." : "Upload resume.pdf or drop here"}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Supports PDF, DOCX, TXT formats
                  </p>
                </div>
              </div>
            </div>

            {/* Uploaded File Meta Pill */}
            {fileMeta && (
              <div className="mt-3 flex items-center justify-between px-3 py-2 bg-dark-800 rounded-lg border border-slate-700 text-xs">
                <div className="flex items-center space-x-2 truncate">
                  <FileText className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <span className="text-slate-200 font-medium truncate">{fileMeta.name}</span>
                  <span className="text-slate-500">({fileMeta.wordCount} words)</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); clearFile(); }}
                  className="text-slate-400 hover:text-rose-400 p-1 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Resume Textarea View/Edit */}
            <div className="mt-4">
              <label className="text-xs font-semibold text-slate-400 mb-1.5 block">
                Resume Content Text:
              </label>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste or edit resume text here (e.g. Alex R. Dev - Java, Spring Boot, SQL, AWS, React...)"
                rows={8}
                className="w-full p-3 rounded-xl bg-dark-900 border border-slate-800 text-slate-200 placeholder-slate-600 text-xs font-mono focus:outline-none focus:border-indigo-500 transition-colors resize-none"
              />
            </div>
          </div>
        </div>

        {/* Right: Job Description Input */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-white flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span>Job Description</span>
              </h2>
              <span className="text-xs text-slate-400">
                Target Requirements
              </span>
            </div>

            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste full job description here (e.g. Looking for Java, Spring Boot, AWS, React, Docker, Kubernetes experience...)"
              rows={14}
              className="w-full p-3.5 rounded-xl bg-dark-900 border border-slate-800 text-slate-200 placeholder-slate-600 text-xs font-mono focus:outline-none focus:border-purple-500 transition-colors resize-none"
            />
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800/80">
            <p className="text-xs text-slate-400">
              💡 Tip: Include explicit skills, experience levels, and cloud/database stack requirements for optimal matching accuracy.
            </p>
          </div>
        </div>

      </div>

      {/* Analyze Action Bar */}
      <div className="flex justify-center pt-2">
        <button
          onClick={onAnalyze}
          disabled={isAnalyzing || !resumeText.trim() || !jobDescription.trim()}
          className={`px-8 py-3.5 rounded-xl font-bold text-base transition-all shadow-xl flex items-center space-x-3 ${
            isAnalyzing || !resumeText.trim() || !jobDescription.trim()
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              : 'bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 text-white shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-95'
          }`}
        >
          {isAnalyzing ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>Analyzing Match & Skill Gaps...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Run AI Resume Analysis</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
}
