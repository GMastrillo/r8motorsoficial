---
description: Executa o ciclo completo de criação de landing pages e interfaces com a Skill VertexDesign (briefing, direção de arte anti-clichê, design system a partir de referência, estrutura e copy, estilo, motion controlado, Vercel Guidelines e verificação visual com screenshots)
argument-hint: <descrição da LP, seção, tela ou referência visual>
---

# /vertexdesign — Orquestrador de Landing Pages e Design Visual

Este comando aciona a **Skill VertexDesign** ([`.agents/skills/vertexdesign/SKILL.md`](.agents/skills/vertexdesign/SKILL.md)), que unifica direção de arte, referência-para-código, motion, acessibilidade e verificação visual.

Quando o usuário invocar `/vertexdesign $ARGUMENTS`, leia a skill e execute a esteira em 9 fases (0 a 8). Uma coisa por vez: não resolva layout, HTML, CSS e identidade no mesmo passo.

---

## Fase 0: Briefing
- Se `$ARGUMENTS` já traz produto, público e ação principal, não pergunte de novo: declare as suposições em uma linha e siga.
- Se faltar algo, faça no máximo 5 perguntas em uma única rodada (`ask_question`): oferta, público, CTA, tom da marca, referências.

## Fase 1: Contexto e Referência
- **Ferramentas**: `MEMORY.md`, `context7`
- Leia README e tokens existentes. Valide APIs recentes (Next 15, React 19, Tailwind v4, GSAP) no `context7`.
- Se houver imagem ou HTML de referência, extraia a linguagem visual antes de construir.

## Fase 2: Direção de Arte
- Plano curto: 4–6 hex nomeados, tipografia com papéis, conceito de layout com wireframe ASCII por seção, princípios.
- Revise contra o briefing. Se parecer o que você faria para qualquer LP parecida, refaça e diga o que mudou.
- Aplique o filtro Ponytail: só entra o que serve ao briefing.

## Fase 3: Design System a partir de Referência (se houver)
- Imagem ou HTML ➔ `design-systems/<slug>/` com `reference`, `wireframe.txt`, `tokens.css`, `index.html`, `assets/`.
- Tokens em variáveis CSS antes de escrever qualquer seção.

## Fase 4: Estrutura e Copy
- HTML semântico primeiro, sem estilo.
- Copy do ponto de vista do usuário, voz ativa, CTA que diz o que acontece.

## Fase 5: Estilo e Componentes
- **Ferramentas**: `shadcn-ui`, `21st`
- CSS com tokens e atenção à especificidade. Raio, sombra e borda variam por hierarquia. Blocos prontos adaptados ao sistema, não copiados.

## Fase 6: Motion e Interação
- Um único momento orquestrado. Sem fade-up em toda seção nem hover em todo card.
- Lenis e GSAP só se o briefing pedir alto impacto. Sempre com `prefers-reduced-motion`.

## Fase 7: Qualidade de Interface e Verificação
- **Ferramentas**: `browser_subagent`, `chrome-devtools` ou Playwright
- Checklist Vercel: `:focus-visible`, `aria-label`, formulários corretos, `tabular-nums`, imagens com `width`/`height`.
- Screenshots em 375, 768 e 1440px. Console sem erros, sem scroll horizontal, navegação completa por teclado.
- Se o projeto tiver, rode `npm run lint`, `npm run typecheck` e `npm run test`.

## Fase 8: Entrega
- Resumo curto: o que foi feito, suposições, arquivos alterados com caminho.
- Se o projeto usa grafo, rode `graphify update .`.
