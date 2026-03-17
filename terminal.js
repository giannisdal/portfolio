/* ═══════════════════════════════════════════════════════
   Terminal Portfolio – Interactive macOS Terminal
   ═══════════════════════════════════════════════════════ */

const output   = document.getElementById('output');
const input    = document.getElementById('command-input');
const terminal = document.getElementById('terminal');

// ── Command history (arrow up/down) ──
let history = [];
let historyIndex = -1;

// ══════════════════════════════════════════════════════════
//  EDIT YOUR INFO HERE – Replace with your real data!
// ══════════════════════════════════════════════════════════

const ASCII_BANNER = `
<span class="ascii-art">
   _____ _                   _     ____        _
  / ____(_)                 (_)   |  _ \\      | |
 | |  __ _  __ _ _ __  _ __  _ ___| | | | __ _| |
 | | |_ | |/ _\` | '_ \\| '_ \\| / __| | | |/ _\` | |
 | |__| | | (_| | | | | | | | \\__ \\ |_| | (_| | |
  \\_____|_|\\__,_|_| |_|_| |_|_|___/____/ \\__,_|_|
</span>`;

const COMMANDS = {

    help: () => `
<span class="section-header">📋 Available Commands</span>

  <span class="color-green bold">about</span>       <span class="color-sub">—  Who am I</span>
  <span class="color-green bold">skills</span>      <span class="color-sub">—  Technical skills</span>
  <span class="color-green bold">projects</span>    <span class="color-sub">—  Things I've built</span>
  <span class="color-green bold">experience</span>  <span class="color-sub">—  Work experience</span>
  <span class="color-green bold">education</span>   <span class="color-sub">—  Education background</span>
  <span class="color-green bold">contact</span>     <span class="color-sub">—  How to reach me</span>
  <span class="color-green bold">clear</span>       <span class="color-sub">—  Clear the terminal</span>
  <span class="color-green bold">help</span>        <span class="color-sub">—  Show this menu</span>

  <span class="color-sub">Tip: Use ↑ ↓ arrows to navigate history · Tab to autocomplete</span>`,

    about: () => `
<span class="section-header">👤 About Me</span>

  Hey! I'm <span class="color-green bold">Giannis Dalamaras</span>.

  Backend Software Engineer by day, Quantum Physicist
  by night. I build scalable backend systems with
  <span class="color-peach">Java Spring Boot</span> and explore the weird world of
  <span class="color-mauve">Quantum Computing</span> for my PhD.

  Based in <span class="color-yellow">Athens, Greece</span> 🇬🇷

  <span class="color-sub">Type <span class="color-yellow">skills</span> to see what I work with.</span>`,

    skills: () => `
<span class="section-header">🛠  Technical Skills</span>

  <span class="color-mauve bold">Backend</span>
    Java · Spring Boot · Spring Security · Hibernate
    Spring Data JPA · FastAPI · Python · Maven

  <span class="color-blue bold">AI / Data Science</span>
    LLMs · RAG · PyTorch · scikit-learn
    Neural Networks · Predictive Modeling

  <span class="color-teal bold">Databases</span>
    Oracle · PostgreSQL · MySQL · MongoDB
    Redis · Elasticsearch · Infinispan

  <span class="color-yellow bold">DevOps & Cloud</span>
    Docker · Kubernetes · CI/CD · Deployment
    GitHub Actions · Azure DevOps · Jenkins
    Production releases & environment management

  <span class="color-peach bold">Quantum & Scientific</span>
    QuTiP · DFT · Numerical Methods · GAMESS

  <span class="color-sub">Type <span class="color-yellow">projects</span> to see what I've built.</span>`,

    projects: () => `
<span class="section-header">🚀 Projects</span>

  <span class="color-peach bold">— Work (Uni Systems S.A.) —</span>

  <span class="color-green bold">01.</span> <span class="color-blue bold">Εθνικό Ποινικό Μητρώο</span>  <span class="color-green">✔ Production</span>
      <span class="color-sub">National Criminal Record system for the</span>
      <span class="color-sub">Ministry of Justice.</span>
      <span class="color-sub">Stack: Java · Spring Boot · Hibernate · ElasticSearch · Camel · JPA · Infinispan</span>

  <span class="color-green bold">02.</span> <span class="color-blue bold">Διαχείριση Ρίσκων – ΑΑΔΕ</span>  <span class="color-green">✔ Production</span>
      <span class="color-sub">Risk management platform for the Independent</span>
      <span class="color-sub">Authority for Public Revenue (AADE).</span>
      <span class="color-sub">Stack: Java · Spring Boot · SpringAI · FastAPI · JPA · OpenAI</span>

  <span class="color-green bold">03.</span> <span class="color-blue bold">Νομικό Συμβούλιο του Κράτους</span>  <span class="color-yellow">● Active</span>
      <span class="color-sub">Legal Council of the State – new project for</span>
      <span class="color-sub">the Ministry of Justice.</span>
      <span class="color-sub">Stack: Java · Spring Boot · Camel · JPA · Hibernate</span>

  <span class="color-peach bold">— Research —</span>

  <span class="color-green bold">04.</span> <span class="color-blue bold">Quantum Calculations using HEOM</span>
      <span class="color-sub">Hierarchical Equations of Motion method for</span>
      <span class="color-sub">open quantum system dynamics.</span>
      <span class="color-sub">Stack: Python · QuTiP · NumPy · PyTorch · Java · Spring Boot</span>

  <span class="color-green bold">05.</span> <span class="color-blue bold">Quantum Control Dynamics</span>
      <span class="color-sub">Simulations in molecular-nanophotonic structures</span>
      <span class="color-sub">with applications in quantum technologies.</span>
      <span class="color-sub">Stack: Qt · Python · QuTiP · NumPy · DFT · Gaussian · FastAPI</span>

  <span class="color-green bold">06.</span> <span class="color-blue bold">LIBS + Machine Learning</span>
      <span class="color-sub">Olive oil analysis via Laser Induced Breakdown</span>
      <span class="color-sub">Spectroscopy combined with ML algorithms.</span>
      <span class="color-sub">Stack: MatLAB · Python · scikit-learn · Data Analysis</span>

  <span class="color-sub">Type <span class="color-yellow">contact</span> to get in touch.</span>`,

    experience: () => `
<span class="section-header">💼 Experience</span>

  <span class="color-blue bold">Software Engineer</span>  <span class="color-sub">@ Uni Systems S.A.</span>
  <span class="color-yellow">Apr 2024 — Present</span>  <span class="color-sub">· Athens, Greece</span>
    • Backend development with Spring Boot & FastAPI
    • RESTful APIs, Spring Security (JWT/OAuth2)
    • AI integration with Spring AI & LLMs (RAG)
    • SQL/NoSQL databases & performance optimization
    • CI/CD pipelines, deployment & production releases
    • Containerization with Docker & Kubernetes
    • ML models (BERT, LSTM, Random Forest)

  <span class="color-blue bold">Research Assistant</span>  <span class="color-sub">@ NLOLA Lab, University of Patras</span>
  <span class="color-yellow">Sep 2018 — Mar 2022</span>  <span class="color-sub">· 3 yrs 7 mos · Full-time</span>
    • Desktop application development with Qt & Python
    • Machine learning & deep learning models
    • Data analysis & preprocessing pipelines
    • Scientific computing & visualization

  <span class="color-sub">Type <span class="color-yellow">education</span> to see my academic background.</span>`,

    education: () => `
<span class="section-header">🎓 Education</span>

  <span class="color-blue bold">PhD in Computational Quantum Physics</span>
  <span class="color-sub">University of Patras · Dept. of Materials Science</span>
  <span class="color-yellow">Jan 2024 — Present</span>
    Quantum Dynamics & Control in molecular-nanophotonic
    structures with applications in quantum technologies.

  <span class="color-blue bold">MSc in Physics</span> <span class="color-teal">(9.64 / 10.00)</span>
  <span class="color-sub">University of Patras · Photonics & Materials Physics</span>
  <span class="color-yellow">2019 — 2023</span>
    Thesis: Quantum Control Dynamics in the Homodimer of Cytosine

  <span class="color-blue bold">BSc in Physics</span> <span class="color-teal">(7.47 / 10.00)</span>
  <span class="color-sub">University of Patras</span>
    Thesis: Olive oil analysis via LIBS & machine learning`,

    contact: () => `
<span class="section-header">📬 Contact</span>

  <span class="color-green bold">Email</span>      <a class="terminal-link" href="mailto:giannisdalamaras@gmail.com">giannisdalamaras@gmail.com</a>
  <span class="color-green bold">GitHub</span>     <a class="terminal-link" href="https://github.com/giannisdal" target="_blank">github.com/giannisdal</a>
  <span class="color-green bold">LinkedIn</span>   <a class="terminal-link" href="https://linkedin.com/in/giannis-dalamaras" target="_blank">linkedin.com/in/giannis-dalamaras</a>
  <span class="color-green bold">Location</span>   Athens, Greece 🇬🇷

  <span class="color-sub">Feel free to reach out — I'd love to connect! 🤝</span>`,


    clear: () => {
        output.innerHTML = '';
        return null; // no output to print
    },

    secret: () => `
<span class="color-mauve">🎉 You found the secret command!</span>

  <span class="color-sub">Fun fact:</span>
  <span class="color-teal">I went from shooting lasers at olive oil 🫒 for my BSc
  to simulating quantum worlds 🔬 for my PhD — while
  writing Java by day ☕. Life's weird like that.</span>

  <span class="color-sub">Thanks for exploring! 🕵️</span>`,
};

// ── Welcome message ──
function showWelcome() {
    const welcomeHTML = `${ASCII_BANNER}
<span class="color-sub">  Welcome to my interactive portfolio!</span>
<span class="color-sub">  Type <span class="color-yellow">help</span> to see available commands.</span>
`;
    appendOutput(welcomeHTML);
}

// ══════════════════════════════════════════════════════════
//  TERMINAL ENGINE (no need to edit below)
// ══════════════════════════════════════════════════════════

function appendOutput(html) {
    const div = document.createElement('div');
    div.classList.add('output-line');
    div.innerHTML = html;
    output.appendChild(div);
    scrollToBottom();
}

function appendCommandEcho(cmd) {
    const div = document.createElement('div');
    div.classList.add('output-line', 'output-cmd');
    div.innerHTML = `<span class="prompt"><span class="prompt-full">visitor@portfolio</span><span class="prompt-short">~</span><span class="colon">:</span><span class="tilde">~</span><span class="dollar">$</span></span> ${escapeHtml(cmd)}`;
    output.appendChild(div);
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function scrollToBottom() {
    terminal.scrollTop = terminal.scrollHeight;
}

function processCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();

    // Echo the command
    appendCommandEcho(rawCmd);

    if (cmd === '') {
        scrollToBottom();
        return;
    }

    // Save to history
    history.push(rawCmd);
    historyIndex = history.length;

    // Lookup command
    if (COMMANDS[cmd]) {
        const result = COMMANDS[cmd]();
        if (result !== null && result !== undefined) {
            appendOutput(result);
        }
    } else {
        appendOutput(`<span class="color-red">zsh: command not found: ${escapeHtml(cmd)}</span>\n<span class="color-sub">Type <span class="color-yellow">help</span> to see available commands.</span>`);
    }

    scrollToBottom();
}

// ── Event listeners ──

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const cmd = input.value;
        input.value = '';
        processCommand(cmd);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            input.value = history[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < history.length - 1) {
            historyIndex++;
            input.value = history[historyIndex];
        } else {
            historyIndex = history.length;
            input.value = '';
        }
    } else if (e.key === 'Tab') {
        e.preventDefault();
        autocomplete(input.value.trim().toLowerCase());
    } else if (e.key === 'l' && e.ctrlKey) {
        e.preventDefault();
        COMMANDS.clear();
    }
});

// Click anywhere on terminal to focus input
terminal.addEventListener('click', () => {
    input.focus();
});

// ── Tab autocomplete ──
function autocomplete(partial) {
    if (!partial) return;
    const matches = Object.keys(COMMANDS).filter(c => c.startsWith(partial));
    if (matches.length === 1) {
        input.value = matches[0];
    } else if (matches.length > 1) {
        appendCommandEcho(partial);
        appendOutput(`<span class="color-sub">${matches.join('  ')}</span>`);
    }
}

// ── Initialize ──
showWelcome();
input.focus();

// ── iOS keyboard fix: scroll input into view when focused ──
input.addEventListener('focus', () => {
    setTimeout(() => {
        input.scrollIntoView({ block: 'end', behavior: 'smooth' });
        scrollToBottom();
    }, 300);
});

// ── Prevent iOS bounce / pull-to-refresh ──
document.body.addEventListener('touchmove', (e) => {
    if (!terminal.contains(e.target)) {
        e.preventDefault();
    }
}, { passive: false });

