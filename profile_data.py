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
            "Architected a modular monolith support platform with a three-path LLM reasoning pipeline (Path A: direct log-based diagnosis, Path B: hybrid BM25 + ChromaDB RAG with cross-encoder reranking, Path C: dynamic guided questioning), reducing average issue resolution time by approximately 50%.",
            "Built an entity-cache validation layer that verifies all charger IDs and wallet balances against live API responses before LLM injection, structurally preventing hallucination in a safety-critical environment.",
            "Delivered fuzzy charger name resolution (exact, partial, fuzzy, location-based) and real-time SSE streaming for operator dashboards; new support staff handle complex charger faults independently from day one.",
            "Designed a conversational analytics agent for 6,000+ EV station owners using LLM tool-calling over a registry of 15-20 parameterised PostgreSQL query functions, making cross-account data access structurally impossible at the DB layer.",
            "Implemented Redis caching, nightly batch pre-aggregation, circuit breakers for LLM outages, per-owner rate limiting, and prompt regression tests that block deployments when accuracy falls below 95%, serving 1,700+ daily active users.",
            "Built a nightly two-level ML pricing pipeline with network-wide demand forecasting (XGBoost, Random Forest, Facebook Prophet with auto best-model selection) and per-charger pricing using an activity classifier + log-space energy regressor, delivering ~10% revenue uplift.",
            "Built a monthly churn detection system with energy-drop threshold segmentation (10 kWh), lifecycle clustering across 5 tiers tracking 5-month trajectories, and a proactive calling console for customer care teams.",
            "Designed a nightly AWS Glue + S3 Parquet + Athena serverless ETL pipeline extracting EV transactions from MongoDB, transforming with PySpark, which reduced cloud query costs by 95% and speed up data processing by 30%.",
            "Built gap-based uptime/downtime monitoring from MongoDB machine logs, handling AC/DC schema divergence and contributing to approximately 20% reduction in operational downtime."
        ]
    },
    {
        "role": "Data Science Intern",
        "company": "ChargeMOD",
        "period": "Mar 2024 – May 2024",
        "duration": "3 Months",
        "is_current": False,
        "description": [
            "Developed an EV Assistant Chatbot using OpenAI function calling, embedding-based retrieval, dynamic entity extraction, and real-time SSE streaming for route optimisation and live charger discovery."
        ]
    },
    {
        "role": "RPA Data Analyst",
        "company": "Software Incubator Pvt. Ltd.",
        "period": "Jun 2022 – May 2024",
        "duration": "2 Years",
        "is_current": False,
        "description": [
            "Automated document extraction and data processing workflows using JavaScript, Puppeteer, and Kofax.",
            "Built browser automation pipelines for structured web scraping and data indexing into MySQL databases."
        ]
    }
]

SKILLS = {
    "Languages & Databases": [
        "Python", "Java", "SQL", "PostgreSQL", "MongoDB", "Redis", "MySQL"
    ],
    "AI & LLMs": [
        "LLM Tool Calling", "RAG (BM25 + ChromaDB + Cross-Encoder Reranking)", "OpenAI API", 
        "LangChain", "LangGraph", "Prompt Engineering", "Function Calling", "SSE Streaming", 
        "Generative AI", "Agentic Systems"
    ],
    "Machine Learning": [
        "Scikit-learn", "XGBoost", "Random Forest", "Facebook Prophet", "TensorFlow", 
        "PyTorch", "Keras", "NLP", "Computer Vision", "Time-Series Forecasting", 
        "Clustering (KMeans)", "Feature Engineering"
    ],
    "Cloud & Data Engineering": [
        "AWS (S3, Glue, Athena, EC2)", "ETL Pipelines", "PySpark", "Parquet", 
        "Apache Spark", "Serverless Architecture", "Power BI", "FastAPI", "Flask", "REST APIs"
    ],
    "MLOps & DevOps": [
        "Docker", "Git", "Model Versioning", "Regression Testing", "Circuit Breakers", 
        "Rate Limiting", "Redis Caching", "Observability & Tracing", "CI/CD Deployment Gates"
    ],
    "AI Safety & Security": [
        "Anti-Hallucination (Entity Cache)", "Role-Based Access Control", 
        "Cross-Account Isolation", "Per-Owner Rate Limiting", "Prompt Regression Testing"
    ]
}

PROJECTS = [
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
