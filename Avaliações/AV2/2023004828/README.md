# AV2 — Engenharia de Software III — Correção

- **Matrícula:** 2023004828
- **Disciplina:** Engenharia de Software III (INF03098)
- **Avaliação:** AV2 — Containerização e CI (2,0 pontos)
- **Nota final:** 1,47 / 2,00

> Correção automatizada. O aluno é identificado exclusivamente pela matrícula.

## Resumo das notas

| Questão | Arquivo | Pontos máx. | Fração | Pontos obtidos |
|---|---|---:|---:|---:|
| Q1 | App/api/Dockerfile | 0,50 | 0,72 | 0,36 |
| Q2 | App/docker-compose.yml | 0,50 | 0,74 | 0,37 |
| Q3 | App/.github/workflows/api-test-bdd.yml | 0,70 | 0,80 | 0,56 |
| Q4 | Sequência de comandos | 0,30 | 0,60 | 0,18 |
| **Total** | | **2,00** | | **1,47** |

## Questão 1 — App/api/Dockerfile (0,5 pt)

### Transcrição da resposta do aluno
```dockerfile
FROM node:20-alpine
NAME: build
WORKDIR: App/api
RUN: npm install
RUN: npm build

FROM node:20-alpine
NAME: production
WORKDIR: App/api
COPY: /dist ./
RUN: npm install --omit=dev
CMD: ["npm", "start"]
```

### Avaliação por critério

| Critério           | Peso | Nota (1–5) | Justificativa |
| ------------------- | ---: | ----------: | ------------- |
| Intenção técnica |  20% | 5 | É um Dockerfile *multi-stage* (etapa de build e etapa de produção), exatamente o tipo de artefato pedido. |
| Comandos principais |  30% | 3 | Usa `FROM`, `WORKDIR`, `RUN`, `COPY` e `CMD`, mas com erros: o nome da etapa deveria ser inline (`FROM ... AS build`), não uma instrução `NAME:`; `npm build` deveria ser `npm run build`; e a cópia do artefato compilado precisa de `COPY --from=build`. |
| Ordem vertical      |  20% | 4 | Sequência lógica: base → instala deps → build; segunda etapa de produção depois. Faltou copiar `package*.json`/código-fonte antes do install/build. |
| Ordem horizontal    |  10% | 3 | `COPY /dist ./` e `CMD ["npm","start"]` têm ordem interna coerente, mas escrever o nome da etapa em linha separada (`NAME:`) quebra a estrutura horizontal do `FROM`. |
| Completude mínima  |  10% | 3 | Tem `FROM`, as duas etapas e `CMD`, mas falta `COPY package*.json`/`COPY src` (sem eles não há o que instalar/compilar) e `COPY --from=build` na produção. |
| Coerência técnica |  10% | 3 | `NAME:`, `WORKDIR:`, `RUN:` (com dois-pontos) não são instruções válidas de Dockerfile — tratou o Dockerfile como YAML. |

**Fração:** 0,72 · **Pontos:** 0,36 / 0,50

### Comentário

- **Acertos:** Entendeu e estruturou o *multi-stage build* (etapas `build` e `production`), com `node:20-alpine`, `npm install`, intenção de `npm run build`, `npm install --omit=dev` na produção e um `CMD` em forma de exec.
- **Erros e por quê:** (1) Os nomes das etapas devem ser declarados na própria linha do `FROM` (`FROM node:20-alpine AS build`), não em uma instrução `NAME:` — `NAME` não existe no Dockerfile. (2) As instruções foram escritas com dois-pontos (`RUN:`, `WORKDIR:`, `COPY:`), sintaxe de YAML, não de Dockerfile. (3) `npm build` deveria ser `npm run build`. (4) Faltou copiar `package*.json` e o código-fonte antes de instalar/compilar. (5) Na etapa de produção, copiar o compilado exige `COPY --from=build /app/dist ./dist`; `COPY /dist ./` não traz nada da etapa anterior. (6) `CMD ["npm","start"]` funciona se houver script `start`, mas o gabarito executa o artefato compilado diretamente (`node dist/server.js`).

## Questão 2 — App/docker-compose.yml (0,5 pt)

### Transcrição da resposta do aluno
```yaml
environment:
  API_PORT: 3000
  WEB_PORT: 5173
  MONGODB_PORT: 27017
  MONGODB_DATABASE: cupmatches
  MONGODB_URI: mongodb://mongodb:27017/cupmatches

services:
  api:
    build:
      context: App/api
    expose: 3000
    depends_on:
      MongoDB
  web:
    build:
      context: App/web
    expose: 5173
    depends_on:
      Api
  mongodb:
    build: Mongo:7
    expose: 27017
    volume:
      VolumeDB
    volume:
      # configuração do volume
```

### Avaliação por critério

| Critério           | Peso | Nota (1–5) | Justificativa |
| ------------------- | ---: | ----------: | ------------- |
| Intenção técnica |  20% | 5 | É um `docker-compose` com bloco `services` e os três serviços (`api`, `web`, `mongodb`) — o artefato certo. |
| Comandos principais |  30% | 3 | Acertou `services`, `build`/`context` e `depends_on`; mas usou `expose` (que apenas expõe internamente) no lugar de `ports` com mapeamento `host:container`; usou `build: Mongo:7` quando o Mongo deve ser `image: mongo:7`; e não amarrou as variáveis (`${API_PORT}` etc.) às portas. |
| Ordem vertical      |  20% | 4 | Estrutura hierárquica coerente: cada serviço com sua configuração aninhada e `depends_on` no lugar certo (api→mongodb, web→api). |
| Ordem horizontal    |  10% | 4 | `context: App/web`, `depends_on: Api` etc. têm ordem interna correta. |
| Completude mínima  |  10% | 3 | Tem os três serviços, contextos de build e dependências, mas faltam o mapeamento real de portas, o `image` do Mongo e a declaração de volume nomeado de nível superior. |
| Coerência técnica |  10% | 3 | `build: Mongo:7` é incoerente (Mongo se usa via `image`, não se faz build); o bloco `environment:` no topo não é seção válida de Compose (essas variáveis vêm do `.env`); e `volume:` aparece duplicado. |

**Fração:** 0,74 · **Pontos:** 0,37 / 0,50

### Comentário

- **Acertos:** Declarou os três serviços corretos, com `build`/`context` para `api` e `web`, e modelou bem o grafo de dependências com `depends_on` (api depende de mongodb, web depende de api). Listou também todas as variáveis de ambiente do projeto.
- **Erros e por quê:** (1) Para publicar portas use `ports: ["${API_PORT}:3000"]` (mapeamento host:container), não `expose:` — `expose` só torna a porta visível entre containers, sem publicá-la, e ainda deveria reaproveitar as variáveis do `.env`. (2) O MongoDB usa imagem pronta: `image: mongo:7`, não `build`. (3) Volumes nomeados precisam ser declarados em uma seção `volumes:` de nível superior (ex.: `mongodb_data:`) e referenciados no serviço como `volumes: - mongodb_data:/data/db`. (4) Não existe seção `environment:` de topo no Compose — essas variáveis são lidas do arquivo `.env`.

## Questão 3 — App/.github/workflows/api-test-bdd.yml (0,7 pt)

### Transcrição da resposta do aluno
```yaml
name: API - Testes BDD
trigger:
  push:
    branch: **
jobs:
  test-bdd:
    name: API - Testes BDD
    runs-on: ubuntu-latest
    workdir-directory: App/api
    environments:
      MONGODB_URI: mongodb://localhost:27017/cupmatches
      PORT: 3000
      API_URL: http://localhost:3000
    run: actions/checkout@v4
    run: actions/setup-node@v4
    run: npm install
    run: npm run build
    run: npm run seed
    run: npm start E sleep 5
    run: npm run test:bdd
```

### Avaliação por critério

| Critério           | Peso | Nota (1–5) | Justificativa |
| ------------------- | ---: | ----------: | ------------- |
| Intenção técnica |  20% | 5 | É um workflow do GitHub Actions com `name`, gatilho de push, `jobs` e passos — exatamente o pedido. |
| Comandos principais |  30% | 3 | Tem `name`, `jobs`, `runs-on`, `env` e todos os comandos de execução certos; porém usou `trigger:` no lugar de `on:` e `run:` para invocar *actions* (`actions/checkout@v4`, `actions/setup-node@v4`), que exigem `uses:`. Faltou também o *service container* `mongo:7`. |
| Ordem vertical      |  20% | 5 | Ordem dos passos exemplar: checkout → setup-node → install → build → seed → subir API (`npm start` + `sleep 5`) → `test:bdd`. |
| Ordem horizontal    |  10% | 4 | `actions/checkout@v4`, `npm run build`, `npm run test:bdd` etc. estão com a ordem interna correta. |
| Completude mínima  |  10% | 4 | Tem `jobs`, `runs-on`, `steps`, checkout, instalação e testes. Faltam o *service* `mongo:7` (27017:27017) e `node-version: 20`. |
| Coerência técnica |  10% | 3 | `run: actions/checkout@v4` é incoerente (action não roda via `run`); `trigger:` não é chave válida (o correto é `on:`). |

**Fração:** 0,80 · **Pontos:** 0,56 / 0,70

### Comentário

- **Acertos:** Estrutura e, principalmente, a **sequência de passos** está correta e completa: checkout, setup do Node, `npm install`, `npm run build`, `npm run seed`, subir a API em segundo plano com `sleep 5` e por fim `npm run test:bdd`. Acertou `runs-on: ubuntu-latest`, o `working-directory` (App/api) e as três variáveis de ambiente com os valores certos.
- **Erros e por quê:** (1) O gatilho é a chave `on:` (não `trigger:`) — `on: push:`. (2) Passos que usam *actions* (checkout, setup-node) são invocados com `uses: actions/checkout@v4`, não com `run:`; `run:` é só para comandos de shell. (3) Os passos deveriam estar dentro de uma lista `steps:`, cada um como item (`- name:`/`uses:`/`run:`). (4) Faltou o *service container* `mongodb: image: mongo:7` publicando `27017:27017` e o detalhe `node-version: 20` no setup-node. (5) `npm start E sleep 5` deve ser `npm start &` seguido de `sleep 5` (rodar a API em segundo plano).

## Questão 4 — Sequência de comandos (0,3 pt)

### Transcrição da resposta do aluno
```bash
docker compose up -d
```

### Avaliação por critério

| Critério           | Peso | Nota (1–5) | Justificativa |
| ------------------- | ---: | ----------: | ------------- |
| Intenção técnica |  20% | 4 | Escreveu um comando de subida do Compose — o tipo certo de resposta —, mas só uma parte da sequência pedida. |
| Comandos principais |  30% | 2 | `docker compose up -d` está correto, porém faltou o `--build` e o segundo comando inteiro (`git push origin main`). |
| Ordem vertical      |  20% | 3 | O comando presente está na posição correta (primeiro passo), mas a sequência está incompleta — só metade. |
| Ordem horizontal    |  10% | 4 | A ordem interna de `docker compose up -d` está correta. |
| Completude mínima  |  10% | 2 | Faltam o `--build` e o `git push origin main`, que era a segunda parte essencial. |
| Coerência técnica |  10% | 4 | O que foi escrito é um comando coerente e válido. |

**Fração:** 0,60 · **Pontos:** 0,18 / 0,30

### Comentário

- **Acertos:** Identificou `docker compose up -d` como o comando para subir os serviços em segundo plano.
- **Erros e por quê:** (1) Faltou a flag `--build` para (re)construir as imagens antes de subir: `docker compose up -d --build`. (2) Faltou completamente o segundo comando da sequência — `git push origin main` —, que dispara o workflow de CI (a Questão 3). A resposta esperada eram os dois comandos em ordem.
