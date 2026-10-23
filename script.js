/* =========================================================
   PARA HELEN - Interacciones
   Edita RELATIONSHIP_START para colocar la fecha real.
   Formato recomendado: AAAA-MM-DDTHH:MM:SS
   Ejemplo: "2024-01-15T20:00:00"
   ========================================================= */

"use strict";

const RELATIONSHIP_START = "2024-12-22T00:00:00";

const romanticMessages = [
  "Estoy orgulloso de ti amor, incluso de las batallas que nadie más ve.",
  "Respira profundo amor. No tienes que resolverlo todo en este momento.",
  "Sigues siendo mi persona favorita, hoy y todos los días.",
  "Cuándo alguien me amaba, me sentía tan feliz...",
  "Si pudiera teletransportarme, te llevaría a Forks.",
  "Eres mucho más fuerte de lo que sientes en este instante.",
  "Tu sonrisa sigue siendo una de mis cosas favoritas del universo.",
  "Si el día está pesado, lo cargamos entre los dos.",
  "Eres mi mayor bendición, nunca lo dudes.",
  "La push nena, la push",
  "Pausa oficial: toma agua, respira y recuerda que tu novio te ama muchísimo.",
  "Me haces sentir en casa cada vez que estoy contigo.",
  "Cuando dudes de ti, recuerda que yo veo en ti cosas maravillosas amor.",
  "Te extraño de una manera muy seria, aunque después te moleste de una manera muy poco seria.",
  "Miremos Godzilla :(",
  "Todo va a estar bien. Y si tarda un poco, yo me quedo contigo mientras tanto.",
  "Eres preciosa, pero lo que más amo de ti es lo increíble que eres.",
  "Gracias por existir eres todo lo que necesito.",
  "No dejes que un momento difícil te haga olvidar lo lejos que has llegado.",
  "No eres una carga. Puedes contarme lo que sientes cuando estés lista :D.",
  "Prometo seguir haciéndote reír, incluso si tengo que usar mis chistes pierdeamigos.",
  "Tu sensibilidad no es una debilidad. Es parte de la belleza con la que miras el mundo.",
  "Mi niña, eres importante, eres valiosa y eres profundamente amada.",
  "Soliban, dame a la niña...",
  "Ningún día gris cambia todo el color que has traído a mi vida.",
  "Pienso en ti más veces de las que probablemente imaginas.",
  "Hoa Hoa Hoa Hoa Hoaaa",
  "Tú y yo somos un equipo, y Dios con nosotros.",
  "Cuando te sientas perdida, vuelve a esto: Yo te amo y creo en ti.",
  "No puedo prometer días perfectos, pero sí un amor sincero que quiera atravesarlos contigo.",
  "Yo te amo deberitas deberitas",
  "Esto no es asunto tuyo perro"
];

const secretMessages = {
  heartClicks: "Secreto desbloqueado: cada latido mío dice Helen, aunque científicamente sea difícil de explicar.",
  photoDoubleClick: "Recuerdo secreto: mi foto favorita siempre será una en la que estés siendo completamente tú.",
  longPress: "Te quedaste un ratito más... igual que yo quisiera quedarme en cada abrazo contigo.",
  letterHeart: "Entre todas las líneas de esta carta faltó una: volvería a elegirte en cada versión de mi vida.",
  footerClicks: "Nivel secreto alcanzado: Pablo está oficialmente, inevitablemente y felizmente enamorado de Helen.",
  keyboard: "Código secreto correcto: H + P = mi combinación favorita.",
  audioSecret: "Aunque aquí todavía no suene mi voz, imagina que te digo bajito: te amo, Helen."
};

let currentMessageIndex = -1;
let toastTimer;
let heartClickCount = 0;
let footerClickCount = 0;
let typedKeys = "";
let modalTrigger = null;

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

function showNextMessage() {
  const message = $("#random-message");
  const card = $("#message-card");
  if (!message || !card || romanticMessages.length === 0) return;

  currentMessageIndex = (currentMessageIndex + 1) % romanticMessages.length;
  message.textContent = romanticMessages[currentMessageIndex];
  card.classList.remove("animate");
  void card.offsetWidth;
  card.classList.add("animate");
}

function showSecret(message) {
  const toast = $("#secret-toast");
  $("#secret-message").textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 5200);
}

function openModal(customMessage = "") {
  const modal = $("#comfort-modal");
  if (!modal) return;
  modalTrigger = document.activeElement;
  if (customMessage && $("#modal-message")) $("#modal-message").textContent = customMessage;
  modal.hidden = false;
  document.body.classList.add("modal-open");
  $(".modal-close", modal).focus();
}

function closeModal() {
  const modal = $("#comfort-modal");
  if (!modal) return;
  modal.hidden = true;
  document.body.classList.remove("modal-open");
  if (modalTrigger?.isConnected) modalTrigger.focus();
  modalTrigger = null;
}

function calculateRelationshipTime() {
  const start = new Date(RELATIONSHIP_START);
  const now = new Date();
  const counter = $("#relationship-counter");
  if (!counter) return;

  if (Number.isNaN(start.getTime()) || start > now) {
    counter.innerHTML = "<p>Configura una fecha válida y pasada en RELATIONSHIP_START dentro de script.js.</p>";
    return;
  }

  const addMonths = (date, amount) => {
    const monthIndex = date.getFullYear() * 12 + date.getMonth() + amount;
    const year = Math.floor(monthIndex / 12);
    const month = monthIndex % 12;
    const day = Math.min(date.getDate(), new Date(year, month + 1, 0).getDate());
    return new Date(year, month, day, date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
  };
  let totalMonths = (now.getFullYear() - start.getFullYear()) * 12 + now.getMonth() - start.getMonth();
  let lastMonth = addMonths(start, totalMonths);
  if (lastMonth > now) {
    totalMonths -= 1;
    lastMonth = addMonths(start, totalMonths);
  }
  const elapsed = now.getTime() - lastMonth.getTime();
  const days = Math.floor(elapsed / 86400000);
  const hours = Math.floor((elapsed % 86400000) / 3600000);
  const minutes = Math.floor((elapsed % 3600000) / 60000);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  $("#years").textContent = years;
  $("#months").textContent = months;
  $("#days").textContent = days;
  $("#hours").textContent = hours;
  $("#minutes").textContent = minutes;
}

function setupLongPress(element, callback, duration = 900) {
  let timer;
  const start = () => { timer = window.setTimeout(callback, duration); };
  const cancel = () => window.clearTimeout(timer);

  element.addEventListener("pointerdown", start);
  element.addEventListener("pointerup", cancel);
  element.addEventListener("pointerleave", cancel);
  element.addEventListener("pointercancel", cancel);
}

function createHeartSparks(button) {
  const bounds = button.getBoundingClientRect();
  const centerX = bounds.left + bounds.width / 2;
  const centerY = bounds.top + bounds.height / 2;
  const particleCount = 5;

  for (let index = 0; index < particleCount; index += 1) {
    const angle = (Math.PI * 2 * index) / particleCount + Math.random() * 0.35;
    const distance = 34 + Math.random() * 38;
    const particle = document.createElement("span");
    particle.className = "heart-spark";
    particle.textContent = "♥";
    particle.setAttribute("aria-hidden", "true");
    particle.style.left = `${centerX}px`;
    particle.style.top = `${centerY}px`;
    particle.style.setProperty("--particle-x", `${Math.cos(angle) * distance}px`);
    particle.style.setProperty("--particle-y", `${Math.sin(angle) * distance}px`);
    particle.addEventListener("animationend", () => particle.remove(), { once: true });
    document.body.append(particle);
  }
}

function setupLetterReveal() {
  const openButton = $("#open-letter-button");
  const heartGate = $("#letter-heart-gate");
  const heartButton = $("#letter-open-heart");
  const progress = $("#heart-progress");
  const letter = $("#letter-content");
  if (!openButton || !heartGate || !heartButton || !progress || !letter) return;

  let presses = 0;

  openButton.addEventListener("click", () => {
    if (!letter.hidden) {
      letter.hidden = true;
      letter.classList.remove("reveal");
      openButton.textContent = "Abrir mi carta";
      openButton.setAttribute("aria-expanded", "false");
      openButton.focus();
      return;
    }

    heartGate.hidden = false;
    openButton.hidden = true;
    heartButton.focus();
  });

  heartButton.addEventListener("click", () => {
    presses += 1;
    heartButton.classList.remove("pulse");
    void heartButton.offsetWidth;
    heartButton.classList.add("pulse");
    createHeartSparks(heartButton);

    if (presses < 5) {
      progress.textContent = `${presses} de 5 pulsaciones`;
      return;
    }

    heartGate.hidden = true;
    letter.hidden = false;
    letter.classList.add("reveal");
    openButton.hidden = false;
    openButton.textContent = "Cerrar mi carta";
    openButton.setAttribute("aria-expanded", "true");
    openButton.focus();
    window.setTimeout(() => letter.scrollIntoView({ behavior: "smooth", block: "center" }), 80);
  });
}

async function optionalAssetExists(url) {
  if (window.location.protocol === "file:") return true;
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch {
    return false;
  }
}

function setupEasterEggs() {
  $("#heart-seal")?.addEventListener("click", () => {
    heartClickCount += 1;
    if (heartClickCount === 5) {
      showSecret(secretMessages.heartClicks);
      heartClickCount = 0;
    }
  });

  $$(".memory-card").forEach(card => {
    card.addEventListener("dblclick", () => showSecret(secretMessages.photoDoubleClick));
    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        showSecret(secretMessages.photoDoubleClick);
      }
    });
  });

  const letterButton = $("#open-letter-button");
  if (letterButton) setupLongPress(letterButton, () => showSecret(secretMessages.longPress));
  $("#letter-heart")?.addEventListener("click", () => showSecret(secretMessages.letterHeart));

  $("#footer-heart")?.addEventListener("click", () => {
    footerClickCount += 1;
    if (footerClickCount === 3) {
      showSecret(secretMessages.footerClicks);
      footerClickCount = 0;
    }
  });

  $("#audio-icon")?.addEventListener("click", () => showSecret(secretMessages.audioSecret));

  $$(".photo-placeholder img").forEach(async image => {
    const source = image.dataset.src;
    if (!source || !await optionalAssetExists(source)) {
      image.remove();
      return;
    }
    image.addEventListener("load", () => image.closest(".photo-placeholder")?.classList.add("has-image"), { once: true });
    image.src = source;
  });

  $$(".audio-card").forEach(async card => {
    const audio = $("audio", card);
    const source = $("source", audio);
    if (!source?.dataset.src || !await optionalAssetExists(source.dataset.src)) return;
    source.src = source.dataset.src;
    audio.hidden = false;
    $(".audio-fallback", card).hidden = true;
    audio.load();
  });

  document.addEventListener("keydown", event => {
    const target = event.target;
    if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey && !["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) && !target.isContentEditable) {
      typedKeys = (typedKeys + event.key.toLowerCase()).slice(-5);
      if (typedKeys.endsWith("hp") || typedKeys.endsWith("ph")) {
        showSecret(secretMessages.keyboard);
        typedKeys = "";
      }
    }
  });
}

function init() {
  setupEasterEggs();

  $("#hug-button")?.addEventListener("click", () => openModal());
  const initialMessage = $("#random-message")?.textContent;
  currentMessageIndex = romanticMessages.indexOf(initialMessage);
  $("#new-message-button")?.addEventListener("click", showNextMessage);
  if (new URLSearchParams(window.location.search).has("abrazo")) showNextMessage();

  setupLetterReveal();

  $$('[data-close-modal]').forEach(element => element.addEventListener("click", closeModal));
  document.addEventListener("keydown", event => {
    const modal = $("#comfort-modal");
    if (event.key === "Escape" && modal && !modal.hidden) closeModal();
  });

  if ($("#current-year")) $("#current-year").textContent = new Date().getFullYear();
  calculateRelationshipTime();
  if ($("#relationship-counter")) window.setInterval(calculateRelationshipTime, 30000);
}

document.addEventListener("DOMContentLoaded", init);
