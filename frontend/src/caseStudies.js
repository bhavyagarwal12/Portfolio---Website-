// Detailed case study content per project (charts, metrics, narrative).
// Numbers are drawn from the resume; chart series are representative
// visualizations built to illustrate each project's real outcomes.

export const CASE_STUDIES = {
  udaan: {
    slug: "udaan",
    no: "01",
    title: "UDAAN",
    subtitle: "AI-Powered Student Performance Analytics",
    period: "April 2026",
    role: "Data Analyst — end-to-end",
    stack: ["Python", "SQL", "Power BI", "Excel", "Scikit-learn"],
    github: "https://github.com/bhavyagarwal12",
    image:
      "https://images.unsplash.com/photo-1776702683574-f91f73a3cd26?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTZ8MHwxfHNlYXJjaHw0fHxkYXRhJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkJTIwZGFyayUyMG1vZGV8ZW58MHx8fHwxNzg2MzgxMzc2fDA&ixlib=rb-4.1.0&q=85",
    tagline:
      "Turning 500+ raw academic records into an early-warning system that flags at-risk students before they fall behind.",
    metrics: [
      { value: "500+", label: "Student records analyzed" },
      { value: "8", label: "KPIs tracked" },
      { value: "4", label: "Power BI dashboards" },
      { value: "78%", label: "Model accuracy" },
    ],
    story: [
      {
        heading: "The Problem",
        body: "Faculty had grades, attendance and backlog data scattered across spreadsheets, but no unified way to spot students who were quietly slipping. By the time low performance surfaced in final results, it was often too late to intervene.",
      },
      {
        heading: "The Approach",
        body: "I consolidated the data in SQL, cleaned and reshaped it with Pandas (resolving 15%+ inconsistencies), then modelled academic risk with Logistic Regression on attendance and performance signals. The output feeds four Power BI dashboards covering GPA, attendance, backlogs and cohort trends.",
      },
      {
        heading: "The Outcome",
        body: "The model flags at-risk students with 78% accuracy, giving mentors a ranked watch-list weeks earlier. What used to be a manual, reactive review became a single glanceable dashboard.",
      },
    ],
    charts: [
      {
        type: "bar",
        title: "KPI snapshot across cohort",
        note: "Average score per tracked metric (normalized 0–100).",
        dataKey: "value",
        xKey: "name",
        data: [
          { name: "GPA", value: 74 },
          { name: "Attendance", value: 82 },
          { name: "Assignments", value: 68 },
          { name: "Backlogs", value: 21 },
          { name: "Internals", value: 71 },
        ],
      },
      {
        type: "pie",
        title: "Risk classification",
        note: "Logistic Regression output across the cohort.",
        data: [
          { name: "On-track", value: 78 },
          { name: "At-risk", value: 22 },
        ],
      },
      {
        type: "bar",
        title: "Model performance",
        note: "Evaluation on held-out student data.",
        dataKey: "value",
        xKey: "name",
        data: [
          { name: "Accuracy", value: 78 },
          { name: "Precision", value: 74 },
          { name: "Recall", value: 71 },
          { name: "F1", value: 72 },
        ],
      },
    ],
  },

  "retail-intelligence": {
    slug: "retail-intelligence",
    no: "02",
    title: "Retail Intelligence",
    subtitle: "Sales Forecasting & Customer Segmentation Platform",
    period: "May 2026",
    role: "Analytics Engineer — pipeline to dashboard",
    stack: ["Python", "SQL", "Flask", "Power BI", "ML"],
    github: "https://github.com/bhavyagarwal12",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    tagline:
      "An automated pipeline that turns 7,650 transactions into forecasts and customer segments that actually drive stocking and marketing calls.",
    metrics: [
      { value: "7,650", label: "Transactions processed" },
      { value: "~18%", label: "Fewer data errors" },
      { value: "6", label: "KPI modules" },
      { value: "5", label: "RFM segments" },
    ],
    story: [
      {
        heading: "The Problem",
        body: "Retail sales data arrived messy and inconsistent, and the team had no reliable view of what would sell next month or which customers were worth retaining.",
      },
      {
        heading: "The Approach",
        body: "I built an automated Python ETL pipeline with Pandas that cut data errors by ~18%, then layered Ridge Regression for sales forecasting and RFM segmentation for customer value. Everything surfaces through a Flask dashboard with six KPI modules plus Excel/CSV export into Power BI.",
      },
      {
        heading: "The Outcome",
        body: "Forecasts track actuals closely enough to guide stocking, and RFM segments make it obvious where to focus retention spend versus win-back campaigns.",
      },
    ],
    charts: [
      {
        type: "line",
        title: "Sales: actual vs forecast",
        note: "Ridge Regression forecast against realized monthly sales (₹ '000s).",
        xKey: "name",
        lines: [
          { dataKey: "actual", label: "Actual" },
          { dataKey: "forecast", label: "Forecast" },
        ],
        data: [
          { name: "Jan", actual: 420, forecast: 410 },
          { name: "Feb", actual: 455, forecast: 448 },
          { name: "Mar", actual: 470, forecast: 482 },
          { name: "Apr", actual: 510, forecast: 500 },
          { name: "May", actual: 545, forecast: 552 },
          { name: "Jun", actual: 590, forecast: 585 },
        ],
      },
      {
        type: "pie",
        title: "Customer RFM segments",
        note: "Share of customers by value segment.",
        data: [
          { name: "Champions", value: 18 },
          { name: "Loyal", value: 27 },
          { name: "Potential", value: 22 },
          { name: "At-risk", value: 19 },
          { name: "Lost", value: 14 },
        ],
      },
      {
        type: "bar",
        title: "Data quality — errors per 1k rows",
        note: "Before vs after the automated ETL pipeline.",
        dataKey: "value",
        xKey: "name",
        data: [
          { name: "Before ETL", value: 47 },
          { name: "After ETL", value: 39 },
        ],
      },
    ],
  },

  "job-market-analyzer": {
    slug: "job-market-analyzer",
    no: "03",
    title: "Job Market Analyzer",
    subtitle: "Global Data-Role Trends & Career Pathfinder",
    period: "June 2026",
    role: "Data Engineer — ETL, DB & API",
    stack: ["Python", "SQL", "Flask", "SQLite", "ETL", "REST"],
    github: "https://github.com/bhavyagarwal12",
    image:
      "https://images.unsplash.com/photo-1618556450991-2f1af64e8191?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzN8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRlY2hub2xvZ3klMjBuZXR3b3JrfGVufDB8fHxwdXJwbGV8MTc4NjM4MTM3Nnww&ixlib=rb-4.1.0&q=85",
    tagline:
      "5,000+ job listings distilled into salary trends, in-demand skills, and a Career Pathfinder that tells you exactly which skills to learn next.",
    metrics: [
      { value: "5,000+", label: "Job listings analyzed" },
      { value: "20+", label: "Optimized SQL queries" },
      { value: "~40%", label: "Faster query time" },
      { value: "Top 5", label: "Skill gaps surfaced" },
    ],
    story: [
      {
        heading: "The Problem",
        body: "Job seekers face thousands of scattered listings with no clear signal on which skills, roles or salaries are actually trending in the data field.",
      },
      {
        heading: "The Approach",
        body: "I scraped and cleaned 5,000+ listings through an automated ETL pipeline (Pandas, NumPy), designed a normalized SQLite schema and wrote 20+ optimized queries that cut query time by ~40%. A Career Pathfinder then recommends the top 5 skill gaps for a target role, all exposed via a Flask REST API.",
      },
      {
        heading: "The Outcome",
        body: "The platform turns a noisy job market into a ranked, queryable picture of demand — and gives users a concrete, prioritized learning plan.",
      },
    ],
    charts: [
      {
        type: "bar",
        title: "Most in-demand skills",
        note: "Mentions across analyzed data-role listings.",
        dataKey: "value",
        xKey: "name",
        data: [
          { name: "SQL", value: 3820 },
          { name: "Python", value: 3610 },
          { name: "Power BI", value: 2140 },
          { name: "Excel", value: 1980 },
          { name: "ML", value: 1520 },
          { name: "Cloud", value: 1180 },
        ],
      },
      {
        type: "bar",
        title: "Query performance",
        note: "Avg query time before vs after optimization (ms).",
        dataKey: "value",
        xKey: "name",
        data: [
          { name: "Before", value: 100 },
          { name: "After", value: 60 },
        ],
      },
      {
        type: "line",
        title: "Median salary by seniority",
        note: "Across data-analyst / engineer roles (indexed).",
        xKey: "name",
        lines: [{ dataKey: "salary", label: "Median (indexed)" }],
        data: [
          { name: "Intern", salary: 30 },
          { name: "Junior", salary: 55 },
          { name: "Mid", salary: 82 },
          { name: "Senior", salary: 100 },
        ],
      },
    ],
  },
};

export const CASE_STUDY_ORDER = ["udaan", "retail-intelligence", "job-market-analyzer"];
