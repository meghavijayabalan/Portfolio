import os
import smtplib
import urllib.request
import json
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv

import profile_data
import chatbot

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY", "dev-secret-key-12345")

@app.route("/")
def index():
    return render_template(
        "index.html",
        profile=profile_data.PROFILE,
        experience=profile_data.EXPERIENCE,
        skills=profile_data.SKILLS,
        projects=profile_data.PROJECTS,
        education=profile_data.EDUCATION
    )

@app.route("/api/chat", methods=["POST"])
def api_chat():
    data = request.get_json() or {}
    message = data.get("message", "").strip()
    
    if not message:
        return jsonify({"response": "I didn't receive any message. Please say something!"}), 400
        
    response_text = chatbot.get_chat_response(message)
    return jsonify({"response": response_text})

@app.route("/api/contact", methods=["POST"])
def api_contact():
    # Retrieve form data
    name = request.form.get("name", "").strip()
    email = request.form.get("email", "").strip()
    message = request.form.get("message", "").strip()
    
    if not name or not email or not message:
        return jsonify({
            "success": False,
            "message": "All fields (Name, Email, Message) are required."
        }), 400

    # Save submission locally to submissions.json as a fallback database
    try:
        import json
        import datetime
        submission_data = {
            "timestamp": datetime.datetime.now().isoformat(),
            "name": name,
            "email": email,
            "message": message
        }
        submissions_file = os.path.join(os.path.dirname(__file__), "submissions.json")
        submissions = []
        if os.path.exists(submissions_file):
            try:
                with open(submissions_file, "r", encoding="utf-8") as f:
                    submissions = json.load(f)
            except Exception:
                pass
        submissions.append(submission_data)
        with open(submissions_file, "w", encoding="utf-8") as f:
            json.dump(submissions, f, indent=2, ensure_ascii=False)
        print(f"Logged submission from {name} to submissions.json")
    except Exception as e:
        print(f"Failed to log submission: {e}")
        
    # Formspree integration
    formspree_form_id = os.getenv("FORMSPREE_FORM_ID", "").strip()
    if formspree_form_id:
        url = f"https://formspree.io/f/{formspree_form_id}"
        payload = {
            "name": name,
            "email": email,
            "message": message
        }
        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode("utf-8"),
            headers={
                "Content-Type": "application/json",
                "Accept": "application/json",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)"
            },
            method="POST"
        )
        try:
            with urllib.request.urlopen(req, timeout=10) as response:
                res_body = json.loads(response.read().decode("utf-8"))
                if res_body.get("ok"):
                    return jsonify({
                        "success": True,
                        "message": "Thank you! Your message has been sent successfully. Megha Raj V S will get back to you soon."
                    })
                else:
                    raise Exception("Formspree returned an error status.")
        except Exception as e:
            print(f"Formspree Error: {e}")
            return jsonify({
                "success": False,
                "message": (
                    f"Oops! There was an issue sending your message via Formspree: {str(e)}. "
                    f"Please reach out directly to Megha Raj V S at {profile_data.PROFILE['email']}."
                )
            })

    smtp_host = os.getenv("SMTP_HOST", "smtp.gmail.com")
    smtp_port = os.getenv("SMTP_PORT")
    smtp_user = os.getenv("SMTP_USER", "").strip()
    smtp_pass = os.getenv("SMTP_PASS", "").strip()
    contact_to = os.getenv("CONTACT_TO", "").strip() or profile_data.PROFILE["email"]
    
    if not smtp_user or not smtp_pass or not smtp_port:
        # Graceful fallback when mail is not configured
        return jsonify({
            "success": True,
            "is_configured": False,
            "message": (
                f"Thank you, {name}! Your message was processed, but the email server is not configured yet. "
                f"Please reach out directly to Megha Raj V S at {profile_data.PROFILE['email']}."
            )
        })
        
    try:
        port = int(smtp_port)
    except ValueError:
        port = 465
        
    try:
        # Create message container
        msg = MIMEMultipart()
        msg["From"] = smtp_user
        msg["To"] = contact_to
        msg["Subject"] = f"Portfolio Contact Form: Message from {name}"
        
        body = (
            f"You received a new message from your portfolio contact form:\n\n"
            f"Name: {name}\n"
            f"Email: {email}\n\n"
            f"Message:\n{message}\n"
        )
        msg.attach(MIMEText(body, "plain", "utf-8"))
        
        # Connect to SMTP server
        # Port 465 is typically SSL, others typically use STARTTLS
        if port == 465:
            server = smtplib.SMTP_SSL(smtp_host, port, timeout=10)
        else:
            server = smtplib.SMTP(smtp_host, port, timeout=10)
            server.ehlo()
            server.starttls()
            server.ehlo()
            
        server.login(smtp_user, smtp_pass)
        server.sendmail(smtp_user, contact_to, msg.as_string())
        server.quit()
        
        return jsonify({
            "success": True,
            "message": "Thank you! Your message has been sent successfully. Megha Raj V S will get back to you soon."
        })
        
    except Exception as e:
        print(f"SMTP Error: {e}")
        return jsonify({
            "success": False,
            "is_configured": True,
            "message": (
                f"Oops! There was an issue sending your message via email: {str(e)}. "
                f"Please reach out directly to Megha Raj V S at {profile_data.PROFILE['email']}."
            )
        })

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5050, debug=True)
