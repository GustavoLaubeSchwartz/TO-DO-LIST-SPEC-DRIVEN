# Arquitetura

## Padrão MVC

A aplicação segue o padrão **Model-View-Controller** com separação clara de responsabilidades:

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

## Armazenamento em Memória

Os dados são mantidos em um array JavaScript durante a execução do servidor. Não há persistência — os dados são perdidos ao reiniciar o processo. Esta decisão é intencional, conforme documentado na [Constitution](./../.specify/memory/constitution.md).

## Modelo de Dados

```javascript
{
  id: "uuid",              // Identificador único
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
