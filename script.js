/* ==========================================================
   Portfólio Maria Clara — lógica da página
   ========================================================== */

// Troque pelo seu e-mail real
const CONTACT_EMAIL = 'mariaclara.dev@exemplo.com';

/* ---------- 1. Efeito de digitação ---------- */
const phrases = [
    'Desenvolvedora C / C++ / Web',
    'Estudante de Ciência da Computação',
    'Entusiasta em IA & Cibersegurança',
    'Buscando Estágio na área de TI'
];
const TYPING_SPEED = 100;
const DELETING_SPEED = 50;
const DELAY_BETWEEN = 1800;

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
    const target = document.getElementById('typingText');
    if (!target) return;

    const current = phrases[phraseIndex];

    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }
    target.textContent = current.substring(0, charIndex);

    if (!isDeleting && charIndex === current.length) {
        isDeleting = true;
        setTimeout(typeLoop, DELAY_BETWEEN);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeLoop, 300);
    } else {
        setTimeout(typeLoop, isDeleting ? DELETING_SPEED : TYPING_SPEED);
    }
}

function initTyping() {
    const target = document.getElementById('typingText');
    if (!target) return;

    // Sem animação para quem prefere menos movimento
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        target.textContent = phrases[0];
        target.classList.remove('cursor-blink');
        return;
    }
    typeLoop();
}

/* ---------- 2. Menu mobile ---------- */
function initMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const menu = document.getElementById('mobileMenu');
    if (!btn || !menu) return;

    const setOpen = (open) => {
        menu.classList.toggle('hidden', !open);
        btn.setAttribute('aria-expanded', String(open));
    };

    btn.addEventListener('click', () => {
        setOpen(menu.classList.contains('hidden'));
    });

    menu.querySelectorAll('.mobile-link').forEach((link) => {
        link.addEventListener('click', () => setOpen(false));
    });
}

/* ---------- 3. Filtros (habilidades e projetos) ---------- */
const ACTIVE_CLASSES = ['bg-neonPurple', 'text-white'];
const INACTIVE_CLASSES = ['bg-darkCard', 'text-gray-400'];

function setActiveTab(tabs, activeTab) {
    tabs.forEach((tab) => {
        tab.classList.remove(...ACTIVE_CLASSES);
        tab.classList.add(...INACTIVE_CLASSES);
        tab.setAttribute('aria-pressed', 'false');
    });
    activeTab.classList.remove(...INACTIVE_CLASSES);
    activeTab.classList.add(...ACTIVE_CLASSES);
    activeTab.setAttribute('aria-pressed', 'true');
}

function setupFilter({ tabSelector, cardSelector, displayValue }) {
    const tabs = document.querySelectorAll(tabSelector);
    const cards = document.querySelectorAll(cardSelector);

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            const category = tab.dataset.filter;
            setActiveTab(tabs, tab);

            cards.forEach((card) => {
                const visible = category === 'all' || card.classList.contains(category);
                card.style.display = visible ? displayValue : 'none';
            });
        });
    });
}

/* ---------- 4. Modais ---------- */
const projectData = {
    1: {
        title: 'Portal de Apoio Social',
        category: 'Desenvolvimento Web & REST API',
        description: 'Este projeto foi idealizado para conectar pessoas e ONGs que precisam de apoio comunitário. Oferece um formulário dinâmico, lista interativa de necessidades e integração com serviços simulados de doação.',
        techs: ['HTML5', 'CSS3', 'JavaScript ES6', 'REST APIs', 'Git/GitHub'],
        features: [
            'Validação completa de formulários em JavaScript',
            'Layout responsivo focado em acessibilidade mobile',
            'Integração simulada com endpoints REST para cadastro de solicitações'
        ],
        link: 'https://github.com'
    },
    2: {
        title: 'Labyrinth Engine (C)',
        category: 'Algoritmos & Projeto de Terminal',
        description: 'Jogo de labirinto via linha de comando programado do zero em Linguagem C. O objetivo é testar conceitos avançados de estruturas de dados, matrizes dinâmicas e gerenciamento manual de memória com ponteiros.',
        techs: ['Linguagem C', 'Ponteiros & Malloc', 'Compilador GCC', 'Linux Terminal'],
        features: [
            'Alocação e liberação correta de memória (zero memory leak)',
            'Sistema de salvamento de mapas via arquivos de texto',
            'Interface interativa direto no terminal Linux/Windows'
        ],
        link: 'https://github.com'
    },
    3: {
        title: 'StudyTracker Mobile Concept',
        category: 'UI/UX & Estudo Mobile',
        description: 'Estudo de caso focado na prototipagem e desenvolvimento da arquitetura de um aplicativo para acompanhamento de tarefas acadêmicas e cronogramas de prova.',
        techs: ['Figma', 'React Native (Conceitual)', 'Design de Interfaces'],
        features: [
            'Fluxo de navegação otimizado para estudantes',
            'Componentização e design system escuro',
            'Modo timer Pomodoro integrado ao protótipo'
        ],
        link: 'https://github.com'
    }
};

let lastFocusedElement = null;

function openModal(modal) {
    lastFocusedElement = document.activeElement;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    const closeBtn = modal.querySelector('[data-close-modal]');
    if (closeBtn) closeBtn.focus();
}

function closeModal(modal) {
    modal.classList.remove('is-open');
    if (!document.querySelector('.modal.is-open')) {
        document.body.style.overflow = '';
    }
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
        lastFocusedElement.focus();
    }
}

function openProjectDetails(id) {
    const data = projectData[id];
    if (!data) return;

    const content = document.getElementById('modalContent');
    content.innerHTML = `
        <span class="text-xs font-mono text-neonPurple uppercase">${data.category}</span>
        <h3 id="projectModalTitle" class="text-2xl font-bold text-white mt-1 mb-4">${data.title}</h3>
        <p class="text-sm text-gray-300 leading-relaxed mb-4">${data.description}</p>

        <h4 class="font-bold text-xs uppercase font-mono text-neonCyan mb-2">Recursos Principais:</h4>
        <ul class="list-disc list-inside text-xs text-gray-400 space-y-1 mb-6">
            ${data.features.map((f) => `<li>${f}</li>`).join('')}
        </ul>

        <h4 class="font-bold text-xs uppercase font-mono text-neonPurple mb-2">Tecnologias Utilizadas:</h4>
        <div class="flex flex-wrap gap-2 mb-6">
            ${data.techs.map((t) => `<span class="px-2.5 py-1 rounded bg-gray-800 text-xs font-mono text-gray-300">${t}</span>`).join('')}
        </div>

        <div class="flex justify-end gap-3 pt-4 border-t border-gray-800">
            <button type="button" data-close-modal class="px-4 py-2 rounded-xl bg-gray-800 text-gray-300 text-xs font-mono hover:bg-gray-700">Fechar</button>
            <a href="${data.link}" target="_blank" rel="noopener noreferrer" class="px-4 py-2 rounded-xl bg-neonPurple text-white text-xs font-mono hover:opacity-90 flex items-center gap-2">
                <i class="fab fa-github"></i> Ver no GitHub
            </a>
        </div>
    `;

    openModal(document.getElementById('projectModal'));
}

function initModals() {
    // Botões "Detalhes" dos projetos
    document.querySelectorAll('[data-project]').forEach((btn) => {
        btn.addEventListener('click', () => openProjectDetails(btn.dataset.project));
    });

    // Botões de abrir o currículo (desktop e mobile)
    document.querySelectorAll('[data-open-cv]').forEach((btn) => {
        btn.addEventListener('click', () => openModal(document.getElementById('cvModal')));
    });

    // Fechar: botão X / "Fechar", clique no fundo e tecla Esc
    document.querySelectorAll('.modal').forEach((modal) => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.closest('[data-close-modal]')) {
                closeModal(modal);
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.is-open').forEach(closeModal);
        }
    });

    const downloadBtn = document.getElementById('downloadCvBtn');
    if (downloadBtn) downloadBtn.addEventListener('click', downloadCv);
}

/* ---------- 5. Download do currículo (versão texto) ---------- */
function downloadCv() {
    const text = [
        'CURRÍCULO - MARIA CLARA',
        'Estudante de Ciência da Computação (PUC Minas)',
        `E-mail: ${CONTACT_EMAIL}`,
        'GitHub: github.com/mariaclara',
        '',
        'Resumo:',
        'Estudante em busca de estágio com foco em C/C++, Java e Desenvolvimento Web.'
    ].join('\n');

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Curriculo_Maria_Clara.txt';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

/* ---------- 6. Formulário de contato ---------- */
// Abre o app de e-mail do visitante com a mensagem preenchida
// (a página é estática, não há servidor para receber o formulário).
function handleFormSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('formName').value.trim();
    const email = document.getElementById('formEmail').value.trim();
    const subject = document.getElementById('formSubject').value.trim();
    const message = document.getElementById('formMessage').value.trim();
    const status = document.getElementById('formStatus');

    const body = `${message}\n\n— ${name} (${email})`;
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;

    status.textContent = `Obrigado, ${name}! Seu aplicativo de e-mail foi aberto com a mensagem pronta — é só enviar.`;
    status.classList.remove('hidden');
    e.target.reset();
}

/* ---------- Inicialização ---------- */
document.addEventListener('DOMContentLoaded', () => {
    initTyping();
    initMobileMenu();
    initModals();

    setupFilter({
        tabSelector: '.skill-tab',
        cardSelector: '.skill-card',
        displayValue: 'block'
    });
    setupFilter({
        tabSelector: '.proj-tab',
        cardSelector: '.project-card',
        displayValue: 'flex'
    });

    const form = document.getElementById('contactForm');
    if (form) form.addEventListener('submit', handleFormSubmit);
});
