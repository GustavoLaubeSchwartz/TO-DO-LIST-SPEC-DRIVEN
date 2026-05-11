# TODO List — SPEC-DRIVEN Development

Aplicação web de gerenciamento de tarefas desenvolvida utilizando a metodologia **SPEC-DRIVEN Development** com o toolkit [spec-kit](https://github.com/github/spec-kit).

## Funcionalidades

- **Cadastrar tarefas** com título, descrição e lembrete opcional
- **Remover tarefas** com confirmação antes da exclusão
- **Marcar como concluída** alternando o status da tarefa
- **Lembretes** com notificação visual automática via polling
- **Filtrar tarefas** por status (todas, pendentes, concluídas)

## Stack Tecnológica

| Componente     | Tecnologia          | Por que esta escolha?                                      |
|----------------|---------------------|------------------------------------------------------------|
| Runtime        | Node.js 18+         | Runtime JS mais popular, permite JS no frontend e backend  |
| Framework      | Express 4.x         | Minimalista, flexível, 30M+ downloads/semana no npm        |
| Frontend       | HTML/CSS/JS vanilla  | Sem build step, foco no MVC server-side                    |
| Armazenamento  | Memória (in-memory)  | Zero dependências, requisito do projeto                    |
| Documentação   | MkDocs + Material    | Markdown nativo, tema moderno com modo escuro              |
| Deploy Backend | Render               | Tier gratuito, deploy automático via GitHub                |
| Deploy Docs    | GitHub Pages         | Gratuito, integração nativa com MkDocs                     |

Para uma explicação detalhada de cada escolha, consulte a página [Justificativas](justifications.md).

## Metodologia

O projeto segue o fluxo SPEC-DRIVEN em 6 fases:

1. **Constitution** — Princípios e justificativas das escolhas arquiteturais
2. **Specification** — Requisitos funcionais e não-funcionais, user stories
3. **Planning** — Arquitetura técnica e design do sistema
4. **Task Breakdown** — Tarefas ordenadas com dependências
5. **Implementation** — Execução sistemática das tarefas
6. **Validation** — Revisão e refinamento

Todos os artefatos SPEC-DRIVEN estão no diretório `.specify/` do repositório.
