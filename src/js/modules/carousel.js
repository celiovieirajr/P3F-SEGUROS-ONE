export function initCarousel() {
  const root = document.querySelector("[data-carousel]");
  if (!root) return;

  const slides = [...root.querySelectorAll("[data-slide]")];
  const dots = [...root.querySelectorAll("[data-dot]")];
  const INTERVAL = 6000;
  // O slide 1 traz o título e os ícones clicáveis; precisa de mais tempo na tela.
  const FIRST_SLIDE_INTERVAL = 10000;
  let index = 0;
  let timer = null;

  function show(next) {
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const active = i === index;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", String(!active));
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === index);
      dot.setAttribute("aria-current", String(i === index));
    });
  }

  function start() {
    stop();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer = setTimeout(() => { show(index + 1); start(); }, index === 0 ? FIRST_SLIDE_INTERVAL : INTERVAL);
  }

  function stop() {
    if (timer) clearTimeout(timer);
    timer = null;
  }

  root.querySelector("[data-prev]")?.addEventListener("click", () => { show(index - 1); start(); });
  root.querySelector("[data-next]")?.addEventListener("click", () => { show(index + 1); start(); });
  dots.forEach((dot, i) => dot.addEventListener("click", () => { show(i); start(); }));

  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);
  root.addEventListener("focusin", stop);
  root.addEventListener("focusout", start);

  let startX = 0;
  root.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; stop(); }, { passive: true });
  root.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) show(index + (dx < 0 ? 1 : -1));
    start();
  });

  show(0);
  start();
}
