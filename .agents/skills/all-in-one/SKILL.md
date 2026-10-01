---
name: all-in-one
description: Skill Mestra Unificada que integra todo o ecossistema de desenvolvimento (Superpowers, Vibe Coding Toolkit, Ponytail, Anthropic Skills para Excel/PDF/DOCX, Frontend Design, Vercel Guidelines, Quality Gates de Lint e Graphify). Use para qualquer tarefa de implementação, refatoração, análise, exportação de dados ou desenvolvimento de interface de ponta a ponta.
---

# 🚀 All-in-One Master Engineering Skill

Esta skill governa o fluxo completo de desenvolvimento, aplicando disciplina de engenharia, combate ativo ao overengineering, direção de arte premium e garantia de qualidade automatizada.

## 🧭 As 7 Leis Inegociáveis

1. **Contexto Antes da Ação:** Nunca escreva código sem antes consultar o `MEMORY.md`, o grafo de conhecimento (`graphify query`) e a documentação real da biblioteca (`context7`).
2. **Escada Ponytail (Anti-Overengineering):** Suba a escada e pare na primeira opção válida:
   - YAGNI ➔ Reuso no projeto ➔ Biblioteca padrão ➔ Recurso nativo ➔ Dependência existente ➔ Uma linha ➔ Mínimo código novo.
3. **Plano com Verificação Estrita:** Toda mudança com 2+ passos exige plano escrito com comando de verificação explícito em cada etapa.
4. **TDD Obrigatório:** Para qualquer lógica de negócio, cálculo ou serviço: escreva o teste que reproduz o problema ou define o comportamento esperado antes de criar a implementação.
5. **Ondas Paralelas Seguras:** Subagentes em paralelo só operam sobre conjuntos de arquivos completamente disjuntos. O controlador faz todos os commits.
6. **Fronteiras Arquiteturais (Quality Gates):** Componentes visuais (`src/components/**`) jamais acessam clientes de banco de dados diretamente; arquivos devem respeitar o limite de 350-400 linhas.
7. **Evidência Antes de Declaração:** Jamais declare uma tarefa como "concluída" sem antes executar e validar o output de `npm run test` e `npm run typecheck`.

---

## 🔄 Esteira de Execução em 8 Fases

### Fase 1: Inteligência & Grafo Estrutural
- Consulte [MEMORY.md](file:///c:/Users/User/Music/VertexEstoques/MEMORY.md) para absorver invariantes do ERP e regras de negócio.
- Se o projeto possuir `graphify-out/`, use `graphify query "<termo>"` para mapear pontos de impacto.
- Se houver dúvida sobre versão de libs modernas (React 19, Next 15, Tailwind v4), consulte o MCP `context7`:
  - `resolve-library-id` ➔ `query-docs`.

### Fase 2: Concepção & Escopo Crítico (Brainstorming + Ponytail)
- Esclareça ambiguidades com o usuário usando a ferramenta `ask_question`.
- Aplique o filtro Ponytail: questione a real necessidade de novas abstrações ou dependências externas.

### Fase 3: Direção de Arte UI & Conformidade (Se envolver Frontend)
- **Frontend Design:** Aplique tipografia deliberada, tokens do sistema (Spice Red `#f93014`, grafite `#121116`), micro-interações intencionais e evite gradientes roxos genéricos.
- **Componentes Prontos:** Use os MCPs `shadcn-ui` e `21st` para aproveitar blocos robustos em vez de reinventar a roda.
- **Vercel Guidelines:** Garanta estados de `:focus-visible`, atributos `aria-label`, suporte a `prefers-reduced-motion` e tipografia numérica com `tabular-nums`.

### Fase 4: Plano Granular (Writing Plans)
- Estruture a implementação em tarefas pequenas (2 a 5 minutos por tarefa).
- Identifique os arquivos exatos a serem criados/modificados e suas dependências.

### Fase 5: Implementação Disciplinada (TDD + Subagentes)
- Escreva testes unitários no Vitest primeiro.
- Implemente o mínimo de código necessário para os testes passarem.
- Ao delegar para subagentes, agrupe-os em ondas com escopo de arquivos 100% isolados.

### Fase 6: Dados & Documentos (Se envolver relatórios)
- **Planilhas (`xlsx`):** Use fórmulas nativas do Excel (`SUMIFS`, `INDEX/MATCH`), documente suposições, formate moedas e valide integridade.
- **Relatórios (`pdf`):** Utilize `pdf-lib` de forma estruturada, prevenindo caracteres quebrados e mantendo layout profissional.
- **Documentos (`docx`):** Estruture tabelas com dimensões explícitas em DXA e respeite estilos de parágrafos.

### Fase 7: Quality Gates de Linting
- Rode `npm run lint`.
- Verifique se o teto de 400 linhas não foi violado (`quality/max-lines`).
- Garanta que não existam vazamentos de banco em apresentação (`quality/no-direct-data-access`).

### Fase 8: Barreira de Verificação Final & Sincronização
1. Rode `npm run typecheck` (deve retornar código 0).
2. Rode `npm run test` (todos os testes devem passar com evidências).
3. Rode `graphify update .` para manter o grafo de conhecimento sincronizado.
4. Apresente um resumo claro e conciso com links diretos para os arquivos alterados.
