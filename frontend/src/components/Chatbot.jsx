import { useEffect, useRef, useState } from "react";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";
import { defaultSuggestions, findAnswer } from "@/data/chatbotKnowledge";

/**
 * Free rule-based chatbot. No LLM, no API cost.
 * Matches user queries against a local knowledge base (chatbotKnowledge.js).
 */
const renderMarkdownLite = (text) => {
  // Very small MD subset: **bold** and preserved newlines
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      return <strong key={i}>{p.slice(2, -2)}</strong>;
    }
    return <span key={i}>{p}</span>;
  });
};

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    {
      role: "bot",
      text: "Hi! 👋 I'm Megha's AI assistant. Ask me anything about her skills, projects, experience, or how to reach her.",
      suggestions: defaultSuggestions,
    },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [unread, setUnread] = useState(0);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [msgs, thinking]);

  useEffect(() => {
    if (open) setUnread(0);
  }, [open]);

  const handleSend = (queryOverride) => {
    const q = (queryOverride ?? input).trim();
    if (!q) return;

    const userMsg = { role: "user", text: q };
    setMsgs((m) => [...m, userMsg]);
    setInput("");
    setThinking(true);

    // small delay to feel natural
    window.setTimeout(() => {
      const found = findAnswer(q);
      const botMsg = {
        role: "bot",
        text: found.answer,
        suggestions: found.suggestions || [],
      };
      setMsgs((m) => [...m, botMsg]);
      setThinking(false);
      if (!open) setUnread((u) => u + 1);
    }, 550);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSend();
  };

  return (
    <>
      <button
        className={`chatbot-fab ${open ? "is-open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle chatbot"
        data-testid="chatbot-toggle"
      >
        {open ? <X size={20} /> : <MessageSquare size={20} />}
        {!open && unread > 0 && (
          <span className="chatbot-badge">{unread}</span>
        )}
      </button>

      <div
        className={`chatbot-panel ${open ? "is-open" : ""}`}
        data-testid="chatbot-panel"
      >
        <div className="chatbot-header">
          <div className="chatbot-avatar">
            <Sparkles size={16} />
          </div>
          <div className="flex-1">
            <div className="chatbot-name">Megha AI Assistant</div>
            <div className="chatbot-status">
              <span className="chatbot-dot" /> Online · Free forever
            </div>
          </div>
          <button
            className="chatbot-close"
            onClick={() => setOpen(false)}
            aria-label="Close chat"
          >
            <X size={16} />
          </button>
        </div>

        <div className="chatbot-body" ref={bodyRef} data-testid="chatbot-body">
          {msgs.map((m, i) => (
            <div key={i} className={`chatbot-msg is-${m.role}`}>
              <div className="chatbot-bubble">
                {m.text.split("\n").map((line, j) => (
                  <p key={j}>{renderMarkdownLite(line)}</p>
                ))}
              </div>
              {m.role === "bot" && m.suggestions && m.suggestions.length > 0 && (
                <div className="chatbot-chips">
                  {m.suggestions.map((s) => (
                    <button
                      key={s}
                      className="chatbot-chip"
                      onClick={() => handleSend(s)}
                      data-testid={`chatbot-chip-${s.slice(0, 20)}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          {thinking && (
            <div className="chatbot-msg is-bot">
              <div className="chatbot-bubble chatbot-typing">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}
        </div>

        <form className="chatbot-input" onSubmit={onSubmit}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about skills, projects, contact…"
            data-testid="chatbot-input"
          />
          <button
            type="submit"
            className="chatbot-send"
            aria-label="Send"
            data-testid="chatbot-send"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </>
  );
};

export default Chatbot;
