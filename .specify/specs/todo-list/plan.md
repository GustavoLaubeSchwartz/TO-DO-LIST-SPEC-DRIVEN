# Plan — TODO List

## Arquitetura Técnica

```
todo-list-spec-driven/
├── .specify/                  # Artefatos SPEC-DRIVEN
│   ├── memory/constitution.md
│   ├── specs/todo-list/
│   │   ├── spec.md
│   │   ├── plan.md
│   │   └── tasks.md
│   └── templates/
├── src/                       # Código-fonte (MVC)
│   ├── models/
│   │   └── taskModel.js       # Model: dados em memória
│   ├── views/
│   │   └── public/            # Frontend estático
│   │       ├── index.html
│   │       ├── css/
│   │       │   └── style.css
│   │       └── js/
│   │           └── app.js     # Lógica do frontend + polling
│   ├── controllers/
│   │   └── taskController.js  # Controller: lógica de negócio
│   ├── routes/
│   │   └── taskRoutes.js      # Rotas Express
│   └── app.js                 # Configuração do Express
├── docs/                      # Fonte MkDocs
│   ├── index.md
│   ├── architecture.md
│   ├── api.md
│   ├── usage.md
│   └── deploy.md
├── mkdocs.yml                 # Configuração MkDocs
├── server.js                  # Entry point
├── package.json
├── .gitignore
├── LINKS.md                   # Links do repositório e documentação
└── README.md
```

## Camadas MVC

### Model (`src/models/taskModel.js`)
- Array em memória como "banco de dados"
- Métodos CRUD: `getAll()`, `getById()`, `create()`, `update()`, `delete()`
- Método `getPendingReminders()` para lembretes que atingiram a data/hora
- Geração de UUID com `crypto.randomUUID()`

### View (`src/views/public/`)
- HTML semântico com formulário de criação
- CSS responsivo e moderno
- JavaScript vanilla para:
  - Chamadas à API (fetch)
  - Renderização dinâmica da lista
  - Polling de lembretes (setInterval 30s)
  - Notificações visuais (toasts)

### Controller (`src/controllers/taskController.js`)
- Validação de entrada (título obrigatório, limites de caracteres)
- Orquestração entre rotas e model
- Tratamento de erros com status HTTP adequados
- Respostas JSON padronizadas

## Tecnologias

| Componente     | Tecnologia         | Versão  |
|----------------|--------------------|---------|
| Runtime        | Node.js            | 18+     |
| Framework Web  | Express            | 4.x     |
| Frontend       | HTML/CSS/JS vanilla| -       |
| Documentação   | MkDocs + Material  | latest  |
| Deploy Backend | Render             | -       |
| Deploy Docs    | GitHub Pages       | -       |

## Fluxo de Dados

```
[Browser] → HTTP Request → [Express Router] → [Controller] → [Model (memória)]
                                                    ↓
[Browser] ← HTTP Response (JSON) ← [Controller] ←──┘
```

## Deploy

### Backend (Render)
- Conectar repositório GitHub ao Render
- Build command: `npm install`
- Start command: `node server.js`
- Variável de ambiente: `PORT` (definida pelo Render)

### Documentação (GitHub Pages)
- `mkdocs gh-deploy` publica a pasta `docs/` como site estático
- URL: `https://<usuario>.github.io/TO-DO-LIST-SPEC-DRIVEN/`
