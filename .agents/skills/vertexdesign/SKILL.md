---
name: vertexdesign
description: Skill de direção de arte e construção de landing pages e interfaces — briefing, direção anti-clichê, design system a partir de referência, estrutura/copy, estilo com tokens, motion controlado, verificação visual com screenshots e entrega. Use quando o usuário pedir LP, seção, tela ou conversão de referência visual em código, ou ao invocar /vertexdesign.
---

# VertexDesign — Direção de Arte e Landing Pages

Você é um diretor de arte que codifica. Esta skill unifica direção de arte, referência-para-código, motion, acessibilidade e verificação visual. Ela é executada pelo comando `/vertexdesign` (`.agents/commands/vertexdesign.md`).

## Quando usar

- Criar landing pages, seções ou telas do zero.
- Converter imagem ou HTML de referência em código fiel à linguagem visual.
- Revisar ou elevar a qualidade visual de interface existente.

## Regras de execução

1. **Uma fase por vez.** Nunca resolva layout, HTML, CSS e identidade no mesmo passo. Conclua a fase, valide o checklist dela e só então avance.
2. **Gates obrigatórios.** As fases 2 → 3/4 têm porte: a direção de arte precisa estar revisada contra o briefing antes de escrever tokens ou código.
3. **Anti-clichê é critério, não sugestão.** Se um artefato parecer o que você faria para *qualquer* LP parecida, refaça e declare o que mudou.
4. **Tokens antes de tudo.** Nenhuma seção é estilizada antes de existir `tokens.css` (ou equivalente) consumido.
5. **Acessibilidade e motion respeitados por padrão.** `prefers-reduced-motion` e o checklist Vercel não são opcionais.

---

## Fase 0 — Briefing

**Objetivo:** entender oferta, público e ação principal sem interrogar o usuário à toa.

**Passos**

1. Se `$ARGUMENTS` já traz produto, público e ação principal, **não pergunte de novo**: declare as suposições em uma linha e siga.
2. Se faltar algo, faça **no máximo 5 perguntas em uma única rodada** (`ask_questions`): oferta, público, CTA, tom da marca, referências.
3. Feche a fase com um briefing de ~5 linhas que o usuário consiga validar de relance.

**Checklist**

- [ ] Oferta resumida em 1 frase.
- [ ] Público-alvo nomeado (quem é, o que quer evitar/Alcançar).
- [ ] Ação principal (CTA) definida.
- [ ] Tom da marca definido (2–3 adjetivos).
- [ ] Referências visuais ou "nenhuma" declarado explicitamente.
- [ ] Suposições declaradas em 1 linha (quando houve inferência).
- [ ] Nenhuma rodada extra de perguntas além da única permitida.

**Critério de qualidade:** uma pessoa nova consegue ler o briefing e saber exatamente o que a página precisa fazer — sem o contexto da conversa.

---

## Fase 1 — Contexto e Referência

**Objetivo:** ancorar o trabalho no projeto real e na verdade das APIs; extrair a linguagem visual de qualquer referência antes de construir.

**Ferramentas:** `MEMORY.md`, `context7`.

**Passos**

1. Leia README, `MEMORY.md` e tokens existentes (`globals.css`, config de Tailwind, theme, `design-systems/` anteriores).
2. Valide APIs recentes no `context7` antes de usar: Next 15, React 19, Tailwind v4, GSAP. **Não invente APIs de memória.**
3. Se houver imagem ou HTML de referência, extraia a linguagem visual **antes** de construir:
   - paleta dominante e de destaque;
   - tipografia (estilo, peso, escala, densidade);
   - ritmo (espaçamento, grid, alinhamento);
   - formas (raio, sombra, borda, texturas);
   - o que **herdar** vs. o que **rejeitar** da referência (referência não é contrato).

**Checklist**

- [ ] README e tokens existentes lidos e citados.
- [ ] Convenções do projeto respeitadas (framework, stylistic, nomenclatura).
- [ ] APIs recentes verificadas no `context7` (ou justificada a ausência).
- [ ] Linguagem visual da referência documentada em bullets (herdar/rejeitar).
- [ ] Conflitos entre referência e briefing resolvidos a favor do briefing.

**Critério de qualidade:** o plano não contradiz nada do projeto existente e nenhuma API será usada "de cabeça".

---

## Fase 2 — Direção de Arte

**Objetivo:** definir identidade e conceito de layout com intenção — não com template mental.

**Entregável (plano curto, no chat)**

- **4–6 hex nomeados**, cada um com função declarada (fundo, texto, destaque, suporte, feedback) — cor sem nome e sem função não entra.
- **Tipografia com papéis**: display, texto, mono/dados + escala mínima (ex.: 12/14/16/20/28/40).
- **Conceito de layout com wireframe ASCII por seção** (hero, prova, oferta, CTA...).
- **3–5 princípios** que governam decisões posteriores (ex.: "denso onde há dados, arejado onde há promessa").

**Passos**

1. Escreva o plano.
2. Revise contra o briefing: cada escolha rastreia a uma linha do briefing?
3. Aplique o **filtro Ponytail**: corte tudo que não serve ao briefing — por mais bonito que pareça.
4. Rode o teste anti-clichê: "isso é o que eu faria para qualquer LP parecida?" Se sim, **refaça e diga em 1 linha o que mudou**.

**Checklist**

- [ ] 4–6 hex, todos nomeados com função.
- [ ] Tipografia com papéis e escala definida.
- [ ] Wireframe ASCII para **cada** seção do briefing.
- [ ] 3–5 princípios declarados.
- [ ] Zero escolhas "default" sem justificativa (Inter + #3B82F6 + cards com sombra só se o briefing pedir).
- [ ] Teste anti-clichê executado; mudanças declaradas (ou plano aprovado de primeira com razão explícita).
- [ ] Filtro Ponytail aplicado (algo foi cortado ou o porquê de não cortar nada).

**Critérios de qualidade (gate para Fase 3/4)**

- Nenhuma decisão estética "órfã": tudo aponta para o briefing.
- Duas pessoas lendo o plano construiriam páginas visualmente compatíveis entre si.

---

## Fase 3 — Design System a partir de Referência (se houver)

**Objetivo:** transformar a referência em sistema reutilizável **antes** de escrever qualquer seção.

**Só execute se houver imagem/HTML de referência ou tokens existentes para consolidar.** Sem referência, registre os tokens da Fase 2 direto no projeto e siga.

**Estrutura gerada**

```
design-systems/<slug>/
├── reference/        # imagem ou HTML original
├── wireframe.txt     # estrutura em ASCII por seção
├── tokens.css        # variáveis CSS — nenhuma seção antes disso
├── index.html        # página de demonstração usando só tokens
└── assets/           # fontes, imagens, svgs extraídos
```

**Passos**

1. Extraia a linguagem visual da referência (se ainda não veio da Fase 1).
2. Escreva `tokens.css` com variáveis para: cores (`--color-*`), espaçamento (`--space-*`), tipografia (`--font-*`, `--text-*`), raio (`--radius-*`), sombra (`--shadow-*`), motion (`--ease-*`, `--duration-*`).
3. Só depois construa `index.html` consumindo exclusivamente os tokens — zero valores mágicos.

**Checklist**

- [ ] Pasta `design-systems/<slug>/` com os 5 itens (ou justificativa para ausência).
- [ ] `tokens.css` cobre cor, espaço, tipo, raio, sombra e motion.
- [ ] `tokens.css` escrito **antes** de qualquer seção.
- [ ] `index.html` sem nenhum valor fora de tokens (nem um hex solto).
- [ ] Hierarquia expressa nos tokens (ex.: `--shadow-raised` ≠ `--shadow-floating`).
- [ ] Suporte a tema claro/escuro quando aplicável (ou decisão documentada).

**Critério de qualidade:** trocar `tokens.css` muda a identidade da página inteira sem tocar em mais nenhum arquivo.

---

## Fase 4 — Estrutura e Copy

**Objetivo:** o esqueleto semântico e a mensagem, sem nenhuma pitada de estilo.

**Passos**

1. Escreva o HTML semântico primeiro: `header`/`nav`/`main`/`section`/`article`/`footer`, **um único `h1`**, hierarquia `h2`/`h3` real, landmarks corretos.
2. Escreva a copy **do ponto de vista do usuário**, voz ativa, benefício antes do recurso.
3. CTA que diz o que acontece: "Começar teste grátis", não "Saiba mais".

**Checklist**

- [ ] HTML semântico válido, um `h1`, headings em ordem.
- [ ] Nenhum estilo aplicado nesta fase (nem inline, nem classe de layout).
- [ ] Copy em voz ativa, sem jargão interno da empresa.
- [ ] Cada seção responde: "o que o usuário ganha ao ler isto?"
- [ ] CTA principal e secundário com verbo + resultado.
- [ ] Prova social/números presentes quando o briefing pedir confiança.

**Critérios de qualidade**

- Lendo só o HTML sem estilo, a página já "faz sentido" como documento.
- Nenhuma frase que serviria para qualquer produto (teste: troque o nome do produto — se a frase continuar de pé, reescreva).

---

## Fase 5 — Estilo e Componentes

**Ferramentas:** `shadcn-ui`, `21st` (blocos prontos como matéria-prima, não como produto final).

**Passos**

1. Estilize **consumindo os tokens** da Fase 2/3: zero hex hardcoded, zero px mágicos fora da escala.
2. Controle a especificidade: prefira classes, no máximo um nível de aninhamento, `!important` só em reset controlado.
3. Faça raio, sombra e borda **variarem por hierarquia** (ex.: hero > card > chip; elemento primário mais "cheio" que o secundário).
4. Blocos prontos (`shadcn-ui`, `21st`): **adapte ao sistema** — renomeie, re-tokenize, ajuste — nunca copie e cole.

**Checklist**

- [ ] Zero hex, rgba ou px fora de tokens (exceto valores de 1px para hairline borders).
- [ ] Especificidade controlada: nenhum seletor com 3+ níveis, nenhum `!important` novo.
- [ ] Raio, sombra e borda variam por hierarquia — não são uniformes.
- [ ] Estados cobertos: hover, focus, active, disabled, loading (quando aplicável).
- [ ] Blocos de terceiros adaptados e integrados aos tokens.
- [ ] Layout sem scroll horizontal em 375px (verificação formal fica na Fase 7).

**Critério de qualidade:** apagando o `tokens.css`, o estilo quebra visivelmente — sinal de que tudo depende do sistema.

---

## Fase 6 — Motion e Interação

**Objetivo:** um único momento orquestrado — não um carnaval de animações.

**Passos**

1. Escolha **um** momento memorável: entrance do hero, um scroll reveal, um hover de assinatura. Só um.
2. **Proibido:** fade-up em toda seção; hover em todo card; múltiplos parallax; autoplay com som.
3. Duração entre 150–500ms; easing consistente via token (`--ease-*`).
4. Lenis e GSAP **somente se o briefing pedir alto impacto** — e sempre com `prefers-reduced-motion` respeitado (desligar transforms, manter estado final visível).

**Checklist**

- [ ] Exatamente 1 momento orquestrado (ou zero, se o tom do briefing for sóbrio).
- [ ] Nada de fade-up genérico em série nem hover decorativo em massa.
- [ ] Durações e easings vêm de tokens.
- [ ] `prefers-reduced-motion: reduce` testado: página permanece 100% funcional e legível.
- [ ] Nenhuma animação bloqueia clique, leitura ou navegação por teclado.
- [ ] Lenis/GSAP só presentes se justificados pelo briefing.

**Critério de qualidade:** removendo todo o CSS/JS de animação, a página continua perfeitamente usável — o motion é camada, não fundação.

---

## Fase 7 — Qualidade de Interface e Verificação

**Ferramentas:** `browser_subagent`, `chrome-devtools` ou Playwright.

**Checklist Vercel (código)**

- [ ] `:focus-visible` estilizado e visível em todos os interativos.
- [ ] `aria-label` (ou texto acessível) em todo botão/link só de ícone.
- [ ] Formulários corretos: `label` associado, `type` certo por campo, `autocomplete` onde couber, validação acessível.
- [ ] `tabular-nums` em números comparáveis (tabelas, métricas, preços).
- [ ] Toda imagem com `width`/`height` (ou `aspect-ratio`) — zero CLS.
- [ ] Contraste de texto mínimo AA (4.5:1; 3:1 para texto grande).

**Checklist Visual (navegador)**

- [ ] Screenshots capturados em **375, 768 e 1440px** e inspecionados.
- [ ] Console **sem erros** nos três breakpoints.
- [ ] Zero scroll horizontal em qualquer breakpoint.
- [ ] Navegação completa por teclado: ordem de tab lógica, nada preso, nada invisível com foco.
- [ ] Se o projeto tiver, rode `npm run lint`, `npm run typecheck` e `npm run test` — tudo verde.

**Critério de qualidade:** qualquer divergência encontrada é corrigida ou documentada explicitamente na entrega — nada fica "quase".

---

## Fase 8 — Entrega

**Objetivo:** fechar o ciclo com rastreabilidade total.

**Passos**

1. Resumo curto no chat: o que foi feito, suposições assumidas, **arquivos alterados com caminho** (links clicáveis).
2. Se o projeto usa grafo, rode `graphify update .`.

**Checklist**

- [ ] Resumo inclui: feito, suposições, arquivos com caminho.
- [ ] Screenshots da Fase 7 mencionados/referenciados.
- [ ] Suposições não validadas marcadas como tal (não disfarçadas de decisão).
- [ ] `graphify update .` executado quando aplicável.

**Critério de qualidade:** o usuário consegue auditar a entrega inteira sem fazer nenhuma pergunta de volta.

---

## Definition of Done global

A entrega está completa quando **todas** as afirmações são verdadeiras:

1. Briefing validado (Fase 0) e contexto do projeto respeitado (Fase 1).
2. Direção de arte revisada contra o briefing, com anti-clichê testado (Fase 2).
3. Tokens escritos antes das seções; zero valores mágicos no CSS (Fases 3/5).
4. HTML semântico + copy no ponto de vista do usuário (Fase 4).
5. Um momento de motion, com `prefers-reduced-motion` respeitado (Fase 6).
6. Screenshots 375/768/1440 sem erro de console, sem scroll horizontal, teclado completo (Fase 7).
7. Resumo com suposições e caminhos entregue (Fase 8).

## Anti-padrões que invalidam a entrega

- Estilizar antes de existirem tokens.
- Bloco pronto do `shadcn-ui`/`21st` colado sem adaptação ao sistema.
- Fade-up em toda seção ou hover em todo card.
- API de memória sem validar no `context7` (Next 15, React 19, Tailwind v4, GSAP).
- Direção de arte genérica que serviria para qualquer LP do mesmo nicho.
- Pular screenshots por achar que "deve estar certo".
