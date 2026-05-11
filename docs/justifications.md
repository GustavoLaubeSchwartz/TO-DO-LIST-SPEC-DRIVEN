# Justificativas das Escolhas

Este documento explica o **porquê** de cada decisão técnica e arquitetural do projeto, conforme exigido pela Constitution do SPEC-DRIVEN Development.

---

## :material-layers-outline: Arquitetura MVC

**Escolha:** Padrão Model-View-Controller estrito.

**Por quê?**

- **Separação clara de responsabilidades:** o Model cuida exclusivamente dos dados, a View da apresentação, e o Controller da lógica de negócio. Isso evita código "espaguete" onde tudo se mistura.
- **Testabilidade:** cada camada pode ser testada isoladamente. Posso testar o Model sem subir o servidor, ou o Controller sem renderizar HTML.
- **Manutenibilidade:** mudanças na interface (CSS, HTML) não impactam a lógica de negócio, e vice-versa. Equipes diferentes poderiam trabalhar em paralelo.
- **Valor didático:** é o padrão mais consolidado e documentado da indústria. Entender MVC facilita a transição para frameworks como Rails, Django, Spring ou Laravel.

!!! info "Alternativas consideradas"
    - **MVVM (Model-View-ViewModel):** mais comum em SPAs com React/Vue. Adiciona complexidade desnecessária para este escopo.
    - **Clean Architecture:** excelente para projetos grandes, mas overengineering para uma TODO List simples.

---

## :material-folder-multiple: Mono-repo

**Escolha:** Todo o código (backend, frontend, docs, specs) em um único repositório.

**Por quê?**

- **Simplicidade operacional:** um único `git clone` traz todo o projeto. Não há necessidade de gerenciar múltiplos repos, scripts de sincronização ou ferramentas como Lerna/Nx.
- **Versionamento unificado:** specs, código e documentação evoluem juntos no mesmo histórico de commits, garantindo consistência.
- **CI/CD simplificado:** um único pipeline para build, teste e deploy. Sem orquestração entre repos.
- **Adequado ao escopo:** para um projeto deste tamanho, múltiplos repositórios adicionariam complexidade sem benefício real.

!!! info "Alternativas consideradas"
    - **Multi-repo (frontend separado do backend):** faz sentido quando frontend e backend têm ciclos de deploy independentes ou equipes diferentes. Não é o caso aqui.

---

## :material-memory: Armazenamento em Memória

**Escolha:** Usar arrays JavaScript como armazenamento, sem banco de dados.

**Por quê?**

- **Zero dependências externas:** não requer instalação de PostgreSQL, MongoDB, MySQL ou qualquer SGBD. O projeto roda apenas com Node.js.
- **Simplicidade de deploy:** o servidor inicia instantaneamente. Sem migrations, seeds, connection strings ou configuração de infraestrutura.
- **Foco no aprendizado:** permite focar na arquitetura MVC e na lógica de negócio, não em configuração de banco de dados.
- **Requisito explícito:** o enunciado do projeto solicita armazenamento em memória.

!!! warning "Trade-off aceito"
    Os dados são **perdidos ao reiniciar o servidor**. Isso é aceitável para fins didáticos. Em um projeto real, usaríamos um banco de dados como PostgreSQL ou SQLite.

---

## :material-nodejs: Node.js + Express

**Escolha:** Node.js como runtime e Express como framework web.

**Por quê?**

- **Node.js** é o runtime JavaScript mais popular para backend, com ecossistema maduro (npm) e documentação extensa. Permite usar JavaScript tanto no frontend quanto no backend.
- **Express** é o framework web mais utilizado para Node.js, com mais de 30 milhões de downloads semanais no npm. É minimalista, flexível e fácil de aprender.
- **Leveza:** Express não impõe estrutura. Isso nos permite implementar o padrão MVC da forma que quisermos, sem "magia" do framework.
- **Servir frontend e API juntos:** Express serve arquivos estáticos (HTML/CSS/JS) e endpoints REST no mesmo servidor, simplificando o deploy.

!!! info "Alternativas consideradas"
    - **Fastify:** mais performático, mas menos documentação e comunidade para iniciantes.
    - **NestJS:** framework TypeScript robusto, mas complexo demais para este escopo (decorators, DI, modules).
    - **Python + Flask/Django:** excelentes opções, mas exigiriam trocar de linguagem entre frontend e backend.

---

## :material-language-html5: Frontend Vanilla (HTML/CSS/JS)

**Escolha:** Não usar React, Vue, Angular ou qualquer framework de frontend.

**Por quê?**

- **Simplicidade:** frameworks de frontend adicionam camadas de complexidade (build tools, bundlers, state management, virtual DOM) que não são necessárias para esta aplicação.
- **Foco no MVC server-side:** o objetivo é demonstrar o padrão MVC no backend. Um framework de frontend introduziria seu próprio padrão (MVVM, Flux) e desviaria o foco.
- **Zero build step no frontend:** os arquivos são servidos diretamente pelo Express. Sem webpack, Vite, ou npm scripts adicionais.
- **Aprendizado fundamental:** entender fetch API, manipulação de DOM e eventos JavaScript é pré-requisito para qualquer framework.

!!! info "Alternativas consideradas"
    - **React/Vue:** adicionariam qualidade ao frontend, mas exigiriam um build pipeline e desviariam o foco do MVC server-side.
    - **EJS/Handlebars (template engines):** opção válida para server-side rendering, mas o frontend em JS vanilla demonstra melhor a separação frontend/backend via API REST.

---

## :material-cloud-upload: Deploy: Render (Backend) + GitHub Pages (Docs)

**Escolha:** Render para o backend e GitHub Pages para a documentação.

**Por quê?**

### Render (Backend)

- **Tier gratuito:** oferece hospedagem gratuita para aplicações web Node.js, adequada ao escopo acadêmico.
- **Deploy automático:** conecta ao GitHub e faz redeploy a cada push na branch `main`, sem configuração de CI/CD.
- **Simplicidade:** apenas definir build command (`npm install`) e start command (`node server.js`).
- **Sem necessidade de Docker:** diferente de outras plataformas, o Render detecta automaticamente que é um projeto Node.js.

### GitHub Pages (Documentação)

- **Integração nativa:** como o código já está no GitHub, publicar a documentação no Pages é natural.
- **Gratuito para repos públicos:** sem custo para projetos open-source.
- **MkDocs gh-deploy:** um único comando publica a documentação.

!!! info "Alternativas consideradas"
    - **Vercel/Netlify:** excelentes para frontend estático, mas Render é mais adequado para aplicações Node.js com backend.
    - **Railway:** bom tier gratuito, mas limita horas de execução mensais.
    - **Heroku:** removeu o tier gratuito em 2022.

---

## :material-bell-ring: Lembretes via Polling

**Escolha:** O frontend consulta a API a cada 30 segundos para verificar lembretes pendentes.

**Por quê?**

- **Simplicidade de implementação:** polling é a abordagem mais simples para notificações periódicas. Apenas um `setInterval` + `fetch`.
- **Sem dependências extras:** WebSockets ou Server-Sent Events exigiriam bibliotecas adicionais (Socket.io) e lógica de reconexão.
- **Adequado ao caso de uso:** lembretes de tarefas não exigem notificação em tempo real (sub-segundo). Um atraso de até 30 segundos é aceitável.
- **Stateless:** o servidor não precisa manter conexões persistentes com os clientes, simplificando o deploy em plataformas como Render.

!!! info "Alternativas consideradas"
    - **WebSocket (Socket.io):** notificação instantânea, mas adiciona complexidade significativa (gerenciamento de conexões, reconexão, fallback).
    - **Server-Sent Events (SSE):** mais simples que WebSocket, mas pode ter problemas com proxies e o tier gratuito do Render.
    - **Push Notifications (Service Worker):** ideal para apps PWA, mas exige HTTPS, service worker e permissão do usuário.

---

## :material-book-open-variant: MkDocs + Material Theme

**Escolha:** MkDocs com o tema Material para documentação.

**Por quê?**

- **Markdown nativo:** a documentação é escrita em Markdown, a mesma linguagem usada em READMEs, issues e PRs no GitHub. Sem aprender uma linguagem nova.
- **Material theme:** tema moderno, responsivo e com funcionalidades prontas (busca, navegação, modo escuro, syntax highlighting).
- **Publicação simples:** `mkdocs gh-deploy` gera o site estático e publica no GitHub Pages com um único comando.
- **Foco no conteúdo:** ao contrário de ferramentas como Docusaurus ou GitBook, MkDocs é minimalista e não exige configuração de build JavaScript.

!!! info "Alternativas consideradas"
    - **Docusaurus:** excelente, mas baseado em React e mais pesado para configurar.
    - **GitBook:** interface bonita, mas a versão gratuita tem limitações.
    - **Swagger/OpenAPI:** ideal para documentação de API, mas não cobre arquitetura e guias de uso.
