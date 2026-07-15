export const experience = [
  {
    when: "May 2025 – Present",
    role: "Data Scientist",
    org: "ChargeMOD",
    duration: "1.3+ Years",
    bullets: [
      "Lead AI and machine learning development, architecting production-grade LLM agents, dynamic demand forecasting networks, and automated serverless ETL data pipelines.",
      "Deploy anti-hallucination guardrails, Redis query caching, and robust security measures structurally preventing cross-account access at the database layer.",
      "Design daily Power BI dashboard streams and automated diagnostic monitoring consoles, cutting cloud costs by 95% and operational downtime by 20%."
    ],
  },
  {
    when: "Mar 2024 – May 2024",
    role: "Data Science Intern",
    org: "ChargeMOD",
    duration: "3 Months",
    bullets: [
      "Developed an EV Assistant Chatbot using OpenAI function calling, embedding-based retrieval, dynamic entity extraction, and real-time SSE streaming — evolved into the production Customer Support AI Agent.",
    ],
  },
  {
    when: "Jun 2022 – May 2024",
    role: "RPA Data Analyst",
    org: "Software Incubator Pvt. Ltd.",
    duration: "2 Years",
    bullets: [
      "Automated document extraction and data processing workflows using JavaScript, Puppeteer, and Kofax; built browser automation pipelines for structured web scraping and data indexing into MySQL databases.",
    ],
  },
];

export const education = [
  {
    when: "2023 – 2025",
    role: "M.Tech in Computer Science",
    org: "Kerala University, Karyavattom",
    bullets: [
      "Specialization: Digital Image Computing.",
      "Thesis: SilentSpeak — Visual Speech Recognition using Deep Learning.",
    ],
  },
  {
    when: "2019 – 2023",
    role: "B.Tech in Computer Science and Engineering",
    org: "University College of Engineering, Karyavattom",
    bullets: [
      "Graduation Project: Fruit Picker Robot using ESP32 & IoT Automation.",
    ],
  },
  {
    when: "2017 – 2019",
    role: "Higher Secondary (Plus Two)",
    org: "Sree Vidhyadhiraja Vidhya Mandir, Vellayambalam",
    bullets: [],
  },
  {
    when: "2016 – 2017",
    role: "SSLC",
    org: "Trinity English & Malayalam Medium School",
    bullets: [],
  },
];

export const publications = [
  {
    when: "2024",
    role: "Machine Learning Models for Gamma-Hadron Separation",
    org: "CREEST International Conference",
    bullets: [
      "Ensemble Gradient Boosting framework for particle classification, achieving 88% accuracy — outperforming SVM (85%), AdaBoost, and Naive Bayes (83%) baselines on telescope sensor datasets.",
    ],
  },
];

export const projects = [
  {
    tag: "AI Engineering",
    title: "Customer Support AI Agent",
    desc: "A support operator chatbot diagnosing and fixing EV charger issues without checking multiple dashboards.",
    impact: "Reduced average support issue resolution time by approximately 50% while allowing new support staff to resolve complex charger faults independently.",
    stack: ["Python", "FastAPI", "ChromaDB", "BM25", "RAG", "Server-Sent Events (SSE)", "LLM Reasoning"],
  },
  {
    tag: "Machine Learning",
    title: "Dynamic Tariff & ML Pricing System",
    desc: "A machine learning pipeline forecasting network demand and automating surge pricing hourly for EV charging stations.",
    impact: "Delivered a 10% average revenue uplift through demand-aware peak-hour load management and eliminated price volatility for low-usage chargers.",
    stack: ["Python", "XGBoost", "Random Forest", "Facebook Prophet", "KMeans", "MongoDB"],
  },
  {
    tag: "Data Engineering",
    title: "Power BI Dashboard & ETL Pipeline",
    desc: "A nightly serverless data pipeline and dashboard extracting EV transaction data from MongoDB to S3 for automated business reporting.",
    impact: "Parquet and date partitioning reduced Athena query costs by 95% and speed up daily refreshes by 30%. Idempotent pipeline design ensures zero duplicates on reruns.",
    stack: ["Python", "PySpark", "AWS Glue", "S3", "Athena", "MongoDB", "Power BI"],
  },
  {
    tag: "Machine Learning",
    title: "Customer Retention & Churn Prediction",
    desc: "A machine learning and analytics system designed to identify and segment at-risk EV charging users for proactive retention campaigns.",
    impact: "Delivered a management Power BI dashboard and a care-team calling outcome console, recovering churned revenue at a fraction of new customer acquisition costs.",
    stack: ["Python", "Scikit-Learn", "KMeans Clustering", "Feature Engineering", "Power BI", "MongoDB"],
  },
  {
    tag: "Operations",
    title: "Maintenance Tab & Outage Monitor",
    desc: "A consolidated diagnostic dashboard and batch pipeline tracking real-time status and daily uptime/downtime of AC and DC EV chargers.",
    impact: "Reduced charger operational downtime by approximately 20% by enabling support staff to diagnose and reset chargers or dispatch technicians instantly each morning.",
    stack: ["Python", "MongoDB", "Data Pipelines", "Uptime Analytics"],
  },
  {
    tag: "Generative AI",
    title: "Client AI Agent (Natural Language Analytics)",
    desc: "A conversational AI agent enabling EV charging station owners to query analytics (energy, health, churn) in natural language.",
    impact: "Served 1,700+ daily active owners across 6,000+ stations with near-zero time-to-insight. Maintained prompt regression tests ensuring >95% accuracy prior to deployment.",
    stack: ["Python", "LangChain", "OpenAI API", "PostgreSQL", "Redis", "LLM Tool Calling"],
  },
  // Existing academic projects
  {
    tag: "M.Tech Dissertation",
    title: "SilentSpeak: Visual Speech Recognition",
    desc: "Audio-free visual speech recognition using 3D-CNN spatiotemporal feature extraction and BiLSTM sequence decoding trained with CTC loss.",
    impact:
      "Achieved Character Error Rate (CER) of 2.95% and Word Error Rate (WER) of 10.11% on the GRID Corpus (33k+ clips, 34 speakers).",
    stack: ["Python", "TensorFlow", "Keras", "3D-CNN", "BiLSTM", "CTC Loss", "OpenCV"],
  },
  {
    tag: "CREEST Publication",
    title: "ML Methods for Gamma-Ray Classification",
    desc: "Performance comparison of ML algorithms for classifying gamma-ray signals vs. hadronic background using the MAGIC Gamma Telescope dataset.",
    impact:
      "Gradient Boosting reached 88% accuracy — outperforming SVM (85%) and Naive Bayes (83%). Published at CREEST International Conference.",
    stack: ["Python", "Scikit-Learn", "Pandas", "NumPy", "SVM", "Gradient Boosting", "AdaBoost"],
  },
  {
    tag: "Academic Project",
    title: "Fashion MNIST ANN Classifier",
    desc: "Multi-layer feedforward ANN with dropout regularization and softmax output for garment image classification on Fashion MNIST.",
    impact: "Achieved 89% classification accuracy on the test dataset of 10 clothing categories.",
    stack: ["Python", "TensorFlow", "Keras", "ANN"],
  },
  {
    tag: "Image Processing",
    title: "Image-to-Cartoon Generator",
    desc: "Computationally efficient image-to-cartoon converter that bypasses GAN complexity using median filtering + Canny edge detection + custom color quantization.",
    impact: "Generates high-contrast cartoon images in real-time with zero GPU training cost.",
    stack: ["Python", "OpenCV", "Median Filtering", "Canny Edge Detection"],
  },
  {
    tag: "Robotics / IoT",
    title: "Autonomous Fruit Picker Robot",
    desc: "Automated mobile robot for plantation fields using computer vision object detection, servo arm sorting, and ultrasonic obstacle avoidance.",
    impact: "Successful 24/7 navigation, obstacle avoidance, and delicate object grasping in field simulation.",
    stack: ["C++", "Arduino", "ESP32", "Ultrasonic Sensors", "Servos", "Computer Vision"],
  },
  {
    tag: "Web Graphics",
    title: "3D Robotic Arm Web Application",
    desc: "Interactive browser-based simulation and control for a 3D robotic arm with real-time kinematic calculations.",
    impact: "Smooth interactive browser rendering with collision feedback and joint-angle controls.",
    stack: ["JavaScript", "Three.js", "WebGL", "HTML5", "CSS3"],
  },
];

export const achievements = [
  "Reduced customer issue resolution time by ~50% through a 3-path AI diagnostic pipeline; new support staff handle complex charger faults independently from day one.",
  "Enabled self-service natural-language analytics for 6,000+ EV station owners, reaching 1,700+ daily active users and near-zero time-to-insight.",
  "Cut cloud query costs by ~95% via a Parquet-partitioned AWS ETL pipeline processing 1M+ transactions nightly, with 30% faster data processing.",
  "Generated ~10% revenue uplift through demand-aware ML forecasting and behavioural analytics enabling peak-hour load management.",
  "Reduced DC charger operational downtime by ~20% through automated nightly gap-based downtime detection.",
];

export const skills = [
  { title: "Languages", items: ["Python", "Java", "C", "C++", "JavaScript"] },
  { title: "Databases", items: ["PostgreSQL", "MongoDB", "MySQL", "Redis"] },
  {
    title: "Machine Learning",
    items: [
      "Scikit-learn",
      "XGBoost",
      "Random Forest",
      "Facebook Prophet",
      "TensorFlow",
      "PyTorch",
      "Keras",
      "NLP",
      "Computer Vision",
      "Time-Series Forecasting",
      "Clustering (KMeans)",
      "Feature Engineering",
    ],
  },
  {
    title: "LLMs & AI Systems",
    items: [
      "LLM Tool Calling",
      "RAG (BM25 + ChromaDB + Cross-Encoder)",
      "Prompt Engineering",
      "LangChain",
      "LangGraph",
      "OpenAI API",
      "AWS Bedrock (Claude)",
      "LLaMA / PEFT",
      "Generative AI",
      "Agentic Systems",
    ],
  },
  {
    title: "Analytics & Visualization",
    items: [
      "Power BI",
      "Matplotlib",
      "Seaborn",
      "Statistical Modeling",
      "Time Series Analysis",
      "Forecasting",
      "PySpark",
      "Parquet",
    ],
  },
  {
    title: "Cloud & Data Engineering",
    items: [
      "AWS (S3, EC2, Glue, Athena, Bedrock)",
      "ETL Pipelines",
      "Apache Spark",
      "Serverless Architecture",
      "FastAPI",
      "Flask",
      "REST APIs",
    ],
  },
  {
    title: "MLOps & DevOps",
    items: [
      "Docker",
      "Git",
      "CI/CD Deployment Gates",
      "Model Versioning",
      "Redis Caching",
      "Circuit Breakers",
      "Rate Limiting",
      "Regression Testing",
      "Observability & Tracing",
    ],
  },
];

export const certifications = [
  {
    title: "The Complete Python Bootcamp: From Zero to Hero",
    issuer: "Udemy",
    year: "2022",
    tag: "Programming",
  },
  {
    title: "Data Visualization with Power BI",
    issuer: "Great Learning",
    year: "2023",
    tag: "Analytics",
  },
  {
    title: "AI, Machine Learning & Robotics Bootcamp — Co-lead",
    issuer: "Tella Academy",
    year: "2023",
    tag: "Teaching",
  },
  {
    title: "Smart India Hackathon — Qualified Preliminary Round",
    issuer: "Government of India",
    year: "2022",
    tag: "Recognition",
  },
  {
    title: "Machine Learning Models for Gamma-Hadron Separation",
    issuer: "CREEST International Conference",
    year: "2024",
    tag: "Publication",
  },
];

export const techLogos = [
  { name: "Python", slug: "python", color: "3776ab" },
  { name: "SQL", slug: "postgresql", color: "4169e1" },
  { name: "AWS", slug: "amazonwebservices", color: "ff9900" },
  { name: "MongoDB", slug: "mongodb", color: "47a248" },
  { name: "LangChain", slug: "langchain", color: "1c3c3c" },
  { name: "OpenAI", slug: "openai", color: "412991" },
  { name: "PowerBI", slug: "powerbi", color: "f2c811" },
  { name: "Docker", slug: "docker", color: "2496ed" },
];

export const heroStats = [
  { n: "3+", l1: "Years", l2: "Experience", icon: "calendar" },
  { n: "2", l1: "Years", l2: "RPA Analyst", icon: "users" },
  { n: "1+", l1: "Year", l2: "Data Scientist", icon: "flask" },
  { n: "10+", l1: "Projects", l2: "Delivered", icon: "package" },
  { n: "15%+", l1: "Business Impact", l2: "Delivered", icon: "trending" },
];

export const heroCategories = [
  { title: "AI & Machine Learning", icon: "brain" },
  { title: "Data Science & Analytics", icon: "chart" },
  { title: "Cloud & Data Engineering", icon: "cloud" },
  { title: "AI Agents & Automation", icon: "bot" },
];

export const values = [
  {
    title: "Problem Solver",
    desc: "I enjoy solving complex problems with data, logic and creativity.",
  },
  {
    title: "Tech Enthusiast",
    desc: "Always learning, exploring and building with new technologies.",
  },
  {
    title: "Impact Focused",
    desc: "I build solutions that create measurable value for businesses.",
  },
  {
    title: "Growth Mindset",
    desc: "Every step is a learning and every challenge is an opportunity.",
  },
];
