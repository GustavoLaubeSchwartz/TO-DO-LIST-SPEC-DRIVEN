# Arquitetura

## Padrão MVC

A aplicação segue o padrão **Model-View-Controller** com separação clara de responsabilidades.

!!! note "Por que MVC?"
    O MVC é o padrão arquitetural mais consolidado para aplicações web. Garante separação de responsabilidades (cada camada tem uma única função), testabilidade (camadas testáveis isoladamente) e manutenibilidade (mudanças na View não impactam o Model). Alternativas como MVVM ou Clean Architecture foram descartadas por adicionarem complexidade desnecessária ao escopo do projeto. Veja mais em [Justificativas](justifications.md).

```
src/
├── models/
│   └── taskModel.js        # Dados em memória + operações CRUD
├── views/
│   └── public/             # Frontend estático (HTML/CSS/JS)
│       ├── index.html
│       ├── css/style.css
│       └── js/app.js
├── controllers/
│   └── taskController.js   # Lógica de negócio + validação
├── routes/
│   └── taskRoutes.js       # Definição de rotas REST
└── app.js                  # Configuração do Express
```

### Model

O Model gerencia os dados em memória usando um array JavaScript. Responsável por:

- Armazenar tarefas em um array (`tasks[]`)
- Operações CRUD: `getAll()`, `getById()`, `create()`, `update()`, `delete()`
- Gerenciamento de lembretes: `getPendingReminders()`, `markReminderNotified()`
- Geração de IDs únicos via `crypto.randomUUID()`

### View

Frontend estático servido pelo Express como arquivos estáticos:

- **HTML** — Estrutura semântica com formulário e listagem
- **CSS** — Layout responsivo com design system baseado em CSS custom properties
- **JavaScript** — Comunicação com a API via `fetch`, renderização dinâmica e polling de lembretes

!!! note "Por que frontend vanilla?"
    Frameworks como React ou Vue adicionariam build tools (webpack/Vite), state management e um padrão próprio (Flux/MVVM), desviando o foco do MVC server-side. O frontend vanilla demonstra melhor a separação frontend/backend via API REST e elimina a necessidade de um build step.

### Controller

Camada intermediária entre rotas e model:

- Validação de entrada (título obrigatório, limites de caracteres)
- Tratamento de erros com status HTTP adequados (400, 404)
- Respostas JSON padronizadas (`{ success, data/message }`)

## Fluxo de Dados

```
[Browser] → HTTP Request → [Express Router] → [Controller] → [Model]
                                                    ↓
[Browser] ← HTTP Response ← [Controller] ←─────────┘
```

## Mono-repo

Todo o projeto está em um único repositório:

- `src/` — Código-fonte da aplicação
- `docs/` — Documentação MkDocs
- `.specify/` — Artefatos SPEC-DRIVEN
- Configurações na raiz (package.json, mkdocs.yml)

!!! note "Por que mono-repo?"
    Um único repositório garante versionamento unificado (specs, código e docs evoluem juntos), simplifica o CI/CD (um único pipeline) e a experiência do desenvolvedor (um `git clone` traz tudo). Multi-repo faria sentido apenas com equipes ou ciclos de deploy independentes.

## Armazenamento em Memória

Os dados são mantidos em um array JavaScript durante a execução do servidor. Não há persistência — os dados são perdidos ao reiniciar o processo.

!!! warning "Trade-off intencional"
    Esta decisão elimina dependências externas (sem SGBD para instalar), simplifica o deploy (sem migrations ou seeds) e permite focar na arquitetura MVC. Em produção real, usaríamos PostgreSQL ou SQLite. Veja a justificativa completa em [Justificativas](justifications.md).

## Modelo de Dados

```javascript
{
  id: "uuid",              // Identificador único (crypto.randomUUID)
  title: "string",         // Título (obrigatório, max 100 chars)
  description: "string",   // Descrição (opcional, max 500 chars)
  completed: false,        // Status da tarefa
  reminder: {
    datetime: "ISO 8601",  // Data/hora do lembrete
    notified: false        // Se já foi disparado
  } | null,
  createdAt: "ISO 8601",   // Data de criação
  updatedAt: "ISO 8601"    // Data de atualização
}
```

## Lembretes

O sistema de lembretes funciona via **polling**: o frontend consulta `GET /api/tasks/reminders` a cada 30 segundos.

!!! note "Por que polling e não WebSocket?"
    Polling é a abordagem mais simples — apenas `setInterval` + `fetch`. WebSocket (Socket.io) ou Server-Sent Events exigiriam bibliotecas extras, lógica de reconexão e conexões persistentes, incompatíveis com o tier gratuito do Render. Um atraso de até 30 segundos é perfeitamente aceitável para lembretes de tarefas.
