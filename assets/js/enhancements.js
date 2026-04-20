/*
══════════════════════════════════════════════════════════════════
enhancements.js — Effets visuels LOTR (curseur fix inclus)
══════════════════════════════════════════════════════════════════
*/

/* ═══════════════════════════════════════════════════════════════
   1. CURSEUR PERSONNALISÉ
═══════════════════════════════════════════════════════════════ */
function initCursor() {
  const ring = document.createElement("div");
  const dot = document.createElement("div");
  ring.id = "cursor-ring";
  dot.id = "cursor-dot";
  document.body.appendChild(ring);
  document.body.appendChild(dot);

  let mouseX = 0,
    mouseY = 0;
  let ringX = 0,
    ringY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + "px";
    dot.style.top = mouseY + "px";
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + "px";
    ring.style.top = ringY + "px";
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document
    .querySelectorAll("a, button, .project-card, .stat-card")
    .forEach((el) => {
      el.addEventListener("mouseenter", () =>
        ring.classList.add("cursor-hover"),
      );
      el.addEventListener("mouseleave", () =>
        ring.classList.remove("cursor-hover"),
      );
    });

  document.addEventListener("mouseleave", () => {
    ring.style.opacity = "0";
    dot.style.opacity = "0";
  });
  document.addEventListener("mouseenter", () => {
    ring.style.opacity = "1";
    dot.style.opacity = "1";
  });
}

/* ═══════════════════════════════════════════════════════════════
   2. TYPEWRITER
═══════════════════════════════════════════════════════════════ */
function initTypewriter() {
  const heroTitle = document.querySelector(".hero-title");
  if (!heroTitle) return;

  const highlight = heroTitle.querySelector(".highlight");
  const highlightText = highlight ? highlight.textContent : "";
  const fullText = heroTitle.textContent.replace(highlightText, "").trim();

  heroTitle.innerHTML = "";

  const textNode = document.createElement("span");
  textNode.id = "typewriter-text";
  heroTitle.appendChild(textNode);

  if (highlight) {
    const spacer = document.createTextNode(" ");
    const highlightClone = highlight.cloneNode(true);
    highlightClone.style.opacity = "0";
    heroTitle.appendChild(spacer);
    heroTitle.appendChild(highlightClone);

    setTimeout(
      () => {
        highlightClone.style.transition = "opacity 0.8s ease";
        highlightClone.style.opacity = "1";
      },
      fullText.length * 60 + 400,
    );
  }

  let i = 0;
  function typeNextLetter() {
    if (i < fullText.length) {
      textNode.textContent += fullText[i];
      i++;
      setTimeout(typeNextLetter, 40 + Math.random() * 40);
    }
  }
  setTimeout(typeNextLetter, 600);
}

/* ═══════════════════════════════════════════════════════════════
   3. PARTICULES DE BRAISE
═══════════════════════════════════════════════════════════════ */
function initEmbers() {
  const canvas = document.createElement("canvas");
  canvas.id = "ember-canvas";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  function createEmber() {
    return {
      x: Math.random() * canvas.width,
      y: canvas.height + 10,
      size: Math.random() * 2.5 + 0.5,
      speedY: Math.random() * 0.8 + 0.3,
      speedX: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.5 + 0.1,
      flicker: Math.random() * Math.PI * 2,
    };
  }

  const embers = Array.from({ length: 40 }, () => {
    const e = createEmber();
    e.y = Math.random() * canvas.height;
    return e;
  });

  function drawEmbers() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    embers.forEach((ember) => {
      ember.flicker += 0.05;
      const flickerOpacity =
        ember.opacity * (0.7 + Math.sin(ember.flicker) * 0.3);

      const gradient = ctx.createRadialGradient(
        ember.x,
        ember.y,
        0,
        ember.x,
        ember.y,
        ember.size * 2,
      );
      gradient.addColorStop(0, `rgba(245, 217, 138, ${flickerOpacity})`);
      gradient.addColorStop(
        0.5,
        `rgba(201, 147, 58,  ${flickerOpacity * 0.6})`,
      );
      gradient.addColorStop(1, `rgba(201, 147, 58,  0)`);

      ctx.beginPath();
      ctx.arc(ember.x, ember.y, ember.size * 2, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      ember.y -= ember.speedY;
      ember.x += ember.speedX;

      if (ember.y < -10) Object.assign(ember, createEmber());
    });

    requestAnimationFrame(drawEmbers);
  }
  drawEmbers();
}

/* ═══════════════════════════════════════════════════════════════
   4. FOND CARTE
═══════════════════════════════════════════════════════════════ */
function initMapBackground() {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  const mapSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <filter id="parchment-blur">
          <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="4" seed="5"/>
          <feDisplacementMap in="SourceGraphic" scale="8"/>
        </filter>
      </defs>
      <g fill="none" stroke="rgba(201,147,58,0.06)" stroke-width="1" filter="url(#parchment-blur)">
        <ellipse cx="70%"  cy="30%"  rx="220" ry="140"/>
        <ellipse cx="70%"  cy="30%"  rx="180" ry="110"/>
        <ellipse cx="70%"  cy="30%"  rx="140" ry="80"/>
        <ellipse cx="70%"  cy="30%"  rx="100" ry="55"/>
        <ellipse cx="70%"  cy="30%"  rx="60"  ry="30"/>
        <ellipse cx="20%"  cy="70%"  rx="160" ry="100"/>
        <ellipse cx="20%"  cy="70%"  rx="120" ry="75"/>
        <ellipse cx="20%"  cy="70%"  rx="80"  ry="50"/>
        <ellipse cx="20%"  cy="70%"  rx="40"  ry="25"/>
        <ellipse cx="55%"  cy="65%"  rx="100" ry="60"/>
        <ellipse cx="55%"  cy="65%"  rx="70"  ry="40"/>
        <ellipse cx="55%"  cy="65%"  rx="40"  ry="22"/>
        <path d="M 10% 50% Q 35% 35% 60% 55% T 90% 40%" stroke="rgba(201,147,58,0.05)" stroke-width="1.5" stroke-dasharray="4,8"/>
        <path d="M 5%  80% Q 30% 60% 50% 70% T 95% 55%" stroke="rgba(201,147,58,0.04)" stroke-width="1"   stroke-dasharray="3,6"/>
      </g>
      <g fill="rgba(201,147,58,0.12)">
        <circle cx="70%" cy="30%" r="3"/>
        <circle cx="20%" cy="70%" r="3"/>
        <circle cx="55%" cy="65%" r="2.5"/>
        <circle cx="42%" cy="28%" r="2"/>
        <circle cx="80%" cy="60%" r="2"/>
      </g>
    </svg>
  `;

  const blob = new Blob([mapSVG], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const mapBg = document.createElement("div");
  mapBg.id = "map-background";
  mapBg.style.cssText = `
    position: absolute;
    inset: 0;
    background-image: url('${url}');
    background-size: cover;
    background-position: center;
    pointer-events: none;
    z-index: 0;
  `;
  hero.style.position = "relative";
  hero.insertBefore(mapBg, hero.firstChild);

  hero.querySelectorAll(".hero-content, .hero-image").forEach((el) => {
    el.style.position = "relative";
    el.style.zIndex = "1";
  });
}

/* ═══════════════════════════════════════════════════════════════
   5. BARRES RUNIQUES
═══════════════════════════════════════════════════════════════ */
function initRunicBars() {
  const SEGMENTS = 20;

  document.querySelectorAll(".skill-bar").forEach((bar) => {
    const progress = bar.querySelector(".skill-progress");
    if (!progress) return;

    const level = parseInt(progress.getAttribute("data-level") || "0");

    bar.innerHTML = "";
    bar.style.cssText += `
      display: flex;
      gap: 3px;
      background: transparent;
      height: 10px;
      overflow: visible;
    `;

    const filledCount = Math.round((level / 100) * SEGMENTS);

    for (let i = 0; i < SEGMENTS; i++) {
      const seg = document.createElement("div");
      const brightness = i < filledCount ? 0.7 + (i / filledCount) * 0.5 : 1;
      seg.style.cssText = `
        flex: 1;
        height: 100%;
        border-radius: 1px;
        background-color: ${i < filledCount ? "var(--accent-color)" : "rgba(61,46,20,0.8)"};
        filter: ${i < filledCount ? `brightness(${brightness})` : "none"};
        opacity: 0;
        transform: scaleY(0.4);
        transition: opacity 0.2s ease ${i * 40}ms, transform 0.2s ease ${i * 40}ms;
      `;
      bar.appendChild(seg);
    }
  });

  const runicObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.querySelectorAll(".skill-bar div").forEach((seg) => {
          seg.style.opacity = "1";
          seg.style.transform = "scaleY(1)";
        });
        runicObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.3 },
  );

  document
    .querySelectorAll(".skill-item")
    .forEach((item) => runicObserver.observe(item));
}

/* ═══════════════════════════════════════════════════════════════
   CSS INJECTÉ
═══════════════════════════════════════════════════════════════ */
function injectStyles() {
  const style = document.createElement("style");
  style.textContent = `
    * { cursor: none !important; }

    #ember-canvas {
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      pointer-events: none;
      z-index: 0;
      opacity: 0.6;
    }

    #cursor-ring {
      position: fixed;
      width: 36px;
      height: 36px;
      border: 1.5px solid var(--accent-color);
      border-radius: 50%;
      pointer-events: none;
      z-index: 99999;
      transform: translate(-50%, -50%);
      transition: width 0.2s ease, height 0.2s ease, border-color 0.2s ease;
    }
    #cursor-ring.cursor-hover {
      width: 56px;
      height: 56px;
      border-color: var(--accent-light);
    }

    #cursor-dot {
      position: fixed;
      width: 6px;
      height: 6px;
      background: var(--accent-light);
      border-radius: 50%;
      pointer-events: none;
      z-index: 99999;
      transform: translate(-50%, -50%);
    }

    .skill-bar { overflow: visible !important; }
  `;
  document.head.appendChild(style);
}

/* ═══════════════════════════════════════════════════════════════
   DÉMARRAGE
═══════════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  injectStyles();
  initEmbers();
  initMapBackground();
  initRunicBars();

  if (window.innerWidth > 768) {
    initCursor();
    initTypewriter();
  }
});
