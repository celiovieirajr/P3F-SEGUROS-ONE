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
const BREAK = "\n\n";

/** Uma mensagem fixa por categoria — única fonte de verdade dos textos. */
const WHATSAPP_TEMPLATES = {
  geral: "Olá! Vim pelo site da P3F Seguros e gostaria de mais informações.",
  vida: "Olá! Quero um diagnóstico gratuito para Seguro de Vida.",
  saude: "Olá! Quero um diagnóstico gratuito para Saúde e Odonto.",
  previdencia: "Olá! Quero um diagnóstico gratuito para Previdência.",
  consorcio: "Olá! Quero um diagnóstico gratuito para Consórcio.",
};

/** Perguntas que ajudam a atender mais rápido; a pessoa responde na própria conversa. */
const WHATSAPP_QUALIFIERS = {
  vida: "Para agilizar, me conte: sua idade, quantas pessoas quer proteger e sua cidade.",
  saude: "Para agilizar, me conte: para quantas pessoas é o plano (e as idades) e sua cidade.",
  previdencia: "Para agilizar, me conte: sua idade e o objetivo (aposentadoria, sucessão ou outro).",
  consorcio: "Para agilizar, me conte: se é para imóvel, veículo ou outro bem, e o valor aproximado.",
};

/** Monta a URL final do wa.me a partir de uma mensagem já pronta. */
function buildWhatsappUrlFromMessage(message) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

/** Sufixo que diz de qual parte do site veio o clique (até haver analytics). */
function originSuffix(origin) {
  return origin ? `(via site: ${origin})` : "";
}

/** Monta a URL do wa.me para uma categoria, usando o template fixo dela. */
export function buildWhatsappUrl(category, origin) {
  const partes = [
    WHATSAPP_TEMPLATES[category] ?? WHATSAPP_TEMPLATES.geral,
    WHATSAPP_QUALIFIERS[category],
    originSuffix(origin),
  ].filter(Boolean);
  return buildWhatsappUrlFromMessage(partes.join(BREAK));
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
  linhas.push("", originSuffix("formulário de contato"));
  return buildWhatsappUrlFromMessage(linhas.join("\n"));
}

/** Aplica a URL certa em todo link marcado com [data-whatsapp]. */
export function initWhatsappLinks() {
  document.querySelectorAll("[data-whatsapp]").forEach((link) => {
    // Origem do clique: a seção onde o link está (ou topo / botão flutuante).
    const origin =
      link.dataset.origem ||
      link.closest("section[id]")?.id ||
      (link.closest("header") ? "topo" : "botao-flutuante");
    link.setAttribute("href", buildWhatsappUrl(link.dataset.whatsapp, origin));
  });
}
