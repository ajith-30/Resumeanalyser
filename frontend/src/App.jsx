import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SampleLoader from './components/SampleLoader';
import UploadZone from './components/UploadZone';
import ScoreCard from './components/ScoreCard';
import SkillsSection from './components/SkillsSection';
import SuggestionsSection from './components/SuggestionsSection';
import InterviewSection from './components/InterviewSection';
import HistoryDrawer from './components/HistoryDrawer';
import { analyzeResumeAndJob, fetchAnalysisHistory } from './services/api';
import { LayoutDashboard, Code2, Lightbulb, HelpCircle, FileText, Download } from 'lucide-react';

export default function App() {
  const [targetRole, setTargetRole] = useState('Senior Java Full Stack Engineer');
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const [analysisResult, setAnalysisResult] = useState(null);
  const [historyList, setHistoryList] = useState([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [activeViewTab, setActiveViewTab] = useState('overview');

  // Default initial sample load
  useEffect(() => {
    handleLoadSample({
      title: 'Java Spring Boot & React Developer',
      role: 'Senior Java Full Stack Engineer',
      resume: `ALEX R. DEV
Senior Java Full Stack Engineer | alex.dev@example.com | (555) 019-2834 | linkedin.com/in/alexdev

PROFESSIONAL SUMMARY:
Results-driven Full Stack Software Engineer with 5+ years of experience building microservices and interactive web applications. Proficient in Java, Spring Boot, SQL, AWS, and React. Passionate about API design and clean code architecture.

TECHNICAL SKILLS:
- Languages: Java, SQL, JavaScript, HTML/CSS
- Frameworks: Spring Boot, React, Node.js, Express.js
- Cloud & Storage: AWS (EC2, S3), PostgreSQL, MySQL, Redis
- Tools: REST API, Git, Agile/Scrum

EXPERIENCE:
Senior Software Developer | TechCorp Solutions (2021 - Present)
- Architected and deployed microservices backend using Java and Spring Boot, handling over 250,000 daily REST API requests.
- Integrated PostgreSQL and Redis caching layer to optimize transaction queries, reducing overall database load by 30%.
- Developed responsive front-end customer dashboards in React and Tailwind CSS, improving user conversion rates by 18%.
- Deployed application artifacts to AWS EC2 and S3 instances.`,
      jobDescription: `Job Title: Senior Backend / Full Stack Engineer

We are seeking a Senior Engineer to join our cloud architecture team.

Key Responsibilities:
- Design, build, and maintain robust microservices using Java, Spring Boot, and REST APIs.
- Containerize application workloads using Docker and manage Kubernetes cluster orchestrations.
- Implement continuous integration and continuous deployment (CI/CD) pipelines on AWS.
- Collaborate with frontend teams using React and TypeScript.
- Debug performance bottlenecks in PostgreSQL database queries.

Requirements:
- 4+ years of professional software engineering experience.
- Strong proficiency in Java, Spring Boot, and relational databases (SQL, PostgreSQL).
- Hands-on experience with Docker, Kubernetes, and AWS.`
    });

    // Fetch initial history
    fetchAnalysisHistory().then(data => setHistoryList(data));
  }, []);

  const handleLoadSample = (sample) => {
    setTargetRole(sample.role);
    setResumeText(sample.resume);
    setJobDescription(sample.jobDescription);
  };

  const handleRunAnalysis = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) return;
    setIsAnalyzing(true);
    try {
      const result = await analyzeResumeAndJob(resumeText, jobDescription, targetRole);
      setAnalysisResult(result);
      setHistoryList(prev => [result, ...prev]);
      setActiveViewTab('overview');
    } catch (err) {
      console.error('Analysis failed:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSelectRecord = (record) => {
    setAnalysisResult(record);
    setIsHistoryOpen(false);
  };

  return (
    <div className="min-h-screen pb-16">
      
      {/* Top Header Navbar */}
      <Header 
        onOpenHistory={() => setIsHistoryOpen(true)} 
        historyCount={historyList.length} 
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Presets & Demo Loader Bar */}
        <SampleLoader onLoadSample={handleLoadSample} />

        {/* Input & Upload Zone */}
        <UploadZone
          resumeText={resumeText}
          setResumeText={setResumeText}
          jobDescription={jobDescription}
          setJobDescription={setJobDescription}
          targetRole={targetRole}
          setTargetRole={setTargetRole}
          onAnalyze={handleRunAnalysis}
          isAnalyzing={isAnalyzing}
        />

        {/* Analysis Results Display */}
        {analysisResult && (
          <div className="space-y-6 pt-4 animate-in fade-in duration-500">
            
            {/* View Tab Navigation */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2 overflow-x-auto py-1">
                <button
                  onClick={() => setActiveViewTab('overview')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeViewTab === 'overview'
                      ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md'
                      : 'bg-dark-800/80 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Overview & Metrics</span>
                </button>

                <button
                  onClick={() => setActiveViewTab('skills')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeViewTab === 'skills'
                      ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md'
                      : 'bg-dark-800/80 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Code2 className="w-4 h-4 text-emerald-400" />
                  <span>Skills Gap ({analysisResult.missing_skills?.length || 0} Missing)</span>
                </button>

                <button
                  onClick={() => setActiveViewTab('suggestions')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeViewTab === 'suggestions'
                      ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md'
                      : 'bg-dark-800/80 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <span>AI Suggestions ({analysisResult.suggestions?.length || 0})</span>
                </button>

                <button
                  onClick={() => setActiveViewTab('interview')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeViewTab === 'interview'
                      ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md'
                      : 'bg-dark-800/80 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <HelpCircle className="w-4 h-4 text-indigo-400" />
                  <span>Interview Questions</span>
                </button>
              </div>

              <div className="text-xs text-slate-400 font-mono">
                Target Role: <strong className="text-indigo-300">{analysisResult.target_role}</strong>
              </div>
            </div>

            {/* Scorecard Hero Banner */}
            <ScoreCard metrics={analysisResult.metrics} />

            {/* Tabbed Content Containers */}
            {activeViewTab === 'overview' && (
              <div className="space-y-6">
                <SkillsSection
                  skillsFound={analysisResult.skills_found}
                  missingSkills={analysisResult.missing_skills}
                  skillsDetailed={analysisResult.skills_detailed}
                />
                <SuggestionsSection suggestions={analysisResult.suggestions} />
                <InterviewSection questions={analysisResult.interview_questions} />
              </div>
            )}

            {activeViewTab === 'skills' && (
              <SkillsSection
                skillsFound={analysisResult.skills_found}
                missingSkills={analysisResult.missing_skills}
                skillsDetailed={analysisResult.skills_detailed}
              />
            )}

            {activeViewTab === 'suggestions' && (
              <SuggestionsSection suggestions={analysisResult.suggestions} />
            )}

            {activeViewTab === 'interview' && (
              <InterviewSection questions={analysisResult.interview_questions} />
            )}

          </div>
        )}

      </main>

      {/* History Drawer Modal */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        historyList={historyList}
        onSelectRecord={handleSelectRecord}
      />

    </div>
  );
}
