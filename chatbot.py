import re
import profile_data

def is_on_topic(message: str) -> bool:
    """
    Checks if a message is related to Megha Raj V S's profile, experience, projects, education, or contact details.
    """
    message_lc = message.lower()
    
    # Topic keywords
    keywords = [
        "megharaj", "megha", "megha raj", "profile", "resume", "cv", "portfolio", "experience", "work", "job", "career",
        "role", "position", "skills", "technologies", "know", "tools", "programming", "languages",
        "projects", "silentspeak", "cartoon", "robotic arm", "fruit picker", "gamma ray",
        "education", "m.tech", "b.tech", "study", "degree", "college", "university", "kerala",
        "contact", "email", "phone", "touch", "hire", "message", "write", "reach",
        "who are you", "tell me about yourself", "summary", "background", "about", "where are you",
        "location", "based", "live", "address", "family", "parent", "father", "mother", "personal", "sibling", "who is", "who is she",
        "instagram", "insta", "facebook", "dob", "birth", "birthday", "born", "age", "social", "socials", "ig", "fb"
    ]
    
    # Regular expressions for generic greetings or generic pronouns asking about "you" (referring to Megha Raj)
    patterns = [
        r"\bhi\b", r"\bhello\b", r"\bhey\b", r"\byou\b", r"\byour\b", r"\bshe\b", r"\bher\b"
    ]
    
    if any(kw in message_lc for kw in keywords):
        return True
        
    if any(re.search(pat, message_lc) for pat in patterns):
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

    # Greeting bucket
    if any(re.search(rf"\b{word}\b", message_lc) for word in ["hi", "hello", "hey", "greetings"]):
        return (
            f"Hello! I am Megha Raj's virtual assistant. I can tell you about her "
            f"experience, skills, education, projects, or how to contact her. What would you like to know?"
        )

    # Projects bucket
    if any(kw in message_lc for kw in ["project", "portfolio", "silentspeak", "cartoon", "robotic arm", "fruit picker", "gamma"]):
        if "silentspeak" in message_lc or "lip" in message_lc or "speech" in message_lc:
            p = next((proj for proj in profile_data.PROJECTS if proj["id"] == "silentspeak"), None)
            return (
                f"**{p['title']}** ({p['category']}):\n"
                f"{p['description']}\n\n"
                f"**Methodology**: {p['methodology']}\n"
                f"**Dataset**: {p['dataset']}\n"
                f"**Metrics**: {p['metrics']}\n"
                f"**Tech Stack**: {', '.join(p['tech_stack'])}."
            )
        elif "cartoon" in message_lc or "avatar" in message_lc or "image processing" in message_lc:
            p = next((proj for proj in profile_data.PROJECTS if proj["id"] == "cartoon-generator"), None)
            return (
                f"**{p['title']}** ({p['category']}):\n"
                f"{p['description']}\n\n"
                f"**Methodology**: {p['methodology']}\n"
                f"**Metrics**: {p['metrics']}\n"
                f"**Tech Stack**: {', '.join(p['tech_stack'])}."
            )
        elif "robot" in message_lc and "arm" in message_lc or "three.js" in message_lc or "kinematic" in message_lc:
            p = next((proj for proj in profile_data.PROJECTS if proj["id"] == "robotic-arm-web"), None)
            return (
                f"**{p['title']}** ({p['category']}):\n"
                f"{p['description']}\n\n"
                f"**Methodology**: {p['methodology']}\n"
                f"**Dataset**: {p['dataset']}\n"
                f"**Metrics**: {p['metrics']}\n"
                f"**Tech Stack**: {', '.join(p['tech_stack'])}."
            )
        elif "robot" in message_lc or "fruit" in message_lc or "picker" in message_lc:
            p = next((proj for proj in profile_data.PROJECTS if proj["id"] == "fruit-picker"), None)
            return (
                f"**{p['title']}** ({p['category']}):\n"
                f"{p['description']}\n\n"
                f"**Methodology**: {p['methodology']}\n"
                f"**Metrics**: {p['metrics']}\n"
                f"**Tech Stack**: {', '.join(p['tech_stack'])}."
            )
        elif "gamma" in message_lc or "ray" in message_lc:
            p = next((proj for proj in profile_data.PROJECTS if proj["id"] == "gamma-rays"), None)
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
            f"Megha Raj has built several academic and research-oriented projects:\n{project_list}\n\n"
            f"Ask me about a specific project (e.g., 'Tell me about SilentSpeak' or 'How does the cartoon generator work?') for methodology and dataset details!"
        )

    # Experience bucket
    if any(kw in message_lc for kw in ["experience", "work", "job", "career", "role", "history", "position"]):
        exp_details = []
        for e in profile_data.EXPERIENCE:
            current_tag = " (Current Role)" if e["is_current"] else ""
            desc_bullet = "\n".join([f"  * {bullet}" for bullet in e["description"]])
            exp_details.append(f"- **{e['role']}** at {e['company']} ({e['period']}){current_tag}:\n{desc_bullet}")
        
        return (
            f"Megha Raj has 3+ years of experience across Intelligent Automation (RPA), Data Analysis, and AI Research:\n\n"
            + "\n\n".join(exp_details)
        )

    # Skills bucket
    if any(kw in message_lc for kw in ["skill", "technology", "tools", "stack", "know", "programming", "languages"]):
        skill_categories = []
        for cat, items in profile_data.SKILLS.items():
            skill_categories.append(f"- **{cat}**: {', '.join(items)}")
        return (
            f"Megha Raj's core skills are organized into the following areas:\n\n"
            + "\n".join(skill_categories)
        )

    # Education bucket
    if any(kw in message_lc for kw in ["education", "study", "college", "university", "degree", "m.tech", "b.tech", "academics"]):
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

    # Contact bucket
    if any(kw in message_lc for kw in ["contact", "email", "reach", "phone", "touch", "hire", "message", "write"]):
        return (
            f"You can contact Megha Raj V S via:\n"
            f"- **Email**: {profile_data.PROFILE['email']}\n"
            f"- **Phone**: {profile_data.PROFILE['phone']}\n"
            f"- **Location**: {profile_data.PROFILE['location']}\n\n"
            f"Or you can submit the contact form on this page to send a real email directly to her!"
        )

    # Location bucket
    if any(kw in message_lc for kw in ["location", "live", "where", "from", "based", "address"]):
        return f"Megha Raj V S is based in **{profile_data.PROFILE['location']}**."

    # Family / Personal details / DOB bucket
    if any(kw in message_lc for kw in ["family", "parent", "father", "mother", "sibling", "personal", "brother", "sister", "home", "dob", "birth", "birthday", "born", "age"]):
        if any(kw in message_lc for kw in ["dob", "birth", "birthday", "born", "age"]):
            return f"Megha Raj V S was born on **September 15, 1997** (DoB: 15-09-1997)."
        return (
            f"Megha Raj V S resides with her family in Trivandrum, Kerala, India.\n\n"
            f"Her family has been a great support throughout her academic studies (M.Tech in Digital Image Computing) "
            f"and her professional career as a Data Scientist and AI Developer."
        )

    # Social Media bucket
    if any(kw in message_lc for kw in ["instagram", "insta", "facebook", "social", "socials", "ig", "fb"]):
        return (
            f"Here are Megha Raj V S's social media profiles:\n"
            f"- **Instagram**: [megha_vijayabalan](https://www.instagram.com/megha_vijayabalan?igsh=dzAxbnVkczBzNHBs) (username: `megha_vijayabalan`)\n"
            f"- **Facebook**: [megha_vijayabalan](https://www.facebook.com/share/1871xeJjCH/) (username: `megha_vijayabalan`)"
        )

    # Summary/who are you bucket
    if any(kw in message_lc for kw in ["summary", "background", "about", "who are you", "tell me about yourself", "who is megha", "who is she", "who is"]):
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
