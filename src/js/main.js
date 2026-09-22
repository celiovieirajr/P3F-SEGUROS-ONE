import { initMenu } from "./modules/menu.js";
import { initFaq } from "./modules/faq.js";
import { initReveal } from "./modules/reveal.js";
import { initCarousel } from "./modules/carousel.js";
import { initCookieConsent } from "./modules/cookies.js";
import { initWhatsappLinks } from "./modules/whatsapp.js";
import { initContactForm } from "./modules/contact-form.js";

document.addEventListener("DOMContentLoaded", () => {
  initWhatsappLinks();
  initMenu();
  initFaq();
  initReveal();
  initCarousel();
  initCookieConsent();
  initContactForm();

  const yearEl = document.querySelector("[data-current-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
});
