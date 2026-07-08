document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Dark/Light Theme Switching
  // ==========================================
  const themeToggle = document.getElementById('theme-toggle');
  
  // Check persisted theme
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'light' || (!savedTheme && !systemPrefersDark)) {
    document.documentElement.classList.add('light-theme');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('light-theme');
      
      const currentTheme = document.documentElement.classList.contains('light-theme') ? 'light' : 'dark';
      localStorage.setItem('theme', currentTheme);
      
      // Dispatch custom event to notify canvas background
      window.dispatchEvent(new Event('theme-changed'));
    });
  }


  // ==========================================
  // 2. Navigation & Mobile Menu Toggle
  // ==========================================
  const header = document.querySelector('.header');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Change header background opacity on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      if (document.body.classList.contains('light-theme')) {
        header.style.backgroundColor = 'rgba(244, 251, 247, 0.95)';
      } else {
        header.style.backgroundColor = 'rgba(11, 19, 14, 0.95)';
      }
    } else {
      if (document.body.classList.contains('light-theme')) {
        header.style.backgroundColor = 'rgba(244, 251, 247, 0.85)';
      } else {
        header.style.backgroundColor = 'rgba(11, 19, 14, 0.85)';
      }
    }
  });

  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu on nav link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }


  // ==========================================
  // 3. Active Section Highlight in Nav
  // ==========================================
  const sections = document.querySelectorAll('section');
  
  const navObserverOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, navObserverOptions);

  sections.forEach(section => {
    navObserver.observe(section);
  });


  // ==========================================
  // 4. Scroll Reveal Animation (IntersectionObserver)
  // ==========================================
  const revealElements = document.querySelectorAll('[data-reveal]');
  
  const revealObserverOptions = {
    root: null,
    rootMargin: '0px 0px -8% 0px',
    threshold: 0.08
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, revealObserverOptions);

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });


  // ==========================================
  // 5. Project Card Collapsible Details Toggle
  // ==========================================
  const toggleDetailsButtons = document.querySelectorAll('.btn-toggle-details');

  toggleDetailsButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.project-card');
      if (!card) return;

      const isOpening = !card.classList.contains('details-open');
      
      // Close other open project cards
      document.querySelectorAll('.project-card.details-open').forEach(openCard => {
        if (openCard !== card) {
          openCard.classList.remove('details-open');
        }
      });

      card.classList.toggle('details-open');

      const textSpan = btn.querySelector('span');
      if (textSpan) {
        textSpan.textContent = isOpening ? 'Hide Technical Details' : 'View Technical Details';
      }
    });
  });


  // ==========================================
  // 6. Text-to-Speech (TTS) Read Aloud Engine
  // ==========================================
  const synth = window.speechSynthesis;
  let activeUtterance = null;
  let currentActiveBtn = null;
  let ttsText = "";
  let isTtsPaused = false;
  let speechRate = 1.0;
  let speechVolume = 0.9;
  let voices = [];

  const audioController = document.getElementById('audio-controller');
  const audioStatus = document.getElementById('audio-status');
  const audioPlayPause = document.getElementById('audio-play-pause');
  const audioStop = document.getElementById('audio-stop');
  const audioVolumeSlider = document.getElementById('audio-volume');
  const audioSpeedSlider = document.getElementById('audio-speed');

  // Load English voice options
  function loadVoices() {
    voices = synth.getVoices().filter(v => v.lang.startsWith('en'));
  }
  loadVoices();
  if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = loadVoices;
  }

  // Text Extractor helper
  function getSpeechTextForElement(type, id = null) {
    if (type === 'hero') {
      const name = document.querySelector('.hero__name').textContent;
      const headline = document.querySelector('.hero__headline').textContent;
      const desc = document.querySelector('.hero__desc').textContent;
      return `Welcome to the portfolio of ${name}. ${headline}. ${desc}`;
    }
    
    if (type === 'about') {
      const bioText = document.getElementById('about-bio-text').innerText;
      return `About Megha Raj V S. ${bioText}`;
    }
    
    if (type === 'journey') {
      let text = "Professional journey of Megha Raj V S. ";
      text += "Professional Experience: ";
      const expRows = document.querySelectorAll('#experience-timeline-text .career-row');
      expRows.forEach(row => {
        const role = row.querySelector('.career-row__title').textContent;
        const company = row.querySelector('.career-row__company').textContent;
        const period = row.querySelector('.career-row__period').textContent;
        const duration = row.querySelector('.career-row__badge').textContent;
        const details = Array.from(row.querySelectorAll('.timeline-list li')).map(li => li.textContent).join(', ');
        text += `${role} at ${company} for ${duration} from ${period}. Key achievements: ${details}. `;
      });
      
      text += "Education and Publications: ";
      const eduRows = document.querySelectorAll('#education-timeline-text .career-row');
      eduRows.forEach(row => {
        const degree = row.querySelector('.career-row__title').textContent;
        const institution = row.querySelector('.career-row__inst').textContent;
        const period = row.querySelector('.career-row__period').textContent;
        const badge = row.querySelector('.career-row__badge').textContent;
        let extra = "";
        const descEl = row.querySelector('.career-row__desc');
        if (descEl) extra = descEl.textContent;
        text += `${degree} from ${institution}, period: ${period}, details: ${badge} ${extra}. `;
      });
      return text;
    }

    if (type === 'achievements') {
      let text = "Key Achievements of Megha Raj V S. ";
      const achCards = document.querySelectorAll('#achievements-text .achievement-card__content p');
      achCards.forEach(p => {
        text += p.textContent + " ";
      });
      return text;
    }
    
    if (type === 'projects') {
      return (
        "Featured Projects by Megha Raj V S. We have SilentSpeak Visual Speech Recognition, " +
        "Comparison of Machine Learning methods for Gamma Rays, Fashion MNIST ANN Classifier, " +
        "Image Processing based Cartoon Generator, Autonomous Fruit Picker Robot, and 3D Robotic Arm Web Application. " +
        "Click individual listen buttons on each card to hear technical methodologies."
      );
    }
    
    if (type === 'project-single' && id) {
      const card = document.getElementById(`project-card-${id}`);
      if (!card) return "";
      
      const title = card.querySelector('.project-card__title').textContent;
      const desc = card.querySelector('.project-card__description').textContent;
      
      const methodTitle = card.querySelector('.project-card__meta-group:nth-child(1) .project-card__meta-title').textContent;
      const methodDesc = card.querySelector('.project-card__meta-group:nth-child(1) .project-card__meta-desc').textContent;
      
      let datasetText = "";
      const datasetGroup = card.querySelector('.project-card__meta-group:nth-child(2)');
      if (datasetGroup && datasetGroup.querySelector('.project-card__meta-title').textContent.includes('Dataset')) {
        datasetText = "Dataset details: " + datasetGroup.querySelector('.project-card__meta-desc').textContent + ". ";
      }
      
      const metricsGroup = card.querySelector('.project-card__meta-group:nth-last-child(2)');
      const metricsDesc = metricsGroup ? metricsGroup.querySelector('.project-card__meta-desc').textContent : "";
      
      const techChips = Array.from(card.querySelectorAll('.project-card__tech-chip')).map(chip => chip.textContent).join(', ');
      
      return (
        `Project: ${title}. ${desc}. ` +
        `Methodology: ${methodDesc}. ` +
        datasetText +
        `Metrics & Impact: ${metricsDesc}. ` +
        `Technologies used: ${techChips}.`
      );
    }
    
    return "";
  }

  // Trigger TTS Speech
  function speakText(text, label, triggerBtn) {
    // Reset state
    synth.cancel();
    
    if (currentActiveBtn) {
      currentActiveBtn.classList.remove('speaking');
    }

    ttsText = text;
    isTtsPaused = false;
    currentActiveBtn = triggerBtn;
    currentActiveBtn.classList.add('speaking');

    activeUtterance = new SpeechSynthesisUtterance(ttsText);
    
    // Voice preferences - pick a natural voice
    if (voices.length > 0) {
      // Prefer Google US English, Premium or natural male/female sounding voice
      const preferredVoice = voices.find(v => v.name.includes('Google US English') || v.name.includes('Natural')) || voices[0];
      activeUtterance.voice = preferredVoice;
    }

    activeUtterance.rate = speechRate;
    activeUtterance.volume = speechVolume;

    activeUtterance.onstart = () => {
      audioStatus.textContent = `Reading: ${label}`;
      audioController.classList.add('active');
      audioController.classList.add('playing');
    };

    activeUtterance.onend = () => {
      stopSpeech();
    };

    activeUtterance.onerror = (e) => {
      // Ignore interrupted errors caused by explicit synth.cancel() calls
      if (e.error === 'interrupted') return;
      console.error('Speech error:', e);
      stopSpeech();
    };

    synth.speak(activeUtterance);
  }

  function pauseSpeech() {
    synth.pause();
    isTtsPaused = true;
    audioController.classList.remove('playing');
  }

  function resumeSpeech() {
    synth.resume();
    isTtsPaused = false;
    audioController.classList.add('playing');
  }

  function stopSpeech() {
    synth.cancel();
    if (currentActiveBtn) {
      currentActiveBtn.classList.remove('speaking');
      currentActiveBtn = null;
    }
    activeUtterance = null;
    isTtsPaused = false;
    if (audioController) {
      audioController.classList.remove('active');
      audioController.classList.remove('playing');
    }
  }

  // Wire up general Section TTS Listen buttons
  const listenButtons = document.querySelectorAll('.btn-listen[data-read]');
  listenButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const readType = btn.getAttribute('data-read');
      
      if (currentActiveBtn === btn) {
        // Toggle play/pause if clicking the same button
        if (synth.speaking && !isTtsPaused) {
          pauseSpeech();
        } else if (isTtsPaused) {
          resumeSpeech();
        } else {
          stopSpeech();
        }
      } else {
        const text = getSpeechTextForElement(readType);
        let label = readType.charAt(0).toUpperCase() + readType.slice(1);
        if (readType === 'hero') label = "Introduction";
        speakText(text, label, btn);
      }
    });
  });

  // Wire up individual Project TTS Listen buttons
  const projectListenButtons = document.querySelectorAll('.btn-listen[data-read-project]');
  projectListenButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const projectId = btn.getAttribute('data-read-project');
      const card = document.getElementById(`project-card-${projectId}`);
      const title = card ? card.querySelector('.project-card__title').textContent : "Project Detail";
      
      if (currentActiveBtn === btn) {
        if (synth.speaking && !isTtsPaused) {
          pauseSpeech();
        } else if (isTtsPaused) {
          resumeSpeech();
        } else {
          stopSpeech();
        }
      } else {
        const text = getSpeechTextForElement('project-single', projectId);
        speakText(text, title, btn);
      }
    });
  });

  // Audio Control panel event listeners
  if (audioPlayPause) {
    audioPlayPause.addEventListener('click', () => {
      if (synth.speaking && !isTtsPaused) {
        pauseSpeech();
      } else if (isTtsPaused) {
        resumeSpeech();
      }
    });
  }

  if (audioStop) {
    audioStop.addEventListener('click', () => {
      stopSpeech();
    });
  }

  if (audioVolumeSlider) {
    audioVolumeSlider.addEventListener('input', (e) => {
      speechVolume = parseFloat(e.target.value);
      if (activeUtterance && synth.speaking) {
        // Update volume on the fly requires restarting speech in some browsers, 
        // but setting it handles future segments
        activeUtterance.volume = speechVolume;
      }
    });
  }

  if (audioSpeedSlider) {
    audioSpeedSlider.addEventListener('input', (e) => {
      speechRate = parseFloat(e.target.value);
      if (activeUtterance && synth.speaking) {
        // For on-the-fly speed adjustments, we temporarily cancel and restart from the beginning 
        // to maintain state simply.
        const labelText = audioStatus.textContent.replace("Reading: ", "");
        const currentBtn = currentActiveBtn;
        speakText(ttsText, labelText, currentBtn);
      }
    });
  }

  // Cancel speech on page unload
  window.addEventListener('beforeunload', () => {
    synth.cancel();
  });


  // ==========================================
  // 7. AJAX Contact Form Submission
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');

  if (contactForm && formMessage) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      formMessage.style.display = 'none';
      formMessage.className = 'form-message';
      formMessage.textContent = '';

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending Message...';

      const formData = new FormData(contactForm);

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          body: formData
        });

        const result = await response.json();
        
        formMessage.textContent = result.message;
        
        if (response.ok && result.success !== false) {
          formMessage.classList.add('success');
          contactForm.reset();
        } else {
          formMessage.classList.add('error');
        }
      } catch (err) {
        console.error('Contact error:', err);
        formMessage.classList.add('error');
        formMessage.textContent = 'An unexpected error occurred. Please try again or email Megha Raj V S directly.';
      } finally {
        formMessage.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    });
  }


  // ==========================================
  // 8. Floating Chatbot UI & Messaging
  // ==========================================
  const chatbotToggle = document.getElementById('chatbot-toggle');
  const chatbotDrawer = document.getElementById('chatbot-drawer');
  const chatbotFeed = document.getElementById('chatbot-feed');
  const chatbotInput = document.getElementById('chatbot-input');
  const chatbotSend = document.getElementById('chatbot-send');
  const suggestionChips = document.querySelectorAll('.suggestion-chip');

  if (chatbotToggle && chatbotDrawer) {
    chatbotToggle.addEventListener('click', () => {
      chatbotToggle.classList.toggle('active');
      chatbotDrawer.classList.toggle('active');
      
      if (chatbotDrawer.classList.contains('active')) {
        setTimeout(() => chatbotInput.focus(), 300);
      }
    });
  }

  suggestionChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const question = chip.getAttribute('data-question') || chip.textContent.trim();
      sendChatMessage(question);
    });
  });

  if (chatbotSend && chatbotInput) {
    chatbotSend.addEventListener('click', () => {
      const text = chatbotInput.value.trim();
      if (text) {
        sendChatMessage(text);
        chatbotInput.value = '';
      }
    });

    chatbotInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const text = chatbotInput.value.trim();
        if (text) {
          sendChatMessage(text);
          chatbotInput.value = '';
        }
      }
    });
  }

  function formatBotMessage(text) {
    let escaped = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    
    escaped = escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    escaped = escaped.replace(/`(.*?)`/g, '<code>$1</code>');
    escaped = escaped.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="chat-graph-img" style="max-width: 100%; border-radius: 8px; margin-top: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); display: block;">');

    const lines = escaped.split('\n');
    let inList = false;
    
    const parsedLines = lines.map(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        const itemContent = trimmed.substring(2);
        let prefix = '';
        if (!inList) {
          inList = true;
          prefix = '<ul>';
        }
        return prefix + `<li>${itemContent}</li>`;
      } else {
        let suffix = '';
        if (inList) {
          inList = false;
          suffix = '</ul>';
        }
        return suffix + line;
      }
    });
    
    let result = parsedLines.join('\n');
    if (inList) {
      result += '</ul>';
    }

    return result.replace(/\n/g, '<br>');
  }

  function appendChatBubble(sender, text) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble chat-bubble--${sender}`;
    
    if (sender === 'bot') {
      bubble.innerHTML = formatBotMessage(text);
    } else {
      bubble.textContent = text;
    }
    
    chatbotFeed.appendChild(bubble);
    chatbotFeed.scrollTop = chatbotFeed.scrollHeight;
  }

  async function sendChatMessage(messageText) {
    appendChatBubble('user', messageText);

    if (chatbotInput) chatbotInput.disabled = true;
    if (chatbotSend) chatbotSend.disabled = true;

    const loaderBubble = document.createElement('div');
    loaderBubble.className = 'chat-bubble chat-bubble--bot loader-bubble';
    loaderBubble.innerHTML = '<em>Thinking...</em>';
    chatbotFeed.appendChild(loaderBubble);
    chatbotFeed.scrollTop = chatbotFeed.scrollHeight;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: messageText })
      });

      const result = await response.json();
      loaderBubble.remove();

      if (response.ok) {
        appendChatBubble('bot', result.response);
      } else {
        appendChatBubble('bot', "Sorry, I'm having trouble processing that right now. Please try again!");
      }
    } catch (err) {
      console.error('Chat API error:', err);
      loaderBubble.remove();
      appendChatBubble('bot', "I couldn't reach the server. Please verify your connection and try again.");
    } finally {
      if (chatbotInput) {
        chatbotInput.disabled = false;
        chatbotInput.focus();
      }
      if (chatbotSend) chatbotSend.disabled = false;
    }
  }

  // ==========================================
  // 9. Career Section — Tab Switcher
  // ==========================================
  const careerTabs = document.querySelectorAll('.career-tab');
  const careerPanels = document.querySelectorAll('.career-panel');

  careerTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');

      // Update active tab button
      careerTabs.forEach(t => t.classList.remove('career-tab--active'));
      tab.classList.add('career-tab--active');

      // Show matching panel
      careerPanels.forEach(panel => {
        if (panel.id === `panel-${target}`) {
          panel.classList.add('career-panel--active');
        } else {
          panel.classList.remove('career-panel--active');
        }
      });
    });
  });

});
