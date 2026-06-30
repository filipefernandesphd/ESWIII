# AV2 — Engenharia de Software III — Correção

- **Matrícula:** 2023004686
- **Disciplina:** Engenharia de Software III (INF03098)
- **Avaliação:** AV2 — Containerização e CI (2,0 pontos)
- **Nota final:** 1,40 / 2,00

> Correção automatizada. O aluno é identificado exclusivamente pela matrícula.

> ⚠️ **Atenção — escaneamento incompleto.** O PDF entregue contém apenas as **Questões 1, 3 e 4**; **a página da Questão 2 não consta no escaneamento**. A Q2 foi tratada como **em branco (nota 0)**, conforme a política de correção. **Recomenda-se conferir a prova física** antes de fechar a nota: se a Q2 tiver sido respondida em papel, a nota deve ser recalculada.

## Resumo das notas

| Questão | Arquivo | Pontos máx. | Fração | Pontos obtidos |
|---|---|---:|---:|---:|
| Q1 | App/api/Dockerfile | 0,50 | 0,96 | 0,48 |
| Q2 | App/docker-compose.yml | 0,50 | — | 0,00 |
| Q3 | App/.github/workflows/api-test-bdd.yml | 0,70 | 0,88 | 0,62 |
| Q4 | Sequência de comandos | 0,30 | 1,00 | 0,30 |
| **Total** | | **2,00** | | **1,40** |

## Questão 1 — App/api/Dockerfile (0,5 pt)

### Transcrição da resposta do aluno
```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
RUN npm run build

FROM node:20-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
COPY --from=build /app/api/dist ./dist
CMD ["npm", "start"]
```

### Avaliação por critério

| Critério           | Peso | Nota (1–5) | Justificativa |
| ------------------- | ---: | ----------: | ------------- |
| Intenção técnica |  20% | 5 | Dockerfile *multi-stage* com etapas `build` e `production`, exatamente o pedido. |
| Comandos principais |  30% | 5 | Sintaxe correta: `FROM ... AS build`, `WORKDIR`, `COPY package*.json ./`, `RUN npm ci`, `RUN npm run build`, `RUN npm ci --omit=dev`, `COPY --from=build` e `CMD` em forma de exec. `npm ci` é equivalente (e mais robusto) a `npm install`. |
| Ordem vertical      |  20% | 5 | Sequência impecável: base → workdir → copia deps → instala → build; depois etapa de produção com instalação enxuta e cópia do compilado. |
| Ordem horizontal    |  10% | 5 | Ordem interna correta em todas as instruções (`COPY origem destino`, `CMD ["...","..."]`). |
| Completude mínima  |  10% | 4 | Faltou copiar o código-fonte na etapa de build (`COPY tsconfig.json ./` e `COPY src ./src`) antes do `npm run build` — sem eles não há o que compilar. |
| Coerência técnica |  10% | 4 | `COPY . .` na produção é redundante; e o caminho do compilado ficou `/app/api/dist` (no gabarito é `/app/dist`). Pequenas incoerências, nada que quebre o conceito. |

**Fração:** 0,96 · **Pontos:** 0,48 / 0,50

### Comentário

- **Acertos:** Excelente Dockerfile multi-stage — sintaxe `FROM ... AS <etapa>` correta, `WORKDIR`, cópia de `package*.json`, `npm ci`, `npm run build`, instalação só de produção com `--omit=dev` e cópia do artefato compilado com `COPY --from=build`. Praticamente equivalente ao gabarito.
- **Erros e por quê:** (1) Na etapa de build faltou copiar o código-fonte (`COPY tsconfig.json ./` e `COPY src ./src`) antes de `npm run build` — sem o fonte, não há o que compilar. (2) O caminho do compilado é `/app/dist` (não `/app/api/dist`), pois o `WORKDIR` é `/app`. (3) `COPY . .` na produção é desnecessário, já que o que importa vem do `COPY --from=build`. (4) `CMD ["npm","start"]` funciona se houver script `start`; o gabarito executa direto o artefato (`node dist/server.js`).

## Questão 2 — App/docker-compose.yml (0,5 pt)

### Transcrição da resposta do aluno

**Não respondida.** A página da Questão 2 não consta no PDF escaneado (o arquivo contém apenas Q1, Q3 e Q4). Conforme a regra de correção, questão em branco/não respondida recebe **nota final 0**.

> ⚠️ Possível falha de digitalização — **conferir a prova física**. Se houver resposta manuscrita para a Q2 em papel, reabrir e recalcular esta questão.

**Fração:** — · **Pontos:** 0,00 / 0,50

### Comentário

- **Acertos:** Não avaliável (sem resposta no material escaneado).
- **Erros e por quê:** Não aplicável — a questão não foi pontuada por ausência de resposta no escaneamento, não por erro técnico.

## Questão 3 — App/.github/workflows/api-test-bdd.yml (0,7 pt)

### Transcrição da resposta do aluno
```yaml
name: API - Testes BDD

on:
  push:
    branches: [ ** ]
  pull-request:
    branches: [ ** ]

default:
  run:
    working-directory: /App/api

jobs:
  test-bdd:
    name: API - Testes BDD
    runs-on: ubuntu-latest

    env:
      - MONGODB_URI = mongodb://localhost:27017/cupmatches
      - PORT = 3000
      - API_URL = http://localhost:3000

    services:
      mongodb:
        image: mongo:7
        ports: [ 27017:27017 ]
        options: >-
          --health-cmd "mongosh ... ping"
          --health-retries 10

    steps:
      - name: baixar repositório
        run: actions/checkout@v4
      - name: configurar node
        run: actions/setup-node@v4
      - name: instalar dependências
        run: npm ci
      - name: compilar código
        run: npm run build
      - name: popular banco
        run: npm run seed
      - name: subir api e aguardar 5 segundos
        run: |
          npm start &
          sleep 5
      - name: executar testes bdd
        run: npm run test:bdd
```

### Avaliação por critério

| Critério           | Peso | Nota (1–5) | Justificativa |
| ------------------- | ---: | ----------: | ------------- |
| Intenção técnica |  20% | 5 | Workflow do GitHub Actions completo, com gatilho, job, *service container* e passos — exatamente o pedido. |
| Comandos principais |  30% | 4 | `name`, `on/push`, `jobs`, `runs-on`, `env`, `services` (mongo:7) e `steps` bem usados. Erros: invocou *actions* com `run:` (deveria ser `uses:`); `default` deveria ser `defaults`; e `env` foi escrito como lista com `=` em vez de mapeamento com `:`. |
| Ordem vertical      |  20% | 5 | Ordem dos passos exemplar: checkout → setup-node → install → build → seed → subir API (`npm start &` + `sleep 5`) → `test:bdd`. |
| Ordem horizontal    |  10% | 4 | Estrutura de passo (`- name:` + `run:`), `ports: [27017:27017]` e comandos com ordem interna correta; só o `env` em formato de lista com `=` destoa. |
| Completude mínima  |  10% | 5 | Muito completo: `jobs`, `runs-on`, `steps`, checkout, instalação, testes e o *service container* `mongo:7` publicando `27017:27017`. |
| Coerência técnica |  10% | 3 | `run: actions/checkout@v4` é incoerente (*action* não roda via `run`); `default` e `env` como lista com `=` não são chaves/formatos válidos. |

**Fração:** 0,88 · **Pontos:** 0,62 / 0,70

### Comentário

- **Acertos:** Workflow muito bem estruturado e completo. Acertou `name`, `on: push`, `jobs.test-bdd`, `runs-on: ubuntu-latest`, o `working-directory` (App/api), as três variáveis de ambiente com valores corretos e — diferencial — incluiu o **service container** `mongo:7` em `27017:27017` (com `--health-cmd`/`--health-retries`). A **sequência de passos** está perfeita: checkout → setup-node → `npm ci` → `npm run build` → `npm run seed` → subir a API em segundo plano (`npm start &` + `sleep 5`) → `npm run test:bdd`.
- **Erros e por quê:** (1) Passos que usam *actions* (checkout, setup-node) devem ser invocados com `uses: actions/checkout@v4`, não com `run:` (que é só para comandos de shell). (2) A chave correta é `defaults:` (plural), não `default:`. (3) `env` deve ser um **mapeamento** (`MONGODB_URI: valor`), não uma **lista** com `=` (`- MONGODB_URI = valor`). (4) Faltou `node-version: 20` no setup-node. (5) `pull-request` seria `pull_request` (e não é exigido pelo gabarito, que dispara apenas em `push`).

## Questão 4 — Sequência de comandos (0,3 pt)

### Transcrição da resposta do aluno
```bash
docker compose up -d --build
git push origin main
```

### Avaliação por critério

| Critério           | Peso | Nota (1–5) | Justificativa |
| ------------------- | ---: | ----------: | ------------- |
| Intenção técnica |  20% | 5 | Os dois comandos pedidos: subir os serviços e disparar o CI via push. |
| Comandos principais |  30% | 5 | `docker compose up -d --build` e `git push origin main` — idênticos ao gabarito. |
| Ordem vertical      |  20% | 5 | Ordem correta: primeiro subir os containers, depois o push. |
| Ordem horizontal    |  10% | 5 | Ordem interna correta em ambos (`up -d --build`, `push origin main`). |
| Completude mínima  |  10% | 5 | Sequência completa, sem omissões. |
| Coerência técnica |  10% | 5 | Comandos coerentes e válidos. |

**Fração:** 1,00 · **Pontos:** 0,30 / 0,30

### Comentário

- **Acertos:** Resposta perfeita — `docker compose up -d --build` (constrói as imagens e sobe os serviços em segundo plano) seguido de `git push origin main` (dispara o workflow de CI). Igual ao gabarito.
- **Erros e por quê:** Nenhum.
