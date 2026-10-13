# Análise do feedback — Site P3F (Jader, 09/10/2026)

| | |
|---|---|
| **Origem** | `Feedback Site P3F - Jader 09-10-26.pdf` (7 páginas, mentor + cliente) |
| **Site analisado** | https://p3-f-seguros-one.vercel.app (commit `884f3a3`) |
| **Arquivo principal** | [`index.html`](../index.html) |
| **Data da análise** | 13/10/2026 |
| **Status** | Proposta — nada implementado ainda |

Este documento cruza cada ponto do feedback com o código atual do site, mostra o
que muda, onde muda e o que ainda precisa de confirmação do cliente antes de
implementar. As referências de linha (`index.html:116`) valem para o commit
`884f3a3`.

---

## 1. Resumo

| # | Seção | Pedido | Tipo | Esforço | Prioridade |
|---|---|---|---|---|---|
| 1 | Menu | Incluir **Quem somos** | Estrutura | Baixo | Alta |
| 2 | Menu | Método, Soluções, Dúvidas e Contato — **ok** | — | — | — |
| 3 | Hero | Trocar o título | Texto | Baixo | Alta |
| 4 | Hero | Trocar o subtítulo | Texto | Baixo | Alta |
| 5 | Hero | Remover o botão de WhatsApp do centro | Layout | Baixo | Alta |
| 6 | Hero | Ícones (Vida, Saúde, Previdência, Consórcio) levarem ao conteúdo | Funcionalidade | Médio | Alta |
| 7 | Hero + Soluções | Ícone da Previdência virar gráfico financeiro | Visual | Baixo | Média |
| 8 | Método | Selo "A marca dentro do método" → "Um método, uma marca" | Texto | Baixo | Alta |
| 9 | Método | Reescrever a frase de introdução | Texto | Baixo | Alta |
| 10 | Método | Cards P / F / F / F estão grandes demais | Layout | Médio | Média |
| 11 | Soluções | Trocar o subtítulo | Texto | Baixo | Alta |
| 12 | Seguradoras | Alinhar os logos das Cias | Visual | Médio | Média |
| 13 | Quem somos | Missão, visão e valores com o texto oficial | Texto | Baixo | Alta |
| 14 | FAQ | Reescrever a resposta "Quanto custa a consultoria" | Texto | Baixo | Alta |

Mais 6 pontos que **não estão no feedback**, mas apareceram na análise — ver [seção 4](#4-pontos-extras-encontrados-na-análise).

---

## 2. Análise item a item

### Item 1 — Incluir "Quem somos" no menu

**Feedback (pág. 1):** sentiu falta do "Quem somos" nesta primeira parte. No
print, o comentário está ao lado do menu, e o comentário seguinte fala
justamente dos itens do menu ("Método, soluções, dúvidas e contato, ok").

**Situação atual**
- O menu desktop tem só 4 links: Método, Soluções, Dúvidas e Contato (`index.html:66-71`).
- O menu mobile tem um quinto link, **"Missão"** (`index.html:97`), que não existe no desktop.
- A seção já existe com o selo "Quem somos" (`index.html:469-491`, `id="missao"`),
  mas fica lá embaixo: é a 5ª seção, depois do carrossel de seguradoras.
- O menu do rodapé (`index.html:636-641`) também não tem esse link.

**Proposta**
1. Renomear a âncora `#missao` para `#quem-somos`.
2. Incluir **"Quem somos"** como **primeiro item** do menu desktop, do menu mobile
   (no lugar de "Missão") e do rodapé.
3. *(Opcional, recomendado)* Subir a seção para logo depois do hero, antes do
   Método, e acrescentar um parágrafo curto de apresentação acima de
   Missão/Visão/Valores. Por exemplo: corretora registrada na SUSEP, fundada por
   Walbert Henrique, em Cruzeiro/SP, com atendimento digital para todo o Brasil.

**Ordem final do menu:** Quem somos · Método · Soluções · Dúvidas · Contato

**A confirmar com o cliente:** se a seção também sobe na página (opção 3) e qual
é o texto do parágrafo de apresentação.

---

### Item 2 — Itens do menu

**Feedback (pág. 1):** "Método, soluções, dúvidas e contato, ok". Ele percebeu
que o clique leva até a informação.

**Ação:** nenhuma. Só manter o comportamento atual de rolar até a seção (`scroll-behavior: smooth` em `src/css/input.css`).

---

### Item 3 — Novo título do hero

**Situação atual** (`index.html:116`):
> Proteja sua família sem pagar mais que o necessário

**Novo texto:**
> **Proteja sua família investindo no que é necessário**

No PDF a frase está em CAIXA ALTA só para dar ênfase. Vamos manter o padrão do
site, com só a primeira letra maiúscula, igual aos outros títulos.

---

### Item 4 — Novo subtítulo do hero

**Situação atual** (`index.html:117`):
> Diagnóstico gratuito e sob medida em vida, saúde, previdência e consórcio.

**Novo texto:**
> **Diagnósticos sob medida blindando sua família e seu patrimônio.**

**Observações**
- No PDF, esta frase vem logo depois da troca do título, mas sem o "trocar por".
  Entendemos que ela substitui o subtítulo atual.
- O texto novo não cita mais os 4 produtos nem a palavra "gratuito". Os produtos
  continuam aparecendo nos ícones logo abaixo, e a gratuidade continua na FAQ.
- Sugestão de redação, se o cliente quiser: *"Diagnósticos sob medida para
  blindar sua família e seu patrimônio."*

**A confirmar:** se fica a redação original do cliente ou a sugestão.

---

### Item 5 — Remover o botão de WhatsApp do centro do hero

**Situação atual:** botão verde "Falar no WhatsApp agora" no meio do slide 1 (`index.html:118-121`).

**Proposta**
- Remover o `<a>` das linhas 118-121.
- Ajustar o espaço entre o subtítulo e os ícones (`mt-8 md:mt-10` em `index.html:122`)
  para o bloco não ficar "colado".

**Impacto na conversão:** baixo. Na primeira dobra ainda ficam o botão "Falar no
WhatsApp" do cabeçalho e o botão flutuante. Os slides 2 a 5 continuam com seus
próprios botões ("Quero proteger minha família", "Quero um plano"...).

---

### Item 6 — Os ícones do hero ficarão num carrossel? O clique leva ao conteúdo?

**Feedback (pág. 1 e pág. 4):** pergunta se os ícones ficarão num carrossel e se
o clique leva a um conteúdo breve. Na pág. 4 completa: *"naquele carrossel da 1ª
tela, uma vez clicando virão estes conteúdos?"* — "estes conteúdos" são os cards
da seção Soluções.

**Situação atual**
- Os 4 ícones (`index.html:123-138`) são `<div>` sem link nenhum: **o clique não faz nada**.
- O hero já é um carrossel com 5 slides (`index.html:107-198`, `src/js/modules/carousel.js`):
  o slide 1 é a visão geral com os ícones, e os slides 2 a 5 mostram cada produto.
  A troca é automática a cada 6 s.
- Como os ícones ficam **só no slide 1**, eles somem quando o carrossel avança.

**Resposta ao mentor:** sim, o clique pode levar ao conteúdo. Há duas opções:

| | Opção A — Rolar até o card (recomendada) | Opção B — Ícone vira controle do carrossel |
|---|---|---|
| Clique em "Vida" | Rola a página até o card *Seguro de Vida* em Soluções | O hero troca para o slide *Vida* |
| Conteúdo mostrado | Completo ("O que pensam que é / O que realmente é" + botão) | Breve (título + 1 frase + botão) |
| Atende à pág. 4 | Sim, literalmente | Parcialmente |
| Mudança no código | HTML + CSS | HTML + CSS + JS (`carousel.js`) |

**Implementação da Opção A**
1. Trocar cada `<div class="hero-tile">` por `<a href="#solucao-vida">` (e `#solucao-saude`, `#solucao-previdencia`, `#solucao-consorcio`).
2. Colocar esses `id` nos 4 `<article>` de Soluções (`index.html:277, 314, 351, 388`).
3. Adicionar `scroll-mt-24` nos cards, para o cabeçalho fixo não cobrir o topo.
4. Estados de hover/foco nos ícones (borda dourada e leve elevação). Hoje eles não dão nenhum sinal de que são clicáveis.
5. *(Opcional)* Destacar o card de destino por ~1,5 s com `:target` (anel dourado).

**Implementação da Opção B:** atributo `data-goto="1..4"` nos ícones e um handler
em `carousel.js` que chama `show(i)`. Nesse caso vale tirar os ícones de dentro do
slide 1 e deixá-los fixos, embaixo de todos os slides, marcando o ícone do slide
ativo.

**A confirmar com o cliente:** opção A ou B.

---

### Item 7 — Ícone da Previdência: gráfico financeiro

**Situação atual:** o ícone é um relógio, em 2 lugares:
- Hero: `index.html:132`
- Card de Soluções: `index.html:358`

**Proposta:** trocar nos dois lugares por um gráfico de linha subindo, com eixos,
no mesmo traço dos outros ícones (stroke 1.6/1.8, `viewBox 0 0 24 24`):

```html
<path d="M3 3v18h18"/>
<path d="m7 15 4-4 3 3 5-6"/>
<path d="M15 8h4v4"/>
```

---

### Item 8 — Selo da seção Método

**Situação atual** (`index.html:204`): "A marca dentro do método"

**Novo texto:** **"Um método, uma marca"**

---

### Item 9 — Frase de introdução do Método

**Situação atual** (`index.html:206-208`):
> Antes de falar de produto, explicamos como trabalhamos: consulta, diagnóstico e indicação sob medida. Nada de prateleira.

O mentor riscou "explicamos como trabalhamos" (em vermelho no PDF).

**Novo texto:**
> **Antes de falar de produto, aplicamos o método identificando diagnósticos e indicamos soluções sob medida.**

**A confirmar:** se "Nada de prateleira." continua no final. O mentor não
comentou essa parte.

---

### Item 10 — Cards do Método P3F estão grandes

**Feedback (pág. 3):** achou as caixas da P3F grandes.

**Medições no site publicado**

| Viewport | Card | Tamanho | Espaço usado pelo texto |
|---|---|---|---|
| Desktop 1366px | Proteção (P) | 1136 × 278 px | — |
| Desktop 1366px | Financeira / Familiar / Futura | 363 × 348 px cada | ~40% |
| Mobile 390px | Proteção (P) | 342 × 436 px | 196 px (45%) |
| Mobile 390px | Cada F | 342 × 348 px | 140 px (40%) |
| Mobile 390px | **Seção Método inteira** | **1922 px de altura** (≈ 2,3 telas) | — |

A maior parte da altura vem do **espaço reservado para a ilustração**:
`pb-52` no card P no mobile (`index.html:212`), `pb-44` nos cards F
(`index.html:224, 235, 246`) e ilustrações de `h-80 w-80` (P, desktop) e
`h-40 w-40` (F).

**Proposta (reduzir sem perder a identidade)**

| Elemento | Hoje | Proposta |
|---|---|---|
| Card P — padding | `p-8 pb-52 md:p-12 md:pb-12` | `p-6 pb-32 md:p-10` |
| Card P — ilustração | `h-48 w-48 md:h-80 md:w-80` | `h-28 w-28 md:h-48 md:w-48` |
| Card P — letra de fundo | `text-[9rem] md:text-[14rem]` | `text-[7rem] md:text-[10rem]` |
| Card P — título | `text-3xl md:text-4xl` | `text-2xl md:text-3xl` |
| Cards F — padding | `p-8 pb-44` | `p-6 pb-24` |
| Cards F — ilustração | `h-40 w-40` | `h-24 w-24` |
| Cards F — letra de fundo | `text-8xl` | `text-7xl` |

**Meta:** card P com ~200 px e cards F com ~220 px no desktop, e a seção Método
com no máximo ~1200 px no mobile.

**Alternativa:** os 4 cards em uma linha só no desktop (`md:grid-cols-4`), com o
mesmo tamanho. A seção fica mais compacta, mas perde o destaque da "Proteção"
como ponto de partida.

---

### Item 11 — Subtítulo de Soluções

**Situação atual** (`index.html:273`): "Escolha a solução e abra a conversa certa no WhatsApp."

**Novo texto:** **"A blindagem certa para suas necessidades."**

O mentor também elogiou essa seção ("Página top"). A dúvida dele sobre ligar o
carrossel do topo a estes cards está respondida no [Item 6](#item-6--os-ícones-do-hero-ficarão-num-carrossel-o-clique-leva-ao-conteúdo).

---

### Item 12 — Alinhar os logos das seguradoras

**Feedback (pág. 5):** "OK! Só alinhar as Cias."

**Diagnóstico.** Todos os logos usam a mesma regra, `max-h-9 max-w-[9rem]`
(`src/css/input.css`, `.brand-item img`). Como os formatos são muito diferentes
(de 1:1 a 6:1), uns ficam grandes e outros minúsculos. Área ocupada medida no
site, em desktop:

| Logo | Tamanho na tela | Área (px²) | Proporção do arquivo |
|---|---|---|---|
| Allianz | 144 × 36 | 5141 | 4,0 : 1 |
| Tokio Marine | 144 × 36 | 5123 | 4,0 : 1 |
| SulAmérica | 141 × 36 | 5063 | 3,9 : 1 |
| MetLife | 144 × 32 | 4552 | — |
| Mapfre | 128 × 35 | 4508 | 3,6 : 1 |
| Porto | 138 × 32 | 4416 | 4,3 : 1 |
| Yelum | 109 × 36 | 3925 | 3,0 : 1 |
| Unimed | 108 × 36 | 3878 | 3,0 : 1 |
| Amil | 101 × 36 | 3638 | 2,8 : 1 |
| Bradesco Seguros | 144 × 23 | 3317 | 6,25 : 1 |
| Icatu | 128 × 24 | 3060 | 5,35 : 1 |
| Azul Seguros | 59 × 36 | 2110 | 1,6 : 1 |
| Zurich | 57 × 36 | 2065 | 1,6 : 1 |
| **HDI Seguros** | **36 × 36** | **1296** | **1 : 1 (PNG 960×960)** |

O maior logo ocupa **4× mais área** que o menor.

**Proposta**
1. **Equilibrar pela área, não pela altura.** Cada logo recebe uma variável CSS
   com a proporção dele, e a largura vira `largura = base × √proporção`, com
   altura automática. Assim todos ficam com peso visual parecido:
   ```html
   <li class="brand-item"><img src="…/hdi-seguros.png" style="--r:1" …></li>
   ```
   ```css
   .brand-item img { width: calc(2.6rem * sqrt(var(--r))); max-width: 8.5rem; max-height: 2.75rem; }
   ```
   Se `sqrt()` no CSS não for aceitável para os navegadores alvo, gravamos a
   largura já calculada em cada logo.
2. **Corrigir os arquivos**
   - `hdi-seguros.png`: é um PNG quadrado de 960×960, com fundo. Trocar por um SVG horizontal oficial ou recortar as bordas.
   - `azul-seguros.svg`: não tem `viewBox` (só `width="500" height="307"`). Adicionar `viewBox="0 0 500 307"` para escalar certo.
   - `metlife.svg`: arquivo exportado do Inkscape, com metadados. Conferir/adicionar `viewBox` e limpar.
3. Conferir o resultado em desktop e mobile, com a animação pausada.

**A confirmar com o cliente (opcional):** manter os logos coloridos ou deixar
todos em tons de cinza/branco, com a cor aparecendo no hover. Logos monocromáticos
deixam a faixa mais uniforme.

---

### Item 13 — Missão, Visão e Valores

**Feedback (pág. 6):** "Os tópicos estão diferentes???". O cliente mandou o texto oficial.

| | Hoje (`index.html:477-488`) | Texto oficial do cliente |
|---|---|---|
| **Missão** | Proteger famílias e patrimônios com consultoria clara, humana e sob medida — sem prometer o que a seguradora não garante. | **Garantir proteção e tranquilidade por meio de soluções personalizadas, exercendo transparência em cada decisão.** |
| **Visão** | Ser a referência em consultoria de seguros e benefícios para famílias, médicos, empresários e coletivos que preferem indicação a propaganda. | **Ser reconhecida como referência nacional em proteção, sucessão patrimonial e pessoal, destacando-se pela qualidade na entrega de soluções.** |
| **Valores** | Empatia, transparência e justiça em cada conversa. Frases curtas, sem promessa agressiva. | **Empatia, respeito e ética como pilares essenciais para fortalecer e sustentar as relações com os clientes.** |

**Ação:** trocar os três textos exatamente como o cliente enviou. O texto atual
de Valores tem até uma instrução interna de redação ("Frases curtas, sem
promessa agressiva") que não deveria aparecer no site.

---

### Item 14 — Resposta "Quanto custa a consultoria da P3F?"

**Situação atual** (`index.html:579`):
> O diagnóstico e a indicação não têm custo para você. Nossa remuneração vem da comissão paga pela seguradora ou operadora, já prevista no valor da apólice — sem taxa extra.

**Novo texto (pág. 7):**
> **O diagnóstico e a indicação não têm custo para você. Nossa remuneração vem através de propostas e contratos efetivados junto às seguradoras, operadoras ou administradoras — sem taxa extra.**

O texto novo inclui as **administradoras** (consórcio), que faltavam na versão atual.

---

## 3. Arquivos afetados

| Arquivo | Itens |
|---|---|
| `index.html` | 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 |
| `src/css/input.css` | 6 (hover/target dos ícones), 10 (opcional), 12 |
| `src/js/modules/carousel.js` | 6 — só se for a Opção B |
| `src/assets/img/logos/hdi-seguros.png` | 12 |
| `src/assets/img/logos/azul-seguros.svg` | 12 |
| `src/assets/img/logos/metlife.svg` | 12 |

`dist/css/output.css` é gerado com `npm run build` e não vai para o repositório (`.gitignore`).

---

## 4. Pontos extras encontrados na análise

Estes pontos não estão no feedback, mas apareceram durante a revisão. Sugerimos
resolver junto com a rodada de ajustes.

| # | Ponto | Onde | Sugestão |
|---|---|---|---|
| E1 | **A ordem do menu não bate com a ordem da página.** No menu, Dúvidas vem antes de Contato; na página, Contato (`index.html:494`) vem antes da FAQ (`index.html:539`). | `index.html` | Mover a FAQ para antes do Contato. Assim o formulário fica como último passo antes do rodapé, que é o padrão de página de conversão. |
| E2 | **A imagem de compartilhamento (og:image) vai quebrar** quando o site novo assumir o domínio. A meta aponta para `/img/logo-p3f-seguros.png`, que hoje responde no site antigo (200), mas dá **404** no site novo. O logo de verdade está em `/src/assets/img/logo-p3f-seguros.png`. | `index.html:17, 34-35` | Corrigir para `https://p3fseguros.com.br/src/assets/img/logo-p3f-seguros.png`, ou criar uma imagem de compartilhamento própria de 1200×630. |
| E3 | O **menu do rodapé** não tem Contato nem Quem somos. | `index.html:636-641` | Deixar igual ao menu principal. |
| E4 | O **README está desatualizado**: diz "sem logos de seguradoras" e "sem fotos de banco de imagem", mas o site já tem as duas coisas. | `README.md` | Atualizar a seção "Decisões de conteúdo". |
| E5 | Os ícones do hero **não dão sinal de que são clicáveis**: não têm cursor de link nem hover. | `index.html:123-138` | Resolvido junto com o Item 6. |
| E6 | Os botões dos cards de Soluções têm verbos diferentes: "Cote agora", "Contratar agora", "Conhecer planos" e "Simule agora". | `index.html:310, 347, 384, 421` | Opcional: padronizar o tom. "Contratar agora" pode soar agressivo para quem ainda vai fazer o diagnóstico. Sugestão: "Quero meu diagnóstico". Precisa de aprovação do cliente. |

---

## 5. Pendências com o cliente (antes de implementar)

1. **Item 1:** a seção Quem somos também sobe na página? Qual o texto do parágrafo de apresentação?
2. **Item 4:** subtítulo na redação original ("blindando") ou na sugerida ("para blindar")?
3. **Item 6:** clique nos ícones do hero — Opção A (rola até o card) ou Opção B (troca o slide)?
4. **Item 9:** mantém "Nada de prateleira." no final da frase?
5. **Item 12:** logos coloridos ou monocromáticos? Existe um arquivo oficial do logo da HDI em formato horizontal?
6. **E6:** padronizar os botões dos cards de Soluções?

---

## 6. Ordem de implementação sugerida

1. **Textos aprovados** (sem dependência): itens 3, 8, 11, 13 e 14.
2. **Hero:** item 5 (remover botão) e item 7 (ícone).
3. **Navegação:** item 1 + E1 + E3.
4. **Layout:** item 10 (cards do Método) e item 12 (logos).
5. **Funcionalidade:** item 6, depois da resposta do cliente.
6. **Itens que dependem de resposta:** 4 e 9.
7. **Ajustes técnicos:** E2 e E4.
8. Validar em desktop (1366px) e mobile (390px), rodar `npm run build` e conferir o deploy de preview na Vercel antes de mandar para o cliente.
