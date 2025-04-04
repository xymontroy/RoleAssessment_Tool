document.addEventListener("DOMContentLoaded", () => {
  // Google Sheet submission URL - Replace with your own Google Apps Script Web App URL
  const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbwRdzGOWlRQmisaXdPW97NSw8aovyOQs77Pad0qIIBgJoFnMGPHGukfK6DtsbE2fs_g/exec"

  // Define the list of managerial positions
  const managerialPositions = [
    "CRM Manager",
    "Sales Performance and QA Coordinator – Training",
    "HR/Admin Manager",
    "HR/Admin and Finance Director",
    "Finance Manager (Coordinator)",
    "Operations Manager",
    "Client Success Manager",
    "Production Manager",
    "Business Development Manager",
    "Marketing Manager",
    "SEO Program Manager",
    "Database Coordinator",
    "Digital Marketing Manager",
    "Recruitment Coordinator",
    "Learning and Development Coordinator",
    "Project Manager",
    "Business Process Manager",
    "IT Manager",
    "IT Security Manager",
  ]

  // Helper function to check if a role is managerial
  function isManagerialRole(role) {
    return managerialPositions.includes(role)
  }

  // Data objects
  // Qualification categories and items
  const qualificationCategories = {
    "CRM & Quality Assurance": [
      "CRM Software Expertise",
      "Data Analysis & Reporting",
      "Call Evaluation & Scoring",
      "Lead Qualification Techniques",
      "Sales Performance Analysis",
      "Coaching & Training",
    ],
    "HR & Finance": [
      "Payroll Management",
      "Labor Law Compliance",
      "Employee Records Management",
      "People Management",
      "Policy Development",
      "Project Management",
      "Financial Planning",
      "General Ledger Accounting",
      "Financial Reporting",
      "Budgeting & Forecasting",
    ],
    "Operations & Client Success": [
      "Process Optimization",
      "Project Management",
      "Team Leadership",
      "Customer Retention Strategies",
      "Account Management",
      "Workflow Management",
      "Lead Generation Strategy",
      "Sales Pipeline Management",
      "B2B Sales & Negotiation",
      "Lead Qualification",
      "Prospecting",
    ],
    "Marketing & Lead Generation": [
      "Performance Analytics",
      "PPC Management",
      "Prospecting",
      "CRM Management",
      "List Building",
      "Content Planning",
      "Engagement Strategy",
    ],
    "Creative & Digital Marketing": [
      "Frontend & Backend Development",
      "CMS Management",
      "SEO Strategy",
      "Website Analytics",
      "On-Page/Off-Page SEO",
      "Google Analytics",
      "Marketing Compliance",
      "Content Quality Review",
      "Objection Handling",
      "Social Media Advertising",
      "Community Engagement",
    ],
    "Database & Research": [
      "Data Management",
      "Database Optimization",
      "Market Research",
      "Data Collection",
      "Statistical Analysis",
      "Data Visualization",
      "Data Modeling",
      "Database Segmentation",
      "Data Verification",
    ],
    "Digital Marketing & Content": [
      "Paid Advertising",
      "Marketing Automation",
      "Email Automation",
      "A/B Testing",
      "Graphic Design",
      "UI/UX Design",
      "Copywriting",
      "Marketing Content Optimization",
      "LinkedIn Outreach",
      "B2B Networking",
    ],
    "Recruitment and L&D": [
      "Applicant Screening",
      "Talent Sourcing",
      "Employer Branding",
      "Social Media Recruitment",
      "Applicant Database Management",
      "Data Entry",
      "Training Program Development",
      "Performance Evaluation",
      "Content Production",
    ],
    "Project & Process Management": [
      "Agile & Scrum Methodologies",
      "Risk Management",
      "Coding & Programming",
      "Software Testing",
      "Process Mapping",
      "Business Process Optimization",
    ],
    "IT, Security, and Software": [
      "IT Infrastructure Management",
      "Cybersecurity",
      "Threat Detection",
      "Compliance & Risk Management",
      "Network & Security Management",
      "Server Maintenance",
      "IT Troubleshooting & System Maintenance",
      "LinkedIn Profile Management",
      "Technical Documentation & Support",
      "Software Developer",
    ],
  }

  // Technical skills categories and items
  const technicalCategories = {
    "CRM & Quality Assurance": [
      "CRM platforms (Salesforce, HubSpot)",
      "Data Reporting Tools (Power BI, Tableau)",
      "QA Software (Call Listening Tools, QA Scorecards)",
      "Google Sheets/Excel (Pivot Tables, Data Validation)",
      "Sales Analytics Tools (HubSpot, Gong.io)",
      "Performance Tracking Software (Power BI, Salesforce Analytics)",
    ],
    "HR & Finance": [
      "Payroll Systems (ADP, QuickBooks)",
      "HRIS (BambooHR, Workday)",
      "HRMS (SAP SuccessFactors, Workday)",
      "Document Management Systems (Google Drive, SharePoint)",
      "Compliance Software (HRIS, OSHA Compliance Tools)",
      "ATS (Greenhouse, Lever)",
      "ERP Systems",
      "Financial Planning Software (NetSuite, QuickBooks)",
      "Accounting Software (Xero, QuickBooks)",
      "Excel (Financial Modeling, Macros)",
      "Budgeting Tools (SAP, NetSuite)",
      "Financial Reporting Software (Power BI, Tableau)",
    ],
    "Operations & Client Success": [
      "Project Management Tools (Asana, Monday.com)",
      "ERP Systems (SAP, NetSuite)",
      "CRM (Salesforce, Zendesk)",
      "Customer Support Tools (Intercom, Freshdesk)",
      "Workflow Management (ClickUp, Wrike)",
      "QA Tools (ISO Compliance Software)",
      "CRM (Pipedrive, Salesforce)",
      "Email Outreach Platforms (Apollo, Outreach.io)",
      "Dialer Software (RingCentral, Aircall)",
      "Lead Tracking Software (HubSpot, Reply.io)",
    ],
    "Marketing & Lead Generation": [
      "Marketing Automation Tools (Marketo, HubSpot)",
      "Google Analytics",
      "Lead Enrichment Tools (LinkedIn Sales Navigator, ZoomInfo)",
      "CRM (Salesforce, Pipedrive)",
      "Data Scraping Tools (Scrapy, Octoparse)",
      "SQL (Basic Queries)",
    ],
    "Creative & Digital Marketing": [
      "Social Media Management Tools (Hootsuite, Sprout Social)",
      "Canva/Adobe Photoshop",
      "Programming Languages (HTML, CSS, JavaScript)",
      "CMS (WordPress, Shopify)",
      "SEO Tools (Ahrefs, SEMrush)",
      "Google Docs",
      "Adobe Creative Suite (Photoshop, Illustrator, InDesign)",
      "Figma",
      "Google Search Console",
      "Keyword Research Tools (Moz, SEMrush)",
      "Technical SEO Tools (Screaming Frog, Google PageSpeed Insights)",
      "A/B Testing Tools (Google Optimize, VWO)",
      "SEO Audit Tools (SEMrush, Ahrefs)",
      "Dialer Software (Five9, Aircall)",
      "Social Listening Tools (Brandwatch, Sprout Social)",
      "Content Scheduling Tools (Buffer, Later)",
    ],
    "Database & Research": [
      "Database Management (MySQL, PostgreSQL)",
      "Data Processing (Excel, Google Sheets)",
      "Market Research Platforms (Statista, IBISWorld)",
      "Survey Tools (Google Forms, Typeform)",
      "Data Visualization Tools (Power BI, Tableau)",
      "SQL (Intermediate Queries)",
      "Database Cleaning Tools (OpenRefine, Trifacta)",
      "CRM Enrichment (Clearbit, ZoomInfo)",
      "Database Management Systems (SQL Server, MongoDB)",
      "IT Support Tools (Zendesk, Jira)",
      "Data Governance Software (Collibra, Alation)",
      "Cloud Storage (AWS S3, Google Cloud)",
    ],
    "Digital Marketing & Content": [
      "PPC Tools (Google Ads, Facebook Ads Manager)",
      "Marketing Analytics (Google Data Studio, HubSpot)",
      "Email Platforms (Mailchimp, Klaviyo)",
      "A/B Testing Software (Litmus, Optimizely)",
      "UI/UX Design Tools (Figma, Adobe XD)",
      "HTML/CSS (Basic for Web Design)",
      "CMS (WordPress, Ghost)",
      "Copywriting Tools (Grammarly, Hemingway Editor)",
      "LinkedIn Sales Navigator",
      "LinkedIn Analytics",
    ],
    "Recruitment & Training": [
      "ATS",
      "LinkedIn Recruiter",
      "Job Boards",
      "Social Media Ads (Meta Business Suite, LinkedIn Ads)",
      "Design Software",
      "Applicant Database Management (Google Sheets, SQL)",
      "LMS Platforms (Moodle, TalentLMS)",
      "E-learning Tools (Articulate, Captivate)",
      "Video Editing Software (Adobe Premiere Pro, Camtasia)",
      "Audio Recording Tools (Audacity, GarageBand)",
    ],
    "Project & Process Management": [
      "Project Management Tools (Trello, Jira)",
      "Risk Assessment Software (Lucidchart, Asana)",
      "Process Mapping Tools (Bizagi, Microsoft Visio)",
    ],
    "IT, Security, and Software": [
      "ITSM Tools (ServiceNow, Freshservice)",
      "Cloud Management (AWS, Azure)",
      "SIEM Tools (Splunk, IBM QRadar)",
      "Endpoint Security (CrowdStrike, Symantec)",
      "Network Monitoring (Wireshark, Nagios)",
      "Firewall Configurations (Cisco, Fortinet)",
      "Help Desk Software (Zendesk, Freshdesk)",
      "Remote Desktop Tools (TeamViewer, AnyDesk)",
      "Ticketing Systems (Jira Service Desk, Zoho Desk)",
      "Knowledge Base Software (Confluence, Notion)",
      "Programming Languages (Python, Java, C#)",
      "Version Control (Git, GitHub)",
    ],
  }

  // Industry data
  const industryData = [
    "Technology (SaaS, IT, Software Development)",
    "B2B Sales & Marketing",
    "Call Center / BPO",
    "Human Resources & Recruitment",
    "Financial Services (Banking, Accounting, Corporate Finance)",
    "Retail & E-commerce",
    "Digital Marketing & Advertising",
    "Media & Publishing",
    "Market Research & Business Intelligence",
    "Education & Training",
    "Telecommunications",
    "Cybersecurity & IT Security",
    "Healthcare",
  ]

  // Education data with point values
  const educationData = [
    {
      level: "Undergraduate Level or Completed Courses/Certifications",
      points: 0.5,
      fields: [
        "Business Administration & Marketing",
        "Entrepreneurship",
        "Advertising or Public Relations",
        "Journalism or Communications",
        "Economics",
        "Accounting or Finance",
        "Human Resources & Organizational Development",
        "Public Administration",
        "Psychology",
        "Management (Sales, Marketing, or Operations)",
        "Data Science & Statistics",
        "Information Technology",
        "Computer Science",
        "Software Engineering",
        "Web Development",
        "Cybersecurity",
        "Graphic Design or Fine Arts",
        "Media or Multimedia Arts",
        "Web Design",
        "Other",
      ],
    },
    {
      level: "Bachelor's Degree",
      points: 1,
      fields: [
        "Business Administration & Marketing",
        "Entrepreneurship",
        "Advertising or Public Relations",
        "Journalism or Communications",
        "Economics",
        "Accounting or Finance",
        "Human Resources & Organizational Development",
        "Public Administration",
        "Psychology",
        "Management (Sales, Marketing, or Operations)",
        "Data Science & Statistics",
        "Information Technology",
        "Computer Science",
        "Software Engineering",
        "Web Development",
        "Cybersecurity",
        "Graphic Design or Fine Arts",
        "Media or Multimedia Arts",
        "Web Design",
        "Other",
      ],
    },
    {
      level: "Master's Degree",
      points: 2,
      fields: [
        "Business Administration & Marketing",
        "Entrepreneurship",
        "Advertising or Public Relations",
        "Journalism or Communications",
        "Economics",
        "Accounting or Finance",
        "Human Resources & Organizational Development",
        "Public Administration",
        "Psychology",
        "Management (Sales, Marketing, or Operations)",
        "Data Science & Statistics",
        "Information Technology",
        "Computer Science",
        "Software Engineering",
        "Web Development",
        "Cybersecurity",
        "Graphic Design or Fine Arts",
        "Media or Multimedia Arts",
        "Web Design",
        "Other",
      ],
    },
  ]

  // Years of experience options with point values
  const experienceData = [
    { level: "1 to 2 years", points: 0.3 },
    { level: "3 to 4 years", points: 0.5 },
    { level: "4 to 5 years", points: 0.8 },
    { level: "5+ years", points: 1 },
  ]

  // Managerial
  const managerialExp = [
    { level: "1 to 2 years", points: 1.3 },
    { level: "3 to 4 years", points: 1.5 },
    { level: "4 to 5 years", points: 1.8 },
    { level: "5+ years", points: 2 },
  ]

  // Required qualifications for each role
  const roleQualifications = {
    "CRM Manager": ["CRM Software Expertise", "Data Analysis & Reporting"],
    "Quality Assurance Analyst": ["Call Evaluation & Scoring", "Lead Qualification Techniques"],
    "Sales Performance and QA Coordinator": ["Sales Performance Analysis", "Coaching & Training"],
    "HR/Finance": ["Payroll Management", "Labor Law Compliance"],
    "HR/Admin Specialist": ["Employee Records Management", "People Management"],
    "HR/Admin Manager": ["Policy Development", "People Management", "Labor Law Compliance", "Project Management"],
    "HR/Admin and Finance Director": ["Financial Planning", "Payroll Management"],
    "Finance Associate": ["General Ledger Accounting", "Financial Reporting"],
    "Finance Manager (Coordinator)": ["Budgeting & Forecasting", "Payroll Management"],
    "Operations Manager": ["Process Optimization", "Project Management", "Team Leadership"],
    "Client Success Manager": ["Customer Retention Strategies", "Account Management"],
    "Production Manager": ["Workflow Management", "Project Management", "Team Leadership"],
    "Business Development Manager": ["Lead Generation Strategy", "Sales Pipeline Management", "B2B Sales & Negotiation"],
    "Business Development Representative": ["Lead Qualification", "Prospecting"],
    "Marketing Manager": ["Performance Analytics", "PPC Management", "Project Management"],
    "Lead Generator": ["Prospecting", "CRM Management", "List Building"],
    "Social Media Specialist": ["Content Planning", "Engagement Strategy"],
    "Web Developer": ["Frontend & Backend Development", "CMS Management"],
    "SEO Program Manager": ["SEO Strategy", "Website Analytics", "Project Management"],
    "SEO Specialist": ["On-Page/Off-Page SEO", "Google Analytics"],
    "Quality Assurance Analyst (SEO)": ["Marketing Compliance", "Content Quality Review"],
    "Sales Development Representative": ["Prospecting", "Objection Handling", "List Building"],
    "Social Media Marketer": ["Social Media Advertising", "Community Engagement"],
    "Database Coordinator": ["Data Management", "Database Optimization"],
    "DB Researcher": ["Market Research", "Data Collection"],
    "Data Analyst": ["Statistical Analysis", "Data Visualization", "Data Modeling"],
    "Data Profiler": ["Database Segmentation", "Data Verification"],
    "Digital Marketing Manager": ["Paid Advertising", "Marketing Automation"],
    "Email Marketing Specialist/Associate": ["Email Automation", "A/B Testing"],
    "Digital Designer": ["Graphic Design", "UI/UX Design"],
    "Content Writer": ["Copywriting", "Marketing Content Optimization"],
    "LinkedIn Champion": ["LinkedIn Outreach", "B2B Networking"],
    "Recruitment Coordinator": ["Applicant Screening", "Project Management", "Team Leadership"],
    "Recruitment Associate": ["Talent Sourcing", "Applicant Screening"],
    "Recruitment Branding Specialist": ["Employer Branding", "Social Media Recruitment"],
    "Recruitment Database Specialist": ["Applicant Database Management", "Data Entry"],
    "Learning and Development Coordinator": ["Training Program Development", "Performance Evaluation", "Project Management"],
    "Production Specialist": ["Performance Evaluation", "Content Production"],
    "Project Manager": ["Agile & Scrum Methodologies", "Risk Management", "Project Management", "Team Leadership"],
    "Software Developer": ["Coding & Programming", "Software Testing"],
    "Business Process Manager": ["Process Mapping", "Project Management", "Business Process Optimization"],
    "IT Manager": ["IT Infrastructure Management", "Cybersecurity", "Project Management", "Team Leadership"],
    "IT Security Manager": ["Threat Detection", "Compliance & Risk Management"],
    "Network Administrator": ["Network & Security Management", "Server Maintenance"],
    "Tech Support": ["IT Troubleshooting & System Maintenance", "Network & Security Management"],
    "Non-Voice Tech Support": ["LinkedIn Profile Management", "Technical Documentation & Support"],
  }

  // Technical skills for each role
  const roleTechnicalSkills = {
    "CRM Manager": ["CRM platforms (Salesforce, HubSpot)", "Data Reporting Tools (Power BI, Tableau)"],
    "Quality Assurance Analyst": ["QA Software (Call Listening Tools, QA Scorecards)", "Google Sheets/Excel (Pivot Tables, Data Validation)"],
    "Sales Performance and QA Coordinator": ["Sales Analytics Tools (HubSpot, Gong.io)", "Performance Tracking Software (Power BI, Salesforce Analytics)"],
    "HR/Finance": ["Payroll Systems (ADP, QuickBooks)", "HRIS (BambooHR, Workday)"],
    "HR/Admin Specialist": ["RMS (SAP SuccessFactors, Workday)", "Document Management Systems (Google Drive, SharePoint)"],
    "HR/Admin Manager": ["Compliance Software (HRIS, OSHA Compliance Tools)", "ATS (Greenhouse, Lever)"],
    "HR/Admin and Finance Director": ["ERP Systems", "Financial Planning Software (NetSuite, QuickBooks)"],
    "Finance Associate": ["Accounting Software (Xero, QuickBooks)", "Excel (Financial Modeling, Macros)"],
    "Finance Manager (Coordinator)": ["Budgeting Tools (SAP, NetSuite)", "Financial Reporting Software (Power BI, Tableau)"],
    "Operations Manager": ["Project Management Tools (Asana, Monday.com)", "ERP Systems (SAP, NetSuite)"],
    "Client Success Manager": ["CRM (Salesforce, Zendesk)", "Customer Support Tools (Intercom, Freshdesk)"],
    "Production Manager": ["Workflow Management (ClickUp, Wrike)", "QA Tools (ISO Compliance Software)"],
    "Business Development Manager": ["CRM (Pipedrive, Salesforce)", "Email Outreach Platforms (Apollo, Outreach.io)"],
    "Business Development Representative": ["CRM (Pipedrive, Salesforce)", "Dialer Software (RingCentral, Aircall)"],
    "Marketing Manager": ["Marketing Automation Tools (Marketo, HubSpot)", "Google Analytics"],
    "Lead Generator": ["Lead Enrichment Tools (LinkedIn Sales Navigator, ZoomInfo)", "CRM (Salesforce, Pipedrive)"],
    "Social Media Specialist": ["Social Media Management Tools (Hootsuite, Sprout Social)", "Canva/Adobe Photoshop"],
    "Web Developer": ["Programming Languages (HTML, CSS, JavaScript)", "CMS (WordPress, Shopify)"],
    "SEO Program Manager": ["Google Search Console", "Keyword Research Tools (Moz, SEMrush)"],
    "SEO Specialist": ["Technical SEO Tools (Screaming Frog, Google PageSpeed Insights)", "Google Analytics"],
    "Quality Assurance Analyst (SEO)": ["A/B Testing Tools (Google Optimize, VWO)", "SEO Audit Tools (SEMrush, Ahrefs)"],
    "Sales Development Representative": ["CRM (Salesforce, HubSpot)", "Dialer Software (Five9, Aircall)"],
    "Social Media Marketer": ["Social Listening Tools (Brandwatch, Sprout Social)", "Content Scheduling Tools (Buffer, Later)"],
    "Database Coordinator": ["Database Management (MySQL, PostgreSQL)", "Data Processing (Excel, Google Sheets)"],
    "DB Researcher": ["Market Research Platforms (Statista, IBISWorld)", "Survey Tools (Google Forms, Typeform)"],
    "Data Analyst": ["Data Visualization Tools (Power BI, Tableau)", "SQL (Intermediate Queries)"],
    "Data Profiler": ["Database Cleaning Tools (OpenRefine, Trifacta)", "CRM Enrichment (Clearbit, ZoomInfo)"],
    "Digital Marketing Manager": ["PPC Tools (Google Ads, Facebook Ads Manager)", "Marketing Analytics (Google Data Studio, HubSpot)"],
    "Email Marketing Specialist/Associate": ["Email Platforms (Mailchimp, Klaviyo)", "A/B Testing Software (Litmus, Optimizely)"],
    "Digital Designer": ["UI/UX Design Tools (Figma, Adobe XD)", "HTML/CSS (Basic for Web Design)"],
    "Content Writer": ["CMS (WordPress, Ghost)", "Copywriting Tools (Grammarly, Hemingway Editor)"],
    "LinkedIn Champion": ["LinkedIn Sales Navigator", "LinkedIn Analytics"],
    "Recruitment Coordinator": ["ATS", "LinkedIn Recruiter"],
    "Recruitment Associate": ["Job Boards", "ATS"],
    "Recruitment Branding Specialist": ["Social Media Ads (Meta Business Suite, LinkedIn Ads)", "Design Software", "Job Boards"],
    "Recruitment Database Specialist": ["Applicant Database Management (Google Sheets, SQL)", "ATS"],
    "Learning and Development Coordinator": ["LMS Platforms (Moodle, TalentLMS)", "E-learning Tools (Articulate, Captivate)"],
    "Production Specialist": ["Video Editing Software (Adobe Premiere Pro, Camtasia)", "Audio Recording Tools (Audacity, GarageBand)"],
    "Project Manager": ["Project Management Tools (Trello, Jira)", "Risk Assessment Software (Lucidchart, Asana)"],
    "Software Developer": ["Programming Languages (Python, Java, C#)", "Version Control (Git, GitHub)"],
    "Business Process Manager": ["Process Mapping Tools (Bizagi, Microsoft Visio)", "ERP Systems"],
    "IT Manager": ["ITSM Tools (ServiceNow, Freshservice)", "Cloud Management (AWS, Azure)"],
    "IT Security Manager": ["SIEM Tools (Splunk, IBM QRadar)", "Endpoint Security (CrowdStrike, Symantec)"],
    "Network Administrator": ["Network Monitoring (Wireshark, Nagios)", "Firewall Configurations (Cisco, Fortinet)"],
    "Tech Support": ["Help Desk Software (Zendesk, Freshdesk)", "Remote Desktop Tools (TeamViewer, AnyDesk)"],
    "Non-Voice Tech Support": ["Ticketing Systems (Jira Service Desk, Zoho Desk)", "Knowledge Base Software (Confluence, Notion)"],
  }

  // Role data for matching
  const roleData = {
    "CRM Manager": {
      industries: ["B2B Sales & Marketing", "Technology (SaaS, IT, Software Development)"],
    },
    "Quality Assurance Analyst": {
      industries: ["Call Center / BPO", "Technology (SaaS, IT, Software Development)"],
    },
    "Sales Performance and QA Coordinator": {
      industries: ["Call Center / BPO", "Education & Training"],
    },
    "HR/Finance": {
      industries: ["Human Resources & Recruitment", "Financial Services"],
    },
    "HR/Admin Specialist": {
      industries: ["Human Resources & Recruitment", "Corporate Finance"],
    },
    "HR/Admin Manager": {
      industries: ["Human Resources & Recruitment", "Corporate Finance"],
    },
    "HR/Admin and Finance Director": {
      industries: ["Financial Services", "Human Resources & Recruitment"],
    },
    "Finance Associate": {
      industries: ["Financial Services", "Corporate Finance"],
    },
    "Finance Manager (Coordinator)": {
      industries: ["Financial Services", "Corporate Finance"],
    },
    "Operations Manager": {
      industries: ["Call Center / BPO", "Technology (SaaS, IT, Software Development)"],
    },
    "Client Success Manager": {
      industries: ["B2B Sales & Marketing", "Technology (SaaS, IT, Software Development)"],
    },
    "Production Manager": {
      industries: ["Call Center / BPO", "B2B Sales & Marketing"],
    },
    "Business Development Manager": {
      industries: ["B2B Sales & Marketing", "Technology (SaaS, IT, Software Development)"],
    },
    "Business Development Representative": {
      industries: ["B2B Sales & Marketing", "Technology (SaaS, IT, Software Development)"],
    },
    "Marketing Manager": {
      industries: ["Digital Marketing & Advertising", "B2B Sales & Marketing"],
    },
    "Lead Generator": {
      industries: ["B2B Sales & Marketing", "Call Center / BPO"],
    },
    "Social Media Specialist": {
      industries: ["Digital Marketing & Advertising", "Retail & E-commerce"],
    },
    "Web Developer": {
      industries: ["Technology (SaaS, IT, Software Development)", "Digital Marketing & Advertising"],
    },
    "SEO Program Manager": {
      industries: ["Digital Marketing & Advertising", "Media & Publishing"],
    },
    "SEO Specialist": {
      industries: ["Digital Marketing & Advertising", "Media & Publishing"],
    },
    "Quality Assurance Analyst (SEO)": {
      industries: ["Digital Marketing & Advertising", "Media & Publishing"],
    },
    "Sales Development Representative": {
      industries: ["B2B Sales & Marketing", "Call Center / BPO"],
    },
    "Social Media Marketer": {
      industries: ["Digital Marketing & Advertising", "B2B Sales & Marketing"],
    },
    "Database Coordinator": {
      industries: ["Market Research & Business Intelligence", "Call Center / BPO"],
    },
    "DB Researcher": {
      industries: ["Market Research & Business Intelligence", "Financial Services"],
    },
    "Data Analyst": {
      industries: ["Market Research & Business Intelligence", "Technology (SaaS, IT, Software Development)"],
    },
    "Data Profiler": {
      industries: ["Market Research & Business Intelligence", "B2B Sales & Marketing"],
    },
    "Digital Marketing Manager": {
      industries: ["Digital Marketing & Advertising", "B2B Sales & Marketing"],
    },
    "Email Marketing Specialist/Associate": {
      industries: ["Digital Marketing & Advertising", "Retail & E-commerce"],
    },
    "Digital Designer": {
      industries: ["Digital Marketing & Advertising", "Retail & E-commerce"],
    },
    "Content Writer": {
      industries: ["Media & Publishing", "Digital Marketing & Advertising"],
    },
    "LinkedIn Champion": {
      industries: ["B2B Sales & Marketing", "Digital Marketing & Advertising"],
    },
    "Recruitment Coordinator": {
      industries: ["Human Resources & Recruitment", "Call Center / BPO"],
    },
    "Recruitment Associate": {
      industries: ["Human Resources & Recruitment", "Call Center / BPO"],
    },
    "Recruitment Branding Specialist": {
      industries: ["Digital Marketing & Advertising", "Human Resources & Recruitment"],
    },
    "Recruitment Database Specialist": {
      industries: ["Market Research & Business Intelligence", "Human Resources & Recruitment"],
    },
    "Learning and Development Coordinator": {
      industries: ["Education & Training", "Call Center / BPO"],
    },
    "Production Specialist": {
      industries: ["Digital Marketing & Advertising", "Media & Publishing"],
    },
    "Project Manager": {
      industries: ["Technology (SaaS, IT, Software Development)", "Call Center / BPO"],
    },
    "Software Developer": {
      industries: ["Technology (SaaS, IT, Software Development)", "Cybersecurity & IT Security"],
    },
    "Business Process Manager": {
      industries: ["Call Center / BPO", "Market Research & Business Intelligence"],
    },
    "IT Manager": {
      industries: ["IT & Security", "Technology (SaaS, IT, Software Development)"],
    },
    "IT Security Manager": {
      industries: ["IT, Security, and Software", "Financial Services"],
    },
    "Network Administrator": {
      industries: ["IT, Security, and Software", "Telecommunications"],
    },
    "Tech Support": {
      industries: ["IT, Security, and Software", "Call Center / BPO"],
    },
    "Non-Voice Tech Support": {
      industries: ["IT, Security, and Software", "Retail & E-commerce"],
    },
  }

  // Add a new object to define required education fields for specific roles
  const requiredEducationFields = {
    "CRM Manager": ["Data Science & Statistics", "Information Technology"],
    "Database Coordinator": ["Data Science & Statistics", "Information Technology", "Computer Science"],
    "DB Researcher": ["Data Science & Statistics", "Information Technology"],
    "Data Analyst": ["Data Science & Statistics", "Information Technology"],
    "Data Profiler": ["Data Science & Statistics", "Information Technology"],
    "IT Manager": ["Information Technology", "Computer Science"],
    "IT Security Manager": ["Cybersecurity", "Information Technology", "Computer Science"],
    "Network Administrator": ["Information Technology", "Computer Science", "Cybersecurity"],
    "Tech Support": ["Information Technology", "Computer Science", "Cybersecurity"],
    "Non-Voice Tech Support": ["Information Technology", "Computer Science", "Web Development"],
  }

  // DOM Elements
  const views = {
    home: document.getElementById("home-view"),
    assessment: document.getElementById("assessment-view"),
    loading: document.getElementById("loading-view"),
    results: document.getElementById("results-view"),
  }

  const tabs = {
    applicant: document.getElementById("applicant-tab"),
    education: document.getElementById("education-tab"),
    qualifications: document.getElementById("qualifications-tab"),
    technical: document.getElementById("technical-tab"),
    industry: document.getElementById("industry-experience-tab"), // Updated to combined tab
  }

  const buttons = {
    startAssessment: document.getElementById("start-assessment-btn"),
    prev: document.getElementById("prev-btn"),
    next: document.getElementById("next-btn"),
    submit: document.getElementById("submit-btn"),
    newAssessment: document.getElementById("new-assessment-btn"),
  }

  const tabTriggers = document.querySelectorAll(".tab-trigger")
  const tabContents = document.querySelectorAll(".tab-content")

  // Form data
  let formData = {
    name: "",
    email: "",
    phone: "",
    education: "",
    experience: "",
    qualifications: {},
    technical: {},
    industryExperience: {
      // Updated for combined industry-experience
      rankFile: {},
      managerial: {},
    },
  }

  // Results data
  let resultsData = []

  // Current tab index
  let currentTabIndex = 0
  const tabNames = ["applicant", "education", "qualifications", "technical", "industry-experience"]

  // Track completed tabs
  let completedTabs = {
    applicant: false,
    education: false,
    qualifications: false,
    technical: false,
    "industry-experience": false,
  }

  // Initialize form elements
  initializeEducationOptions()
  initializeQualifications()
  initializeTechnicalSkills()
  initializeIndustryExperience()

  // Event Listeners
  if (buttons.startAssessment) {
    buttons.startAssessment.addEventListener("click", startAssessment)
  } else {
    console.error("Start Assessment button not found!")
  }

  buttons.startAssessment.addEventListener("click", startAssessment)
  buttons.prev.addEventListener("click", goToPrevTab)
  buttons.next.addEventListener("click", goToNextTab)
  buttons.submit.addEventListener("click", submitAssessment)
  if (buttons.newAssessment) {
    buttons.newAssessment.addEventListener("click", startNewAssessment)
  } else {
    console.warn("New Assessment button not found in the DOM")
  }

  // Modify tab trigger click event to check if tab is accessible
  tabTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const tabName = trigger.getAttribute("data-tab")

      // Check if the tab is accessible
      if (isTabAccessible(tabName)) {
        switchTab(tabName)
      } else {
        // Show a message that the user needs to complete the current section first
        alert("Please complete the current section before navigating to other tabs.")
      }
    })
  })

  // Functions
  function startAssessment() {
    console.log("Start Assessment button clicked") // Debug log
    if (!views.home || !views.assessment) {
      console.error("Views not properly initialized")
      return
    }

    showView("assessment")
    switchTab("applicant")

    // Scroll to top for better UX
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  function startNewAssessment() {
    // Reset form data
    formData = {
      name: "",
      email: "",
      phone: "",
      education: "",
      experience: "",
      qualifications: {},
      technical: {},
      industryExperience: {
        rankFile: {},
        managerial: {},
      },
    }

    // Reset completed tabs
    completedTabs = {
      applicant: false,
      education: false,
      qualifications: false,
      technical: false,
      "industry-experience": false,
    }

    // Reset form fields
    document.getElementById("name").value = ""
    document.getElementById("email").value = ""
    document.getElementById("phone").value = ""

    // Reset radio buttons
    document.querySelectorAll('input[type="radio"]').forEach((radio) => {
      radio.checked = false
    })

    // Reset checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      checkbox.checked = false

      // Reset the border styling for checkbox items
      if (checkbox.parentElement && checkbox.parentElement.classList.contains("checkbox-item")) {
        checkbox.parentElement.style.border = "2px solid transparent"
      }
    })

    // Reset radio item styling
    document.querySelectorAll(".radio-item").forEach((item) => {
      item.classList.remove("selected")
    })

    // Reset category expansions
    document.querySelectorAll(".category").forEach((category) => {
      category.classList.remove("active")
    })

    // Reset error messages
    document.querySelectorAll('[id$="-error"]').forEach((error) => {
      error.classList.add("hidden")
    })

    // Reset to first tab
    currentTabIndex = 0
    switchTab(tabNames[currentTabIndex])

    // Show assessment view
    showView("assessment")

    // Update tab triggers to reflect the reset state
    updateTabTriggerStates()
  }

  function showView(viewName) {
    Object.keys(views).forEach((key) => {
      views[key].classList.add("hidden")
    })
    views[viewName].classList.remove("hidden")
  }

  // Function to check if a tab is accessible
  function isTabAccessible(tabName) {
    const tabIndex = tabNames.indexOf(tabName)

    // First tab is always accessible
    if (tabIndex === 0) return true

    // For other tabs, check if all previous tabs are completed
    for (let i = 0; i < tabIndex; i++) {
      if (!completedTabs[tabNames[i]]) {
        return false
      }
    }

    return true
  }

  // Update the visual state of tab triggers based on accessibility
  function updateTabTriggerStates() {
    tabTriggers.forEach((trigger) => {
      const tabName = trigger.getAttribute("data-tab")

      if (isTabAccessible(tabName)) {
        trigger.classList.remove("disabled")
        trigger.style.opacity = "1"
        trigger.style.cursor = "pointer"
      } else {
        trigger.classList.add("disabled")
        trigger.style.opacity = "0.5"
        trigger.style.cursor = "not-allowed"
      }
    })
  }

  function switchTab(tabName) {
    // Update tab triggers
    tabTriggers.forEach((trigger) => {
      if (trigger.getAttribute("data-tab") === tabName) {
        trigger.classList.add("active")
      } else {
        trigger.classList.remove("active")
      }
    })

    // Update tab contents
    tabContents.forEach((content) => {
      if (content.id === `${tabName}-tab`) {
        content.classList.remove("hidden")
        content.classList.add("active")
      } else {
        content.classList.add("hidden")
        content.classList.remove("active")
      }
    })

    // Update current tab index
    currentTabIndex = tabNames.indexOf(tabName)

    // Update buttons
    updateNavigationButtons()

    // Update tab trigger states
    updateTabTriggerStates()
  }

  function updateNavigationButtons() {
    buttons.prev.disabled = currentTabIndex === 0

    if (currentTabIndex === tabNames.length - 1) {
      buttons.next.classList.add("hidden")
      buttons.submit.classList.remove("hidden")
    } else {
      buttons.next.classList.remove("hidden")
      buttons.submit.classList.add("hidden")
    }
  }

  function goToNextTab() {
    if (validateCurrentTab()) {
      if (currentTabIndex < tabNames.length - 1) {
        // Mark current tab as completed
        completedTabs[tabNames[currentTabIndex]] = true

        // Update tab trigger states
        updateTabTriggerStates()

        switchTab(tabNames[currentTabIndex + 1])
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth", // Smooth scrolling
        })
      }

      if (selectedFields.includes("Other") && (!formData.otherEducationField || formData.otherEducationField.trim() === "")) {
        if (errorElement) {
          errorElement.textContent = "Please specify your field of study for 'Other'."
          errorElement.classList.remove("hidden")
        }
        isValid = false;
      }
    }
  }

  function goToPrevTab() {
    if (currentTabIndex > 0) {
      switchTab(tabNames[currentTabIndex - 1])
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth", // Smooth scrolling
      })
    }
  }

  // Modify the validateCurrentTab function to ensure proper validation for industry-experience
  function validateCurrentTab() {
    const tabName = tabNames[currentTabIndex]
    const errorElement = document.getElementById(`${tabName}-error`)
    let isValid = true

    switch (tabName) {
      case "applicant":
        const name = document.getElementById("name").value
        const email = document.getElementById("email").value
        const phone = document.getElementById("phone").value

        formData.name = name
        formData.email = email
        formData.phone = phone

        if (!name || !email) {
          if (errorElement) {
            errorElement.classList.remove("hidden")
          }
          isValid = false
        } else {
          if (errorElement) {
            errorElement.classList.add("hidden")
          }
        }
        break

      case "education":
        const educationRadios = document.querySelectorAll('input[name="education"]')
        let educationSelected = false

        educationRadios.forEach((radio) => {
          if (radio.checked) {
            formData.education = radio.value
            educationSelected = true
          }
        })

        // Get selected education fields
        if (educationSelected) {
          // Find the active education category
          const activeCategory = document.querySelector('.category.active[data-category="' + formData.education + '"]')
          if (activeCategory) {
            // Get all checked field checkboxes within this category
            const selectedFields = []
            activeCategory.querySelectorAll('input[type="checkbox"]:checked').forEach((checkbox) => {
              selectedFields.push(checkbox.value)
            })
            formData.educationFields = selectedFields
          }
        }

        if (!educationSelected) {
          if (errorElement) {
            errorElement.classList.remove("hidden")
          }
          isValid = false
        } else {
          if (errorElement) {
            errorElement.classList.add("hidden")
          }
        }
        break

      case "qualifications":
        const qualificationCheckboxes = document.querySelectorAll('input[name^="qualification-"]')
        let qualificationsSelected = false

        qualificationCheckboxes.forEach((checkbox) => {
          const qualification = checkbox.value
          formData.qualifications[qualification] = checkbox.checked
          if (checkbox.checked) {
            qualificationsSelected = true
          }
        })

        if (!qualificationsSelected) {
          if (errorElement) {
            errorElement.classList.remove("hidden")
          }
          isValid = false
        } else {
          if (errorElement) {
            errorElement.classList.add("hidden")
          }
        }
        break

      case "technical":
        const technicalCheckboxes = document.querySelectorAll('input[name^="technical-"]')
        let technicalSelected = false

        technicalCheckboxes.forEach((checkbox) => {
          const technical = checkbox.value
          formData.technical[technical] = checkbox.checked
          if (checkbox.checked) {
            technicalSelected = true
          }
        })

        if (!technicalSelected) {
          if (errorElement) {
            errorElement.classList.remove("hidden")
          }
          isValid = false
        } else {
          if (errorElement) {
            errorElement.classList.add("hidden")
          }
        }
        break

      case "industry-experience":
        // Directly use the validateIndustryExperience function for validation
        isValid = validateIndustryExperience()
        break
    }

    return isValid
  }

  // Modify the submitAssessment function to ensure validation is performed
  function submitAssessment() {
    // First validate the current tab (which is the industry-experience tab)
    if (validateCurrentTab()) {
      // Double-check industry experience validation specifically
      if (tabNames[currentTabIndex] === "industry-experience" && !validateIndustryExperience()) {
        return // Stop submission if industry validation fails
      }

      // Mark the last tab as completed
      completedTabs[tabNames[currentTabIndex]] = true

      showView("loading")

      // Calculate matches
      const matches = calculateRoleMatches()
      resultsData = matches

      // Submit to Google Sheets
      submitToGoogleSheet(matches)
    }
  }

  // Modify the calculateRoleMatches function to implement the strict education field requirements
  let calculateRoleMatches = () => {
    // Calculate score for each role
    const roleScores = Object.keys(roleData).map((role) => {
      const roleInfo = roleData[role]
      let totalPoints = 0
      let maxPoints = 0

      // Calculate qualifications score
      if (roleQualifications[role]) {
        roleQualifications[role].forEach((qualification) => {
          if (formData.qualifications[qualification]) {
            totalPoints += 3 // Points for having the qualification
          }
          maxPoints += 3 // Maximum possible points for this qualification
        })
      }

      // Calculate technical skills score
      if (roleTechnicalSkills[role]) {
        roleTechnicalSkills[role].forEach((tech) => {
          if (formData.technical[tech]) {
            totalPoints += 2 // Points for having the technical skill
          }
          maxPoints += 2 // Maximum possible points for this technical skill
        })
      }

      // Calculate industry experience score
      if (roleInfo.industries) {
        roleInfo.industries.forEach((ind) => {
          // Check both rankFile and managerial experience
          if (formData.industryExperience.rankFile[ind] || formData.industryExperience.managerial[ind]) {
            totalPoints += 2
          }
          maxPoints += 2 // Maximum possible points for this industry
        })
      }

      // Calculate raw score as a percentage
      const rawScore = maxPoints > 0 ? (totalPoints / maxPoints) * 100 : 0

      const result = {
        role,
        rawScore,
        qualifications: roleQualifications[role] || [],
        technicalSkills: roleTechnicalSkills[role] || [],
        industries: roleInfo.industries || [],
        isManagerial: isManagerialRole(role), // Add flag to identify managerial roles
      }

      // Check for strict education field compliance
      if (requiredEducationFields[role] && formData.educationFields) {
        // Check if the candidate has all required education fields for this role
        const hasAllRequiredFields = requiredEducationFields[role].every((field) =>
          formData.educationFields.includes(field),
        )

        // If the candidate doesn't have all required fields, set score to 0
        if (!hasAllRequiredFields) {
          result.rawScore = 0
          result.disqualifiedByEducation = true
        }
      }

      // Add education points if available
      if (formData.education) {
        const educationInfo = educationData.find((edu) => edu.level === formData.education)
        if (educationInfo) {
          // Only add education points if not disqualified by education field requirements
          if (!result.disqualifiedByEducation) {
            result.rawScore += educationInfo.points
            result.educationPoints = educationInfo.points
          }
        }
      }

      // Add experience points from both rankFile and managerial experiences
      result.experiencePoints = 0

      // Process all industry experiences and add points
      Object.entries(formData.industryExperience.rankFile || {}).forEach(([industry, expLevel]) => {
        if (expLevel) {
          const experienceInfo = experienceData.find((exp) => exp.level === expLevel)
          if (experienceInfo && !result.disqualifiedByEducation) {
            result.rawScore += experienceInfo.points
            result.experiencePoints += experienceInfo.points
          }
        }
      })

      Object.entries(formData.industryExperience.managerial || {}).forEach(([industry, expLevel]) => {
        if (expLevel) {
          const managerialInfo = managerialExp.find((exp) => exp.level === expLevel)
          if (managerialInfo && !result.disqualifiedByEducation) {
            result.rawScore += managerialInfo.points
            result.experiencePoints += managerialInfo.points
          }
        }
      })

      return result
    })

    // Check if applicant has managerial experience
    const hasManagerialExperience = Object.keys(formData.industryExperience.managerial || {}).length > 0
    const hasRankFileExperience = Object.keys(formData.industryExperience.rankFile || {}).length > 0

    // Sort roles based on experience type
    let sortedRoles

    if (hasManagerialExperience) {
      // For managerial experience: prioritize managerial roles at the top, then sort by score
      sortedRoles = roleScores.sort((a, b) => {
        // If one is managerial and the other isn't, the managerial one comes first
        if (a.isManagerial && !b.isManagerial) return -1
        if (!a.isManagerial && b.isManagerial) return 1

        // If both are managerial or both are not, sort by score
        return b.rawScore - a.rawScore
      })
    } else if (hasRankFileExperience) {
      // For rank and file experience: prioritize non-managerial roles for first and second positions
      // First, separate managerial and non-managerial roles
      const managerialRoles = roleScores.filter((role) => role.isManagerial)
      const nonManagerialRoles = roleScores.filter((role) => !role.isManagerial)

      // Sort both groups by score
      managerialRoles.sort((a, b) => b.rawScore - a.rawScore)
      nonManagerialRoles.sort((a, b) => b.rawScore - a.rawScore)

      // Take the top non-managerial roles first, then add managerial roles
      sortedRoles = [...nonManagerialRoles, ...managerialRoles]
    } else {
      // Default sorting by score if no experience selected
      sortedRoles = roleScores.sort((a, b) => b.rawScore - a.rawScore)
    }

    // Get top 3 roles
    const top3Matches = sortedRoles.slice(0, 3)

    // Calculate the sum of the top 3 raw scores
    const totalRawScore = top3Matches.reduce((sum, match) => sum + match.rawScore, 0)

    // Normalize scores to make them add up to 100%
    if (totalRawScore > 0) {
      // First pass: calculate initial normalized scores
      let totalNormalizedScore = 0
      top3Matches.forEach((match) => {
        match.normalizedScore = Math.round((match.rawScore / totalRawScore) * 100)
        totalNormalizedScore += match.normalizedScore
      })

      // Second pass: adjust if total doesn't equal 100%
      if (totalNormalizedScore !== 100 && top3Matches.length > 0) {
        // Add or subtract the difference from the highest scoring match
        top3Matches.sort((a, b) => b.rawScore - a.rawScore)
        top3Matches[0].normalizedScore += 100 - totalNormalizedScore
      }
    } else {
      // If all scores are 0, distribute evenly
      const evenScore = Math.floor(100 / top3Matches.length)
      const remainder = 100 - evenScore * top3Matches.length

      top3Matches.forEach((match, index) => {
        match.normalizedScore = evenScore + (index === 0 ? remainder : 0)
      })
    }

    return top3Matches
  }

  // Modify the submitToGoogleSheet function to include the total experience points
  function submitToGoogleSheet(matches) {
    // Show loading message
    document.getElementById("submission-status").textContent = "Saving results to Google Sheets..."
    document.getElementById("submission-status").classList.remove("hidden")

    // Prepare data for Google Sheets
    const timestamp = new Date().toISOString()

    // Format industry experience in the required format
    const formattedIndustryExperience = formatIndustryExperience()

    // Calculate total experience points
    const experiencePoints = calculateTotalExperiencePoints()

    // Format education fields including "Others" input
    let educationFields = formData.educationFields ? [...formData.educationFields] : []

    // Add custom education fields if they exist
    if (formData.educationOthersText && formData.education) {
      const customField = formData.educationOthersText[formData.education]
      if (customField) {
        // Replace "Others" with the custom input in the educationFields array
        const othersIndex = educationFields.indexOf("Others")
        if (othersIndex !== -1) {
          educationFields[othersIndex] = customField
        } else {
          educationFields.push(customField)
        }
      }
    }

    // Format results with detailed information for Google Sheets
    const role1 = matches[0]
      ? {
        role: matches[0].role,
        normalizedScore: matches[0].normalizedScore,
        rawScore: matches[0].rawScore,
        educationPoints: matches[0].educationPoints || 0,
        experiencePoints: matches[0].experiencePoints || 0,
        isManagerial: matches[0].isManagerial || false,
      }
      : null

    const role2 = matches[1]
      ? {
        role: matches[1].role,
        normalizedScore: matches[1].normalizedScore,
        rawScore: matches[1].rawScore,
        isManagerial: matches[1].isManagerial || false,
      }
      : null

    const role3 = matches[2]
      ? {
        role: matches[2].role,
        normalizedScore: matches[2].normalizedScore,
        rawScore: matches[2].rawScore,
        isManagerial: matches[2].isManagerial || false,
      }
      : null

    // Create data object with all assessment details
    const data = {
      timestamp: timestamp,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      education: formData.education,
      education_fields: (() => {
        let educationFieldsText = formData.educationFields ? formData.educationFields.join(", ") : "";
        if (formData.educationFields && formData.educationFields.includes("Other") && formData.otherEducationField) {
          educationFieldsText = educationFieldsText.replace("Other", `Other (${formData.otherEducationField})`);
        }
        return educationFieldsText;
      })(),
      qualifications: Object.keys(formData.qualifications)
        .filter((q) => formData.qualifications[q])
        .join(", "),
      technical: Object.keys(formData.technical)
        .filter((t) => formData.technical[t])
        .join(", "),
      industry_experience: formattedIndustryExperience,
      total_experience_points: experiencePoints.totalPoints.toFixed(2),

      role1: role1 ? role1.role : "None",
      role1_raw_score: role1 ? role1.rawScore : 0,
      role1_normalized_score: role1 ? role1.normalizedScore + "%" : "0%",
      education_points: role1 ? role1.educationPoints : 0,
      experience_points: role1 ? role1.experiencePoints : 0,
      role2: role2 ? role2.role : "None",
      role2_raw_score: role2 ? role2.rawScore : 0,
      role2_normalized_score: role2 ? role2.normalizedScore + "%" : "0%",
      role3: role3 ? role3.role : "None",
      role3_raw_score: role3 ? role3.rawScore : 0,
      role3_normalized_score: role3 ? role3.normalizedScore + "%" : "0%",
    }

    console.log("Sending data to Google Sheets:", data)

    // Use fetch method to submit data
    fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      mode: "no-cors", // This is important for CORS issues
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(data).toString(),
    })
      .then(() => {
        console.log("Data submitted via fetch")
        document.getElementById("submission-status").textContent =
          ""

        // Show thank you message
        setTimeout(() => {
          showView("results")
          document.getElementById("submission-status").classList.remove("hidden")
        }, 1500)
      })
      .catch((error) => {
        console.error("Error in submission:", error)
        document.getElementById("submission-status").textContent =
          "There was an error saving your results. Please try again."

        // Still show thank you message even if submission fails
        setTimeout(() => {
          showView("results")
          document.getElementById("submission-status").classList.remove("hidden")
        }, 1500)
      })
  }

  // Add a function to calculate total experience points
  function calculateTotalExperiencePoints() {
    let rankPoints = 0
    let managerialPoints = 0

    // Calculate rank file experience points
    Object.entries(formData.industryExperience.rankFile || {}).forEach(([industry, expLevel]) => {
      if (expLevel) {
        const experienceInfo = experienceData.find((exp) => exp.level === expLevel)
        if (experienceInfo) {
          rankPoints += experienceInfo.points
        }
      }
    })

    // Calculate managerial experience points
    Object.entries(formData.industryExperience.managerial || {}).forEach(([industry, expLevel]) => {
      if (expLevel) {
        const managerialInfo = managerialExp.find((exp) => exp.level === expLevel)
        if (managerialInfo) {
          managerialPoints += managerialInfo.points
        }
      }
    })

    // Calculate total points
    const totalPoints = rankPoints + managerialPoints

    return {
      rankPoints,
      managerialPoints,
      totalPoints,
    }
  }

  // Modify the formatIndustryExperience function to include points
  let formatIndustryExperience = () => {
    const formattedExperiences = []

    // Process rank file experiences
    Object.entries(formData.industryExperience.rankFile || {}).forEach(([industry, expLevel]) => {
      if (expLevel) {
        const experienceInfo = experienceData.find((exp) => exp.level === expLevel)
        const points = experienceInfo ? experienceInfo.points : 0
        formattedExperiences.push(`${industry}: ${expLevel} (Rank, ${points} pts)`)
      }
    })

    // Process managerial experiences
    Object.entries(formData.industryExperience.managerial || {}).forEach(([industry, expLevel]) => {
      if (expLevel) {
        const managerialInfo = managerialExp.find((exp) => exp.level === expLevel)
        const points = managerialInfo ? managerialInfo.points : 0
        formattedExperiences.push(`${industry}: ${expLevel} (Managerial, ${points} pts)`)
      }
    })

    // Add total experience points summary
    const experiencePoints = calculateTotalExperiencePoints()
    formattedExperiences.push(
      `Rank: ${experiencePoints.rankPoints.toFixed(2)} points, Managerial: ${experiencePoints.managerialPoints.toFixed(2)} points, Total: ${experiencePoints.totalPoints.toFixed(2)} points`,
    )

    return formattedExperiences.join(", ")
  }

  // Now modify the calculateRoleMatches function to use the total experience points
  calculateRoleMatches = () => {
    // Calculate total experience points
    const experiencePoints = calculateTotalExperiencePoints()

    // Calculate score for each role
    const roleScores = Object.keys(roleData).map((role) => {
      const roleInfo = roleData[role]
      let totalPoints = 0
      let maxPoints = 0

      // Calculate qualifications score
      if (roleQualifications[role]) {
        roleQualifications[role].forEach((qualification) => {
          if (formData.qualifications[qualification]) {
            totalPoints += 3 // Points for having the qualification
          }
          maxPoints += 3 // Maximum possible points for this qualification
        })
      }

      // Calculate technical skills score
      if (roleTechnicalSkills[role]) {
        roleTechnicalSkills[role].forEach((tech) => {
          if (formData.technical[tech]) {
            totalPoints += 2 // Points for having the technical skill
          }
          maxPoints += 2 // Maximum possible points for this technical skill
        })
      }

      // Calculate industry experience score
      if (roleInfo.industries) {
        roleInfo.industries.forEach((ind) => {
          // Check both rankFile and managerial experience
          if (formData.industryExperience.rankFile[ind] || formData.industryExperience.managerial[ind]) {
            totalPoints += 2
          }
          maxPoints += 2 // Maximum possible points for this industry
        })
      }

      // Calculate raw score as a percentage
      const rawScore = maxPoints > 0 ? (totalPoints / maxPoints) * 100 : 0

      const result = {
        role,
        rawScore,
        qualifications: roleQualifications[role] || [],
        technicalSkills: roleTechnicalSkills[role] || [],
        industries: roleInfo.industries || [],
        isManagerial: isManagerialRole(role), // Add flag to identify managerial roles
      }

      // Check for strict education field compliance
      if (requiredEducationFields[role] && formData.educationFields) {
        // Check if the candidate has all required education fields for this role
        const hasAllRequiredFields = requiredEducationFields[role].every((field) =>
          formData.educationFields.includes(field),
        )

        // If the candidate doesn't have all required fields, set score to 0
        if (!hasAllRequiredFields) {
          result.rawScore = 0
          result.disqualifiedByEducation = true
        }
      }

      // Add education points if available
      if (formData.education) {
        const educationInfo = educationData.find((edu) => edu.level === formData.education)
        if (educationInfo) {
          // Only add education points if not disqualified by education field requirements
          if (!result.disqualifiedByEducation) {
            result.rawScore += educationInfo.points
            result.educationPoints = educationInfo.points
          }
        }
      }

      // Add experience points - use the total experience points instead of calculating per role
      if (!result.disqualifiedByEducation) {
        // For managerial roles, prioritize managerial experience points
        if (isManagerialRole(role)) {
          // If they have managerial experience, use that, otherwise use rank file experience
          if (experiencePoints.managerialPoints > 0) {
            result.rawScore += experiencePoints.managerialPoints
            result.experiencePoints = experiencePoints.managerialPoints
          } else {
            result.rawScore += experiencePoints.rankPoints
            result.experiencePoints = experiencePoints.rankPoints
          }
        } else {
          // For non-managerial roles, use rank file experience points if available, otherwise use total
          if (experiencePoints.rankPoints > 0) {
            result.rawScore += experiencePoints.rankPoints
            result.experiencePoints = experiencePoints.rankPoints
          } else {
            result.rawScore += experiencePoints.totalPoints
            result.experiencePoints = experiencePoints.totalPoints
          }
        }
      }

      return result
    })

    // Check if applicant has managerial experience
    const hasManagerialExperience = experiencePoints.managerialPoints > 0
    const hasRankFileExperience = experiencePoints.rankPoints > 0

    // Sort roles based on experience type
    let sortedRoles

    if (hasManagerialExperience) {
      // For managerial experience: prioritize managerial roles at the top, then sort by score
      sortedRoles = roleScores.sort((a, b) => {
        // If one is managerial and the other isn't, the managerial one comes first
        if (a.isManagerial && !b.isManagerial) return -1
        if (!a.isManagerial && b.isManagerial) return 1

        // If both are managerial or both are not, sort by score
        return b.rawScore - a.rawScore
      })
    } else if (hasRankFileExperience) {
      // For rank and file experience: prioritize non-managerial roles for first and second positions
      // First, separate managerial and non-managerial roles
      const managerialRoles = roleScores.filter((role) => role.isManagerial)
      const nonManagerialRoles = roleScores.filter((role) => !role.isManagerial)

      // Sort both groups by score
      managerialRoles.sort((a, b) => b.rawScore - a.rawScore)
      nonManagerialRoles.sort((a, b) => b.rawScore - a.rawScore)

      // Take the top non-managerial roles first, then add managerial roles
      sortedRoles = [...nonManagerialRoles, ...managerialRoles]
    } else {
      // Default sorting by score if no experience selected
      sortedRoles = roleScores.sort((a, b) => b.rawScore - a.rawScore)
    }

    // Get top 3 roles
    const top3Matches = sortedRoles.slice(0, 3)

    // Calculate the sum of the top 3 raw scores
    const totalRawScore = top3Matches.reduce((sum, match) => sum + match.rawScore, 0)

    // Normalize scores to make them add up to 100%
    if (totalRawScore > 0) {
      // First pass: calculate initial normalized scores
      let totalNormalizedScore = 0
      top3Matches.forEach((match) => {
        match.normalizedScore = Math.round((match.rawScore / totalRawScore) * 100)
        totalNormalizedScore += match.normalizedScore
      })

      // Second pass: adjust if total doesn't equal 100%
      if (totalNormalizedScore !== 100 && top3Matches.length > 0) {
        // Add or subtract the difference from the highest scoring match
        top3Matches.sort((a, b) => b.rawScore - a.rawScore)
        top3Matches[0].normalizedScore += 100 - totalNormalizedScore
      }
    } else {
      // If all scores are 0, distribute evenly
      const evenScore = Math.floor(100 / top3Matches.length)
      const remainder = 100 - evenScore * top3Matches.length

      top3Matches.forEach((match, index) => {
        match.normalizedScore = evenScore + (index === 0 ? remainder : 0)
      })
    }

    return top3Matches
  }

  // Format industry experience in the required format: "Technology (SaaS): 3-4 yrs (Managerial), Healthcare: 5+ yrs (Rank)"
  formatIndustryExperience = () => {
    const formattedExperiences = []

    // Process rank file experiences
    Object.entries(formData.industryExperience.rankFile || {}).forEach(([industry, expLevel]) => {
      if (expLevel) {
        formattedExperiences.push(`${industry}: ${expLevel} (Rank)`)
      }
    })

    // Process managerial experiences
    Object.entries(formData.industryExperience.managerial || {}).forEach(([industry, expLevel]) => {
      if (expLevel) {
        formattedExperiences.push(`${industry}: ${expLevel} (Managerial)`)
      }
    })

    return formattedExperiences.join(", ")
  }

  // Initialization Functions
  function initializeQualifications() {
    const qualificationsContainer = document.getElementById("qualifications-container")
    qualificationsContainer.innerHTML = ""

    Object.entries(qualificationCategories).forEach(([category, qualifications]) => {
      const categoryDiv = document.createElement("div")
      categoryDiv.className = "category"

      const categoryTitle = document.createElement("h3")
      categoryTitle.className = "category-title"
      categoryTitle.textContent = category

      const categoryItems = document.createElement("div")
      categoryItems.className = "category-items"

      qualifications.forEach((qualification) => {
        const checkboxItem = document.createElement("div")
        checkboxItem.className = "checkbox-item"

        const input = document.createElement("input")
        input.type = "checkbox"
        input.id = `qualification-${qualification}`
        input.name = `qualification-${qualification}`
        input.value = qualification

        const label = document.createElement("label")
        label.htmlFor = `qualification-${qualification}`
        label.textContent = qualification

        // Border change logic for .checkbox-item
        input.addEventListener("change", () => {
          checkboxItem.style.border = input.checked ? "2px solid #014e89" : "2px solid transparent"
        })

        checkboxItem.appendChild(input)
        checkboxItem.appendChild(label)
        categoryItems.appendChild(checkboxItem)
      })

      categoryTitle.addEventListener("click", () => {
        categoryDiv.classList.toggle("active")
      })

      categoryDiv.appendChild(categoryTitle)
      categoryDiv.appendChild(categoryItems)

      qualificationsContainer.appendChild(categoryDiv)
    })
  }

  function initializeTechnicalSkills() {
    const technicalContainer = document.getElementById("technical-container")
    technicalContainer.innerHTML = ""

    Object.entries(technicalCategories).forEach(([category, skills]) => {
      const categoryDiv = document.createElement("div")
      categoryDiv.className = "category"

      const categoryTitle = document.createElement("h3")
      categoryTitle.className = "category-title"
      categoryTitle.textContent = category

      const categoryItems = document.createElement("div")
      categoryItems.className = "category-items"

      skills.forEach((skill) => {
        const checkboxItem = document.createElement("div")
        checkboxItem.className = "checkbox-item"

        const input = document.createElement("input")
        input.type = "checkbox"
        input.id = `technical-${skill}`
        input.name = `technical-${skill}`
        input.value = skill

        const label = document.createElement("label")
        label.htmlFor = `technical-${skill}`
        label.textContent = skill

        // Border change logic for .checkbox-item
        input.addEventListener("change", () => {
          checkboxItem.style.border = input.checked ? "2px solid #014e89" : "2px solid transparent"
        })

        checkboxItem.appendChild(input)
        checkboxItem.appendChild(label)
        categoryItems.appendChild(checkboxItem)
      })

      categoryTitle.addEventListener("click", () => {
        categoryDiv.classList.toggle("active")
      })

      categoryDiv.appendChild(categoryTitle)
      categoryDiv.appendChild(categoryItems)

      technicalContainer.appendChild(categoryDiv)
    })
  }

  // Industry Experience
  function initializeIndustryExperience() {
    const tabContent = document.getElementById("industry-experience-tab")

    // Create container for both experience types
    const experienceContainer = document.createElement("div")
    experienceContainer.className = "experience-container"

    // Add Rank & File section
    const rankFileSection = createExperienceSection("Rank and File Experience", "rank-file-experience", experienceData)
    experienceContainer.appendChild(rankFileSection)

    // Add Managerial section
    const managerialSection = createExperienceSection("Managerial Experience", "managerial-experience", managerialExp)
    experienceContainer.appendChild(managerialSection)

    // Clear existing content and add our new structure
    tabContent.innerHTML = ""

    // Add tab header
    const tabHeader = document.createElement("div")
    tabHeader.className = "tab-header"
    tabHeader.innerHTML = `
      <h2><i class="fas fa-industry"></i> Industry & Experience</h2>
      <p>Select your industry experience for both rank and file and managerial roles</p>
    `
    tabContent.appendChild(tabHeader)
    tabContent.appendChild(experienceContainer)

    // Initialize both cards
    initIndustryExperienceCard("rank-file-experience", experienceData)
    initIndustryExperienceCard("managerial-experience", managerialExp)

    // Add error message container for industry experience tab
    const errorElement = document.createElement("div")
    errorElement.id = "industry-experience-error"
    errorElement.className = "error-message hidden"
    errorElement.innerHTML = '<i class="fas fa-exclamation-circle"></i> Please select at least one industry.'
    tabContent.appendChild(errorElement)

    // Make sure the error element is hidden by default
    errorElement.classList.add("hidden")
  }

  // Modify the createExperienceSection function to change how the dropdown is positioned
  function createExperienceSection(title, containerId, experienceLevels) {
    const section = document.createElement("div")
    section.className = "experience-section"

    const sectionHeader = document.createElement("div")
    sectionHeader.className = "section-header"

    const sectionTitle = document.createElement("h3")
    sectionTitle.className = "experience-section-title"
    sectionTitle.textContent = title
    sectionHeader.appendChild(sectionTitle)

    // Add collapse toggle button
    const toggleBtn = document.createElement("button")
    toggleBtn.className = "toggle-section"
    toggleBtn.innerHTML = '<i class="fas fa-chevron-down"></i>' // Default to collapsed state
    sectionHeader.appendChild(toggleBtn)
    section.appendChild(sectionHeader)

    // Create collapsible content container
    const sectionContent = document.createElement("div")
    sectionContent.className = "section-content collapsed" // Add 'collapsed' class by default

    const selectorContainer = document.createElement("div")
    selectorContainer.className = "industry-selector-container"

    // Create a custom dropdown that uses a modal-like approach
    const dropdownContainer = document.createElement("div")
    dropdownContainer.className = "industry-dropdown-container"

    const label = document.createElement("label")
    label.textContent = "Select Industries:"
    dropdownContainer.appendChild(label)

    const dropdownTrigger = document.createElement("button")
    dropdownTrigger.className = "dropdown-trigger"
    dropdownTrigger.innerHTML = `
      <span class="trigger-text">Choose industries</span>
      <i class="fas fa-chevron-down"></i>
    `
    dropdownContainer.appendChild(dropdownTrigger)

    // Create dropdown content as a separate element that will be positioned absolutely relative to the viewport
    const dropdownContent = document.createElement("div")
    dropdownContent.className = "dropdown-content"
    dropdownContent.innerHTML = `
    <div class="dropdown-header">
      <h4>Select Industries</h4>
      <button class="close-dropdown"><i class="fas fa-times"></i></button>
    </div>
    <div class="dropdown-body">
      <input type="text" class="industry-search" placeholder="Search industries...">
      <div class="options-list"></div>
    </div>
  `

    // Add the dropdown content to the dropdown container for proper positioning
    dropdownContainer.appendChild(dropdownContent)

    // Store the dropdown content reference in the trigger for later use
    dropdownTrigger.dropdownContent = dropdownContent
    dropdownContent.dataset.containerId = containerId

    // Add event listener to toggle dropdown
    dropdownTrigger.addEventListener("click", (e) => {
      e.stopPropagation()

      // Position the dropdown content relative to the trigger
      const rect = dropdownTrigger.getBoundingClientRect()
      dropdownContent.style.position = "absolute"
      dropdownContent.style.top = "100%"
      dropdownContent.style.left = "0"
      dropdownContent.style.width = "100%"
      dropdownContent.style.zIndex = "1000"

      // Show the dropdown
      dropdownContent.classList.add("active")

      // Focus the search input
      setTimeout(() => {
        dropdownContent.querySelector(".industry-search").focus()
      }, 100)
    })

    // Fix: Add event listener to close dropdown without affecting the section collapse
    dropdownContent.querySelector(".close-dropdown").addEventListener("click", (e) => {
      e.stopPropagation() // Prevent event from bubbling up to section
      dropdownContent.classList.remove("active")
    })

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!dropdownContent.contains(e.target) && e.target !== dropdownTrigger) {
        dropdownContent.classList.remove("active")
      }
    })

    // Add search functionality
    dropdownContent.querySelector(".industry-search").addEventListener("input", (e) => {
      const value = e.target.value.toLowerCase()
      const options = dropdownContent.querySelectorAll(".industry-option")

      options.forEach((option) => {
        const text = option.textContent.toLowerCase()
        option.style.display = text.includes(value) ? "flex" : "none"
      })
    })

    const selectedIndustries = document.createElement("div")
    selectedIndustries.className = "selected-industries"
    selectorContainer.appendChild(dropdownContainer)
    selectorContainer.appendChild(selectedIndustries)

    sectionContent.appendChild(selectorContainer)

    const experienceCardsContainer = document.createElement("div")
    experienceCardsContainer.id = containerId
    experienceCardsContainer.className = "experience-cards-container"
    sectionContent.appendChild(experienceCardsContainer)

    section.appendChild(sectionContent)

    // Add empty state message by default
    const emptyState = document.createElement("div")
    emptyState.className = "empty-state"
    emptyState.innerHTML = `
    <i class="fas fa-info-circle"></i>
    <p>No industries selected. Choose industries from the dropdown above.</p>
  `
    experienceCardsContainer.appendChild(emptyState)

    // Make the entire section clickable to toggle collapse
    toggleBtn.addEventListener("click", (e) => {
      e.stopPropagation() // Prevent event from bubbling
      const content = section.querySelector(".section-content")
      content.classList.toggle("collapsed")
      const icon = toggleBtn.querySelector("i")
      icon.classList.toggle("fa-chevron-up")
      icon.classList.toggle("fa-chevron-down")
    })

    // Modify section click behavior to only toggle when clicking on the header
    sectionHeader.addEventListener("click", (e) => {
      // Prevent this from triggering when clicking on the toggle button
      if (e.target === toggleBtn || e.target.closest(".toggle-section")) {
        return
      }

      const content = section.querySelector(".section-content")
      content.classList.toggle("collapsed")
      const icon = toggleBtn.querySelector("i")
      icon.classList.toggle("fa-chevron-up")
      icon.classList.toggle("fa-chevron-down")
    })

    return section
  }

  // Modify the updateCardsLayout function to handle the empty state message
  let updateCardsLayout = (container) => {
    const cards = Array.from(container.querySelectorAll(".experience-card"))

    // Clear existing layout classes
    cards.forEach((card) => {
      card.classList.remove("left-column", "right-column")
    })

    // Apply new layout classes
    cards.forEach((card, index) => {
      card.classList.add(index % 2 === 0 ? "left-column" : "right-column")
    })

    // Show empty state if no cards
    if (cards.length === 0) {
      if (!container.querySelector(".empty-state")) {
        const emptyState = document.createElement("div")
        emptyState.className = "empty-state"
        emptyState.innerHTML = `
          <i class="fas fa-info-circle"></i>
          <p>No industries selected. Choose industries from the dropdown above.</p>
        `
        container.appendChild(emptyState)
      }
    } else {
      const emptyState = container.querySelector(".empty-state")
      if (emptyState) emptyState.remove()
    }
  }

  function initIndustryExperienceCard(containerId, experienceLevels) {
    const container = document.getElementById(containerId)
    const parentSection = container.closest(".experience-section")
    const dropdownTrigger = parentSection.querySelector(".dropdown-trigger")
    const dropdownContent = document.querySelector(`.dropdown-content[data-container-id="${containerId}"]`)
    const optionsList = dropdownContent.querySelector(".options-list")
    const selectedIndustries = parentSection.querySelector(".selected-industries")

    // Clear existing options
    optionsList.innerHTML = ""

    // Add "Select All" option
    const selectAllOption = document.createElement("div")
    selectAllOption.className = "industry-option select-all"

    const selectAllCheckbox = document.createElement("input")
    selectAllCheckbox.type = "checkbox"
    selectAllCheckbox.id = `${containerId}-select-all`

    const selectAllLabel = document.createElement("label")
    selectAllLabel.htmlFor = selectAllCheckbox.id
    selectAllLabel.textContent = "Select All"

    selectAllCheckbox.addEventListener("change", () => {
      const allCheckboxes = optionsList.querySelectorAll("input[type='checkbox']:not(#" + selectAllCheckbox.id + ")")
      allCheckboxes.forEach((checkbox) => {
        if (checkbox.checked !== selectAllCheckbox.checked) {
          checkbox.checked = selectAllCheckbox.checked
          updateIndustrySelection(containerId, checkbox.value, checkbox.checked, experienceLevels)
        }
      })
      updateSelectedIndustriesDisplay(selectedIndustries, containerId)
      updateDropdownTriggerText(dropdownTrigger, optionsList)
    })

    selectAllOption.appendChild(selectAllCheckbox)
    selectAllOption.appendChild(selectAllLabel)
    optionsList.appendChild(selectAllOption)

    // Add industry options
    industryData.forEach((industry) => {
      const option = document.createElement("div")
      option.className = "industry-option"

      const checkbox = document.createElement("input")
      checkbox.type = "checkbox"
      checkbox.id = `${containerId}-${industry.replace(/\s+/g, "-")}`
      checkbox.value = industry

      const label = document.createElement("label")
      label.htmlFor = checkbox.id
      label.textContent = industry

      checkbox.addEventListener("change", () => {
        updateIndustrySelection(containerId, industry, checkbox.checked, experienceLevels)
        updateSelectedIndustriesDisplay(selectedIndustries, containerId)
        updateDropdownTriggerText(dropdownTrigger, optionsList)

        // Update "Select All" checkbox state
        const allCheckboxes = optionsList.querySelectorAll(".industry-option:not(.select-all) input[type='checkbox']")
        const checkedCount = Array.from(allCheckboxes).filter((cb) => cb.checked).length

        selectAllCheckbox.checked = checkedCount === allCheckboxes.length
        selectAllCheckbox.indeterminate = checkedCount > 0 && checkedCount < allCheckboxes.length
      })

      option.appendChild(checkbox)
      option.appendChild(label)
      optionsList.appendChild(option)
    })
  }

  // Add a new function to update the dropdown trigger text
  function updateDropdownTriggerText(trigger, optionsList) {
    const checkedOptions = optionsList.querySelectorAll(
      ".industry-option:not(.select-all) input[type='checkbox']:checked",
    )
    const triggerText = trigger.querySelector(".trigger-text")

    if (checkedOptions.length === 0) {
      triggerText.textContent = "Choose industries"
    } else if (checkedOptions.length === 1) {
      triggerText.textContent = checkedOptions[0].value
    } else {
      triggerText.textContent = `${checkedOptions.length} industries selected`
    }
  }

  // Find the updateIndustrySelection function and modify it to remove the immediate validation
  function updateIndustrySelection(containerId, industry, isSelected, experienceLevels) {
    const container = document.getElementById(containerId)
    const isManagerial = containerId.includes("managerial")

    if (isSelected) {
      // Create experience card
      const card = document.createElement("div")
      card.className = "experience-card"
      card.dataset.industry = industry

      card.innerHTML = `
      <div class="card-header">
        <h4 class="industry-title">${industry}</h4>
      </div>
      <div class="card-body">
        ${experienceLevels
          .map(
            (exp) => `
          <div class="experience-option">
            <input type="radio" 
                   id="${containerId}-${industry.replace(/\s+/g, "-")}-${exp.level.replace(/\s+/g, "-")}"
                   name="${containerId}-${industry.replace(/\s+/g, "-")}"
                   value="${exp.level}">
            <label for="${containerId}-${industry.replace(/\s+/g, "-")}-${exp.level.replace(/\s+/g, "-")}">
              ${exp.level}
            </label>
          </div>
        `,
          )
          .join("")}
      </div>
    `

      card.querySelectorAll('input[type="radio"]').forEach((radio) => {
        radio.addEventListener("change", () => {
          // Update the appropriate section of formData based on containerId
          if (isManagerial) {
            formData.industryExperience.managerial[industry] = radio.value
          } else {
            formData.industryExperience.rankFile[industry] = radio.value
          }
          console.log(`Updated ${isManagerial ? "Managerial" : "Rank File"} experience for ${industry}: ${radio.value}`)
          console.log("Current formData:", formData)

          // Remove error highlighting when experience is selected
          card.style.border = ""
        })
      })

      container.appendChild(card)

      // Don't highlight the card or show error message immediately
      // Let validation happen only when submit button is pressed
    } else {
      // Remove card and clear data
      const card = container.querySelector(`[data-industry="${industry}"]`)
      if (card) {
        card.remove()
        // Remove from formData
        if (isManagerial) {
          delete formData.industryExperience.managerial[industry]
        } else {
          delete formData.industryExperience.rankFile[industry]
        }
      }
    }

    // Update card layout
    updateCardsLayout(container)
  }

  // Find the validateIndustryExperience function and replace it with this improved version
  function validateIndustryExperience() {
    const errorElement = document.getElementById("industry-experience-error")

    // Check if at least one industry is selected in the dropdown
    const rankFileContainer = document.getElementById("rank-file-experience")
    const managerialContainer = document.getElementById("managerial-experience")

    const rankFileCards = rankFileContainer ? rankFileContainer.querySelectorAll(".experience-card") : []
    const managerialCards = managerialContainer ? managerialContainer.querySelectorAll(".experience-card") : []

    // If no industries are selected at all (no cards present)
    if (rankFileCards.length === 0 && managerialCards.length === 0) {
      if (errorElement) {
        errorElement.textContent = "Please select at least one industry."
        errorElement.classList.remove("hidden")
      }
      return false
    }

    // Check if experience is selected for each industry
    let missingExperience = false

    // Check rank file industries
    rankFileCards.forEach((card) => {
      const radioChecked = card.querySelector('input[type="radio"]:checked')
      if (!radioChecked) {
        missingExperience = true
        // Highlight the card that needs attention
        card.style.border = "2px solid #ef4444"
      } else {
        card.style.border = ""
      }
    })

    // Check managerial industries
    managerialCards.forEach((card) => {
      const radioChecked = card.querySelector('input[type="radio"]:checked')
      if (!radioChecked) {
        missingExperience = true
        // Highlight the card that needs attention
        card.style.border = "2px solid #ef4444"
      } else {
        card.style.border = ""
      }
    })

    if (missingExperience) {
      if (errorElement) {
        errorElement.textContent = "Please select experience level for each selected industry."
        errorElement.classList.remove("hidden")
      }
      return false
    } else {
      if (errorElement) {
        errorElement.classList.add("hidden")
      }
      return true
    }
  }

  updateCardsLayout = (container) => {
    const cards = Array.from(container.children)

    // Clear existing layout classes
    cards.forEach((card) => {
      card.classList.remove("left-column", "right-column")
    })

    // Apply new layout classes
    cards.forEach((card, index) => {
      card.classList.add(index % 2 === 0 ? "left-column" : "right-column")
    })

    // Show empty state if no cards
    if (cards.length === 0) {
      if (!container.querySelector(".empty-state")) {
        const emptyState = document.createElement("div")
        emptyState.className = "empty-state"
        emptyState.innerHTML = `
          <i class="fas fa-info-circle"></i>
          <p>No industries selected. Choose industries from the dropdown above.</p>
        `
        container.appendChild(emptyState)
      }
    } else {
      const emptyState = container.querySelector(".empty-state")
      if (emptyState) emptyState.remove()
    }
  }

  function updateSelectedIndustriesDisplay(container, containerId) {
    // Get all checked industries
    const parentSection = container.closest(".experience-section")
    const checkboxes = parentSection.querySelectorAll(
      ".industry-option:not(.select-all) input[type='checkbox']:checked",
    )

    // Clear current badges
    container.innerHTML = ""

    // Add count indicator if many industries
    if (checkboxes.length > 0) {
      const countBadge = document.createElement("div")
      countBadge.className = "industry-count"
      countBadge.textContent = `${checkboxes.length} selected`
      container.appendChild(countBadge)
    }

    // Add badges for each industry (limited to first 3)
    const displayLimit = 3
    Array.from(checkboxes)
      .slice(0, displayLimit)
      .forEach((checkbox) => {
        const industry = checkbox.value
        const badge = document.createElement("div")
        badge.className = "industry-badge"

        badge.innerHTML = `
        ${industry}
        <button title="Remove ${industry}">
          <i class="fas fa-times"></i>
        </button>
      `

        badge.querySelector("button").addEventListener("click", () => {
          checkbox.checked = false
          checkbox.dispatchEvent(new Event("change"))
        })

        container.appendChild(badge)
      })

    // Add "more" indicator if needed
    if (checkboxes.length > displayLimit) {
      const moreBadge = document.createElement("div")
      moreBadge.className = "industry-badge more"
      moreBadge.textContent = `+${checkboxes.length - displayLimit} more`
      container.appendChild(moreBadge)
    }
  }

  //education Options
  function initializeEducationOptions() {
    const educationContainer = document.getElementById("education-options")
    educationContainer.innerHTML = ""

    let activeCategory = null // Track the currently active category

    // Create a category for each education level
    educationData.forEach((education, index) => {
      const categoryDiv = document.createElement("div")
      categoryDiv.className = "category"
      categoryDiv.dataset.category = education.level

      const categoryTitle = document.createElement("h3")
      categoryTitle.className = "category-title"
      categoryTitle.textContent = education.level

      const categoryItems = document.createElement("div")
      categoryItems.className = "education-items"

      // Create fields of study options with checkboxes in a grid
      const fieldsGrid = document.createElement("div")
      fieldsGrid.className = "education-grid"

      // Add checkboxes for each field
      education.fields.forEach((field, fieldIndex) => {
        const checkboxItem = document.createElement("div")
        checkboxItem.className = "checkbox-item"

        const input = document.createElement("input")
        input.type = "checkbox"
        input.id = `field-${index}-${fieldIndex}`
        input.name = `education-field-${index}`
        input.value = field

        const label = document.createElement("label")
        label.htmlFor = `field-${index}-${fieldIndex}`
        label.textContent = field

        // Update formData when field is selected
        input.addEventListener("change", () => {
          if (!formData.educationFields) {
            formData.educationFields = []
          }

          if (input.checked) {
            // Add field to selected fields if not already there
            if (!formData.educationFields.includes(field)) {
              formData.educationFields.push(field)
            }

            // Show custom input field if "Other" is selected
            if (field === "Other") {
              const otherInputContainer = categoryDiv.querySelector('.other-input-container')
              if (otherInputContainer) {
                otherInputContainer.classList.remove('hidden')
              }
            }
          } else {
            // Remove field from selected fields
            formData.educationFields = formData.educationFields.filter((f) => f !== field)

            // Hide custom input field if "Other" is unselected
            if (field === "Other") {
              const otherInputContainer = categoryDiv.querySelector('.other-input-container')
              if (otherInputContainer) {
                otherInputContainer.classList.add('hidden')
                otherInputContainer.querySelector('input').value = ''
                if (formData.otherEducationField) {
                  delete formData.otherEducationField
                }
              }
            }
          }
        })

        checkboxItem.appendChild(input)
        checkboxItem.appendChild(label)
        fieldsGrid.appendChild(checkboxItem)
      })

      categoryItems.appendChild(fieldsGrid)

      // Add custom input field for "Other" option (initially hidden)
      const otherInputContainer = document.createElement("div")
      otherInputContainer.className = "other-input-container hidden"
      otherInputContainer.innerHTML = `
        <label for="other-field-${index}">Please specify your field of study:</label>
        <input type="text" id="other-field-${index}" class="other-field-input" placeholder="Enter your field of study">
      `

      // Add event listener to update formData when the custom field changes
      const otherInput = otherInputContainer.querySelector('input')
      otherInput.addEventListener('input', (e) => {
        formData.otherEducationField = e.target.value
      })

      categoryItems.appendChild(otherInputContainer)

      // Add a hidden radio button for the education level
      const hiddenRadio = document.createElement("input")
      hiddenRadio.type = "radio"
      hiddenRadio.id = `education-${index}`
      hiddenRadio.name = "education"
      hiddenRadio.value = education.level
      hiddenRadio.style.display = "none" // Hide the radio button
      categoryItems.appendChild(hiddenRadio)

      // Toggle functionality ensuring only one stays open
      categoryTitle.addEventListener("click", () => {
        if (activeCategory && activeCategory !== categoryDiv) {
          // Collapse the previously active category
          activeCategory.classList.remove("active")

          // Uncheck all checkboxes in the previously active category
          activeCategory.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
            checkbox.checked = false
          })

          // Hide any visible "Other" input fields
          const otherContainer = activeCategory.querySelector('.other-input-container')
          if (otherContainer) {
            otherContainer.classList.add('hidden')
            otherContainer.querySelector('input').value = ''
          }

          // Clear other education field data
          if (formData.otherEducationField) {
            delete formData.otherEducationField
          }
        }

        categoryDiv.classList.toggle("active")
        activeCategory = categoryDiv.classList.contains("active") ? categoryDiv : null

        // If this category is now active, select this education level
        if (categoryDiv.classList.contains("active")) {
          // Check the hidden radio button
          hiddenRadio.checked = true

          // Update formData
          formData.education = education.level
          formData.educationPoints = education.points

          // Reset educationFields array
          formData.educationFields = []
        }
      })

      categoryDiv.appendChild(categoryTitle)
      categoryDiv.appendChild(categoryItems)

      educationContainer.appendChild(categoryDiv)
    })
  }
})

