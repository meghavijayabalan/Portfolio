PROFILE = {
    "name": "Megha Raj V S",
    "title": "Data Scientist & AI Engineer",
    "subtitle": "Specializing in Computer Vision, Deep Learning, and Intelligent Automation",
    "summary": (
        "Data Scientist with 1.3+ years of production experience building LLM-powered AI agents, "
        "multi-path RAG pipelines, and cloud-native ETL systems across a network of 6,000+ EV chargers, "
        "serving 1,700+ daily active users and processing 3.5M+ transactions. Proven track record delivering "
        "anti-hallucination safeguards, role-based access governance, real-time streaming, and ML-driven "
        "pricing in safety-critical, high-throughput environments. Skilled in Python, LangChain, LangGraph, "
        "OpenAI API, AWS, and production-grade MLOps, with a strong record of designing and shipping "
        "reliable, scalable AI systems that drive measurable business impact."
    ),
    "email": "megha042023@gmail.com",
    "phone": "+91 7025654877",
    "location": "Trivandrum, Kerala",
    "github": "https://github.com/megharaj1997",
    "linkedin": "https://www.linkedin.com/in/meghavijayabalan",
}

EXPERIENCE = [
    {
        "role": "Data Scientist",
        "company": "ChargeMOD",
        "period": "May 2025 – Present",
        "duration": "1.3+ Years",
        "is_current": True,
        "description": [
            "Lead AI and machine learning development, architecting production-grade LLM agents, dynamic demand forecasting networks, and automated serverless ETL data pipelines.",
            "Deploy anti-hallucination guardrails, Redis query caching, and robust security measures structurally preventing cross-account access at the database layer.",
            "Design daily Power BI dashboard streams and automated diagnostic monitoring consoles, cutting cloud costs by 95% and operational downtime by 20%."
        ]
    },
    {
        "role": "Data Science Intern",
        "company": "ChargeMOD",
        "period": "Mar 2024 – May 2024",
        "duration": "3 Months",
        "is_current": False,
        "description": [
            "Developed an EV Assistant Chatbot using OpenAI function calling, embedding-based retrieval, dynamic entity extraction, and real-time SSE streaming for route optimisation and live charger discovery; the project evolved into the production Customer Support AI Agent."
        ]
    },
    {
        "role": "RPA Data Analyst",
        "company": "Software Incubator Pvt. Ltd.",
        "period": "Jun 2022 – May 2024",
        "duration": "2 Years",
        "is_current": False,
        "description": [
            "Automated document extraction and data processing workflows using JavaScript, Puppeteer, and Kofax; built browser automation pipelines for structured web scraping and data indexing into MySQL databases."
        ]
    }
]

SKILLS = {
    "Languages": [
        "Python", "Java", "C", "C++", "JavaScript"
    ],
    "Databases": [
        "PostgreSQL", "MongoDB", "MySQL", "Redis"
    ],
    "Machine Learning": [
        "Scikit-learn", "XGBoost", "Random Forest", "Facebook Prophet", "TensorFlow", 
        "PyTorch", "Keras", "NLP", "Computer Vision", "Time-Series Forecasting", 
        "Clustering (KMeans)", "Feature Engineering"
    ],
    "LLMs & AI Systems": [
        "LLM Tool Calling", "RAG (BM25 + ChromaDB + Cross-Encoder Reranking)", "Prompt Engineering", 
        "LangChain", "LangGraph", "OpenAI API", "AWS Bedrock (Claude)", "LLaMA/PEFT", 
        "Generative AI", "Agentic Systems"
    ],
    "Analytics & Visualization": [
        "Power BI", "Matplotlib", "Seaborn", "Statistical Modeling", "Time Series Analysis", 
        "Forecasting", "PySpark", "Parquet"
    ],
    "Cloud & Data Engineering": [
        "AWS (S3, EC2, Glue, Athena, Bedrock)", "ETL Pipelines", "Apache Spark", 
        "Serverless Architecture", "FastAPI", "Flask", "REST APIs"
    ],
    "MLOps & DevOps": [
        "Docker", "Git", "CI/CD Deployment Gates", "Model Versioning", "Redis Caching", 
        "Circuit Breakers", "Rate Limiting", "Regression Testing", "Observability & Tracing"
    ],
    "Leadership & Methods": [
        "Agile/Scrum", "Sprint Planning", "Cross-functional Team Leadership", "Technical Documentation"
    ]
}

PROJECTS = [
    {
        "id": "support-ai-agent",
        "title": "Customer Support AI Agent",
        "category": "Production Project (ChargeMOD)",
        "description": "A support operator chatbot diagnosing and fixing EV charger issues without checking multiple dashboards.",
        "methodology": (
            "Built as a modular monolith with a 3-step LLM reasoning pipeline (direct log-based diagnosis, "
            "hybrid BM25 + ChromaDB RAG, and operator guided questioning). Features an anti-hallucination "
            "validated ID cache and streams responses using Server-Sent Events (SSE)."
        ),
        "dataset": "Operator logs, transaction history, live status API responses, and vector database embeddings.",
        "metrics": "Reduced average support issue resolution time by approximately 50% while allowing new support staff to resolve complex charger faults independently.",
        "tech_stack": ["Python", "FastAPI", "ChromaDB", "BM25", "RAG", "Server-Sent Events (SSE)", "LLM Reasoning"],
        "badge": "AI Engineering"
    },
    {
        "id": "dynamic-tariff",
        "title": "Dynamic Tariff & ML Pricing System",
        "category": "Production Project (ChargeMOD)",
        "description": "A machine learning pipeline forecasting network demand and automating surge pricing hourly for EV charging stations.",
        "methodology": (
            "Performs demand forecasting at two levels: network-wide forecasting (XGBoost, Random Forest, Facebook Prophet) "
            "and per-charger activity forecasting (KMeans clustering, active classifier + active-hour log-space regressor). "
            "Sigmoid mapping scales surge prices within +12% surcharge and -6% discount caps."
        ),
        "dataset": "7-day transaction history and 36-feature charger demand profiles from MongoDB.",
        "metrics": "Delivered a 10% average revenue uplift through demand-aware peak-hour load management and eliminated price volatility for low-usage chargers.",
        "tech_stack": ["Python", "XGBoost", "Random Forest", "Facebook Prophet", "KMeans", "MongoDB"],
        "badge": "Machine Learning"
    },
    {
        "id": "chargemod-powerbi",
        "title": "Power BI Dashboard & ETL Pipeline",
        "category": "Production Project (ChargeMOD)",
        "description": "A nightly serverless data pipeline and dashboard extracting EV transaction data from MongoDB to S3 for automated business reporting.",
        "methodology": (
            "Nightly AWS Glue job extracts records from MongoDB, performs PySpark transformations "
            "(timestamp correction, duplicate removal, joins), and stores clean data in partitioned S3 Parquet formats. "
            "Queries are run via Athena serverless SQL."
        ),
        "dataset": "Millions of real-time EV charging session, energy, and transaction records.",
        "metrics": "Parquet and date partitioning reduced Athena query costs by 95% and speed up daily refreshes by 30%. Idempotent pipeline design ensures zero duplicates on reruns.",
        "tech_stack": ["Python", "PySpark", "AWS Glue", "S3", "Athena", "MongoDB", "Power BI"],
        "badge": "Data Engineering"
    },
    {
        "id": "customer-retention",
        "title": "Customer Retention & Churn Prediction",
        "category": "Production Project (ChargeMOD)",
        "description": "A machine learning and analytics system designed to identify and segment at-risk EV charging users for proactive retention campaigns.",
        "methodology": (
            "Calculates monthly energy differentials to flag users with >10 kWh drops or active-to-inactive state transitions. "
            "Performs KMeans behavioral clustering on 36-feature user profiles to track a 5-month user trajectory."
        ),
        "dataset": "Active user cohort profiles with rolling percentiles adjusting automatically to demand growth.",
        "metrics": "Delivered a management Power BI dashboard and a care-team calling outcome console, recovering churned revenue at a fraction of new customer acquisition costs.",
        "tech_stack": ["Python", "Scikit-Learn", "KMeans Clustering", "Feature Engineering", "Power BI", "MongoDB"],
        "badge": "Machine Learning"
    },
    {
        "id": "maintenance-tab",
        "title": "Maintenance Tab & Outage Monitor",
        "category": "Production Project (ChargeMOD)",
        "description": "A consolidated diagnostic dashboard and batch pipeline tracking real-time status and daily uptime/downtime of AC and DC EV chargers.",
        "methodology": (
            "Runs a nightly Python batch job that pulls machine logs from MongoDB and computes gaps. "
            "Gaps over 15 minutes between consecutive log timestamps are categorized as downtime. "
            "Resolves schema and ID mapping differences between AC and DC chargers."
        ),
        "dataset": "High-frequency machine status log collections from AC and DC charging stations.",
        "metrics": "Reduced charger operational downtime by approximately 20% by enabling support staff to diagnose and reset chargers or dispatch technicians instantly each morning.",
        "tech_stack": ["Python", "MongoDB", "Data Pipelines", "Uptime Analytics"],
        "badge": "Operations"
    },
    {
        "id": "client-ai-agent",
        "title": "Client AI Agent (Natural Language Analytics)",
        "category": "Production Project (ChargeMOD)",
        "description": "A conversational AI agent enabling EV charging station owners to query analytics (energy, health, churn) in natural language.",
        "methodology": (
            "Uses LLM tool-calling to route queries to a registry of 15-20 parameterized PostgreSQL functions. "
            "Session-based owner ID injection prevents cross-account database access. "
            "Features Redis tool-layer caching, pre-aggregation batch jobs, and prompt regression test suites."
        ),
        "dataset": "PostgreSQL structured analytics data registry and prompt evaluation validation datasets.",
        "metrics": "Served 1,700+ daily active owners across 6,000+ stations with near-zero time-to-insight. Maintained prompt regression tests ensuring >95% accuracy prior to deployment.",
        "tech_stack": ["Python", "LangChain", "OpenAI API", "PostgreSQL", "Redis", "LLM Tool Calling"],
        "badge": "Generative AI"
    },
    {
        "id": "sales-ai",
        "title": "SalesAI: Site Feasibility & Proposal Agent",
        "category": "Production Project (ChargeMOD)",
        "description": "An enterprise agentic system conducting site-feasibility assessments and generating branded proposals using multi-agent CrewAI orchestration.",
        "methodology": (
            "Executes a 5-step analysis pipeline: Geolocation parameter extraction, financial model evaluation (payback term & ROI plotting), ChromaDB product spec search, and python-docx proposal compilation."
        ),
        "dataset": "Google Maps Places API, fleet metrics from MongoDB, and regional EV counts in PostgreSQL.",
        "metrics": "Automated the generation of highly accurate 15-page PDF proposals, reducing sales engineering turnaround times from 3 days to under 5 minutes.",
        "tech_stack": ["Python", "CrewAI", "FastAPI", "MongoDB", "PostgreSQL", "ChromaDB", "Matplotlib"],
        "badge": "AI Engineering"
    },
    # Existing academic projects
    {
        "id": "silentspeak",
        "title": "SilentSpeak: Visual Speech Recognition",
        "category": "Academic (M.Tech Dissertation)",
        "description": "Designed an audio-free visual speech recognition system using 3D-CNN spatiotemporal feature extraction and BiLSTM sequence decoding trained with CTC loss.",
        "methodology": (
            "Processes input videos to extract 75 grayscale frames of mouth regions (size 46x140). "
            "Passes the frames through a 3D-CNN layer (three Conv3D layers with 128, 256, and 75 filters) "
            "to extract spatiotemporal lip features, followed by a Bidirectional LSTM to capture temporal "
            "dependencies. Uses Connectionist Temporal Classification (CTC) loss to compute alignment-free training loss."
        ),
        "dataset": "GRID Corpus: Audio-Visual dataset containing over 33,000 video clips of 34 speakers (18 male, 16 female).",
        "metrics": "Achieved a Character Error Rate (CER) of 2.95% and Word Error Rate (WER) of 10.11%.",
        "tech_stack": ["Python", "TensorFlow", "Keras", "3D-CNN", "BiLSTM", "CTC Loss", "OpenCV"],
        "badge": "M.Tech Dissertation"
    },
    {
        "id": "gamma-rays",
        "title": "Comparison of ML Methods for Gamma Rays",
        "category": "Academic Research / Publication",
        "description": "Performance comparison of multiple machine learning algorithms for classifying gamma-ray signals vs. hadronic background using the MAGIC Gamma Telescope dataset.",
        "methodology": (
            "Compares statistical classifiers and tree-based machine learning methods (Decision Trees, "
            "AdaBoost, Gradient Boosting, SVM, and Naive Bayes) on high-energy physics datasets. "
            "Evaluates accuracy, precision-recall, and ROC curves."
        ),
        "dataset": "MAGIC Gamma Telescope Dataset containing 19,020 instances (12,332 gamma signals, 6,688 hadron background events).",
        "metrics": "Gradient Boosting achieved 88% accuracy (outperforming SVM at 85% and Naive Bayes at 83%). Published in CREEST International Conference (“Machine Learning Models for Gamma-Hadron Separation”).",
        "tech_stack": ["Python", "Scikit-Learn", "Pandas", "NumPy", "SVM", "Gradient Boosting", "AdaBoost"],
        "badge": "CREEST Publication"
    },
    {
        "id": "fashion-mnist",
        "title": "Fashion MNIST ANN Classifier",
        "category": "Academic Project",
        "description": "An Artificial Neural Network (ANN) classifier designed for garment image classification on the Fashion MNIST dataset.",
        "methodology": (
            "Built using Keras and TensorFlow. Designed a multi-layer feedforward neural network with dense layers, "
            "dropout regularization for preventing overfitting, and a softmax output layer for classification."
        ),
        "dataset": "Fashion MNIST: 70,000 grayscale images of 10 categories of clothing (60,000 training, 10,000 testing).",
        "metrics": "Achieved a classification accuracy of 89% on the test dataset.",
        "tech_stack": ["Python", "TensorFlow", "Keras", "ANN", "Neural Networks"],
        "badge": "Academic Project"
    },
    {
        "id": "cartoon-generator",
        "title": "Image Processing-based Cartoon Generator",
        "category": "Academic Project",
        "description": "A computationally efficient image-to-cartoon converter that bypasses complex deep learning methods like GANs.",
        "methodology": (
            "Applies a median filter for noise removal, extracts precise outlines using Canny edge detection "
            "followed by dilation. Reduces color complexity by mapping pixel levels to a specific range using "
            "a custom formula: P = [p / (a - b)] * (a + b/2) with optimal parameters a=50 and b=10, then "
            "reconstructs and merges outlines with the quantized image."
        ),
        "dataset": "Custom photographic test images with parameters a=50 and b=10 for balanced cartoon effects.",
        "metrics": "Generates high-contrast cartoon images in real-time with zero GPU training costs.",
        "tech_stack": ["Python", "OpenCV", "Image Processing", "Median Filtering", "Canny Edge Detection"],
        "badge": "Image Processing"
    },
    {
        "id": "fruit-picker",
        "title": "Autonomous Fruit Picker Robot",
        "category": "Academic Project / Robotics",
        "description": "An automated mobile robot capable of navigating plantation fields and harvesting fruits using computer vision-based object detection and robotic arm sorting.",
        "methodology": (
            "Built using an ESP32 WROOM microcontroller. Integrates SG90 servos for arm joints "
            "and an HC-SR04 ultrasonic sensor for obstacle avoidance. Uses a dedicated path-following "
            "algorithm and a custom robotic arm picking sequence."
        ),
        "dataset": "Tested in physical field simulation.",
        "metrics": "Successful 24/7 navigation, obstacle avoidance, and delicate object grasping.",
        "tech_stack": ["C++", "Arduino", "ESP32 WROOM", "Ultrasonic Sensors", "Servos", "Computer Vision", "Robotics"],
        "badge": "Robotics / IoT"
    },
    {
        "id": "robotic-arm-web",
        "title": "3D Robotic Arm Web Application",
        "category": "Academic Project",
        "description": "Interactive browser-based simulation and control for a 3D robotic arm.",
        "methodology": (
            "Uses WebGL rendering to model robotic arm dynamics and kinematics. Users can interactively control "
            "joint angles and simulate movement paths."
        ),
        "dataset": "Real-time kinematic calculations.",
        "metrics": "Smooth interactive browser rendering and collision feedback.",
        "tech_stack": ["JavaScript", "Three.js", "WebGL", "HTML5", "CSS3"],
        "badge": "Web Graphics"
    }
]

EDUCATION = [
    {
        "degree": "M.Tech in Computer Science",
        "specialization": "Digital Image Computing",
        "institution": "Kerala University, Karyavattom",
        "period": "2023 – 2025",
        "cgpa": "8.98",
        "thesis": "SilentSpeak: Visual Speech Recognition using Deep Learning",
    },
    {
        "degree": "B.Tech in Computer Science and Engineering",
        "specialization": None,
        "institution": "University College of Engineering, Karyavattom",
        "period": "2019 – 2023",
        "cgpa": "8.23",
        "project": "Fruit Picker Robot using ESP32 & IoT Automation",
    },
    {
        "degree": "Higher Secondary (Plus Two)",
        "specialization": None,
        "institution": "Sree Vidhyadhiraja Vidhya Mandir, Vellayambalam",
        "period": "2017 – 2019",
        "percentage": "92%",
    },
    {
        "degree": "SSLC",
        "specialization": None,
        "institution": "Trinity English & Malayalam Medium School",
        "period": "2016 – 2017",
        "percentage": "95%",
    }
]

KEY_ACHIEVEMENTS = [
    "Reduced customer issue resolution time by approximately 50% through a 3-path AI diagnostic pipeline; new support staff handle complex charger faults independently from day one.",
    "Enabled self-service natural-language analytics for 6,000+ EV station owners, reaching 1,700+ daily active users and reducing time-to-insight to near-zero.",
    "Cut cloud query costs by approximately 95% via a Parquet-partitioned AWS ETL pipeline processing 1M+ transactions nightly, with 30% faster data processing.",
    "Generated approximately 10% revenue uplift through demand-aware ML forecasting and behavioural analytics enabling peak-hour load management.",
    "Reduced DC charger operational downtime by approximately 20% through automated nightly gap-based downtime detection."
]

PUBLICATIONS = [
    {
        "title": "“Machine Learning Models for Gamma-Hadron Separation”",
        "period": "2024",
        "institution": "CREEST International Conference Publication",
        "description": "Ensemble Gradient Boosting framework for particle classification, achieving 88% accuracy and outperforming SVM (85%), AdaBoost, and Naive Bayes (83%) baselines on telescope sensor datasets.",
        "badge": "Research Pub"
    }
]

CERTIFICATIONS = [
    "The Complete Python Bootcamp: From Zero to Hero (Udemy)",
    "Data Visualization with Power BI (Great Learning)",
    "Co-led an AI, Machine Learning & Robotics Bootcamp at Tella Academy for high school students",
    "Qualified for the Smart India Hackathon preliminary round"
]
