# Guia de Uso

## Pré-requisitos

- [Node.js](https://nodejs.org/) versão 18 ou superior
- [Git](https://git-scm.com/)

## Instalação

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/TO-DO-LIST-SPEC-DRIVEN.git
cd TO-DO-LIST-SPEC-DRIVEN

# Instalar dependências
npm install
```

## Executar Localmente

```bash
# Modo produção
npm start

# Modo desenvolvimento (com auto-reload)
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## Como Usar

### Criar uma Tarefa

1. Preencha o campo **Título** (obrigatório)
2. Opcionalmente, adicione uma **Descrição**
3. Opcionalmente, defina uma data/hora de **Lembrete**
4. Clique em **Adicionar Tarefa**

### Marcar como Concluída

- Clique no **círculo** à esquerda da tarefa para alternar entre pendente e concluída

### Remover uma Tarefa

- Clique no botão **✕** à direita da tarefa
- Confirme a remoção no modal de confirmação

### Filtrar Tarefas

- Use os botões **Todas**, **Pendentes** e **Concluídas** para filtrar a listagem

### Lembretes

- Ao criar uma tarefa, defina a data/hora no campo **Lembrete**
- O sistema verifica automaticamente a cada 30 segundos se há lembretes pendentes
- Quando o horário chega, uma notificação visual (toast) aparece no canto superior direito
- O lembrete é disparado apenas uma vez

## Observações

!!! warning "Dados em Memória"
    Os dados são mantidos apenas em memória. Ao reiniciar o servidor, todas as tarefas serão perdidas. Isso é intencional — consulte a [Constitution](https://github.com/seu-usuario/TO-DO-LIST-SPEC-DRIVEN/blob/main/.specify/memory/constitution.md) para a justificativa.
