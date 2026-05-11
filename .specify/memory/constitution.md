# Constitution — TODO List SPEC-DRIVEN

## Princípios do Projeto

### 1. Arquitetura MVC (Model-View-Controller)

**Escolha:** Adotar o padrão MVC estrito para separação de responsabilidades.

**Justificativa:** O MVC é o padrão arquitetural mais consolidado para aplicações web. Ele permite:
- **Separação clara de responsabilidades:** Model cuida dos dados, View da apresentação, Controller da lógica de negócio.
- **Testabilidade:** Cada camada pode ser testada de forma independente.
- **Manutenibilidade:** Alterações na interface não impactam a lógica de negócio e vice-versa.
- **Simplicidade didática:** Como projeto acadêmico, o MVC facilita o entendimento da arquitetura.

### 2. Mono-repo

**Escolha:** Todo o código (backend, frontend, documentação, specs) em um único repositório.

**Justificativa:**
- **Simplicidade operacional:** Um único `git clone` traz todo o projeto.
- **Versionamento unificado:** Specs, código e docs evoluem juntos, mantendo consistência.
- **CI/CD simplificado:** Um único pipeline para build, test e deploy.
- **Adequado ao escopo:** Para um projeto deste tamanho, múltiplos repos adicionariam complexidade sem benefício.

### 3. Armazenamento em Memória (sem banco de dados)

**Escolha:** Usar estruturas de dados em memória (arrays/objetos) em vez de banco de dados persistente.

**Justificativa:**
- **Zero dependências externas:** Não requer instalação ou configuração de SGBD.
- **Simplicidade de deploy:** O servidor inicia instantaneamente sem migrations ou seeds.
- **Foco no aprendizado:** Permite focar na arquitetura e lógica de negócio, não em configuração de infraestrutura.
- **Adequado ao requisito:** O enunciado explicitamente solicita armazenamento em memória.
- **Trade-off aceito:** Os dados são perdidos ao reiniciar o servidor — aceitável para fins didáticos.

### 4. Stack Tecnológica

**Escolha:** Node.js + Express (backend), HTML/CSS/JS vanilla (frontend), MkDocs (documentação).

**Justificativa:**
- **Node.js + Express:** Runtime JavaScript ubíquo, leve, com ecossistema maduro. Express é o framework web mais popular para Node.js, com documentação extensa.
- **Frontend vanilla:** Sem frameworks de frontend (React, Vue, etc.) para manter a simplicidade e o foco no MVC server-side.
- **MkDocs:** Gerador de documentação estática baseado em Markdown, simples de configurar e publicar no GitHub Pages.

### 5. Deploy Gratuito

**Escolha:** Render (backend) + GitHub Pages (documentação MkDocs).

**Justificativa:**
- **Render:** Oferece tier gratuito para aplicações web Node.js, com deploy automático a partir do GitHub.
- **GitHub Pages:** Hospedagem gratuita de sites estáticos, integração nativa com GitHub e MkDocs.
- **Custo zero:** Ambos os serviços possuem planos gratuitos adequados ao escopo do projeto.

### 6. Lembretes (Reminders)

**Escolha:** Implementar lembretes como atributo das tarefas com data/hora e notificação via polling no frontend.

**Justificativa:**
- **Sem WebSocket:** Para manter a simplicidade, o frontend consulta periodicamente os lembretes pendentes.
- **Em memória:** Os lembretes são armazenados junto com as tarefas na estrutura de dados em memória.
- **Notificação visual:** Alertas visuais no frontend quando um lembrete atinge a data/hora configurada.

## Padrões de Qualidade

- Código limpo e legível, com nomenclatura clara em inglês
- Endpoints REST semânticos
- Validação de entrada no controller
- Tratamento de erros com mensagens claras
- Documentação completa em MkDocs
- Testes manuais documentados

## Governança

- Todo código deve passar por revisão antes de merge na main
- Commits devem seguir Conventional Commits (feat:, fix:, docs:, etc.)
- Specs devem ser atualizados quando requisitos mudarem
