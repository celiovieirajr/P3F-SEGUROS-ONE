export function initFaq() {
  const items = document.querySelectorAll("[data-faq-item]");
  items.forEach((item) => {
    const question = item.querySelector("[data-faq-question]");
    const answer = item.querySelector("[data-faq-answer]");
    const icon = item.querySelector("[data-faq-icon]");
    if (!question || !answer) return;

    question.addEventListener("click", () => {
      const isOpen = item.getAttribute("data-open") === "true";

      items.forEach((other) => {
        other.setAttribute("data-open", "false");
        other.querySelector("[data-faq-answer]")?.style.setProperty("max-height", "0px");
        other.querySelector("[data-faq-question]")?.setAttribute("aria-expanded", "false");
        other.querySelector("[data-faq-icon]")?.classList.remove("rotate-45");
      });

      if (!isOpen) {
        item.setAttribute("data-open", "true");
        answer.style.setProperty("max-height", `${answer.scrollHeight}px`);
        question.setAttribute("aria-expanded", "true");
        icon?.classList.add("rotate-45");
      }
    });
  });
}
