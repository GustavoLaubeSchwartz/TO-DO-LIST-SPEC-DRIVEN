# API REST

Todas as rotas retornam JSON no formato `{ success: boolean, data?: object, message?: string }`.

## Endpoints

### Listar Tarefas

```
GET /api/tasks
```

**Query Parameters:**

| Parâmetro | Tipo   | Descrição                          |
|-----------|--------|------------------------------------|
| status    | string | Filtro: `pending` ou `completed`   |

**Resposta (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "Estudar MVC",
      "description": "Revisar padrão arquitetural",
      "completed": false,
      "reminder": null,
      "createdAt": "2026-05-10T12:00:00.000Z",
      "updatedAt": "2026-05-10T12:00:00.000Z"
    }
  ]
}
```

---

### Criar Tarefa

```
POST /api/tasks
```

**Body (JSON):**

| Campo       | Tipo   | Obrigatório | Descrição                    |
|-------------|--------|-------------|------------------------------|
| title       | string | Sim         | Título (max 100 caracteres)  |
| description | string | Não         | Descrição (max 500 chars)    |
| reminder    | string | Não         | Data/hora ISO 8601           |

**Resposta (201):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Estudar MVC",
    "description": "",
    "completed": false,
    "reminder": null,
    "createdAt": "2026-05-10T12:00:00.000Z",
    "updatedAt": "2026-05-10T12:00:00.000Z"
  }
}
```

**Erros:**

- `400` — Título ausente ou acima do limite

---

### Atualizar Tarefa

```
PUT /api/tasks/:id
```

**Body (JSON):** Qualquer combinação dos campos:

| Campo       | Tipo    | Descrição                    |
|-------------|---------|------------------------------|
| title       | string  | Novo título                  |
| description | string  | Nova descrição               |
| completed   | boolean | Novo status                  |
| reminder    | string  | Nova data/hora do lembrete   |

**Resposta (200):** Tarefa atualizada.

**Erros:**

- `404` — Tarefa não encontrada
- `400` — Validação falhou

---

### Remover Tarefa

```
DELETE /api/tasks/:id
```

**Resposta (200):**
```json
{
  "success": true,
  "message": "Tarefa removida com sucesso"
}
```

**Erros:**

- `404` — Tarefa não encontrada

---

### Consultar Lembretes Pendentes

```
GET /api/tasks/reminders
```

Retorna tarefas cujo lembrete já atingiu a data/hora configurada e ainda não foi notificado. Após retornar, marca os lembretes como `notified: true`.

**Resposta (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "title": "Reunião",
      "reminder": {
        "datetime": "2026-05-10T14:00:00.000Z",
        "notified": false
      }
    }
  ]
}
```
