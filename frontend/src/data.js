export const PROFILE = {
  name: "BHAVY AGARWAL",
  role: "Data & Analytics Engineer",
  location: "Noida, IN",
  timezone: "Asia/Kolkata",
  tagline: "Turning Raw Data Into Actionable Business Insights.",
  email: "bhavyagarwal85@gmail.com",
  phone: "6306228367",
  linkedin: "https://linkedin.com/in/bhavy-agarwal",
  github: "https://github.com/bhavyagarwal12",
  resume: "/Bhavy_Agarwal_Resume.pdf",
};

export const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export const ABOUT = {
  body: "I'm a Data & Analytics Engineer with hands-on experience across data analysis, ETL pipelines, predictive modeling, and BI dashboards. I turn messy, raw datasets into clear, decision-ready insight — blending Python, SQL, Power BI, Excel, and machine learning to help teams move faster and smarter.",
  education: {
    school: "Ajay Kumar Garg Engineering College",
    degree: "B.Tech, Electronics & Communication",
    location: "Ghaziabad, UP",
    period: "Sep 2023 — May 2027",
    cgpa: "7.5 / 10",
    coursework: ["Data Structures", "Probability & Statistics", "DSP", "Machine Learning"],
  },
};

export const EXPERIENCE = [
  {
    company: "Axlero Solutions",
    role: "Data Analyst Intern",
    period: "Jul 2026 — Present",
    points: [
      "Analyzed real-world datasets to identify patterns, trends and insights supporting business and operational decisions.",
      "Built analytical reports, dashboards and visualizations that communicate performance clearly to stakeholders.",
      "Performed data validation, quality checks and preprocessing to maintain accuracy and dataset integrity.",
    ],
  },
  {
    company: "Dhee Coding Lab",
    role: "Incubation Intern",
    period: "Aug 2026 — Present",
    points: [
      "Hands-on training in Python, SQL, data structures and programming fundamentals.",
      "Applied Python & SQL through practical assignments, database concepts and project-based development.",
      "Gained exposure to APIs, Generative AI and modern tooling through live project development.",
    ],
  },
];

export const PROJECTS = [
  {
    no: "01",
    slug: "udaan",
    title: "UDAAN — Student Performance Analytics",
    period: "Apr 2026",
    stack: ["Python", "SQL", "Power BI", "Excel"],
    summary:
      "Academic analytics dashboard over 500+ student records. 4 Power BI dashboards tracking 8 KPIs, plus a Logistic Regression model hitting 78% accuracy to flag at-risk students.",
    image:
      "https://images.unsplash.com/photo-1776702683574-f91f73a3cd26?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTZ8MHwxfHNlYXJjaHw0fHxkYXRhJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkJTIwZGFyayUyMG1vZGV8ZW58MHx8fHwxNzg2MzgxMzc2fDA&ixlib=rb-4.1.0&q=85",
    link: "https://github.com/bhavyagarwal12",
  },
  {
    no: "02",
    slug: "retail-intelligence",
    title: "Retail Intelligence & Sales Forecasting",
    period: "May 2026",
    stack: ["Python", "SQL", "Flask", "Power BI", "ML"],
    summary:
      "Retail platform processing 7,650 transactions. Automated ETL pipeline cut data errors ~18%, Ridge Regression forecasting and RFM segmentation feeding a 6-KPI Flask dashboard.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    link: "https://github.com/bhavyagarwal12",
  },
  {
    no: "03",
    slug: "job-market-analyzer",
    title: "Global Data Job Market Analyzer",
    period: "Jun 2026",
    stack: ["Python", "SQL", "Flask", "SQLite", "ETL"],
    summary:
      "Analyzed 5,000+ job listings via automated ETL and a normalized SQLite DB with 20+ optimized queries (~40% faster). A Career Pathfinder surfaces the top 5 skill gaps via REST API.",
    image:
      "https://images.unsplash.com/photo-1618556450991-2f1af64e8191?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzN8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRlY2hub2xvZ3klMjBuZXR3b3JrfGVufDB8fHxwdXJwbGV8MTc4NjM4MTM3Nnww&ixlib=rb-4.1.0&q=85",
    link: "https://github.com/bhavyagarwal12",
  },
];

export const SKILLS = [
  { group: "Languages", items: ["Python", "SQL", "JavaScript", "HTML/CSS"] },
  { group: "Data & Analytics", items: ["Pandas", "NumPy", "Scikit-learn", "Power BI", "Tableau", "Excel"] },
  {
    group: "ML & Methods",
    items: ["Logistic Regression", "Ridge Regression", "RFM Segmentation", "EDA", "Feature Engineering", "Predictive Analytics"],
  },
  {
    group: "Tools & Frameworks",
    items: ["Flask", "Jupyter", "MySQL", "SQLite", "GitHub", "VS Code", "BeautifulSoup", "Chart.js"],
  },
];

export const CERTS = [
  {
    title: "AI-Driven Data Analytics — Certified",
    desc: "Training in data analysis, visualization, Python, SQL and AI-powered analytical techniques.",
  },
  {
    title: "2nd Place — Engineering Project Competition",
    desc: "AKGEC college-level competition, recognized for technical proficiency and problem-solving.",
  },
];
