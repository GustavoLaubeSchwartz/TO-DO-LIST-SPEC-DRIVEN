# Tasks — TODO List

## Fase 1: Setup do Projeto

- [x] **T01** — Inicializar repositório Git e estrutura de diretórios
  - Dependências: nenhuma
  - Criar `.specify/`, `src/`, `docs/`

- [ ] **T02** — Criar `package.json` e instalar dependências
  - Dependências: T01
  - Express, nodemon (dev)

- [ ] **T03** — Criar `.gitignore`
  - Dependências: T01

## Fase 2: Backend (MVC)

- [ ] **T04** — Implementar Model (`src/models/taskModel.js`)
  - Dependências: T02
  - Array em memória, métodos CRUD, getPendingReminders()

- [ ] **T05** — Implementar Controller (`src/controllers/taskController.js`)
  - Dependências: T04
  - Validação, orquestração, tratamento de erros

- [ ] **T06** — Implementar Routes (`src/routes/taskRoutes.js`)
  - Dependências: T05
  - GET, POST, PUT, DELETE /api/tasks

- [ ] **T07** — Configurar Express (`src/app.js` + `server.js`)
  - Dependências: T06
  - Middleware, static files, rotas

## Fase 3: Frontend (View)

- [ ] **T08** — Criar HTML (`src/views/public/index.html`)
  - Dependências: T07
  - Formulário, listagem, modais

- [ ] **T09** — Criar CSS (`src/views/public/css/style.css`)
  - Dependências: T08
  - Layout responsivo, tema moderno

- [ ] **T10** — Criar JavaScript (`src/views/public/js/app.js`)
  - Dependências: T08
  - Fetch API, renderização, polling de lembretes

## Fase 4: Documentação

- [ ] **T11** — Configurar MkDocs (`mkdocs.yml`)
  - Dependências: T01

- [ ] **T12** — Escrever documentação (docs/)
  - Dependências: T11
  - index.md, architecture.md, api.md, usage.md, deploy.md

## Fase 5: Deploy e Entrega

- [ ] **T13** — Criar arquivo LINKS.md
  - Dependências: T12
  - Links do repositório e documentação online

- [ ] **T14** — Deploy do backend no Render
  - Dependências: T07

- [ ] **T15** — Deploy da documentação no GitHub Pages
  - Dependências: T12

- [ ] **T16** — Commit final e validação
  - Dependências: T13, T14, T15
