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
    "education": re.compile(r"\b(educations?|stud(y|ies)|colleges?|universit(y|ies)|degrees?|m\.?tech|b\.?tech|academics?)\b", re.IGNORECASE),
    "contact": re.compile(r"\b(contacts?|emails?|reach|phones?|touch|hire|messages?|write)\b", re.IGNORECASE),
    "location": re.compile(r"\b(locations?|lives?|where|from|based|address(es)?)\b", re.IGNORECASE),
    "family_personal": re.compile(r"\b(famil(y|ies)|parents?|fathers?|mothers?|siblings?|personal|brothers?|sisters?|homes?|dob|birth|birthdays?|born|age)\b", re.IGNORECASE),
    "socials": re.compile(r"\b(instagram|insta|facebook|socials?|ig|fb)\b", re.IGNORECASE),
    "summary": re.compile(r"\b(summary|background|about|who\s+are\s+you|tell\s+me\s+about\s+yourself|who\s+is\s+megha|who\s+is\s+she|who\s+is)\b", re.IGNORECASE),
    "achievements": re.compile(r"\b(achievements?|accomplishments?|success(es)?|awards?)\b", re.IGNORECASE),
    "publications": re.compile(r"\b(publications?|papers?|conferences?|creest)\b", re.IGNORECASE),
    "certifications": re.compile(r"\b(certifications?|certificates?|courses?|udemy|learning)\b", re.IGNORECASE),
    "graph": re.compile(r"\b(graphs?|charts?|plots?|visualiz(e|ation)|draw|diagrams?)\b", re.IGNORECASE),
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
ON_TOPIC_ADDITIONAL = re.compile(r"\b(you|your|she|her|megha|megharaj|megha\s+raj)\b", re.IGNORECASE)

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
    return False

def get_chat_response(message: str) -> str:
    """
    Returns a rule-based response about Megha Raj V S based on keywords detected in the message.
    """
    message_lc = message.lower()
    
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
            exp_details.append(f"- **{e['role']}** at {e['company']} ({e['period']}){current_tag}:\n{desc_bullet}")
        
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
        return (
            f"You can contact Megha Raj V S via:\n"
            f"- **Email**: {profile_data.PROFILE['email']}\n"
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
                f"Megha Raj V S's LinkedIn profile is: "
                f"[{profile_data.PROFILE['linkedin']}]({profile_data.PROFILE['linkedin']})"
            )
        elif any(kw in message_lc for kw in ["github", "git"]):
            return (
                f"Megha Raj V S's GitHub profile is: "
                f"[{profile_data.PROFILE['github']}]({profile_data.PROFILE['github']})"
            )
        elif any(kw in message_lc for kw in ["facebook", "fb"]):
            return (
                "Megha Raj V S's Facebook profile is: "
                "[megha_vijayabalan](https://www.facebook.com/share/1871xeJjCH/)"
            )
        return (
            f"Here are Megha Raj V S's social media profiles:\n"
            f"- **LinkedIn**: [{profile_data.PROFILE['linkedin']}]({profile_data.PROFILE['linkedin']})\n"
            f"- **GitHub**: [{profile_data.PROFILE['github']}]({profile_data.PROFILE['github']})\n"
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

    # Default fallback just in case
    return (
        "I only talk about Megha Raj's work — experience, skills, projects, "
        "education or how to get in touch. Try asking me one of those!"
    )
