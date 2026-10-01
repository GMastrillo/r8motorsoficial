---
description: Executa o ciclo completo de desenvolvimento com a Skill All-in-One (Graphify, Brainstorming, Ponytail, Frontend Design, Vercel Guidelines, Writing Plans, TDD, Subagents, Anthropic Skills XLSX/PDF, Quality Gates de Lint e Verificação)
argument-hint: <descrição do objetivo, feature ou tarefa>
---

# /all-in-one — Orquestrador Mestre de Desenvolvimento

Este comando aciona a **Skill All-in-One** ([`.agents/skills/all-in-one/SKILL.md`](.agents/skills/all-in-one/SKILL.md)) unificando todo o ecossistema (Superpowers, Vibe Coding Toolkit, Anthropic Skills, Ponytail e Quality Gates).

Quando o usuário invocar `/all-in-one $ARGUMENTS`, execute autonomamente a esteira em 8 fases:

---

## Fase 1: Inteligência & Grafo Estrutural
- **Skills & MCPs**: `graphify`, `MEMORY.md`, `context7`
- Consulte `MEMORY.md` e o grafo (`graphify query`) para identificar nós centrais e impactos. Se houver APIs recentes (Next 15, React 19, Tailwind v4, Supabase), valide no `context7`.

## Fase 2: Concepção & Escopo Crítico (Brainstorming + Ponytail)
- **Skills**: `brainstorming`, `ponytail`
- Questione a necessidade de cada complexidade. Aplique a escada YAGNI: *Precisa existir? Já existe no código? A lib padrão ou nativa cobre?*.

## Fase 3: Direção de Arte & Padrões UI (Se envolver Frontend)
- **Skills & MCPs**: `frontend-design`, `web-interface-guidelines`, `21st`, `shadcn-ui`
- Visual com identidade própria, combate a clichês de IA, `:focus-visible`, `tabular-nums`, respeito a `prefers-reduced-motion`.

## Fase 4: Plano Granular (Writing Plans)
- **Skills**: `writing-plans`
- Crie um plano em `docs/superpowers/plans/` com passos atômicos e comandos de verificação para cada etapa.

## Fase 5: Implementação Disciplinada (TDD + Ondas Paralelas)
- **Skills**: `test-driven-development`, `parallel-subagent-driven-development`
- Testes primeiro no Vitest. Subagentes em paralelo apenas em arquivos 100% disjuntos.

## Fase 6: Dados & Documentos (Se envolver relatórios/planilhas)
- **Skills**: `xlsx`, `pdf`, `docx`
- Fórmulas dinâmicas sem erro de recálculo no Excel, estruturação com `pdf-lib` sem quebra de glifos.

## Fase 7: Quality Gates de Linting
- **Ferramentas**: `eslint` com `eslint-rules`
- Respeitar o limite de 400 linhas por arquivo e isolamento de banco fora da apresentação.

## Fase 8: Barreira de Verificação Final & Sincronização
- **Ferramentas**: `vitest`, `tsc`, `graphify update .`
- Execute `npm run test` e `npm run typecheck`. Atualize o grafo com `graphify update .`. Evidências antes de conclusão.
