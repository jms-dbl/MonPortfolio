// Toggle mobile menu with ARIA support
const navToggle = document.getElementById('nav-toggle');
const siteNav = document.getElementById('site-nav');
navToggle.setAttribute('aria-expanded', 'false');
navToggle.addEventListener('click', (e) => {
  const isOpen = siteNav.classList.toggle('show');
  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  const lang = document.documentElement.lang || 'fr';
  navToggle.setAttribute('aria-label', isOpen ? translations[lang]['nav.closeMenu'] : translations[lang]['nav.openMenu']);
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (siteNav.classList.contains('show') && !siteNav.contains(e.target) && !navToggle.contains(e.target)) {
    siteNav.classList.remove('show');
    navToggle.setAttribute('aria-expanded', 'false');
    const lang = document.documentElement.lang || 'fr';
    navToggle.setAttribute('aria-label', translations[lang]['nav.openMenu']);
  }
});

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && siteNav.classList.contains('show')) {
    siteNav.classList.remove('show');
    navToggle.setAttribute('aria-expanded', 'false');
    const lang = document.documentElement.lang || 'fr';
    navToggle.setAttribute('aria-label', translations[lang]['nav.openMenu']);
    navToggle.focus();
  }
});

// Close mobile menu on link click
document.querySelectorAll('#site-nav a').forEach(a => {
  a.addEventListener('click', () => {
    siteNav.classList.remove('show');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.hash);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth'});
    }
  });
});


const translations = {
  fr: {
    'nav.home':'Accueil','nav.about':'À propos','nav.skills':'Compétences','nav.projects':'Projets','nav.contact':'Contact',
    'nav.openMenu':'Ouvrir le menu','nav.closeMenu':'Fermer le menu',
    'hero.lead':'Développeur web junior — je crée des sites clairs, responsives et rapides.',
    'hero.cta_skills':'Voir mes compétences','hero.cta_contact':'Me contacter',
    'about.title':'À propos','about.p':'Salut! Je suis <strong>James DOUBLIER</strong>, développeur web junior spécialisé en HTML, CSS, JavaScript et frameworks front-end. J\'aime transformer des idées en interfaces simples et esthétiques.',
    'skills.title':'Compétences','skill.html':'HTML5','skill.css':'CSS3 / Flexbox / Grid','skill.js':'JavaScript (ES6+)','skill.frameworks':'React / Vue (basics)','skill.responsive':'Responsive design','skill.git':'Git',
    'projects.title':'Projets','project1.title':'Projet 1','project1.desc':'Une courte description du projet. Ajoute un lien ou image ici.','project2.title':'Projet 2','project2.desc':'Une courte description du projet. Ajoute un lien ou image ici.',
    'contact.title':'Contact','contact.text':'Tu peux me contacter par email ou WhatsApp:','contact.email':'📧 email@example.com','contact.whatsapp':'💬 WhatsApp',
    'footer.copy':'© {year} James DOUBLIER — Développeur web junior','lang.changed':'Langue changée en français'
  },
  en: {
    'nav.home':'Home','nav.about':'About','nav.skills':'Skills','nav.projects':'Projects','nav.contact':'Contact',
    'nav.openMenu':'Open menu','nav.closeMenu':'Close menu',
    'hero.lead':'Junior web developer — I build clear, responsive and fast websites.','hero.cta_skills':'See my skills','hero.cta_contact':'Contact me',
    'about.title':'About','about.p':'Hi! I\'m <strong>James DOUBLIER</strong>, a junior web developer specialized in HTML, CSS, JavaScript and front-end frameworks. I like turning ideas into simple and beautiful interfaces.',
    'skills.title':'Skills','skill.html':'HTML5','skill.css':'CSS3 / Flexbox / Grid','skill.js':'JavaScript (ES6+)','skill.frameworks':'React / Vue (basics)','skill.responsive':'Responsive design','skill.git':'Git',
    'projects.title':'Projects','project1.title':'Project 1','project1.desc':'A short description of the project. Add a link or image here.','project2.title':'Project 2','project2.desc':'A short description of the project. Add a link or image here.',
    'contact.title':'Contact','contact.text':'You can reach me by email or WhatsApp:','contact.email':'📧 email@example.com','contact.whatsapp':'💬 WhatsApp',
    'footer.copy':'© {year} James DOUBLIER — Junior web developer','lang.changed':'Language switched to English'
  }
};


const langToggleBtn = document.getElementById('lang-toggle');
const langLive = document.getElementById('a11y-lang');
function setLanguage(lang){
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const txt = translations[lang] && translations[lang][key];
    if (txt !== undefined) el.innerHTML = txt;
  });


  const isOpen = siteNav.classList.contains('show');
  const label = isOpen ? translations[lang]['nav.closeMenu'] : translations[lang]['nav.openMenu'];
  navToggle.setAttribute('aria-label', label);


  if (langToggleBtn){
    const isEn = lang === 'en';
    langToggleBtn.dataset.lang = lang;
    langToggleBtn.classList.toggle('toggled', isEn);
    langToggleBtn.querySelector('.lang-inner').textContent = isEn ? 'EN' : 'FR';
    langToggleBtn.setAttribute('aria-pressed', isEn ? 'true' : 'false');
    langToggleBtn.title = isEn ? 'EN' : 'FR';
  }

  
  const footer = document.getElementById('footer-copy');
  if (footer){
    const year = new Date().getFullYear();
    footer.innerHTML = translations[lang]['footer.copy'].replace('{year}', year);
  }
  localStorage.setItem('siteLang', lang);
  if (langLive) langLive.textContent = translations[lang]['lang.changed'];
}

if (langToggleBtn){
  langToggleBtn.addEventListener('click', () => {
    const next = langToggleBtn.dataset.lang === 'fr' ? 'en' : 'fr';
    setLanguage(next);
  });
  langToggleBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); langToggleBtn.click(); }
  });
}


const savedLang = localStorage.getItem('siteLang') || 'fr';
setLanguage(savedLang);


const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = el.dataset.revealDelay;
      if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`);


      el.classList.add('active');


      if (el.matches('.reveal') && el.querySelectorAll) {
        const children = el.querySelectorAll('.skill-grid li');
        if (children.length) {
          children.forEach((child, i) => child.style.setProperty('transition-delay', `${90 + i * 60}ms`));
        }
      }

      obs.unobserve(el);
    }
  });
}, {threshold: 0.15});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));