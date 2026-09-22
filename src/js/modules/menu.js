export function initMenu() {
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector("[data-menu-toggle]");
  const panel = document.querySelector("[data-menu-panel]");
  if (!header || !toggle || !panel) return;

  const closeMenu = () => {
    panel.classList.add("hidden");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    panel.classList.toggle("hidden");
  });

  panel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  let lastScroll = window.scrollY;
  window.addEventListener(
    "scroll",
    () => {
      const scrolled = window.scrollY > 12;
      header.classList.toggle("shadow-md", scrolled);
      header.classList.toggle("bg-white/95", scrolled);
      header.classList.toggle("bg-white/80", !scrolled);
      lastScroll = window.scrollY;
    },
    { passive: true }
  );
}
