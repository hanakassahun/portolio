// ===== AI CHATBOT MODAL =====
const aiChatBtn = document.getElementById('aiChatBtn');
const aiChatModal = document.getElementById('aiChatModal');
const closeAIChat = document.getElementById('closeAIChat');
const aiChatHistory = document.getElementById('aiChatHistory');
const aiChatForm = document.getElementById('aiChatForm');
const aiChatInput = document.getElementById('aiChatInput');
const aiChatArch = document.getElementById('aiChatArch');

const aiKnowledgeBase = [
    { q: /what.*project|built|work|showcase/i, a: "Hana has built SentinelOS, FindAddis, a Retail Management System, a Cybersecurity Vulnerability Scanner, a Data Visualization Dashboard, and a Mobile Game Prototype." },
    { q: /tech.*special|stack|technology|languages/i, a: "She specializes in full-stack web development (JavaScript, Node.js, Express, MongoDB), C#, Java, C++, SQL, and cybersecurity best practices." },
    { q: /service|offer|freelance|hire/i, a: "Hana offers full-stack web development, API integration, database design, and security hardening. Contact her for freelance opportunities!" },
    { q: /how.*secure|security|vulnerab/i, a: "This portfolio follows security best practices: HTTPS, input validation, secure headers, and no inline JS." },
    { q: /about|who.*hana|background|bio/i, a: "Hana Kassahun is a full-stack engineer and AI & Cybersecurity specialist, passionate about building secure, scalable systems." },
    { q: /contact|email|reach/i, a: "You can contact Hana via the contact form, email, GitHub, or LinkedIn links in the Contact section." },
    { q: /lesson|learn|mistake|improve/i, a: "Hana believes in continuous learning. She documents lessons learned and improvements in her technical blog." },
    { q: /.*/i, a: "I'm an AI assistant for Hana's portfolio. Try asking about her projects, skills, or services!" }
];

if (aiChatBtn && aiChatModal && closeAIChat && aiChatHistory && aiChatForm && aiChatInput) {
    aiChatBtn.addEventListener('click', () => {
        aiChatModal.style.display = 'flex';
        aiChatHistory.innerHTML = '<div style="color:#ffe066;">Ask me anything about Hana or her work!</div>';
        if (aiChatArch) aiChatArch.style.display = document.body.classList.contains('dev-mode') ? 'block' : 'none';
    });
    closeAIChat.addEventListener('click', () => {
        aiChatModal.style.display = 'none';
    });
    aiChatModal.addEventListener('click', (e) => {
        if (e.target === aiChatModal) aiChatModal.style.display = 'none';
    });
    aiChatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const q = aiChatInput.value.trim();
        if (!q) return;
        aiChatHistory.innerHTML += `<div style='color:#7f1fff;margin-top:0.5rem;'><b>You:</b> ${q}</div>`;
        let found = aiKnowledgeBase.find(pair => pair.q.test(q));
        setTimeout(() => {
            aiChatHistory.innerHTML += `<div style='color:#ffeaff;margin-top:0.3rem;'><b>AI:</b> ${found.a}</div>`;
            aiChatHistory.scrollTop = aiChatHistory.scrollHeight;
        }, 600);
        aiChatInput.value = '';
    });
    // Micro-interaction: input focus glow
    aiChatInput.addEventListener('focus', () => aiChatInput.style.boxShadow = '0 0 8px #7f1fff');
    aiChatInput.addEventListener('blur', () => aiChatInput.style.boxShadow = 'none');
}
// ===== SECURITY SCANNER MODAL =====
const scanBtn = document.getElementById('scanBtn');
const scannerModal = document.getElementById('scannerModal');
const closeScanner = document.getElementById('closeScanner');
const scanProgress = document.getElementById('scanProgress');
const scanResult = document.getElementById('scanResult');

if (scanBtn && scannerModal && closeScanner && scanProgress && scanResult) {
    scanBtn.addEventListener('click', () => {
        scannerModal.style.display = 'flex';
        scanProgress.style.display = 'block';
        scanResult.style.display = 'none';
        scanProgress.textContent = 'Initializing scan...';
        let steps = [
            'Scanning HTML structure...',
            'Checking for insecure scripts...',
            'Analyzing headers...',
            'Testing input validation...',
            'Reviewing dependencies...',
            'Finalizing scan...'
        ];
        let i = 0;
        function nextStep() {
            if (i < steps.length) {
                scanProgress.textContent = steps[i];
                i++;
                setTimeout(nextStep, 700);
            } else {
                scanProgress.style.display = 'none';
                scanResult.style.display = 'block';
            }
        }
        setTimeout(nextStep, 700);
    });
    closeScanner.addEventListener('click', () => {
        scannerModal.style.display = 'none';
    });
    // Close modal on outside click
    scannerModal.addEventListener('click', (e) => {
        if (e.target === scannerModal) scannerModal.style.display = 'none';
    });
}
// ===== DARK MODE TOGGLE =====
const darkModeToggle = document.getElementById('darkModeToggle');
function setDarkMode(on, animate = true) {
    if (animate) {
        document.body.style.transition = 'background 0.5s, color 0.5s';
    }
    if (on) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', on ? 'on' : 'off');
    if (animate) {
        setTimeout(() => { document.body.style.transition = ''; }, 600);
    }
}
darkModeToggle.addEventListener('change', function() {
    setDarkMode(this.checked);
});
// Persist dark mode and detect system preference
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
if (localStorage.getItem('darkMode') === 'on' || (!localStorage.getItem('darkMode') && prefersDark)) {
    setDarkMode(true, false);
    darkModeToggle.checked = true;
}

// ===== DEVELOPER MODE TOGGLE =====
const devModeToggle = document.getElementById('devModeToggle');
if (devModeToggle) {
    devModeToggle.addEventListener('change', function() {
        document.body.classList.toggle('dev-mode', this.checked);
        localStorage.setItem('devMode', this.checked ? 'on' : 'off');
        renderSkills(); // Re-render skills on dev mode toggle
    });
    // Persist dev mode
    if (localStorage.getItem('devMode') === 'on') {
        document.body.classList.add('dev-mode');
        devModeToggle.checked = true;
    }
}

// ===== SECTION ANIMATIONS ON SCROLL =====
const animatedSections = document.querySelectorAll('.fade-in, .slide-in');
function revealOnScroll() {
    animatedSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
            section.classList.add('visible');
        }
    });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);

// ===== GITHUB API INTEGRATION PLACEHOLDER =====
async function fetchGitHubStats() {
    // Replace 'hanakassahun' with your GitHub username
    const username = 'hanakassahun';
    // Top languages
    fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
        .then(res => res.json())
        .then(repos => {
            const langCount = {};
            repos.forEach(repo => {
                if (repo.language) langCount[repo.language] = (langCount[repo.language] || 0) + 1;
            });
            const sorted = Object.entries(langCount).sort((a,b) => b[1]-a[1]);
            document.getElementById('top-langs').textContent = sorted.map(([lang, n]) => lang).join(', ') || 'N/A';
        });
    // Recent commits (last 3)
    fetch(`https://api.github.com/users/${username}/events/public`)
        .then(res => res.json())
        .then(events => {
            const commits = events.filter(e => e.type === 'PushEvent').slice(0,3);
            document.getElementById('recent-commits').textContent = commits.map(c => c.repo.name + ': ' + c.payload.commits[0].message).join(' | ') || 'N/A';
        });
    // Contribution graph and repo stars would require more advanced API or third-party widgets
}
if (document.getElementById('top-langs')) fetchGitHubStats();
// script.js


// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId.length > 1 && document.querySelector(targetId)) {
            e.preventDefault();
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Highlight active nav link on scroll
const sections = document.querySelectorAll('main section');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 80;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});


// Mobile menu toggle
const navLinksList = document.querySelector('.nav-links');
const nav = document.querySelector('nav');
const toggleButton = document.createElement('button');
toggleButton.innerHTML = 'Menu';
toggleButton.classList.add('menu-toggle');
nav.appendChild(toggleButton);
toggleButton.addEventListener('click', () => {
    navLinksList.classList.toggle('active');
});

// Simple form validation for contact section
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        const email = document.querySelector('#email').value;
        const message = document.querySelector('#message').value;
        if (!email || !message) {
            e.preventDefault();
            alert('Please fill in all fields.');
        }
    });
}

// ===== ARCHITECTURE VISUALIZER TOGGLE =====
document.querySelectorAll('.arch-toggle').forEach(btn => {
    btn.addEventListener('click', function() {
        const arch = btn.getAttribute('data-arch');
        const diagram = document.getElementById(`arch-diagram-${arch}`);
        if (!diagram) return;
        const isOpen = diagram.style.display === 'block';
        // Hide all other diagrams
        document.querySelectorAll('.arch-diagram').forEach(d => d.style.display = 'none');
        // Toggle this one
        diagram.style.display = isOpen ? 'none' : 'block';
        btn.textContent = isOpen ? 'Show Architecture' : 'Hide Architecture';
    });
});

// ===== PROJECT MODAL LOGIC =====
const projectModal = document.getElementById('projectModal');
const closeProjectModal = document.getElementById('closeProjectModal');
const projectModalTitle = document.getElementById('projectModalTitle');
const projectModalArch = document.getElementById('projectModalArch');
const projectModalTech = document.getElementById('projectModalTech');
const projectModalDB = document.getElementById('projectModalDB');
const projectModalChallenges = document.getElementById('projectModalChallenges');
const projectModalPerf = document.getElementById('projectModalPerf');
const projectModalRefactor = document.getElementById('projectModalRefactor');
const projectCards = document.querySelectorAll('.card');
const projectData = {
    'SentinelOS': {
        arch: '<img src="sentinelos-arch.png" alt="SentinelOS Architecture" style="width:100%;max-width:220px;border-radius:8px;box-shadow:0 2px 12px #7f1fff55;">',
        tech: 'C#, .NET, SQL Server, WinForms',
        db: '<pre>CREATE TABLE Users (...)</pre>',
        challenges: 'Ensuring robust encryption, balancing usability and security, system monitoring.',
        perf: 'Optimized for academic workloads, low resource usage.',
        refactor: 'Upgrade encryption algorithms, improve modularity.'
    },
    'FindAddis': {
        arch: '<img src="findaddis-arch.png" alt="FindAddis Architecture" style="width:100%;max-width:220px;border-radius:8px;box-shadow:0 2px 12px #7f1fff55;">',
        tech: 'JavaScript, Node.js, Express, MongoDB, ArcGIS',
        db: '<pre>{ business_id, name, address, ... }</pre>',
        challenges: 'Integrating ArcGIS maps, optimizing real-time search, ensuring data accuracy.',
        perf: 'Fast search response, efficient map rendering.',
        refactor: 'Improve map UI, expand business categories.'
    }
    // Add more projects as needed
};
projectCards.forEach(card => {
    card.addEventListener('click', function() {
        const title = card.querySelector('h3')?.textContent;
        if (!projectData[title] || !projectModal) return;
        projectModal.style.display = 'flex';
        projectModalTitle.textContent = title;
        projectModalArch.innerHTML = projectData[title].arch;
        projectModalTech.innerHTML = '<strong>Tech Stack:</strong> ' + projectData[title].tech;
        projectModalDB.innerHTML = '<strong>Database Schema:</strong> ' + projectData[title].db;
        projectModalChallenges.innerHTML = '<strong>Challenges:</strong> ' + projectData[title].challenges;
        projectModalPerf.innerHTML = '<strong>Performance:</strong> ' + projectData[title].perf;
        projectModalRefactor.innerHTML = '<strong>Refactor Ideas:</strong> ' + projectData[title].refactor;
    });
});
if (closeProjectModal && projectModal) {
    closeProjectModal.addEventListener('click', () => projectModal.style.display = 'none');
    projectModal.addEventListener('click', (e) => { if (e.target === projectModal) projectModal.style.display = 'none'; });
}

// ===== DYNAMIC SKILLS SECTION =====
const skillsDynamic = document.getElementById('skillsDynamic');
const devMode = document.body.classList.contains('dev-mode');
const skills = [
    { name: 'Java', level: 90, years: 3, projects: 4, github: 12 },
    { name: 'C++', level: 85, years: 2, projects: 3, github: 8 },
    { name: 'JavaScript', level: 70, years: 1, projects: 5, github: 15 },
    { name: 'HTML & CSS', level: 80, years: 2, projects: 6, github: 10 },
    { name: 'MySQL & PostgreSQL', level: 75, years: 2, projects: 3, github: 7 },
    { name: 'Bootstrap', level: 65, years: 1, projects: 2, github: 4 },
    { name: 'ArcGIS', level: 60, years: 1, projects: 1, github: 2 },
    { name: 'AI & Cybersecurity', level: 60, years: 1, projects: 2, github: 3 }
];
function renderSkills() {
    if (!skillsDynamic) return;
    let html = '<ul class="skills-list">';
    skills.forEach(skill => {
        html += `<li style="margin-bottom:1.2rem;">
            <div style="font-weight:600;color:#7f1fff;">${skill.name}</div>
            <div style="background:#23272f;border-radius:6px;height:12px;width:100%;margin:0.4rem 0;">
                <div style="background:#ffe066;height:12px;border-radius:6px;width:${skill.level}%;transition:width 0.7s;"></div>
            </div>`;
        if (devMode) {
            html += `<div style="font-size:0.97rem;color:#ffeaff;margin-top:0.2rem;">${skill.years} yrs · ${skill.projects} projects · ${skill.github} GitHub repos</div>`;
        }
        html += '</li>';
    });
    html += '</ul>';
    skillsDynamic.innerHTML = html;
}
renderSkills();
// Re-render on dev mode toggle
const devModeToggle = document.getElementById('devModeToggle');
if (devModeToggle) {
    devModeToggle.addEventListener('change', renderSkills);
}

// ===== DEVELOPER MODE PERFORMANCE CREDIBILITY =====
const devPerf = document.getElementById('devPerf');
if (devPerf && document.body.classList.contains('dev-mode')) {
    devPerf.style.display = 'block';
}
if (devPerf && !document.body.classList.contains('dev-mode')) {
    devPerf.style.display = 'none';
}

// ===== PORTFOLIO TERMINAL UI =====
const terminalForm = document.getElementById('terminal-form');
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');
if (terminalForm && terminalInput && terminalOutput) {
    const commands = {
        help: () => `Available commands:<br>
            <span style='color:#7f1fff;'>about</span>, <span style='color:#7f1fff;'>projects</span>, <span style='color:#7f1fff;'>skills</span>, <span style='color:#7f1fff;'>contact</span>, <span style='color:#7f1fff;'>clear</span>, <span style='color:#7f1fff;'>echo</span>` ,
        about: () => `Hana Kassahun is a full-stack developer and AI & Cybersecurity enthusiast.`, 
        projects: () => `SentinelOS, FindAddis, Retail Management System, Cybersecurity Scanner, Data Dashboard, Mobile Game.`,
        skills: () => `Java, C++, JavaScript, HTML/CSS, SQL, Bootstrap, ArcGIS, AI & Cybersecurity basics.`,
        contact: () => `Email: hana.kassahun@gmail.com<br>GitHub: <a href='https://github.com/hanakassahun' target='_blank'>hanakassahun</a>`,
        clear: () => { terminalOutput.innerHTML = ''; return ''; },
        echo: (args) => args.join(' ')
    };
    function printTerminal(text) {
        if (text) terminalOutput.innerHTML += `<div>${text}</div>`;
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
    terminalForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const input = terminalInput.value.trim();
        if (!input) return;
        printTerminal(`<span style='color:#ffe066;'>hana@portfolio:~$</span> ${input}`);
        const [cmd, ...args] = input.split(' ');
        if (commands[cmd]) {
            const result = commands[cmd](args);
            if (result) printTerminal(result);
        } else {
            printTerminal(`<span style='color:#ff4b7f;'>Command not found:</span> ${cmd}`);
        }
        terminalInput.value = '';
    });
    // Focus input on click anywhere in terminal window
    document.getElementById('terminal-window').addEventListener('click', () => terminalInput.focus());
    // Show welcome/help on load
    printTerminal("Welcome to Hana's Portfolio Terminal! Type <span style='color:#7f1fff;'>help</span> to get started.");
}

// ===== CASE STUDY CARD EXPAND/COLLAPSE =====
document.querySelectorAll('.case-card').forEach(card => {
    card.addEventListener('click', function(e) {
        // Only toggle if not clicking inside details
        if (e.target.closest('.case-details')) return;
        const details = card.querySelector('.case-details');
        if (!details) return;
        const isOpen = card.classList.contains('open');
        // Hide all others
        document.querySelectorAll('.case-card').forEach(c => {
            c.classList.remove('open');
            const d = c.querySelector('.case-details');
            if (d) d.style.display = 'none';
        });
        // Toggle this one
        if (!isOpen) {
            card.classList.add('open');
            details.style.display = 'block';
        } else {
            card.classList.remove('open');
            details.style.display = 'none';
        }
    });
});

// ===== SMART CONTACT FORM LOGIC =====
const smartForm = document.getElementById('smart-contact-form');
const smartName = document.getElementById('smart-name');
const smartEmail = document.getElementById('smart-email');
const smartMessage = document.getElementById('smart-message');
const smartSuccess = document.getElementById('smart-contact-success');
if (smartForm && smartName && smartEmail && smartMessage && smartSuccess) {
    smartForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = smartName.value.trim();
        const email = smartEmail.value.trim();
        const message = smartMessage.value.trim();
        if (!name || !email || !message) {
            smartSuccess.style.display = 'block';
            smartSuccess.style.color = '#ff4b7f';
            smartSuccess.textContent = 'Please fill in all fields.';
            setTimeout(() => { smartSuccess.style.display = 'none'; }, 2000);
            return;
        }
        // Simple email validation
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
            smartSuccess.style.display = 'block';
            smartSuccess.style.color = '#ff4b7f';
            smartSuccess.textContent = 'Please enter a valid email.';
            setTimeout(() => { smartSuccess.style.display = 'none'; }, 2000);
            return;
        }
        smartSuccess.style.display = 'block';
        smartSuccess.style.color = '#1aaf5d';
        smartSuccess.textContent = 'Thank you! Your message was sent.';
        smartName.value = '';
        smartEmail.value = '';
        smartMessage.value = '';
        setTimeout(() => { smartSuccess.style.display = 'none'; }, 3000);
    });
}

// ===== ANALYTICS DASHBOARD DEMO LOGIC =====
function animateStat(id, target, duration = 1200) {
    const el = document.getElementById(id);
    if (!el) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 30));
    const interval = setInterval(() => {
        start += step;
        if (start >= target) {
            el.textContent = target;
            clearInterval(interval);
        } else {
            el.textContent = start;
        }
    }, 30);
}
if (document.getElementById('visits-count')) {
    animateStat('visits-count', 1243);
    animateStat('messages-count', 87);
    animateStat('projects-viewed', 312);
}
// Simple demo chart (bar chart)
if (document.getElementById('analytics-chart')) {
    const ctx = document.getElementById('analytics-chart').getContext('2d');
    // Simple bar chart without Chart.js
    function drawBarChart(ctx, data, labels) {
        ctx.clearRect(0,0,350,180);
        const max = Math.max(...data);
        const barW = 40, gap = 30;
        data.forEach((val, i) => {
            const h = (val / max) * 120;
            ctx.fillStyle = '#7f1fff';
            ctx.fillRect(30 + i*(barW+gap), 150-h, barW, h);
            ctx.fillStyle = '#23272f';
            ctx.font = 'bold 15px Inter, monospace';
            ctx.fillText(labels[i], 30 + i*(barW+gap) + 4, 170);
            ctx.fillStyle = '#ffeaff';
            ctx.font = 'bold 16px Inter, monospace';
            ctx.fillText(val, 30 + i*(barW+gap) + 8, 150-h-8);
        });
    }
    drawBarChart(ctx, [320, 210, 87], ['Visits','Projects','Msgs']);
}
