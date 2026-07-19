import os
import re
import base64
import profile_data

# Compile regular expressions once at module load
BUCKET_PATTERNS = {
    "greeting": re.compile(r"\b(hi|hello|hey|greetings|greet|good\s+morning|good\s+afternoon|good\s+evening)\b", re.IGNORECASE),
    "projects": re.compile(r"\b(projects?|portfolio|silentspeak|cartoon|robotic\s+arms?|fruit\s+pickers?|gamma|mnist|fashion)\b", re.IGNORECASE),
    "experience": re.compile(r"\b(experiences?|work|jobs?|careers?|roles?|history|positions?)\b", re.IGNORECASE),
    "skills": re.compile(r"\b(skills?|technolog(y|ies)|tools?|stack|programming|languages?)\b", re.IGNORECASE),
    "education": re.compile(r"\b(educations?|stud(y|ies)|colleges?|universit(y|ies)|degrees?|m\.?tech|b\.?tech|academics?|schools?|schooling)\b", re.IGNORECASE),
    "contact": re.compile(r"\b(contacts?|emails?|reach|phones?|touch|hire|messages?|write|gmail|mail)\b", re.IGNORECASE),
    "location": re.compile(r"\b(locations?|lives?|where|from|based|address(es)?)\b", re.IGNORECASE),
    "family_personal": re.compile(r"\b(famil(y|ies)|parents?|fathers?|mothers?|siblings?|personal|brothers?|sisters?|homes?|dob|birth|birthdays?|born|age)\b", re.IGNORECASE),
    "socials": re.compile(r"\b(instagram|insta|facebook|socials?|ig|fb|linkedin|github|git|ln)\b", re.IGNORECASE),
    "summary": re.compile(r"\b(summary|background|about|who\s+are\s+you|tell\s+me\s+about\s+yourself|who\s+is\s+megha|who\s+is\s+she|who\s+is)\b", re.IGNORECASE),
    "achievements": re.compile(r"\b(achievements?|accomplishments?|success(es)?|awards?)\b", re.IGNORECASE),
    "publications": re.compile(r"\b(publications?|papers?|conferences?|creest)\b", re.IGNORECASE),
    "certifications": re.compile(r"\b(certifications?|certificates?|courses?|udemy|learning)\b", re.IGNORECASE),
    "graph": re.compile(r"\b(graphs?|charts?|plots?|visualiz(e|ation)|draw|diagrams?)\b", re.IGNORECASE),
    "companies": re.compile(r"\b(companies|company|employer|employers|workplace|workplaces|orgs|organizations)\b", re.IGNORECASE),
}

def generate_skills_graph():
    categories = ['LLMs & AI', 'Machine Learning', 'Data Eng', 'Languages', 'Databases', 'MLOps']
    scores = [95, 90, 85, 80, 80, 75]
    colors = ['#10b981', '#34d399', '#059669', '#6ee7b7', '#a7f3d0', '#047857']
    
    # SVG Dimensions
    width = 500
    height = 300
    
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="100%" height="100%">'
    # Background
    svg += f'<rect width="{width}" height="{height}" fill="#0d1117" rx="8"/>'
    # Title
    svg += '<text x="250" y="30" fill="#ffffff" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" text-anchor="middle">Megha\'s Skill Proficiency (%)</text>'
    
    # Grid lines (at 25%, 50%, 75%, 100%)
    for pct in [25, 50, 75, 100]:
        x = 120 + (pct * 3.4)
        svg += f'<line x1="{x}" y1="50" x2="{x}" y2="260" stroke="#30363d" stroke-dasharray="3,3" stroke-width="1"/>'
        svg += f'<text x="{x}" y="275" fill="#8b949e" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle">{pct}%</text>'
    
    # Y-axis baseline line
    svg += '<line x1="120" y1="50" x2="120" y2="260" stroke="#30363d" stroke-width="1"/>'
    
    # Draw bars and labels
    for i, (cat, score) in enumerate(zip(categories, scores)):
        y = 55 + i * 34
        color = colors[i]
        bar_width = score * 3.4
        
        # Category Text
        svg += f'<text x="110" y="{y + 14}" fill="#8b949e" font-family="system-ui, sans-serif" font-size="11" text-anchor="end" font-weight="500">{cat}</text>'
        # Background bar
        svg += f'<rect x="120" y="{y}" width="340" height="18" fill="#161b22" rx="3"/>'
        # Foreground filled bar
        svg += f'<rect x="120" y="{y}" width="{bar_width}" height="18" fill="{color}" rx="3"/>'
        # Score label
        svg += f'<text x="{120 + bar_width + 8}" y="{y + 13}" fill="#10b981" font-family="system-ui, sans-serif" font-size="10" font-weight="bold">{score}%</text>'
        
    svg += '</svg>'
    
    base64_str = base64.b64encode(svg.encode('utf-8')).decode('utf-8')
    return f"data:image/svg+xml;base64,{base64_str}"

def generate_projects_graph():
    categories = ['AI Eng', 'Machine Learning', 'Data Eng', 'Operations', 'Academic']
    counts = [2, 3, 1, 1, 6]
    colors = ['#10b981', '#34d399', '#6ee7b7', '#059669', '#3b82f6']
    
    width = 500
    height = 300
    
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="100%" height="100%">'
    svg += f'<rect width="{width}" height="{height}" fill="#0d1117" rx="8"/>'
    svg += '<text x="250" y="30" fill="#ffffff" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" text-anchor="middle">Portfolio Projects by Category</text>'
    
    # Y-axis Grid lines (0 to 6)
    for count in range(0, 8, 2):
        y = 240 - (count * 28)
        svg += f'<line x1="60" y1="{y}" x2="460" y2="{y}" stroke="#30363d" stroke-dasharray="3,3" stroke-width="1"/>'
        svg += f'<text x="50" y="{y + 4}" fill="#8b949e" font-family="system-ui, sans-serif" font-size="10" text-anchor="end">{count}</text>'
        
    # X-axis Baseline line
    svg += '<line x1="60" y1="240" x2="460" y2="240" stroke="#30363d" stroke-width="1"/>'
    
    # Draw bars and X labels
    for i, (cat, count) in enumerate(zip(categories, counts)):
        x = 80 + i * 78
        color = colors[i]
        bar_height = count * 28
        y = 240 - bar_height
        
        # Filled bar
        svg += f'<rect x="{x}" y="{y}" width="36" height="{bar_height}" fill="{color}" rx="3"/>'
        # Value text on top of bar
        svg += f'<text x="{x + 18}" y="{y - 6}" fill="#ffffff" font-family="system-ui, sans-serif" font-size="10" font-weight="bold" text-anchor="middle">{count}</text>'
        # Category label under bar
        svg += f'<text x="{x + 18}" y="258" fill="#8b949e" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle">{cat}</text>'
        
    svg += '</svg>'
    
    base64_str = base64.b64encode(svg.encode('utf-8')).decode('utf-8')
    return f"data:image/svg+xml;base64,{base64_str}"

def generate_timeline_graph():
    roles = ['RPA Analyst', 'Intern', 'Data Scientist']
    durations = [24, 3, 16] # in months
    orgs = ['Software Incubator', 'ChargeMOD', 'ChargeMOD']
    colors = ['#3b82f6', '#6ee7b7', '#10b981']
    
    width = 500
    height = 300
    
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="100%" height="100%">'
    svg += f'<rect width="{width}" height="{height}" fill="#0d1117" rx="8"/>'
    svg += '<text x="250" y="30" fill="#ffffff" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" text-anchor="middle">Experience Duration (Months)</text>'
    
    # Grid lines (at 6m, 12m, 18m, 24m)
    for m in [6, 12, 18, 24]:
        x = 160 + (m * 12)
        svg += f'<line x1="{x}" y1="50" x2="{x}" y2="240" stroke="#30363d" stroke-dasharray="3,3" stroke-width="1"/>'
        svg += f'<text x="{x}" y="255" fill="#8b949e" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle">{m}m</text>'
        
    # Baseline
    svg += '<line x1="160" y1="50" x2="160" y2="240" stroke="#30363d" stroke-width="1"/>'
    
    # Draw bars and text labels
    for i, (role, duration, org) in enumerate(zip(roles, durations, orgs)):
        y = 60 + i * 60
        color = colors[i]
        bar_width = duration * 12
        
        # Role Label
        svg += f'<text x="150" y="{y + 6}" fill="#ffffff" font-family="system-ui, sans-serif" font-size="12" text-anchor="end" font-weight="bold">{role}</text>'
        # Org Label
        svg += f'<text x="150" y="{y + 20}" fill="#8b949e" font-family="system-ui, sans-serif" font-size="10" text-anchor="end">{org}</text>'
        # Background bar
        svg += f'<rect x="160" y="{y}" width="288" height="18" fill="#161b22" rx="3"/>'
        # Foreground filled bar
        svg += f'<rect x="160" y="{y}" width="{bar_width}" height="18" fill="{color}" rx="3"/>'
        # Value label
        svg += f'<text x="{160 + bar_width + 8}" y="{y + 13}" fill="#ffffff" font-family="system-ui, sans-serif" font-size="10" font-weight="bold">{duration}m</text>'
        
    svg += '</svg>'
    
    base64_str = base64.b64encode(svg.encode('utf-8')).decode('utf-8')
    return f"data:image/svg+xml;base64,{base64_str}"

def generate_general_graph():
    metrics = ['Featured Projs', 'Academic Projs', 'Exp (Years)', 'Research Pubs', 'Certifications']
    values = [6, 6, 3.5, 1, 4]
    colors = ['#10b981', '#34d399', '#6ee7b7', '#059669', '#3b82f6']
    
    width = 500
    height = 300
    
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="100%" height="100%">'
    svg += f'<rect width="{width}" height="{height}" fill="#0d1117" rx="8"/>'
    svg += '<text x="250" y="30" fill="#ffffff" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" text-anchor="middle">Megha\'s Profile Highlights</text>'
    
    # Y-axis Grid lines (0 to 6)
    for val in range(0, 8, 2):
        y = 230 - (val * 24)
        svg += f'<line x1="50" y1="{y}" x2="450" y2="{y}" stroke="#30363d" stroke-dasharray="3,3" stroke-width="1"/>'
        svg += f'<text x="40" y="{y + 4}" fill="#8b949e" font-family="system-ui, sans-serif" font-size="10" text-anchor="end">{val}</text>'
        
    # Baseline
    svg += '<line x1="50" y1="230" x2="450" y2="230" stroke="#30363d" stroke-width="1"/>'
    
    # Draw bars and X labels
    for i, (metric, value) in enumerate(zip(metrics, values)):
        x = 70 + i * 78
        color = colors[i]
        bar_height = value * 24
        y = 230 - bar_height
        
        # Filled bar
        svg += f'<rect x="{x}" y="{y}" width="36" height="{bar_height}" fill="{color}" rx="3"/>'
        # Value text on top of bar
        svg += f'<text x="{x + 18}" y="{y - 6}" fill="#ffffff" font-family="system-ui, sans-serif" font-size="10" font-weight="bold" text-anchor="middle">{value}</text>'
        # Metric labels under bar (two lines if space-split)
        parts = metric.split(' ')
        if len(parts) > 1:
            svg += f'<text x="{x + 18}" y="248" fill="#8b949e" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">{parts[0]}</text>'
            svg += f'<text x="{x + 18}" y="260" fill="#8b949e" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">{parts[1]}</text>'
        else:
            svg += f'<text x="{x + 18}" y="248" fill="#8b949e" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">{metric}</text>'
            
    svg += '</svg>'
    
    base64_str = base64.b64encode(svg.encode('utf-8')).decode('utf-8')
    return f"data:image/svg+xml;base64,{base64_str}"

# Helper regex for additional on-topic checks
ON_TOPIC_ADDITIONAL = re.compile(
    r"\b(you|your|she|her|megha|megharaj|megha\s+raj|notice|salary|ctc|lpa|package|relocat|join|joining|why|reason|switch|choose|chose)\b", 
    re.IGNORECASE
)

TECH_DESCRIPTIONS = {
    "machine learning": "Machine learning is a branch of artificial intelligence focused on building systems that learn from data, identify patterns, and make decisions with minimal human intervention. It encompasses supervised, unsupervised, and reinforcement learning paradigms.",
    "Machine Learning": "Machine learning is a branch of artificial intelligence focused on building systems that learn from data, identify patterns, and make decisions with minimal human intervention. It encompasses supervised, unsupervised, and reinforcement learning paradigms.",
    "deep learning": "Deep learning is a subset of machine learning that uses artificial neural networks with many layers to model high-level abstractions in data — such as recognizing speech, images, or text.",
    "neural network": "A neural network is a computing system loosely modeled on the biological neural networks that make up the animal brain. It consists of layers of interconnected nodes that process information using connectionist approaches.",
    "artificial intelligence": "Artificial Intelligence (AI) is the simulation of human intelligence processes by computer systems, including learning, reasoning, problem-solving, perception, and language understanding.",
    "computer vision": "Computer Vision is a field of AI that trains computers to interpret and understand the visual world — detecting objects, recognizing faces, reading text from images, and processing video streams.",
    "natural language processing": "Natural Language Processing (NLP) is a branch of AI dealing with the interaction between computers and humans through language — including tasks like text classification, translation, summarization, and entity recognition.",
    "nlp": "NLP (Natural Language Processing) enables computers to understand, interpret, and generate human language — powering chatbots, translation engines, and text summarization systems.",
    "data science": "Data science is an interdisciplinary field that uses scientific methods, processes, algorithms, and systems to extract knowledge and insights from structured and unstructured data.",
    "llms & ai systems": "Large Language Models (LLMs) and Agentic AI Systems utilize advanced generative AI models (like GPT-4 or Claude) designed to reason, plan, execute API tools, and handle complex conversational workflows.",
    "LLMs & AI Systems": "Large Language Models (LLMs) and Agentic AI Systems utilize advanced generative AI models (like GPT-4 or Claude) designed to reason, plan, execute API tools, and handle complex conversational workflows.",
    "llm": "A Large Language Model (LLM) is a deep learning model trained on massive text corpora that can generate, translate, summarize, and reason about text with human-like fluency.",
    "llms": "Large Language Models (LLMs) are AI models trained on vast amounts of text data, capable of understanding and generating natural language for tasks like Q&A, code generation, and summarization.",
    "generative ai": "Generative AI refers to AI systems that can generate new content — text, images, code, or audio — by learning patterns from training data. Examples include GPT-4, Claude, and Stable Diffusion.",
    "data engineering": "Data engineering is the practice of designing, building, and maintaining serverless data pipelines, data warehouses, and ETL (Extract, Transform, Load) systems to handle millions of transactions at scale.",
    "Cloud & Data Engineering": "Cloud & Data Engineering involves architecting scalable, serverless data pipelines using AWS services like S3, Glue, and Athena alongside distributed processing engines like Apache Spark.",
    "mlops": "MLOps (Machine Learning Operations) applies DevOps principles to ML workflows, ensuring model reliability, regression testing, deployment health gates, rate limiting, and caching in production environments.",
    "MLOps & DevOps": "MLOps & DevOps brings engineering discipline to machine learning — including containerization (Docker), CI/CD pipelines (GitHub Actions), regression testing, and production monitoring.",
    "langchain": "LangChain is a popular open-source orchestration framework designed to simplify the creation of applications using Large Language Models (LLMs).",
    "langgraph": "LangGraph is a library for building stateful, multi-actor agentic applications with LLMs, enabling complex cyclical flows, loops, and branching logic.",
    "rag": "RAG (Retrieval-Augmented Generation) is an architecture that optimizes LLM output by querying an external knowledge vector database (like ChromaDB) and cross-encoder reranking before generating a response.",
    "pyspark": "PySpark is the Python API for Apache Spark, a distributed general-purpose cluster-computing framework used for processing millions of rows of data concurrently in parallel pipelines.",
    "aws glue": "AWS Glue is a fully managed, serverless event-driven ETL service that prepares, transforms, and loads data from operational datastores (like MongoDB) to analytics data lakes (S3 Parquet).",
    "xgboost": "XGBoost (Extreme Gradient Boosting) is an optimized, highly efficient, and flexible gradient boosting library widely used for tabular classification and regression forecasting.",
    "tensorflow": "TensorFlow is Google's open-source deep learning framework used for building and training neural networks, widely used for computer vision, NLP, and speech recognition tasks.",
    "keras": "Keras is a high-level neural network API built on top of TensorFlow, making it easy to build, train, and evaluate deep learning models.",
    "python": "Python is a high-level, interpreted programming language renowned for its readability and versatility, serving as the primary language for data science, machine learning, and AI development.",
    "docker": "Docker is a platform for developing, shipping, and running applications in containers — ensuring consistent environments from development to production deployment.",
    "redis": "Redis is an in-memory data structure store used as a database, cache, and message broker — critical for low-latency caching of LLM tool calls and session data.",
    "sql": "SQL (Structured Query Language) is the standard language for relational database management, used to query, insert, update, and manage structured data.",
    "postgresql": "PostgreSQL is a powerful, open-source object-relational database system known for its reliability, feature robustness, and performance for complex queries.",
    "mongodb": "MongoDB is a document-oriented NoSQL database designed for high-volume data storage, commonly used for storing machine log events and real-time IoT data.",
    "chromadb": "ChromaDB is an open-source embedding database used for storing and querying vector embeddings in RAG pipelines — enabling semantic search over large document corpora.",
}

def explain_skill_or_keyword(message: str) -> str:
    message_lc = message.lower()
    
    # Identify a tech or skill Megha has from SKILLS categories or other known technical terms
    all_techs = set()
    for cat, list_of_techs in profile_data.SKILLS.items():
        # Include category names themselves (e.g. "Machine Learning", "LLMs & AI Systems")
        all_techs.add(cat)
        for t in list_of_techs:
            all_techs.add(t)
            if "(" in t:
                parts = t.split("(")
                all_techs.add(parts[0].strip())
                all_techs.add(parts[1].replace(")", "").strip())

    # Broad aliases so users can ask in natural language
    all_techs.update([
        "machine learning", "deep learning", "neural network", "neural networks",
        "artificial intelligence", "ai", "data science", "computer vision",
        "natural language processing", "nlp", "large language model",
        "pyspark", "aws glue", "athena", "s3", "xgboost", "prophet",
        "three.js", "webgl", "chromadb", "bm25", "redis",
        "langchain", "langgraph", "keras", "tensorflow", "opencv",
        "numpy", "pandas", "matplotlib", "seaborn", "mediapipe",
        "spark", "sql", "postgresql", "mongodb", "mysql",
        "docker", "git", "scikit-learn", "rag", "mlops",
        "data engineering", "llm", "llms", "generative ai",
    ])

    matched_techs = []
    for tech in all_techs:
        pattern = re.compile(rf"\b{re.escape(tech.lower())}\b", re.IGNORECASE)
        if pattern.search(message_lc):
            matched_techs.append(tech)
            
    if not matched_techs:
        return None
        
    matched_techs.sort(key=len, reverse=True)
    best_tech = matched_techs[0]
    
    # Look for projects mentioning this tech
    matching_projects = []
    for proj in profile_data.PROJECTS:
        tech_match = any(best_tech.lower() in t.lower() for t in proj.get("tech_stack", []))
        content_match = (
            best_tech.lower() in proj["title"].lower() or 
            best_tech.lower() in proj["description"].lower() or 
            best_tech.lower() in proj.get("methodology", "").lower()
        )
        if tech_match or content_match:
            matching_projects.append(proj)
            
    # Look for experience bullets mentioning this tech
    matching_exp = []
    for exp in profile_data.EXPERIENCE:
        matching_bullets = [b for b in exp["description"] if best_tech.lower() in b.lower()]
        if matching_bullets:
            matching_exp.append((exp, matching_bullets))
            
    if matching_projects or matching_exp:
        desc = TECH_DESCRIPTIONS.get(best_tech.lower(), "")
        if desc:
            response = f"**What is {best_tech}?**\n{desc}\n\nMegha Raj V S has direct hands-on experience with **{best_tech}** in the following areas of her work:\n\n"
        else:
            response = f"Megha Raj V S has direct hands-on experience with **{best_tech}** in the following areas of her work:\n\n"
            
        if matching_projects:
            proj_list = []
            for p in matching_projects:
                proj_list.append(
                    f"**{p['title']}** ({p['category']})\n"
                    f"- **Application**: {p['description']}\n"
                    f"- **Methodology**: {p['methodology']}\n"
                    f"- **Metrics/Impact**: {p['metrics']}"
                )
            response += "**Projects:**\n" + "\n\n".join(proj_list) + "\n\n"
            
        if matching_exp:
            exp_list = []
            for exp, bullets in matching_exp:
                bullets_str = "\n".join([f"  * {b}" for b in bullets])
                exp_list.append(f"- **{exp['role']}** at **{exp['company']}**:\n{bullets_str}")
            response += "**Professional Experience:**\n" + "\n".join(exp_list)
            
        return response
        
    return None

def is_on_topic(message: str) -> bool:
    """
    Checks if a message is related to Megha Raj V S's profile, experience, projects, education, or contact details.
    """
    message_lc = message.lower()
    if ON_TOPIC_ADDITIONAL.search(message_lc):
        return True
    for pat in BUCKET_PATTERNS.values():
        if pat.search(message_lc):
            return True
    if explain_skill_or_keyword(message) is not None:
        return True
    return False

def get_chat_response(message: str) -> str:
    """
    Returns a rule-based response about Megha Raj V S based on keywords detected in the message.
    """
    message_lc = message.lower()
    
    # Intercept specific company questions
    if "chargemod" in message_lc:
        return (
            "Megha Raj V S has worked at **[ChargeMOD](https://chargemod.com/)** in the following roles:\n\n"
            "- **Data Scientist** (May 2025 - Present):\n"
            "  * Lead AI and machine learning development, architecting production-grade LLM agents, dynamic demand forecasting networks, and automated serverless ETL data pipelines.\n"
            "  * Deploy anti-hallucination guardrails, Redis query caching, and robust security measures structurally preventing cross-account access at the database layer.\n"
            "  * Design daily Power BI dashboard streams and automated diagnostic monitoring consoles, cutting cloud costs by 95% and operational downtime by 20%.\n\n"
            "- **Data Science Intern** (Mar 2024 - May 2024):\n"
            "  * Developed an EV Assistant Chatbot using OpenAI function calling, embedding-based retrieval, dynamic entity extraction, and real-time SSE streaming for route optimisation and live charger discovery; the project evolved into the production Customer Support AI Agent."
        )
    elif "software incubator" in message_lc or "softincubator" in message_lc or "soft incubator" in message_lc:
        return (
            "Megha Raj V S worked at **[Software Incubator Pvt. Ltd.](https://softincubator.com/career.html)** in the following role:\n\n"
            "- **RPA Data Analyst** (Jun 2022 - May 2024):\n"
            "  * Automated document extraction and data processing workflows using JavaScript, Puppeteer, and Kofax; built browser automation pipelines for structured web scraping and data indexing into MySQL databases."
        )

    # notice period checks
    if "notice" in message_lc:
        if any(kw in message_lc for kw in ["how many", "duration", "how long", "how much", "days", "month", "number"]):
            return "Megha Raj's notice period is **30 days (1 month)**."
        return "No, currently Megha is **not on a notice period** (she is working at ChargeMOD)."

    # immediate joining check
    if any(kw in message_lc for kw in ["join immediately", "immediate join", "join tomorrow", "join asap", "how soon can you join", "earliest start"]):
        return (
            "Currently, Megha is not on a notice period. However, she is open to discussions and will negotiate an early release with her current employer if needed, so that she can **join immediately** if approved."
        )

    # expected salary check
    if any(kw in message_lc for kw in ["expected salary", "salary expectation", "ctc expectation", "expected ctc", "salary requirements", "salary expectations"]):
        return "Megha Raj's expected salary is **10 LPA to 12 LPA**."
    elif any(kw in message_lc for kw in ["salary", "ctc", "expectation", "package", "compensation"]) and any(kw in message_lc for kw in ["expect", "expected", "want", "require", "demand", "ask"]):
        return "Megha Raj's expected salary is **10 LPA to 12 LPA**."

    # relocation check
    if "relocat" in message_lc or "open to move" in message_lc or "willing to move" in message_lc:
        return (
            "Yes, Megha is **completely open to relocation**.\n\n"
            "**Why Relocate?** She believes that professional and personal growth thrives when stepping outside your comfort zone. Relocating represents a powerful opportunity to immerse herself in new environments, collaborate with diverse talent directly at on-site engineering hubs, and bring her machine learning and AI automation expertise to wherever the company's innovation centers are located."
        )

    # career transitions / choices checks:
    # why switch from rpa to data science
    if "rpa" in message_lc and ("data science" in message_lc or "datascience" in message_lc) and ("why" in message_lc or "reason" in message_lc or "switch" in message_lc or "transition" in message_lc):
        return (
            "**Why switch from RPA to Data Science?**\n\n"
            "Megha transitioned from Robotic Process Automation (RPA) to Data Science because while RPA is excellent for automating rule-based, repetitive workflows, she wanted to build cognitive systems that can think, learn, and make decisions on their own.\n\n"
            "During her tenure as an RPA Data Analyst at Software Incubator Pvt. Ltd., she saw firsthand that the true potential of automation lies in integrating ML, NLP, and Computer Vision to handle unstructured datasets. Transitioning to Data Science empowered her to build complex reasoning architectures (like LLM agents and serverless ETL data pipelines) that generate insights and automate intelligence."
        )

    # why choose mtech
    if "mtech" in message_lc or "m.tech" in message_lc or "master" in message_lc:
        if "why" in message_lc or "reason" in message_lc or "choose" in message_lc or "chose" in message_lc or "pursue" in message_lc:
            return (
                "**Why pursue an M.Tech?**\n\n"
                "Megha chose to pursue her M.Tech in Computer Science (specializing in Digital Image Computing) to build a rigorous theoretical and research-driven foundation in advanced AI fields like Computer Vision, Deep Learning, and Pattern Recognition.\n\n"
                "Her master's studies provided the structural framework to conduct deep research (such as her visual speech recognition thesis, SilentSpeak, which achieved a 2.95% Character Error Rate using 3D-CNNs and BiLSTMs), bridging the gap between standard engineering tasks and state-of-the-art machine learning implementations."
            )

    # why choose data science
    if ("data science" in message_lc or "datascience" in message_lc) and ("why" in message_lc or "reason" in message_lc or "choose" in message_lc or "chose" in message_lc):
        return (
            "**Why choose Data Science?**\n\n"
            "Megha chose Data Science because it sits at the perfect intersection of mathematics, programming, and real-world business optimization.\n\n"
            "She is driven by the challenge of turning messy, unstructured datasets into predictive models and intelligent systems that yield measurable impact (such as cutting cloud query costs by 95% or implementing surge-pricing models that raise revenue by 10%). Data Science allows her to build cognitive systems that solve safety-critical, high-throughput problems."
        )

    # why choose chargemod
    if "chargemod" in message_lc and ("why" in message_lc or "reason" in message_lc or "choose" in message_lc or "chose" in message_lc or "join" in message_lc):
        return (
            "**Why choose ChargeMOD?**\n\n"
            "Megha chose ChargeMOD because the electric vehicle (EV) charging sector is a fast-growing, data-rich, and safety-critical green-tech industry. She wanted to apply her skills where they would directly support sustainable infrastructure and face real-world engineering challenges.\n\n"
            "At ChargeMOD, the massive volume of real-time transactions and log events across 6,000+ chargers provided the perfect high-throughput environment to build production-grade data pipelines, LLM support tools, and peak-demand ML forecasting. It allowed her to grow from a junior engineer to an autonomous Data Scientist leading production AI deployments."
        )

    if not is_on_topic(message):
        return (
            "I only talk about Megha Raj's work — experience, skills, projects, "
            "education or how to get in touch. Try asking me one of those!"
        )

    # Check if a graph is requested
    wants_graph = len(BUCKET_PATTERNS["graph"].findall(message_lc)) > 0
    if wants_graph:
        # Determine the topic of interest for the graph
        has_skills = len(BUCKET_PATTERNS["skills"].findall(message_lc)) > 0
        has_projects = len(BUCKET_PATTERNS["projects"].findall(message_lc)) > 0 or any(kw in message_lc for kw in ["tariff", "support", "analytics", "powerbi", "retention", "maintenance"])
        has_experience = len(BUCKET_PATTERNS["experience"].findall(message_lc)) > 0 or any(kw in message_lc for kw in ["timeline", "history", "career"])
        
        if has_skills:
            url = generate_skills_graph()
            return (
                "Here is a bar chart displaying Megha's core skill proficiencies:\n\n"
                f"![Skills Graph]({url})\n\n"
                "Her top strengths lie in LLM AI Systems, Machine Learning, and Data Engineering."
            )
        elif has_projects:
            url = generate_projects_graph()
            return (
                "Here is a chart summarizing Megha's projects by category:\n\n"
                f"![Projects Graph]({url})\n\n"
                "Her portfolio features 6 production-grade projects at ChargeMOD (Data Engineering, Generative AI, Machine Learning, and Operations) and 6 academic projects."
            )
        elif has_experience:
            url = generate_timeline_graph()
            return (
                "Here is a timeline graph displaying the duration of Megha's professional experience (in months):\n\n"
                f"![Experience Timeline]({url})\n\n"
                "She has accumulated over 3.5 years of industry experience across RPA, Data Analysis, and Data Science."
            )
        else:
            # General highlight graph
            url = generate_general_graph()
            return (
                "Here is a general highlight chart of Megha's professional portfolio:\n\n"
                f"![Profile Highlights]({url})\n\n"
                "This summarizes her featured projects, academic projects, experience, research papers, and certifications."
            )
    # Always check if user is asking about a specific skill/tech — runs before bucket scoring
    # to avoid false matches (e.g. "machine learning" hitting the certifications/learning bucket)
    if not wants_graph:
        explanation = explain_skill_or_keyword(message)
        if explanation:
            return explanation

    # Single-pass scoring of all intents
    scores = {}
    for bucket, pattern in BUCKET_PATTERNS.items():
        scores[bucket] = len(pattern.findall(message_lc))
        
    max_score = max(scores.values())
    
    if max_score == 0:
        # Fallback to summary if on-topic generally but no specific bucket keyword triggered
        best_bucket = "summary"
    else:
        # Find candidates that tied for max score
        candidates = [b for b, s in scores.items() if s == max_score]
        # Resolve tie with logical priority order
        priority = [
            "greeting", "projects", "experience", "skills", "achievements",
            "publications", "certifications", "education", "contact", "location",
            "socials", "family_personal", "summary"
        ]
        best_bucket = next((b for b in priority if b in candidates), candidates[0])

    # 1. GREETING
    if best_bucket == "greeting":
        return (
            "Hello! I am Megha Raj's virtual assistant. I can tell you about her "
            "experience, skills, education, projects, achievements, or how to contact her. What would you like to know?"
        )

    # 2. PROJECTS
    elif best_bucket == "projects":
        if any(kw in message_lc for kw in ["silentspeak", "lip", "speech"]):
            p = next((proj for proj in profile_data.PROJECTS if proj["id"] == "silentspeak"), None)
            return (
                f"**{p['title']}** ({p['category']}):\n"
                f"{p['description']}\n\n"
                f"**Methodology**: {p['methodology']}\n"
                f"**Dataset**: {p['dataset']}\n"
                f"**Metrics**: {p['metrics']}\n"
                f"**Tech Stack**: {', '.join(p['tech_stack'])}."
            )
        elif any(kw in message_lc for kw in ["cartoon", "avatar", "image processing"]):
            p = next((proj for proj in profile_data.PROJECTS if proj["id"] == "cartoon-generator"), None)
            return (
                f"**{p['title']}** ({p['category']}):\n"
                f"{p['description']}\n\n"
                f"**Methodology**: {p['methodology']}\n"
                f"**Metrics**: {p['metrics']}\n"
                f"**Tech Stack**: {', '.join(p['tech_stack'])}."
            )
        elif any(kw in message_lc for kw in ["robotic arm", "three.js", "kinematic", "robotic-arm"]):
            p = next((proj for proj in profile_data.PROJECTS if proj["id"] == "robotic-arm-web"), None)
            return (
                f"**{p['title']}** ({p['category']}):\n"
                f"{p['description']}\n\n"
                f"**Methodology**: {p['methodology']}\n"
                f"**Metrics**: {p['metrics']}\n"
                f"**Tech Stack**: {', '.join(p['tech_stack'])}."
            )
        elif any(kw in message_lc for kw in ["robot", "fruit", "picker"]) and not "arm" in message_lc:
            p = next((proj for proj in profile_data.PROJECTS if proj["id"] == "fruit-picker"), None)
            return (
                f"**{p['title']}** ({p['category']}):\n"
                f"{p['description']}\n\n"
                f"**Methodology**: {p['methodology']}\n"
                f"**Metrics**: {p['metrics']}\n"
                f"**Tech Stack**: {', '.join(p['tech_stack'])}."
            )
        elif any(kw in message_lc for kw in ["gamma", "ray"]):
            p = next((proj for proj in profile_data.PROJECTS if proj["id"] == "gamma-rays"), None)
            return (
                f"**{p['title']}** ({p['category']}):\n"
                f"{p['description']}\n\n"
                f"**Methodology**: {p['methodology']}\n"
                f"**Dataset**: {p['dataset']}\n"
                f"**Metrics**: {p['metrics']}\n"
                f"**Tech Stack**: {', '.join(p['tech_stack'])}."
            )
        elif any(kw in message_lc for kw in ["mnist", "fashion", "ann"]):
            p = next((proj for proj in profile_data.PROJECTS if proj["id"] == "fashion-mnist"), None)
            return (
                f"**{p['title']}** ({p['category']}):\n"
                f"{p['description']}\n\n"
                f"**Methodology**: {p['methodology']}\n"
                f"**Dataset**: {p['dataset']}\n"
                f"**Metrics**: {p['metrics']}\n"
                f"**Tech Stack**: {', '.join(p['tech_stack'])}."
            )
        
        # General projects overview
        project_list = "\n".join([f"- **{p['title']}** ({p['badge']})" for p in profile_data.PROJECTS])
        return (
            f"Megha Raj has built several academic, research, and machine learning projects:\n{project_list}\n\n"
            f"Ask me about a specific project (e.g., 'Tell me about SilentSpeak' or 'How does the Fashion MNIST model work?') for methodology and dataset details!"
        )

    # 3. EXPERIENCE
    elif best_bucket == "experience":
        exp_details = []
        for e in profile_data.EXPERIENCE:
            current_tag = " (Current Role)" if e["is_current"] else ""
            desc_bullet = "\n".join([f"  * {bullet}" for bullet in e["description"]])
            
            # Format company name with clickable links
            company_name = e['company']
            if "chargemod" in company_name.lower():
                company_name = f"[{e['company']}](https://chargemod.com/)"
            elif "software incubator" in company_name.lower():
                company_name = f"[{e['company']}](https://softincubator.com/career.html)"
                
            exp_details.append(f"- **{e['role']}** at {company_name} ({e['period']}){current_tag}:\n{desc_bullet}")
        
        return (
            f"Megha Raj has 3+ years of experience across Intelligent Automation (RPA), Data Analysis, and AI/Data Science:\n\n"
            + "\n\n".join(exp_details)
        )

    # 4. SKILLS
    elif best_bucket == "skills":
        skill_categories = []
        for cat, items in profile_data.SKILLS.items():
            skill_categories.append(f"- **{cat}**: {', '.join(items)}")
        return (
            f"Megha Raj's core skills are organized into the following areas:\n\n"
            + "\n".join(skill_categories)
        )

    # 5. ACHIEVEMENTS
    elif best_bucket == "achievements":
        ach_list = "\n".join([f"- {ach}" for ach in profile_data.KEY_ACHIEVEMENTS])
        return (
            f"Here are some of Megha Raj V S's key professional and academic achievements:\n\n"
            f"{ach_list}"
        )

    # 6. PUBLICATIONS
    elif best_bucket == "publications":
        pub_list = []
        for pub in profile_data.PUBLICATIONS:
            pub_list.append(f"- **{pub['title']}** ({pub['period']}) - {pub['institution']}\n  {pub['description']}")
        return "Here is Megha Raj V S's publication record:\n\n" + "\n\n".join(pub_list)

    # 7. CERTIFICATIONS
    elif best_bucket == "certifications":
        cert_list = "\n".join([f"- {cert}" for cert in profile_data.CERTIFICATIONS])
        return (
            f"Megha Raj V S holds the following professional certifications & credentials:\n\n"
            f"{cert_list}"
        )

    # 8. EDUCATION
    elif best_bucket == "education":
        edu_details = []
        for edu in profile_data.EDUCATION:
            thesis_or_project = ""
            if "thesis" in edu:
                thesis_or_project = f"\n  * Thesis: {edu['thesis']}"
            elif "project" in edu:
                thesis_or_project = f"\n  * Project: {edu['project']}"
                
            edu_details.append(
                f"- **{edu['degree']}**\n"
                f"  {edu['institution']} ({edu['period']}){thesis_or_project}"
            )
        return "Megha Raj's educational background includes:\n\n" + "\n\n".join(edu_details)

    # 9. CONTACT
    elif best_bucket == "contact":
        if any(kw in message_lc for kw in ["gmail", "email", "mail"]):
            return (
                "You can reach Megha Raj V S via Gmail at: "
                "[megharaj.v.s.97@gmail.com](mailto:megharaj.v.s.97@gmail.com)"
            )
        return (
            f"You can contact Megha Raj V S via:\n"
            f"- **Email**: [megharaj.v.s.97@gmail.com](mailto:megharaj.v.s.97@gmail.com)\n"
            f"- **Phone**: {profile_data.PROFILE['phone']}\n"
            f"- **Location**: {profile_data.PROFILE['location']}\n\n"
            f"Or you can submit the contact form on this page to send a real email directly to her!"
        )

    # 10. LOCATION
    elif best_bucket == "location":
        return f"Megha Raj V S is based in **{profile_data.PROFILE['location']}**."

    # 11. SOCIALS
    elif best_bucket == "socials":
        if any(kw in message_lc for kw in ["insta", "instagram", "ig"]):
            return (
                "Megha Raj V S's Instagram profile is: "
                "[megha_vijayabalan](https://www.instagram.com/megha_vijayabalan?igsh=dzAxbnVkczBzNHBs)"
            )
        elif any(kw in message_lc for kw in ["linkedin", "ln"]):
            return (
                "Megha Raj V S's LinkedIn profile is: "
                "[meghavijayabalan](https://www.linkedin.com/in/meghavijayabalan)"
            )
        elif any(kw in message_lc for kw in ["github", "git"]):
            return (
                "Megha Raj V S's GitHub profile is: "
                "[megharaj1997](https://github.com/megharaj1997)"
            )
        elif any(kw in message_lc for kw in ["facebook", "fb"]):
            return (
                "Megha Raj V S's Facebook profile is: "
                "[megha_vijayabalan](https://www.facebook.com/share/1871xeJjCH/)"
            )
        return (
            f"Here are Megha Raj V S's social media profiles:\n"
            f"- **LinkedIn**: [meghavijayabalan](https://www.linkedin.com/in/meghavijayabalan)\n"
            f"- **GitHub**: [megharaj1997](https://github.com/megharaj1997)\n"
            f"- **Instagram**: [megha_vijayabalan](https://www.instagram.com/megha_vijayabalan?igsh=dzAxbnVkczBzNHBs) (username: `megha_vijayabalan`)\n"
            f"- **Facebook**: [megha_vijayabalan](https://www.facebook.com/share/1871xeJjCH/) (username: `megha_vijayabalan`)"
        )

    # 12. FAMILY_PERSONAL
    elif best_bucket == "family_personal":
        if any(kw in message_lc for kw in ["dob", "birth", "birthday", "born", "age"]):
            return "Megha Raj V S was born on **September 15, 1997** (DoB: 15-09-1997)."
        return (
            f"Megha Raj V S resides with her family in Trivandrum, Kerala, India.\n\n"
            f"Her family has been a great support throughout her academic studies (M.Tech in Digital Image Computing) "
            f"and her professional career as a Data Scientist and AI Developer."
        )

    # 13. SUMMARY
    elif best_bucket == "summary":
        return (
            f"**Megha Raj V S** is a **{profile_data.PROFILE['title']}** based in {profile_data.PROFILE['location']}.\n\n"
            f"{profile_data.PROFILE['summary']}\n\n"
            f"She has an M.Tech in Digital Image Computing and over 3 years of work experience "
            f"ranging from RPA and Data Analysis to Computer Vision and Deep Learning research."
        )

    # 14. COMPANIES
    elif best_bucket == "companies":
        return (
            "Megha Raj V S has worked at the following companies:\n\n"
            "1. **[ChargeMOD](https://chargemod.com/)**\n"
            "   - **Role/Position**: Data Scientist (May 2025 - Present)\n"
            "   - **Role/Position**: Data Science Intern (Mar 2024 - May 2024)\n"
            "2. **[Software Incubator Pvt. Ltd.](https://softincubator.com/career.html)**\n"
            "   - **Role/Position**: RPA Data Analyst (Jun 2022 - May 2024)"
        )

    # Default fallback just in case
    return (
        "I only talk about Megha's work — experience, skills, projects, "
        "education, companies or how to get in touch. Try asking me one of those!"
    )
