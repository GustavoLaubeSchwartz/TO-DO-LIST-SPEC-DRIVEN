# TODO List — SPEC-DRIVEN Development

Aplicação web de gerenciamento de tarefas desenvolvida com a metodologia **SPEC-DRIVEN Development** usando o toolkit [spec-kit](https://github.com/github/spec-kit).

## Funcionalidades

- Cadastrar tarefas (título, descrição, lembrete)
- Remover tarefas com confirmação
- Marcar tarefas como concluídas
- Lembretes com notificação visual automática
- Filtrar por status (todas, pendentes, concluídas)

## Arquitetura

- **Padrão:** MVC (Model-View-Controller)
- **Estrutura:** Mono-repo
- **Armazenamento:** Em memória (sem banco de dados)
- **Backend:** Node.js + Express
- **Frontend:** HTML/CSS/JS vanilla
- **Documentação:** MkDocs + Material theme

## Início Rápido

```bash
# Clonar
git clone https://github.com/seu-usuario/TO-DO-LIST-SPEC-DRIVEN.git
cd TO-DO-LIST-SPEC-DRIVEN

# Instalar
npm install

# Executar
npm start
```

Acesse [http://localhost:3000](http://localhost:3000).

## Estrutura do Projeto

```
├── .specify/                # Artefatos SPEC-DRIVEN
│   ├── memory/constitution.md
│   └── specs/todo-list/
├── src/                     # Código-fonte MVC
│   ├── models/
│   ├── views/public/
│   ├── controllers/
│   ├── routes/
│   └── app.js
├── docs/                    # Documentação MkDocs
├── server.js                # Entry point
├── LINKS.md                 # Links do repositório e docs online
└── mkdocs.yml
```

## Links

Consulte [LINKS.md](LINKS.md) para os links do repositório, aplicação em produção e documentação online.

## Licença

MIT
