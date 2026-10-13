# P3F Seguros & Benefícios — Site institucional

Página de conversão estática (HTML + Tailwind CSS + JS puro), construída a partir do
briefing `Briefing do novo site` e refinada pela `VELENX Consulting`. Objetivo único:
levar o visitante a abrir uma conversa no WhatsApp com contexto.

## Estrutura de pastas

```
p3f-site/
├── index.html            # página principal (hero, quem somos, método, soluções, seguradoras, FAQ, contato)
├── privacidade.html       # política de privacidade (LGPD)
├── termos.html            # termos de uso
├── cookies.html           # política de cookies
├── src/
│   ├── css/
│   │   └── input.css      # fonte Tailwind (@tailwind + componentes utilitários)
│   ├── js/
│   │   ├── main.js         # ponto de entrada, carrega os módulos
│   │   └── modules/
│   │       ├── menu.js      # menu mobile + header fixo
│   │       ├── faq.js       # accordion de perguntas frequentes
│   │       ├── reveal.js    # animação suave ao rolar (respeita prefers-reduced-motion)
│   │       ├── carousel.js  # carrossel do hero (autoplay, setas, pontos, swipe)
│   │       ├── whatsapp.js  # links wa.me com mensagem pronta por produto
│   │       ├── contact-form.js # formulário que abre o WhatsApp com os dados preenchidos
│   │       └── cookies.js   # banner de consentimento LGPD (aceitar/recusar)
│   └── assets/
│       └── img/
│           ├── logo-p3f-seguros.png  # logo oficial (não alterada, conforme solicitado)
│           ├── favicon.ico
│           ├── hero/          # fotos do carrossel e dos cards de Soluções
│           └── logos/         # logos das seguradoras e operadoras parceiras
├── dist/
│   └── css/
│       └── output.css     # CSS compilado pelo Tailwind (gerado via `npm run build`)
├── tailwind.config.js
├── package.json
└── README.md
```

## Como rodar localmente

```bash
npm install
npm run build     # compila o CSS uma vez
npm run dev        # recompila o CSS automaticamente a cada alteração
```

Depois, sirva a pasta com qualquer servidor estático (os caminhos no HTML são
absolutos, então `file://` direto não funciona):

```bash
npx serve .
# ou
python -m http.server 5173
```

## Decisões de conteúdo (fiéis ao briefing)

- **Página única de conversão**, sem loja virtual, sem área de cliente — todo CTA
  leva ao WhatsApp `(18) 99649-1777` com mensagem pré-escrita por seção/produto.
- **Sem blog ou depoimentos** neste lançamento (reservado para fase 2, conforme
  página 10 do briefing).
- **Logos das seguradoras** em faixa animada. Cada logo tem um `width` no HTML
  calculado como `60px × √(largura/altura)`, para todos ocuparem a mesma área
  visual independente do formato. Ao trocar ou incluir um logo, recalcule o `width`.
  Use a proporção da **área visível** do desenho, não a do arquivo: se o SVG/PNG tiver
  margem transparente (como o da Mapfre), divida o `width` calculado pela fração da
  largura que o desenho realmente ocupa dentro do arquivo.
- **FAQ no lugar do blog**, respondendo as dúvidas mais comuns (é seguradora?,
  custo, cobertura nacional, dados/LGPD).
- **SUSEP, CNPJ e políticas visíveis** no rodapé e no hero, deixando claro que a
  P3F é corretora — não seguradora.
- **Banner de cookies LGPD**: aceitar e recusar têm o mesmo peso visual; nenhum
  cookie não essencial é carregado antes do consentimento (ver `cookies.js`).
- **Logo não foi alterada** — mantida a arte atual (`logo-p3f-seguros.png`),
  conforme pedido do cliente enquanto o estudo de marca não é aprovado.
- **Fotos** no carrossel do hero e nos cards de Soluções (`src/assets/img/hero/`).
- **Ícones do hero** levam ao card do produto em Soluções (`#solucao-*`), com
  destaque dourado ao chegar.
- **Textos institucionais** (título, Missão, Visão, Valores e FAQ de custo) seguem o
  feedback do cliente de 09/10/2026 — ver `docs/feedback-2026-10-09-jader.md`.

## Paleta oficial

| Token | Hex | Uso |
|---|---|---|
| `navy-deep` | `#0E2A52` | Fundo hero, seções institucionais |
| `navy` | `#133463` | Cards escuros, textos de destaque |
| `gold` | `#C9A13B` | CTAs, ícones, detalhes |
| `mist` | `#F4F7FA` | Fundos claros alternados |

## Próximos passos (fase 2, fora deste escopo)

- Blog/notícias, depoimentos com autorização e logos de seguradoras parceiras.
- Páginas dedicadas por produto (Vida, Saúde, Previdência, Consórcio).
- Revisão jurídica formal dos textos legais antes de qualquer alteração de escopo.
