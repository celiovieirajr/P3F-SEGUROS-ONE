/**
 * Formulário "Entre em contato" — não envia pra nenhum servidor.
 * No submit, monta a mensagem com o template fixo do serviço escolhido
 * (ver src/js/modules/whatsapp.js) + os dados preenchidos, e abre o
 * WhatsApp com tudo pronto pra continuar a conversa.
 */

import { buildContactWhatsappUrl } from "./whatsapp.js";

export function initContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const categoria = data.get("servico");
    const nome = data.get("nome")?.toString().trim();
    const telefone = data.get("telefone")?.toString().trim();
    const mensagem = data.get("mensagem")?.toString().trim();

    const url = buildContactWhatsappUrl(categoria, { nome, telefone, mensagem });
    window.open(url, "_blank", "noopener");

    form.reset();
  });
}
