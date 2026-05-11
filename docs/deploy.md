# Deploy

## Backend — Render

O backend é hospedado gratuitamente no [Render](https://render.com/).

### Passos

1. Crie uma conta no [Render](https://render.com/)
2. Clique em **New > Web Service**
3. Conecte o repositório GitHub `TO-DO-LIST-SPEC-DRIVEN`
4. Configure:

| Campo           | Valor                |
|-----------------|----------------------|
| Name            | todo-list-spec       |
| Runtime         | Node                 |
| Build Command   | `npm install`        |
| Start Command   | `node server.js`     |
| Plan            | Free                 |

5. Clique em **Create Web Service**

O Render faz deploy automático a cada push na branch `main`.

!!! info "Tier Gratuito"
    O plano gratuito do Render coloca o serviço em "sleep" após 15 minutos de inatividade. A primeira requisição após o sleep pode levar ~30 segundos para responder.

## Documentação — GitHub Pages

A documentação é publicada via MkDocs no GitHub Pages.

### Pré-requisitos

```bash
pip install mkdocs mkdocs-material
```

### Publicar

```bash
# Gerar e publicar no GitHub Pages
mkdocs gh-deploy
```

Isso cria/atualiza a branch `gh-pages` com o site estático e publica em:

```
https://gustavolaubeschwartz.github.io/TO-DO-LIST-SPEC-DRIVEN/
```

### Configurar GitHub Pages

1. Vá em **Settings > Pages** no repositório
2. Source: **Deploy from a branch**
3. Branch: `gh-pages` / `/ (root)`
4. Clique em **Save**

## Variáveis de Ambiente

| Variável | Descrição                    | Default |
|----------|------------------------------|---------|
| PORT     | Porta do servidor HTTP       | 3000    |
