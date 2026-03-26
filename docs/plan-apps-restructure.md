# Plano: Reestruturação /projetos → /apps (estilo Orkut)

## Contexto

O portfólio tem hoje duas páginas que consomem os mesmos dados (`src/data/albums.ts`): `/projetos` (lista) e `/albuns` (grid). Nenhuma das duas aparece no sidebar — `/albuns` nunca foi linkada e é essencialmente um duplicato de `/projetos`.

O objetivo é transformar `/projetos` em `/apps`, com visual inspirado na seção "Apps" do Orkut original: cards estilo mini app store dos anos 2000, com ícone, nome, descrição curta e badges de stack. A seção "Apps" aparecerá também no sidebar abaixo dos nav links, replicando a hierarquia visual do Orkut.

`/fotos` (fotos pessoais) foi decidido adiar — sem conteúdo pronto, não faz sentido abrir a rota agora.

**Público:** recrutadores + dev community brasileira. Label "apps" é universalmente compreendido em tech (= software applications), sem perda de clareza.

---

## Etapas de Execução

### Etapa 1 — Extrair componente `<Lightbox>`

**Arquivo a criar:** `src/components/ui/Lightbox.tsx`

- Extrair a lógica de lightbox que está duplicada em `projetos/page.tsx` e `albuns/page.tsx`
- Props: `photos: AlbumPhoto[]`, `index: number`, `onClose: () => void`, `onPrev: () => void`, `onNext: () => void`
- Inclui: overlay escuro, imagem central, caption, botões anterior/próximo, fechar com Escape
- Strings i18n via `useI18n` internamente (reutiliza `albums.previous`, `albums.next`, `albums.close`)

### Etapa 2 — Criar `src/data/projects.ts` e limpar `albums.ts`

**Arquivo a criar:** `src/data/projects.ts`
- Mover os 6 projetos atuais de `albums.ts` para cá
- Adicionar campo `demoUrl?: string` ao tipo (hoje só tem `githubUrl`)
- Renomear tipo de `Album` para `Project` e `AlbumPhoto` para `ProjectPhoto`
- Exportar `projects: Project[]` e tipos

**Arquivo a modificar:** `src/data/albums.ts`
- Remover os 6 projetos (array ficará vazio, pronto para receber fotos pessoais no futuro)
- Manter tipos `Album` e `AlbumPhoto` intactos

### Etapa 3 — Criar `src/app/apps/page.tsx`

**Arquivo a criar:** `src/app/apps/page.tsx`
- Importa `projects` de `src/data/projects.ts`
- Visual estilo "Apps do Orkut": grid de cards com ícone grande (coverImage ou coverGradient+coverIcon), nome, descrição curta, badges de stack, botão decorativo "instalado ✓" (estilo Orkut), links GitHub/demo
- Ao clicar num projeto com `screenshots`, abre `<Lightbox>` (componente extraído na etapa 1)
- Layout: `OrkutNavbar` + `ThreeColumnLayout` com `ProfileCard` e `QuickStats`
- Título do card: `t("apps.title")`

### Etapa 4 — Deletar rotas antigas e atualizar i18n

**Arquivos a deletar:**
- `src/app/projetos/page.tsx`
- `src/app/albuns/page.tsx`

**Arquivo a modificar:** `src/i18n.tsx`

Novas chaves (PT-BR / EN):
```
nav.apps:          "projetos" / "projects"   ← label familiar pra recrutadores
apps.title:        "Apps" / "Apps"           ← título do card, estilo Orkut
apps.installed:    "instalado" / "installed"
apps.screenshots:  "screenshots" / "screenshots"
sidebar.apps:      "Apps" / "Apps"
```

Renomear `nav.projects` → `nav.apps` (ou adicionar `nav.apps` e deprecar `nav.projects`).

> **Nota sobre label:** Na navbar usamos "projetos"/"projects" (familiar para recrutadores). No card e sidebar usamos "Apps" (fiel ao Orkut). Separação intencional.

### Etapa 5 — Atualizar Sidebar (`ProfileCard.tsx`)

**Arquivo a modificar:** `src/components/sidebar/ProfileCard.tsx`

1. Substituir `/projetos` por `/apps` no `sidebarNav` (mantém `sidebar-videos.png` como ícone por enquanto)
2. Adicionar seção "Apps" separada abaixo dos nav links, replicando hierarquia do Orkut:
   - Header "Apps" com link "editar" → `/apps`
   - 3 primeiros projetos como mini-cards (ícone 16px + nome), linkando para `/apps`
   - Link "ver todos →" ao final

### Etapa 6 — Atualizar Navbar e Worker (redirects)

**Arquivo a modificar:** `src/components/layout/OrkutNavbar.tsx`
- Atualizar path de `/projetos` para `/apps`
- Label via `t("nav.apps")` = "projetos" / "projects"

**Arquivo a modificar:** `src/worker.ts`
- Adicionar redirects 301 antes do fallback de ASSETS:
  ```typescript
  if (url.pathname === "/projetos") return Response.redirect(new URL("/apps", url).toString(), 301);
  if (url.pathname === "/albuns") return Response.redirect(new URL("/apps", url).toString(), 301);
  ```

---

## Arquivos Afetados

| Ação | Arquivo |
|------|---------|
| Criar | `src/components/ui/Lightbox.tsx` |
| Criar | `src/data/projects.ts` |
| Criar | `src/app/apps/page.tsx` |
| Deletar | `src/app/projetos/page.tsx` |
| Deletar | `src/app/albuns/page.tsx` |
| Modificar | `src/data/albums.ts` |
| Modificar | `src/i18n.tsx` |
| Modificar | `src/components/sidebar/ProfileCard.tsx` |
| Modificar | `src/components/layout/OrkutNavbar.tsx` |
| Modificar | `src/worker.ts` |

---

## Iterações (respeitando limite de 3 arquivos)

1. **Lightbox + data split**: `Lightbox.tsx` (criar), `projects.ts` (criar), `albums.ts` (limpar)
2. **Apps page + i18n + deletar rotas antigas**: `apps/page.tsx` (criar), `i18n.tsx` (modificar), `projetos/` e `albuns/` (deletar)
3. **Navegação + redirects**: `ProfileCard.tsx`, `OrkutNavbar.tsx`, `worker.ts`

---

## Verificação

- `npm run build` sem erros após cada iteração
- `/apps` abre e exibe os 6 projetos com visual de cards
- Lightbox funciona ao clicar em projeto com screenshots
- `/projetos` e `/albuns` redirecionam para `/apps` (testar em produção via Cloudflare Worker)
- Sidebar exibe seção "Apps" separada abaixo dos nav links
- Navbar linka corretamente para `/apps` com label "projetos"/"projects"
- i18n funciona nos dois idiomas (PT-BR e EN)

---

## Adiado

- `/fotos` (fotos pessoais): aguarda conteúdo pronto
- Ícone personalizado `sidebar-apps.png` para o sidebar
- `demoUrl` populado nos projetos (pode ser feito incrementalmente)

## Próximos passos pós-estrutura

### MePagaAi (Flutter web)
- Alinhar trabalho de mocks existente no desktop → push pro repo
- `flutter build web` → hospedar output (subdomínio `mepagaai.lucasclaros.dev` no Cloudflare)
- Adicionar botão "abrir app" no card `/apps` → iframe ou nova aba
- **Nota:** o card de `/apps` já deve ser desenhado com suporte a `appUrl?` no tipo `Project` para não precisar reworkar depois

### Marseille (discovery)
- Sessão separada: abrir notebook, entender estado atual, decidir formato de UI
- Streamlit é candidato óbvio mas precisa de validação
- Só planejar depois do discovery
