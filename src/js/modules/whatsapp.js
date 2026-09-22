/**
 * WhatsApp links — templates fixos por tipo de seguro.
 *
 * Uso no HTML: em vez de escrever o href do wa.me na mão em cada link,
 * marque o elemento com `data-whatsapp="<categoria>"` e deixe o href
 * como fallback simples (sem JS, ainda abre o WhatsApp, só sem o texto
 * pronto). No load, este módulo troca o href pela URL certa com a
 * mensagem da categoria.
 *
 * <a data-whatsapp="vida" href="https://wa.me/5518996491777">Falar</a>
 *
 * Para adicionar/alterar mensagem de um seguro, mexa só em WHATSAPP_TEMPLATES.
 */

const WHATSAPP_PHONE = "5518996491777";

/** Uma mensagem fixa por categoria — única fonte de verdade dos textos. */
const WHATSAPP_TEMPLATES = {
  geral: "Olá! Vim pelo site da P3F Seguros e gostaria de mais informações.",
  vida: "Olá! Quero um diagnóstico gratuito para Seguro de Vida.",
  saude: "Olá! Quero um diagnóstico gratuito para Saúde e Odonto.",
  previdencia: "Olá! Quero um diagnóstico gratuito para Previdência.",
  consorcio: "Olá! Quero um diagnóstico gratuito para Consórcio.",
};

/** Monta a URL final do wa.me a partir de uma mensagem já pronta. */
function buildWhatsappUrlFromMessage(message) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

/** Monta a URL do wa.me para uma categoria, usando o template fixo dela. */
export function buildWhatsappUrl(category) {
  const message = WHATSAPP_TEMPLATES[category] ?? WHATSAPP_TEMPLATES.geral;
  return buildWhatsappUrlFromMessage(message);
}

/**
 * Monta a URL do wa.me para o formulário de contato: template fixo da
 * categoria escolhida + os dados que a pessoa preencheu.
 */
export function buildContactWhatsappUrl(category, { nome, telefone, mensagem }) {
  const linhas = [
    WHATSAPP_TEMPLATES[category] ?? WHATSAPP_TEMPLATES.geral,
    "",
    `Nome: ${nome}`,
    `Telefone: ${telefone}`,
  ];
  if (mensagem) linhas.push(`Mensagem: ${mensagem}`);
  return buildWhatsappUrlFromMessage(linhas.join("\n"));
}

/** Aplica a URL certa em todo link marcado com [data-whatsapp]. */
export function initWhatsappLinks() {
  document.querySelectorAll("[data-whatsapp]").forEach((link) => {
    link.setAttribute("href", buildWhatsappUrl(link.dataset.whatsapp));
  });
}
