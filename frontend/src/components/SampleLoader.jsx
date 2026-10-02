import React from 'react';
import { Sparkles, Briefcase, FileCode2, Layers } from 'lucide-react';

const SAMPLES = [
  {
    id: 'java-fullstack',
    title: 'Java Spring Boot & React Developer',
    role: 'Senior Java Full Stack Engineer',
    resume: `ALEX R. DEV
Senior Java Full Stack Engineer | alex.dev@example.com | (555) 019-2834 | linkedin.com/in/alexdev | github.com/alexdev

PROFESSIONAL SUMMARY:
Results-driven Full Stack Software Engineer with 5+ years of experience building resilient microservices and interactive web applications. Proficient in Java, Spring Boot, SQL, AWS, and React. Passionate about API design and clean code architecture.

TECHNICAL SKILLS:
- Languages: Java, SQL, JavaScript, HTML/CSS
- Frameworks: Spring Boot, React, Node.js, Express.js
- Cloud & Storage: AWS (EC2, S3), PostgreSQL, MySQL, Redis
- Tools & Methodologies: REST API, Git, Agile/Scrum, JIRA

PROFESSIONAL EXPERIENCE:
Senior Software Developer | TechCorp Solutions (2021 - Present)
- Architected and deployed microservices backend using Java and Spring Boot, handling over 250,000 daily REST API requests.
- Integrated PostgreSQL and Redis caching layer to optimize transaction queries, reducing overall database load by 30%.
- Developed responsive front-end customer dashboards in React and Tailwind CSS, improving user conversion rates by 18%.
- Deployed application artifacts to AWS EC2 and S3 instances.

Software Engineer | CloudNet Systems (2018 - 2021)
- Built internal tooling with Java, SQL, and REST APIs.
- Collaborated in an Agile Scrum team to deliver sprint goals on schedule.`,

    jobDescription: `Job Title: Senior Backend / Full Stack Engineer

We are seeking a talented Senior Engineer to join our cloud architecture team. You will lead the development of high-throughput distributed systems and cloud infrastructure.

Key Responsibilities:
- Design, build, and maintain robust microservices using Java, Spring Boot, and REST APIs.
- Containerize application workloads using Docker and manage Kubernetes cluster orchestrations.
- Implement continuous integration and continuous deployment (CI/CD) pipelines on AWS.
- Collaborate with frontend teams using React and TypeScript.
- Debug performance bottlenecks in PostgreSQL database queries.

Requirements:
- 4+ years of professional software engineering experience.
- Strong proficiency in Java, Spring Boot, and relational databases (SQL, PostgreSQL).
- Proven hands-on experience with Docker, Kubernetes, and container security.
- Cloud experience with AWS or GCP.
- Familiarity with CI/CD tools (Jenkins, GitHub Actions).`
  },
  {
    id: 'python-fastapi',
    title: 'Python Backend & Data Engineer',
    role: 'Python FastAPI Engineer',
    resume: `JORDAN SMITH
Backend & Data Engineer | jordan@example.com | github.com/jordansmith

SUMMARY:
Software Engineer with 4 years of expertise in Python, FastAPI, Django, PostgreSQL, and AWS. Strong background in RESTful APIs, data pipelines, and system optimization.

SKILLS:
- Languages: Python, SQL, Bash
- Frameworks: FastAPI, Django, Flask
- Databases: PostgreSQL, MongoDB, Redis
- Cloud & DevOps: AWS, Docker, CI/CD, Git`,

    jobDescription: `Job Title: Senior Python Developer

We need a Python Backend Developer to scale our high-frequency API infrastructure.

Requirements:
- Strong experience with Python, FastAPI, and SQL/PostgreSQL.
- Hands-on experience with Docker, Kubernetes, and AWS (S3, EC2).
- Knowledge of Redis caching and message queues (Celery/RabbitMQ).`
  }
];

export default function SampleLoader({ onLoadSample }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-dark-800/60 border border-slate-800 text-xs">
      <div className="flex items-center space-x-2 text-slate-300 font-medium">
        <Sparkles className="w-4 h-4 text-amber-400" />
        <span>Quick Demo Preset:</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {SAMPLES.map(sample => (
          <button
            key={sample.id}
            onClick={() => onLoadSample(sample)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-900/30 hover:bg-indigo-900/50 text-indigo-300 border border-indigo-500/30 hover:border-indigo-500/60 transition-all font-medium active:scale-95"
          >
            <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
            <span>{sample.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
