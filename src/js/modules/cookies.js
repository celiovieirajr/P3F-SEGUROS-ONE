const STORAGE_KEY = "p3f_cookie_consent";

function applyConsent(status) {
  document.documentElement.setAttribute("data-consent", status);
  window.dispatchEvent(new CustomEvent("p3f:consent", { detail: { status } }));
}

export function initCookieConsent() {
  const banner = document.querySelector("[data-cookie-banner]");
  if (!banner) return;

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "accepted" || stored === "rejected") {
    applyConsent(stored);
    return;
  }

  banner.classList.remove("hidden");

  const acceptBtn = banner.querySelector("[data-cookie-accept]");
  const rejectBtn = banner.querySelector("[data-cookie-reject]");

  const decide = (status) => {
    localStorage.setItem(STORAGE_KEY, status);
    applyConsent(status);
    banner.classList.add("hidden");
  };

  acceptBtn?.addEventListener("click", () => decide("accepted"));
  rejectBtn?.addEventListener("click", () => decide("rejected"));
}
