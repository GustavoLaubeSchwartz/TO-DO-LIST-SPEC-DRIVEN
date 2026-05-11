# Specification — TODO List

## Visão Geral

Aplicação web de gerenciamento de tarefas (TODO List) que permite ao usuário cadastrar, visualizar, editar, remover tarefas e configurar lembretes. Os dados são mantidos em memória durante a execução do servidor.

## Requisitos Funcionais

### RF01 — Cadastrar Tarefa
- O usuário deve poder criar uma nova tarefa informando:
  - **Título** (obrigatório, máximo 100 caracteres)
  - **Descrição** (opcional, máximo 500 caracteres)
  - **Data/hora do lembrete** (opcional)
- O sistema deve gerar um ID único para cada tarefa
- O sistema deve registrar a data/hora de criação automaticamente
- A tarefa deve ser criada com status "pendente"

### RF02 — Listar Tarefas
- O usuário deve visualizar todas as tarefas cadastradas
- A listagem deve exibir: título, status, data de criação e indicador de lembrete
- Deve ser possível filtrar tarefas por status (pendente/concluída)

### RF03 — Remover Tarefa
- O usuário deve poder remover uma tarefa pelo seu ID
- O sistema deve confirmar a remoção antes de executá-la
- A remoção deve ser definitiva (sem lixeira)

### RF04 — Marcar Tarefa como Concluída
- O usuário deve poder alternar o status de uma tarefa entre "pendente" e "concluída"

### RF05 — Lembretes
- O usuário deve poder definir uma data/hora de lembrete ao criar ou editar uma tarefa
- O sistema deve verificar periodicamente (polling a cada 30 segundos) se há lembretes pendentes
- Quando um lembrete atingir a data/hora configurada, o sistema deve exibir uma notificação visual
- Lembretes já disparados devem ser marcados como "notificado" para não repetir

## Requisitos Não-Funcionais

### RNF01 — Armazenamento
- Todos os dados devem ser mantidos em memória (arrays/objetos JavaScript)
- Não deve haver dependência de banco de dados externo

### RNF02 — Arquitetura
- O projeto deve seguir o padrão MVC
- O projeto deve estar em um mono-repo

### RNF03 — Deploy
- O backend deve estar hospedado em um servidor gratuito (Render)
- A documentação deve estar publicada no GitHub Pages via MkDocs

### RNF04 — Documentação
- A documentação deve cobrir: visão geral, arquitetura, API, guia de uso e deploy

## User Stories

### US01 — Criar Tarefa
**Como** usuário, **quero** cadastrar uma nova tarefa com título e descrição, **para que** eu possa organizar minhas atividades.

**Critérios de Aceitação:**
- Campo título é obrigatório
- Tarefa aparece na listagem após criação
- ID único é gerado automaticamente

### US02 — Remover Tarefa
**Como** usuário, **quero** remover uma tarefa existente, **para que** eu possa eliminar itens que não são mais relevantes.

**Critérios de Aceitação:**
- Confirmação antes da remoção
- Tarefa desaparece da listagem após remoção

### US03 — Lembrete
**Como** usuário, **quero** configurar um lembrete para uma tarefa, **para que** eu seja notificado quando o prazo se aproximar.

**Critérios de Aceitação:**
- Posso definir data e hora do lembrete
- Recebo notificação visual quando o lembrete dispara
- O lembrete não repete após ser disparado

## Modelo de Dados (em memória)

```javascript
{
  id: string,          // UUID gerado automaticamente
  title: string,       // Título da tarefa (obrigatório)
  description: string, // Descrição (opcional)
  completed: boolean,  // Status da tarefa
  reminder: {
    datetime: string,  // ISO 8601 datetime (opcional)
    notified: boolean  // Se já foi notificado
  } | null,
  createdAt: string,   // ISO 8601 datetime
  updatedAt: string    // ISO 8601 datetime
}
```

## API REST

| Método | Endpoint              | Descrição                    |
|--------|-----------------------|------------------------------|
| GET    | /api/tasks            | Listar todas as tarefas      |
| POST   | /api/tasks            | Criar nova tarefa            |
| PUT    | /api/tasks/:id        | Atualizar tarefa             |
| DELETE | /api/tasks/:id        | Remover tarefa               |
| GET    | /api/tasks/reminders  | Listar lembretes pendentes   |
