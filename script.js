document.addEventListener("DOMContentLoaded", () => {
  // Google Sheet submission URL - Replace with your own Google Apps Script Web App URL
  const GOOGLE_SHEET_URL ="https://script.google.com/macros/s/AKfycbxbhqcawxfAw42shJxYFwv7vIgbTMnpvj37x4dybpxkwInuUAmxwtFfjYLpU5tA8Xbb/exec"

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
    "IT & Security": [
      "IT Infrastructure Management",
      "Cybersecurity",
      "Threat Detection",
      "Compliance & Risk Management",
      "Network & Security Management",
      "Server Maintenance",
      "IT Troubleshooting & System Maintenance",
      "LinkedIn Profile Management",
      "Technical Documentation & Support",
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
      "Programming Languages (Python, Java, C#)",
      "Version Control (Git, GitHub)",
      "Process Mapping Tools (Bizagi, Microsoft Visio)",
    ],
    "IT & Security": [
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
    "Business Development Manager": ["Lead Generation Strategy","Sales Pipeline Management","B2B Sales & Negotiation"],
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
    "Researcher": ["Market Research", "Data Collection"],
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
    "Learning and Development Coordinator": ["Training Program Development","Performance Evaluation","Project Management"],
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
    "Quality Assurance Analyst": ["QA Software (Call Listening Tools, QA Scorecards)","Google Sheets/Excel (Pivot Tables, Data Validation)"],
    "Sales Performance and QA Coordinator": ["Sales Analytics Tools (HubSpot, Gong.io)","Performance Tracking Software (Power BI, Salesforce Analytics)"],
    "HR/Finance": ["Payroll Systems (ADP, QuickBooks)", "HRIS (BambooHR, Workday)"],
    "HR/Admin Specialist": ["RMS (SAP SuccessFactors, Workday)","Document Management Systems (Google Drive, SharePoint)"],
    "HR/Admin Manager": ["Compliance Software (HRIS, OSHA Compliance Tools)", "ATS (Greenhouse, Lever)"],
    "HR/Admin and Finance Director": ["ERP Systems", "Financial Planning Software (NetSuite, QuickBooks)"],
    "Finance Associate": ["Accounting Software (Xero, QuickBooks)", "Excel (Financial Modeling, Macros)"],
    "Finance Manager (Coordinator)": ["Budgeting Tools (SAP, NetSuite)","Financial Reporting Software (Power BI, Tableau)"],
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
    "Quality Assurance Analyst (SEO)": ["A/B Testing Tools (Google Optimize, VWO)","SEO Audit Tools (SEMrush, Ahrefs)"],
    "Sales Development Representative": ["CRM (Salesforce, HubSpot)", "Dialer Software (Five9, Aircall)"],
    "Social Media Marketer": ["Social Listening Tools (Brandwatch, Sprout Social)","Content Scheduling Tools (Buffer, Later)"],
    "Database Coordinator": ["Database Management (MySQL, PostgreSQL)", "Data Processing (Excel, Google Sheets)"],
    "Researcher": ["Market Research Platforms (Statista, IBISWorld)", "Survey Tools (Google Forms, Typeform)"],
    "Data Analyst": ["Data Visualization Tools (Power BI, Tableau)", "SQL (Intermediate Queries)"],
    "Data Profiler": ["Database Cleaning Tools (OpenRefine, Trifacta)", "CRM Enrichment (Clearbit, ZoomInfo)"],
    "Digital Marketing Manager": ["PPC Tools (Google Ads, Facebook Ads Manager)","Marketing Analytics (Google Data Studio, HubSpot)"],
    "Email Marketing Specialist/Associate": ["Email Platforms (Mailchimp, Klaviyo)","A/B Testing Software (Litmus, Optimizely)"],
    "Digital Designer": ["UI/UX Design Tools (Figma, Adobe XD)", "HTML/CSS (Basic for Web Design)"],
    "Content Writer": ["CMS (WordPress, Ghost)", "Copywriting Tools (Grammarly, Hemingway Editor)"],
    "LinkedIn Champion": ["LinkedIn Sales Navigator", "LinkedIn Analytics"],
    "Recruitment Coordinator": ["ATS", "LinkedIn Recruiter"],
    "Recruitment Associate": ["Job Boards", "ATS"],
    "Recruitment Branding Specialist": ["Social Media Ads (Meta Business Suite, LinkedIn Ads)","Design Software","Job Boards"],
    "Recruitment Database Specialist": ["Applicant Database Management (Google Sheets, SQL)", "ATS"],
    "Learning and Development Coordinator": ["LMS Platforms (Moodle, TalentLMS)","E-learning Tools (Articulate, Captivate)"],
    "Production Specialist": ["Video Editing Software (Adobe Premiere Pro, Camtasia)","Audio Recording Tools (Audacity, GarageBand)"],
    "Project Manager": ["Project Management Tools (Trello, Jira)", "Risk Assessment Software (Lucidchart, Asana)"],
    "Software Developer": ["Programming Languages (Python, Java, C#)", "Version Control (Git, GitHub)"],
    "Business Process Manager": ["Process Mapping Tools (Bizagi, Microsoft Visio)", "ERP Systems"],
    "IT Manager": ["ITSM Tools (ServiceNow, Freshservice)", "Cloud Management (AWS, Azure)"],
    "IT Security Manager": ["SIEM Tools (Splunk, IBM QRadar)", "Endpoint Security (CrowdStrike, Symantec)"],
    "Network Administrator": ["Network Monitoring (Wireshark, Nagios)", "Firewall Configurations (Cisco, Fortinet)"],
    "Tech Support": ["Help Desk Software (Zendesk, Freshdesk)", "Remote Desktop Tools (TeamViewer, AnyDesk)"],
    "Non-Voice Tech Support": ["Ticketing Systems (Jira Service Desk, Zoho Desk)","Knowledge Base Software (Confluence, Notion)"],
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
    Researcher: {
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
      industries: ["IT & Security", "Financial Services"],
    },
    "Network Administrator": {
      industries: ["IT & Security", "Telecommunications"],
    },
    "Tech Support": {
      industries: ["IT & Security", "Call Center / BPO"],
    },
    "Non-Voice Tech Support": {
      industries: ["IT & Security", "Retail & E-commerce"],
    },
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
    industry: document.getElementById("industry-tab"),
    experience: document.getElementById("experience-tab"),
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
    industry: {},
  }

  // Results data
  let resultsData = []

  // Current tab index
  let currentTabIndex = 0
  const tabNames = ["applicant", "education", "qualifications", "technical", "industry", "experience"]

  // Initialize form elements
  initializeEducationOptions()
  initializeQualifications()
  initializeTechnicalSkills()
  initializeIndustryOptions()
  initializeExperienceOptions()

  // Event Listeners
  buttons.startAssessment.addEventListener("click", startAssessment)
  buttons.prev.addEventListener("click", goToPrevTab)
  buttons.next.addEventListener("click", goToNextTab)
  buttons.submit.addEventListener("click", submitAssessment)
  buttons.newAssessment.addEventListener("click", startNewAssessment)

  tabTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const tabName = trigger.getAttribute("data-tab")
      switchTab(tabName)
    })
  })

  // Functions
  function startAssessment() {
    showView("assessment")
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
      industry: {},
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
  }

  function showView(viewName) {
    Object.keys(views).forEach((key) => {
      views[key].classList.add("hidden")
    })
    views[viewName].classList.remove("hidden")
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
        switchTab(tabNames[currentTabIndex + 1])
      }
    }
  }

  function goToPrevTab() {
    if (currentTabIndex > 0) {
      switchTab(tabNames[currentTabIndex - 1])
    }
  }

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
          errorElement.classList.remove("hidden")
          isValid = false
        } else {
          errorElement.classList.add("hidden")
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
          errorElement.classList.remove("hidden")
          isValid = false
        } else {
          errorElement.classList.add("hidden")
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
          errorElement.classList.remove("hidden")
          isValid = false
        } else {
          errorElement.classList.add("hidden")
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
          errorElement.classList.remove("hidden")
          isValid = false
        } else {
          errorElement.classList.add("hidden")
        }
        break

      case "industry":
        const industryCheckboxes = document.querySelectorAll('input[name^="industry-"]')
        let industrySelected = false

        industryCheckboxes.forEach((checkbox) => {
          const industry = checkbox.value
          formData.industry[industry] = checkbox.checked
          if (checkbox.checked) {
            industrySelected = true
          }
        })

        if (!industrySelected) {
          errorElement.classList.remove("hidden")
          isValid = false
        } else {
          errorElement.classList.add("hidden")
        }
        break

      case "experience":
        const experienceRadios = document.querySelectorAll('input[name="experience"]')
        let experienceSelected = false

        experienceRadios.forEach((radio) => {
          if (radio.checked) {
            formData.experience = radio.value
            experienceSelected = true
          }
        })

        if (!experienceSelected) {
          errorElement.classList.remove("hidden")
          isValid = false
        } else {
          errorElement.classList.add("hidden")
        }
        break
    }

    return isValid
  }

  function submitAssessment() {
    if (validateCurrentTab()) {
      showView("loading")

      // Calculate matches
      const matches = calculateRoleMatches()
      resultsData = matches

      // Submit to Google Sheets
      submitToGoogleSheet(matches)
    }
  }

  function calculateRoleMatches() {
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
          if (formData.industry[ind]) {
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

      // Add education points if available
      if (formData.education) {
        const educationInfo = educationData.find((edu) => edu.level === formData.education)
        if (educationInfo) {
          result.rawScore += educationInfo.points
          result.educationPoints = educationInfo.points
        }
      }

      // Add experience points if available
      if (formData.experience) {
        // Check if it's managerial experience
        const isManagerial = formData.experience.startsWith("Managerial:")

        if (isManagerial) {
          const expLevel = formData.experience.replace("Managerial:", "").trim()
          const managerialInfo = managerialExp.find((exp) => exp.level === expLevel)
          if (managerialInfo) {
            result.rawScore += managerialInfo.points
            result.experiencePoints = managerialInfo.points
          }
        } else {
          const experienceInfo = experienceData.find((exp) => exp.level === formData.experience)
          if (experienceInfo) {
            result.rawScore += experienceInfo.points
            result.experiencePoints = experienceInfo.points
          }
        }
      }

      return result
    })

    // Check if applicant has managerial experience
    const hasManagerialExperience = formData.experience && formData.experience.startsWith("Managerial:")
    const isRankAndFile = formData.experience && !formData.experience.startsWith("Managerial:")

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
    } else if (isRankAndFile) {
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

      // Second pass: adjust if total doesn’t equal 100%
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

  function submitToGoogleSheet(matches) {
    // Show loading message
    document.getElementById("submission-status").textContent = "Saving results to Google Sheets..."
    document.getElementById("submission-status").classList.remove("hidden")

    // Prepare data for Google Sheets
    const timestamp = new Date().toISOString()
    const selectedQualifications = Object.keys(formData.qualifications)
      .filter((q) => formData.qualifications[q])
      .join(", ")
    const selectedTechnical = Object.keys(formData.technical)
      .filter((t) => formData.technical[t])
      .join(", ")
    const selectedIndustries = Object.keys(formData.industry)
      .filter((i) => formData.industry[i])
      .join(", ")

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
      education_fields: formData.educationFields ? formData.educationFields.join(", ") : "",
      experience: formData.experience,
      qualifications: selectedQualifications,
      technical: selectedTechnical,
      industries: selectedIndustries,
      role1: role1 ? role1.role : "None",
      role1_raw_score: role1 ? role1.rawScore : 0,
      role1_normalized_score: role1 ? role1.normalizedScore + "%" : "0%",
      role1_is_managerial: role1 ? (role1.isManagerial ? "Yes" : "No") : "No",
      education_points: role1 ? role1.educationPoints : 0,
      experience_points: role1 ? role1.experiencePoints : 0,
      role2: role2 ? role2.role : "None",
      role2_raw_score: role2 ? role2.rawScore : 0,
      role2_normalized_score: role2 ? role2.normalizedScore + "%" : "0%",
      role2_is_managerial: role2 ? (role2.isManagerial ? "Yes" : "No") : "No",
      role3: role3 ? role3.role : "None",
      role3_raw_score: role3 ? role3.rawScore : 0,
      role3_normalized_score: role3 ? role3.normalizedScore + "%" : "0%",
      role3_is_managerial: role3 ? (role3.isManagerial ? "Yes" : "No") : "No",
    }

    console.log("Sending data to Google Sheets:", data)

    // Use fetch method only (removing the form submission to prevent duplicates)
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
          "Results have been saved to Google Sheets successfully!"

        // Show thank you message instead of detailed results
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
          checkboxItem.style.border = input.checked ? "2px solid #063060" : "2px solid transparent"
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
          checkboxItem.style.border = input.checked ? "2px solid #063060" : "2px solid transparent"
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

  function initializeIndustryOptions() {
    const industryContainer = document.getElementById("industry-container")
    industryContainer.innerHTML = ""

    industryData.forEach((industry) => {
      const checkboxItem = document.createElement("div")
      checkboxItem.className = "checkbox-item"

      checkboxItem.innerHTML = `
                <input type="checkbox" id="industry-${industry}" name="industry-${industry}" value="${industry}">
                <label for="industry-${industry}">${industry}</label>
            `

      industryContainer.appendChild(checkboxItem)
    })
  }

  ///Eperience
  function initializeExperienceOptions() {
    const experienceContainer = document.getElementById("experience-options")
    experienceContainer.innerHTML = ""

    const experienceCategories = {
      "Rank and File": experienceData,
      Managerial: managerialExp,
    }

    let activeCategory = null // Track the currently active category

    Object.entries(experienceCategories).forEach(([categoryName, experiences]) => {
      const categoryDiv = document.createElement("div")
      categoryDiv.className = "category"
      categoryDiv.dataset.category = categoryName

      const categoryTitle = document.createElement("h3")
      categoryTitle.className = "category-title"
      categoryTitle.textContent = categoryName

      const categoryItems = document.createElement("div")
      categoryItems.className = "category-items"

      experiences.forEach((exp, index) => {
        const radioItem = document.createElement("div")
        radioItem.className = "radio-item"

        const input = document.createElement("input")
        input.type = "radio"
        input.id = `experience-${categoryName.toLowerCase().replace(/\s+/g, "-")}-${index}`
        input.name = "experience"
        input.value = categoryName === "Managerial" ? `Managerial:${exp.level}` : exp.level

        const label = document.createElement("label")
        label.htmlFor = input.id
        label.textContent = `${exp.level}`

        // Border change logic for .radio-item
        input.addEventListener("change", () => {
          // Clear 'selected' class from all .radio-item elements
          document.querySelectorAll(".radio-item").forEach((item) => {
            item.classList.remove("selected")
          })

          // Apply 'selected' class to the selected item
          if (input.checked) {
            radioItem.classList.add("selected")

            // Clear selections in the other category
            document
              .querySelectorAll(`.category:not([data-category="${categoryName}"]) input[type="radio"]`)
              .forEach((otherInput) => {
                otherInput.checked = false
                otherInput.parentElement.classList.remove("selected")
              })
          }
        })

        radioItem.appendChild(input)
        radioItem.appendChild(label)
        categoryItems.appendChild(radioItem)
      })

      // Toggle functionality ensuring only one stays open
      categoryTitle.addEventListener("click", () => {
        if (activeCategory && activeCategory !== categoryDiv) {
          activeCategory.classList.remove("active") // Collapse the previously active category
        }
        categoryDiv.classList.toggle("active")
        activeCategory = categoryDiv.classList.contains("active") ? categoryDiv : null
      })

      categoryDiv.appendChild(categoryTitle)
      categoryDiv.appendChild(categoryItems)

      experienceContainer.appendChild(categoryDiv)
    })
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
          } else {
            // Remove field from selected fields
            formData.educationFields = formData.educationFields.filter((f) => f !== field)
          }
        })

        checkboxItem.appendChild(input)
        checkboxItem.appendChild(label)
        fieldsGrid.appendChild(checkboxItem)
      })

      categoryItems.appendChild(fieldsGrid)

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

