/**
 * Formulário "Entre em contato" — não envia pra nenhum servidor.
 * No submit, valida os campos (mensagens em português), monta a mensagem
 * com o template fixo do serviço escolhido (ver src/js/modules/whatsapp.js)
 * + os dados preenchidos, e abre o WhatsApp com tudo pronto pra continuar
 * a conversa. Se o navegador bloquear a nova aba, mostra um link para
 * abrir o WhatsApp manualmente e mantém o que a pessoa digitou.
 */

import { buildContactWhatsappUrl } from "./whatsapp.js";

const ERROR_CLASS = "border-red-600 focus:border-red-600 focus:ring-red-600/30";

/** Regras por campo: devolve a mensagem de erro, ou "" se estiver válido. */
const RULES = {
  servico: (v) => (v ? "" : "Escolha um serviço."),
  nome: (v) => (v.length >= 2 ? "" : "Informe seu nome."),
  telefone: (v) => {
    const digits = v.replace(/\D/g, "");
    // 10 dígitos (fixo) ou 11 (celular) com DDD; aceita +55 na frente.
    const national = digits.startsWith("55") && digits.length > 11 ? digits.slice(2) : digits;
    return national.length === 10 || national.length === 11 ? "" : "Informe um telefone com DDD, por exemplo (18) 99999-9999.";
  },
};

function fieldValue(form, name) {
  return (new FormData(form).get(name) ?? "").toString().trim();
}

function setError(field, message) {
  const id = `${field.id}-erro`;
  let el = document.getElementById(id);
  if (!message) {
    el?.remove();
    field.removeAttribute("aria-invalid");
    field.removeAttribute("aria-describedby");
    ERROR_CLASS.split(" ").forEach((c) => field.classList.remove(c));
    return;
  }
  if (!el) {
    el = document.createElement("p");
    el.id = id;
    el.className = "mt-1.5 text-sm font-semibold text-red-700";
    field.insertAdjacentElement("afterend", el);
  }
  el.textContent = message;
  field.setAttribute("aria-invalid", "true");
  field.setAttribute("aria-describedby", id);
  ERROR_CLASS.split(" ").forEach((c) => field.classList.add(c));
}

function validate(form) {
  let first = null;
  for (const [name, rule] of Object.entries(RULES)) {
    const field = form.elements[name];
    const message = rule(fieldValue(form, name));
    setError(field, message);
    if (message && !first) first = field;
  }
  return first;
}

export function initContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  // Mensagens próprias em vez das do navegador (que vêm no idioma dele).
  form.setAttribute("novalidate", "");

  const status = document.createElement("div");
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");
  status.className = "mt-4 text-sm font-semibold text-navy-deep";
  form.querySelector("button[type='submit']").insertAdjacentElement("afterend", status);

  // Limpa o erro do campo assim que a pessoa corrige.
  Object.keys(RULES).forEach((name) => {
    const field = form.elements[name];
    const recheck = () => {
      if (field.getAttribute("aria-invalid") === "true") setError(field, RULES[name](fieldValue(form, name)));
    };
    field.addEventListener("input", recheck);
    field.addEventListener("change", recheck);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    status.textContent = "";

    const invalid = validate(form);
    if (invalid) {
      invalid.focus();
      return;
    }

    const url = buildContactWhatsappUrl(fieldValue(form, "servico"), {
      nome: fieldValue(form, "nome"),
      telefone: fieldValue(form, "telefone"),
      mensagem: fieldValue(form, "mensagem"),
    });

    // Sem "noopener" na lista de features, para o navegador devolver null
    // quando bloquear a janela; o vínculo com esta página é cortado em seguida.
    const win = window.open(url, "_blank");
    if (win) {
      win.opener = null;
      form.reset();
      status.textContent = "Pronto! Abrimos o WhatsApp para você continuar a conversa.";
      return;
    }

    // Janela bloqueada: mantém os dados e oferece o link manual.
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener";
    link.className = "underline hover:text-gold";
    link.textContent = "Abrir o WhatsApp";
    status.textContent = "Seu navegador bloqueou a abertura do WhatsApp. ";
    status.appendChild(link);
  });
}
