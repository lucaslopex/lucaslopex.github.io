// Navegação mobile
document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      navToggle.classList.toggle("active");
    });
  }

  // Fechar menu ao clicar em um link
  const navLinks = document.querySelectorAll(".nav-menu a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
    });
  });
});

// Scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Header com fundo fixo (sem transparência)

// Animação de entrada dos elementos
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("loaded");
    }
  });
}, observerOptions);

// Observar elementos para animação
document.addEventListener("DOMContentLoaded", function () {
  const elementsToAnimate = document.querySelectorAll(
    ".skill-category, .timeline-item, .contact-item, .stat"
  );
  elementsToAnimate.forEach((el) => {
    el.classList.add("loading");
    observer.observe(el);
  });
});

// Contador animado para estatísticas
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start) + "+";
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target + "+";
    }
  }

  updateCounter();
}

// Animar contadores quando visíveis
const statsObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumber = entry.target.querySelector("h3");
        const text = statNumber.textContent;
        const number = parseInt(text.replace(/\D/g, ""));

        if (number && !entry.target.classList.contains("animated")) {
          entry.target.classList.add("animated");
          animateCounter(statNumber, number);
        }
      }
    });
  },
  { threshold: 0.5 }
);

document.addEventListener("DOMContentLoaded", function () {
  const stats = document.querySelectorAll(".stat");
  stats.forEach((stat) => statsObserver.observe(stat));
});

// Formulário de contato
const contactForm = document.querySelector(".contact-form form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Simular envio
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Enviando...";
    submitBtn.disabled = true;

    setTimeout(() => {
      alert("Mensagem enviada com sucesso! Entrarei em contato em breve.");
      this.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 2000);
  });
}

// Efeito de digitação no título
function typeWriter(element, text, speed = 100) {
  // Extrair apenas o texto, removendo as tags HTML
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = text;
  const plainText = tempDiv.textContent || tempDiv.innerText || "";

  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < plainText.length) {
      // Reconstruir o HTML com o texto digitado até o momento
      let currentText = plainText.substring(0, i + 1);

      // Adicionar o span de highlight quando necessário
      if (currentText.includes("Lucas Silva")) {
        currentText = currentText.replace(
          "Lucas Silva",
          '<span class="highlight">Lucas Silva</span>'
        );
      }

      element.innerHTML = currentText;
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Aplicar efeito de digitação ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const originalText = heroTitle.innerHTML;
    // Aguardar um pouco mais para garantir que tudo carregou
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 80);
    }, 1000);
  }
});

// Fallback: se o DOMContentLoaded já passou, executar imediatamente
if (document.readyState === "loading") {
  // DOM ainda carregando
} else {
  // DOM já carregou
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const originalText = heroTitle.innerHTML;
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 80);
    }, 500);
  }
}

// Parallax suave no hero
window.addEventListener("scroll", function () {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  if (hero) {
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
  }
});

// Tooltip para skills
document.addEventListener("DOMContentLoaded", function () {
  const skillItems = document.querySelectorAll(".skill-item");

  skillItems.forEach((skill) => {
    skill.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05)";
    });

    skill.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
    });
  });
});

// Navegação ativa baseada na seção visível
window.addEventListener("scroll", function () {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-menu a");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Adicionar classe active ao CSS
const style = document.createElement("style");
style.textContent = `
    .nav-menu a.active {
        color: var(--primary-color) !important;
        font-weight: 600;
    }
    
    .nav-menu.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 70px;
        left: 0;
        right: 0;
        background: white;
        padding: 2rem;
        box-shadow: var(--shadow-lg);
        border-top: 1px solid var(--border-color);
    }
    
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(style);

// Preloader
window.addEventListener("load", function () {
  const preloader = document.querySelector(".preloader");
  if (preloader) {
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500);
  }
});

// Smooth reveal para timeline
const timelineObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateX(0)";
      }
    });
  },
  { threshold: 0.3 }
);

document.addEventListener("DOMContentLoaded", function () {
  const timelineItems = document.querySelectorAll(".timeline-item");
  timelineItems.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform =
      index % 2 === 0 ? "translateX(-50px)" : "translateX(50px)";
    item.style.transition = "all 0.6s ease";
    timelineObserver.observe(item);
  });
});

// Efeito de hover nos botões
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
});

// Scroll to top button
const scrollToTopBtn = document.createElement("button");
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = "scroll-to-top";
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--primary-color);
    color: white;
    border: none;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: var(--shadow-lg);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    scrollToTopBtn.style.opacity = "1";
    scrollToTopBtn.style.visibility = "visible";
  } else {
    scrollToTopBtn.style.opacity = "0";
    scrollToTopBtn.style.visibility = "hidden";
  }
});

scrollToTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Efeito de partículas no background (opcional)
function createParticle() {
  const particle = document.createElement("div");
  particle.style.cssText = `
        position: fixed;
        width: 2px;
        height: 2px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: -1;
    `;

  particle.style.left = Math.random() * window.innerWidth + "px";
  particle.style.top = Math.random() * window.innerHeight + "px";

  document.body.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 3000);
}

// Criar partículas ocasionalmente
setInterval(createParticle, 2000);
