/**
 * Free rule-based knowledge base for the portfolio chatbot.
 * No LLM, no API calls — all client-side pattern matching.
 * Every entry has:
 *   - keywords: list of words/phrases that trigger the answer
 *   - answer: markdown-lite string (\n for line breaks, **bold**)
 *   - suggestions?: follow-up quick-reply chips
 */
export const kb = [
  // ─── Identity / greetings ────────────────────────────────────
  {
    id: "greeting",
    keywords: ["hi", "hello", "hey", "hai", "hola", "namaste", "yo", "greet"],
    answer:
      "Hi there! 👋 I'm Megha's AI assistant. Ask me anything about her skills, projects, experience, education, or how to get in touch.",
    suggestions: ["What are her skills?", "Show me projects", "Contact info"],
  },
  {
    id: "who",
    keywords: [
      "who are you",
      "who is megha",
      "about megha",
      "introduce",
      "her background",
      "bio",
    ],
    answer:
      "Megha Raj V S is a **Data Scientist & AI Engineer** based in Trivandrum, Kerala, with **3+ years of experience** (2 years RPA + 1.3+ years Data Science). She specializes in LLM agents, RAG pipelines, ML forecasting, computer vision, and cloud-scale ETL. She holds an **M.Tech in Computer Science** (CGPA 8.98) from Kerala University with specialization in Digital Image Computing.",
    suggestions: ["Current role?", "Skills", "Education", "Projects"],
  },
  // ─── Contact ────────────────────────────────────────────────
  {
    id: "contact",
    keywords: [
      "contact",
      "reach",
      "get in touch",
      "email",
      "phone",
      "call",
      "hire",
      "connect",
      "message",
    ],
    answer:
      "You can reach Megha via:\n\n• 📧 **Email:** megha042023@gmail.com\n• 📱 **WhatsApp:** +91 7025654877 (tap the floating green button)\n• 💼 **LinkedIn:** linkedin.com/in/meghavijayabalan\n• 🌐 **GitHub:** github.com/megharaj1997\n• 📍 **Location:** Trivandrum, Kerala, India",
    suggestions: ["Send her a message", "Availability?", "WhatsApp"],
  },
  {
    id: "whatsapp",
    keywords: ["whatsapp", "wa", "chat directly", "text her", "sms"],
    answer:
      "Tap the pulsing **green WhatsApp button** at the bottom-right of the page — it opens WhatsApp with a pre-filled message to **+91 7025654877**. She usually replies within a few hours.",
    suggestions: ["Email instead?", "LinkedIn"],
  },
  {
    id: "availability",
    keywords: ["available", "availability", "open to", "looking for", "hiring", "job", "role", "opportunity"],
    answer:
      "Megha is currently a Data Scientist at **ChargeMOD**. She's open to conversations about interesting roles, collaborations, and consulting engagements involving LLMs, ML forecasting, computer vision, or cloud data engineering. Best way to start a conversation — WhatsApp or email.",
    suggestions: ["Email", "WhatsApp", "See her work"],
  },
  // ─── Skills ─────────────────────────────────────────────────
  {
    id: "skills",
    keywords: ["skill", "tech", "stack", "tools", "technologies", "expertise", "know", "proficient"],
    answer:
      "**Core skills across 8 categories:**\n\n• **Languages:** Python, Java, C, C++, JavaScript\n• **Databases:** PostgreSQL, MongoDB, MySQL, Redis\n• **ML/DL:** Scikit-learn, XGBoost, TensorFlow, PyTorch, Keras, Facebook Prophet\n• **LLMs & AI:** LangChain, LangGraph, OpenAI API, AWS Bedrock (Claude), RAG (BM25 + ChromaDB + Cross-Encoder), Prompt Engineering, Agentic Systems\n• **Cloud/Data Eng:** AWS (S3, EC2, Glue, Athena, Bedrock), Spark, PySpark, Parquet, FastAPI\n• **Analytics:** Power BI, Matplotlib, Seaborn, Time-Series Forecasting\n• **MLOps:** Docker, Git, CI/CD, Redis caching, Circuit Breakers\n• **NLP & Computer Vision**",
    suggestions: ["Which LLM tools?", "Cloud experience?", "See projects"],
  },
  {
    id: "llm",
    keywords: ["llm", "language model", "gpt", "openai", "claude", "bedrock", "langchain", "rag", "prompt", "agent"],
    answer:
      "Megha has **strong production LLM experience**:\n\n• Built a 3-path LLM reasoning pipeline (BM25 + ChromaDB RAG with cross-encoder reranking) that cut support resolution time by ~50%\n• Designed a conversational analytics agent for 6,000+ EV station owners using LLM tool-calling — serving 1,700+ daily active users\n• Uses LangChain, LangGraph, OpenAI API, AWS Bedrock (Claude)\n• Entity-cache validation to structurally prevent hallucination in safety-critical environments",
    suggestions: ["RAG details", "Impact metrics", "Other projects"],
  },
  {
    id: "cloud",
    keywords: ["aws", "cloud", "s3", "athena", "glue", "bedrock", "spark", "etl", "pipeline", "data eng"],
    answer:
      "**Cloud & Data Engineering:**\n\n• Designed a nightly AWS Glue + S3 Parquet + Athena serverless pipeline processing **1M+ transactions/night**\n• Date partitioning reduced cloud query costs by **~95%**\n• 30% faster data processing with idempotent partition overwrite + 48-hour lookback buffer\n• Stack: AWS S3/EC2/Glue/Athena/Bedrock, Apache Spark, PySpark, Parquet, MongoDB, PostgreSQL",
    suggestions: ["ML forecasting?", "Impact numbers", "Projects"],
  },
  // ─── Projects ───────────────────────────────────────────────
  {
    id: "projects",
    keywords: ["project", "portfolio", "built", "worked on", "created", "developed", "showcase"],
    answer:
      "**Featured projects:**\n\n1. **SilentSpeak** — Audio-free lip-reading using 3D-CNN + BiLSTM + CTC loss (CER 2.95%, WER 10.11%)\n2. **ML for Gamma-Hadron Separation** — Published at CREEST 2024, 88% accuracy\n3. **Fashion MNIST ANN** — 89% accuracy classifier\n4. **Image-to-Cartoon Generator** — GAN-free, real-time\n5. **Autonomous Fruit Picker Robot** — ESP32 + servos + ultrasonic\n6. **3D Robotic Arm Web App** — Three.js + WebGL\n\nScroll to the **Projects** section for full details.",
    suggestions: ["Tell me about SilentSpeak", "Publication?", "Robotics"],
  },
  {
    id: "silentspeak",
    keywords: ["silentspeak", "lip", "reading", "visual speech", "thesis", "dissertation"],
    answer:
      "**SilentSpeak** was Megha's M.Tech dissertation — an audio-free visual speech recognition system.\n\n• **Method:** 75 grayscale mouth-region frames → 3D-CNN (128/256/75 filters) → BiLSTM → CTC loss\n• **Dataset:** GRID Corpus (33k+ clips, 34 speakers)\n• **Results:** CER **2.95%**, WER **10.11%**\n• **Stack:** Python, TensorFlow, Keras, OpenCV",
    suggestions: ["Other projects", "Publications", "Skills"],
  },
  {
    id: "publication",
    keywords: ["publication", "paper", "conference", "creest", "gamma", "hadron", "research"],
    answer:
      "**CREEST 2024 Publication** — *Machine Learning Models for Gamma-Hadron Separation*\n\n• Compared Gradient Boosting, SVM, AdaBoost, Naive Bayes on the MAGIC Gamma Telescope dataset (19,020 instances)\n• **Gradient Boosting achieved 88% accuracy** — outperforming SVM (85%) and Naive Bayes (83%)\n• Published at CREEST International Conference",
    suggestions: ["More projects", "Skills", "Certifications"],
  },
  // ─── Experience ─────────────────────────────────────────────
  {
    id: "experience",
    keywords: ["experience", "work", "job", "career", "role", "employment", "current", "chargemod", "years"],
    answer:
      "**Career timeline (3+ years total):**\n\n• **Data Scientist @ ChargeMOD** (May 2025 – Present) — 1.3+ yrs. Building LLM agents, ML forecasting, cloud ETL, churn detection.\n• **Data Science Intern @ ChargeMOD** (Mar–May 2024) — 3 months\n• **RPA Data Analyst @ Software Incubator Pvt. Ltd.** (Jun 2022 – May 2024) — 2 yrs. Puppeteer + Kofax automation, MySQL indexing.",
    suggestions: ["Current work", "Impact numbers", "Skills"],
  },
  {
    id: "impact",
    keywords: ["impact", "achievement", "result", "metric", "kpi", "roi", "business value", "revenue", "cost"],
    answer:
      "**Measurable production impact at ChargeMOD:**\n\n• **~50% reduction** in support issue resolution time (LLM-powered diagnostic pipeline)\n• **~95% cloud query cost cut** via Parquet-partitioned AWS ETL\n• **~10% revenue uplift** via demand-aware ML pricing\n• **~20% operational downtime reduction** via nightly uptime monitoring\n• **1,700+ daily active users** served by natural-language analytics agent\n• **1M+ transactions/night** processed with 30% faster processing",
    suggestions: ["How was it built?", "LLM details", "Projects"],
  },
  // ─── Education ──────────────────────────────────────────────
  {
    id: "education",
    keywords: ["education", "degree", "study", "university", "college", "school", "cgpa", "graduated", "mtech", "btech"],
    answer:
      "**Education:**\n\n• **M.Tech in Computer Science** (2023–2025) — Kerala University, Karyavattom. Specialization: Digital Image Computing. **CGPA 8.98**\n• **B.Tech in CSE** (2019–2023) — University College of Engineering, Karyavattom. **CGPA 8.23**\n• **Higher Secondary** (2017–2019) — Sree Vidhyadhiraja Vidhya Mandir. **92%**\n• **SSLC** (2016–2017) — Trinity English & Malayalam Medium School. **95%**",
    suggestions: ["Publication?", "Thesis details", "Certifications"],
  },
  // ─── Certifications ─────────────────────────────────────────
  {
    id: "certs",
    keywords: ["certification", "certificate", "bootcamp", "course", "udemy", "credential", "training"],
    answer:
      "**Certifications & Recognitions:**\n\n• The Complete Python Bootcamp: From Zero to Hero (Udemy)\n• Data Visualization with Power BI (Great Learning)\n• Co-led AI, ML & Robotics Bootcamp at Tella Academy\n• Qualified — Smart India Hackathon Preliminary Round\n• CREEST 2024 Publication (Gamma-Hadron Separation)",
    suggestions: ["Skills", "Publication", "Projects"],
  },
  // ─── Meta / Fun ─────────────────────────────────────────────
  {
    id: "location",
    keywords: ["where", "based", "located", "city", "country", "india", "kerala", "trivandrum"],
    answer:
      "Megha is based in **Trivandrum, Kerala, India** 🇮🇳. Open to remote roles and on-site opportunities.",
    suggestions: ["Contact", "Availability"],
  },
  {
    id: "cv",
    keywords: ["cv", "resume", "download", "pdf"],
    answer:
      "You can download Megha's CV from the **Download CV** button in the hero section, or the resume icon in the 'Connect with me' row.",
    suggestions: ["Skills", "Projects", "Contact"],
  },
  {
    id: "thanks",
    keywords: ["thank", "thanks", "thx", "ty", "appreciate"],
    answer: "You're welcome! Anything else you'd like to know about Megha?",
    suggestions: ["Contact", "Projects", "Skills"],
  },
  {
    id: "bye",
    keywords: ["bye", "goodbye", "cya", "see you", "later"],
    answer:
      "Goodbye! 👋 If you'd like to reach Megha directly, WhatsApp or email is the fastest way. Have a great day!",
    suggestions: [],
  },
  {
    id: "how-are-you",
    keywords: ["how are you", "how's it going", "wassup", "sup"],
    answer:
      "I'm doing great, thanks for asking! I'm here to answer anything about Megha's work — what would you like to know?",
    suggestions: ["Skills", "Projects", "Contact"],
  },
];

export const defaultSuggestions = [
  "What are her skills?",
  "Show me her projects",
  "Education details",
  "How to contact?",
  "Impact & achievements",
];

/**
 * Score how well a query matches a KB entry.
 * Simple: count of keyword hits, weighted by keyword length.
 */
const scoreEntry = (query, entry) => {
  const q = query.toLowerCase();
  let score = 0;
  for (const kw of entry.keywords) {
    if (q.includes(kw.toLowerCase())) {
      // Longer keyword phrases = more specific = higher weight
      score += kw.length;
    }
  }
  return score;
};

export const findAnswer = (query) => {
  if (!query || !query.trim()) return null;
  const scored = kb
    .map((e) => ({ entry: e, score: scoreEntry(query, e) }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) {
    return {
      answer:
        "Hmm, I'm not sure about that one. I know a lot about Megha's **skills, projects, experience, education, certifications, and how to contact her**. Try one of the suggestions below, or use the **WhatsApp button** to chat with her directly!",
      suggestions: defaultSuggestions,
    };
  }
  return scored[0].entry;
};
