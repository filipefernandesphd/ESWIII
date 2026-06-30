# AV2 — Engenharia de Software III — Correção

- **Matrícula:** 2022000172
- **Disciplina:** Engenharia de Software III (INF03098)
- **Avaliação:** AV2 — Containerização e CI (2,0 pontos)
- **Nota final:** 1,35 / 2,00

> Correção automatizada. O aluno é identificado exclusivamente pela matrícula.

## Resumo das notas

| Questão | Arquivo | Pontos máx. | Fração | Pontos obtidos |
|---|---|---:|---:|---:|
| Q1 | App/api/Dockerfile | 0,50 | 0,88 | 0,44 |
| Q2 | App/docker-compose.yml | 0,50 | 0,70 | 0,35 |
| Q3 | App/.github/workflows/api-test-bdd.yml | 0,70 | 0,80 | 0,56 |
| Q4 | Sequência de comandos | 0,30 | 0,00 | 0,00 |
| **Total** | | **2,00** | | **1,35** |

> **Observação importante:** a folha da **Questão 4** não consta na digitalização da prova (o PDF entregue possui 5 páginas: Q1, Q2 e Q3; a página 6/6 com a Q4 não foi digitalizada). Conforme a política definida para páginas ausentes, a Q4 foi tratada como **não respondida** (nota 0). Se a folha for localizada, a Q4 pode ser reavaliada.

## Questão 1 — App/api/Dockerfile (0,5 pt)

### Transcrição da resposta do aluno
```dockerfile
FROM node:20-alpine as build
WORKDIR ./app
COPY package*.json ./
COPY ./src /src
COPY tsconfig*.json ./
RUN npm ci
RUN npm run build

FROM node:20-alpine as production
WORKDIR ./api
COPY ./dist /dist
RUN npm ci
CMD ["npm", "start"]
```

### Avaliação por critério
| Critério | Peso | Nota (1–5) | Justificativa |
|---|---:|---:|---|
| Intenção técnica | 20% | 5 | Dockerfile *multi-stage* com as duas etapas (`build` e `production`) corretamente identificadas — exatamente o artefato pedido. |
| Comandos principais | 30% | 4 | Etapa `build` praticamente completa: `COPY package*.json`, `RUN npm ci`, `COPY tsconfig`, `COPY ./src`, `RUN npm run build`. Na `production` faltou copiar o `package*.json` antes do `npm ci` e, principalmente, trazer o build com `COPY --from=build`; `CMD ["npm","start"]` é válido. |
| Ordem vertical | 20% | 5 | Sequência logicamente correta nas duas etapas: instala dependências (`npm ci`) **antes** de compilar; `FROM` no início e `CMD` ao final. |
| Ordem horizontal | 10% | 4 | Estrutura interna boa: `COPY package*.json ./`, `CMD ["npm", "start"]` bem formado. Pequenos deslizes em `COPY ./src /src` e `COPY ./dist /dist` (destinos atípicos). |
| Completude mínima | 10% | 4 | Esqueleto quase completo. Lacunas: a `production` não copia `package*.json` (o `npm ci` falharia) e não usa `COPY --from=build` para obter o `dist`. |
| Coerência técnica | 10% | 4 | Coerente no geral; incoerências pontuais: `COPY ./dist /dist` sem `--from=build` (o `dist` não existe no contexto de produção) e `WORKDIR` divergente entre etapas (`./app` vs `./api`). |

**Fração:** 0,88 · **Pontos:** 0,44 / 0,50

### Comentário
- **Acertos:** estrutura *multi-stage* correta; etapa `build` muito boa — copia `package*.json`, instala dependências com `npm ci` (equivalente a `npm install`), copia `tsconfig` e `src` e compila com `npm run build`, tudo na ordem certa; `CMD ["npm","start"]` bem formado.
- **Erros e por quê:**
  - Na etapa `production` falta `COPY package*.json ./` antes do `RUN npm ci` — sem o `package.json`/`package-lock.json` o `npm ci` não roda.
  - `COPY ./dist /dist` na produção deveria ser `COPY --from=build /app/dist ./dist`: sem `--from=build`, o artefato compilado da etapa anterior não é trazido (no contexto de produção não há `dist`).
  - `WORKDIR ./app` (build) e `WORKDIR ./api` (production) são incoerentes entre si e deveriam ser caminhos absolutos (ex.: `/app`).
  - Detalhe: o gabarito executa a API compilada com `CMD ["node", "dist/server.js"]`; `npm start` é aceitável por ser equivalente.

## Questão 2 — App/docker-compose.yml (0,5 pt)

### Transcrição da resposta do aluno
```yaml
Services:
  api:
    context: ./api
    depends_on:
      - mongodb
    port: ${API_PORT}
    network:
      - p2

  web:
    context: ./web
    depends_on:
      - api
    port: ${WEB_PORT}
    network:
      - p2

  mongodb:
    image: mongo:7
    depends_on:
      - mongovolume
    uri: ${MONGODB_URI}
    port: ${MONGODB_PORT}
    network
      - p2
volume:
  - mongovolume
Network
  - p2
```

### Avaliação por critério
| Critério | Peso | Nota (1–5) | Justificativa |
|---|---:|---:|---|
| Intenção técnica | 20% | 5 | Arquivo de orquestração com os três serviços (`api`, `web`, `mongodb`), `depends_on`, portas via variáveis de ambiente e a ideia de volume — bem alinhado à questão. |
| Comandos principais | 30% | 3 | Acertou `services`, os três serviços, `depends_on` com as relações corretas (`api`→`mongodb`, `web`→`api`), `image: mongo:7` e o uso de variáveis nas portas. Mas: `context` deveria estar sob `build:`; `port` deveria ser `ports:` com mapeamento `host:container`; falta o volume nomeado correto (`volumes: mongodb_data`). |
| Ordem vertical | 20% | 4 | Estrutura geral coerente: serviços primeiro, volume ao final; `depends_on` dentro de cada serviço. |
| Ordem horizontal | 10% | 3 | `image: mongo:7` e `depends_on: - mongodb` corretos; `port: ${API_PORT}` ficou sem a porta interna (`:3000`). |
| Completude mínima | 10% | 3 | Dá para entender a intenção, mas faltam `build:`, `ports:` como lista e a definição de `volumes:` nomeado de topo. |
| Coerência técnica | 10% | 2 | Várias incoerências: `depends_on: - mongovolume` (depender de um volume), `uri:` como campo de serviço, `network: - p2` inventado em todos os serviços e `volume:`/`Network` soltos no final. |

**Fração:** 0,70 · **Pontos:** 0,35 / 0,50

### Comentário
- **Acertos:** identificou os três serviços, o `depends_on` com as dependências corretas (`api` depende de `mongodb`; `web` depende de `api`), a imagem `mongo:7` e o uso das variáveis de ambiente (`${API_PORT}`, `${WEB_PORT}`, `${MONGODB_PORT}`) para as portas.
- **Erros e por quê:**
  - `context: ./api` (e `./web`) deveria estar sob a chave `build:` — ex.: `build:` → `context: ./api`.
  - `port:` deveria ser `ports:` com lista e mapeamento `host:container`, ex.: `- "${API_PORT}:3000"`. Como está, falta a porta interna do container.
  - `depends_on: - mongovolume` é incoerente: `depends_on` referencia outros **serviços**, não volumes. O `mongodb` não depende de nada.
  - `uri: ${MONGODB_URI}` não é um campo de serviço do Compose; a `MONGODB_URI` é variável de ambiente da **api** (`environment:`), não do `mongodb`.
  - O volume nomeado deveria ser definido em `volumes:` (topo) e referenciado no serviço como `volumes: - mongodb_data:/data/db`. As linhas `network: - p2`, `volume: - mongovolume` e `Network - p2` não correspondem à sintaxe do Compose para este projeto (não há rede nomeada exigida).

## Questão 3 — App/.github/workflows/api-test-bdd.yml (0,7 pt)

### Transcrição da resposta do aluno
```yaml
name: API- testes BDD
push:
  "**"
Work: App/api

job:
  name: test-BDD
  image: ubuntu-latest

steps:
  name: checkout do código
  use: actions/checkout@v4

  name: configurar o Node.js
  use: actions/setup-node@v4

  name: instalar as dependencia
  use: npm ci

  name: compilar o TypeScript
  use: npm run build

  name: popular o banco com o seed
  use: npm run seed

  name: subir a API em segundo plano e aguardar 5 segundos
  use: npm start & sleep5

  name: executar os testes BDD
  use: npm run test:bdd
```

### Avaliação por critério
| Critério | Peso | Nota (1–5) | Justificativa |
|---|---:|---:|---|
| Intenção técnica | 20% | 5 | Workflow de GitHub Actions com gatilho em *push*, *job* e todos os passos esperados (checkout, setup-node, install, build, seed, subir API, testes BDD). Intenção totalmente alinhada. |
| Comandos principais | 30% | 3 | Os passos e suas ações estão certos (`actions/checkout@v4`, `actions/setup-node@v4`, `npm ci`, `npm run build`, `npm run seed`, `npm start & sleep`, `npm run test:bdd`). Porém as chaves YAML estão erradas: `push:` solto (deveria ser `on: push`), `job:` → `jobs:`, `image:` → `runs-on:`, `use:` → `uses:` (ações) e `run:` (comandos). Faltam `services` (mongo:7), `env` e `node-version: 20`. |
| Ordem vertical | 20% | 5 | Passos na ordem exata do gabarito: checkout → setup-node → install → build → seed → subir API (`&`/`sleep`) → `test:bdd`. |
| Ordem horizontal | 10% | 4 | Valores internos corretos: `actions/checkout@v4`, `actions/setup-node@v4`, `npm run test:bdd` etc. (apenas a chave `use`/`uses`/`run` é que está trocada). |
| Completude mínima | 10% | 4 | Tem checkout, instalação de dependências e execução dos testes BDD — os pontos críticos. Faltam o *service container* `mongo:7`, as variáveis `env` e a versão do Node. |
| Coerência técnica | 10% | 3 | `use:` usado tanto para ações quanto para comandos de shell é incoerente (comando deveria ser `run:`); `push:` sem `on:` e `image:` para o runner também são incoerências de chave. |

**Fração:** 0,80 · **Pontos:** 0,56 / 0,70

### Comentário
- **Acertos:** excelente cobertura e **ordem** dos passos — checkout, configuração do Node, instalação, build, seed, subir a API em segundo plano com `npm start & sleep` e, por fim, `npm run test:bdd`. Usou as ações corretas (`actions/checkout@v4`, `actions/setup-node@v4`) e indicou o `working-directory` (`App/api`).
- **Erros e por quê:**
  - Chaves YAML do Actions trocadas: o gatilho é `on:` → `push:` (escreveu `push:` no topo); `jobs:` (não `job:`); `runs-on: ubuntu-latest` (não `image:`); ações usam `uses:` e comandos de shell usam `run:` (escreveu `use:` para ambos).
  - Faltou declarar o *service container* do banco (`services:` com `image: mongo:7` e porta `27017:27017`), as variáveis de ambiente (`MONGODB_URI`, `PORT`, `API_URL`) e a `node-version: 20` em `with:`.
  - O gatilho `push: "**"` deveria ser simplesmente `on: push` (dispara em qualquer push).

## Questão 4 — Sequência de comandos (0,3 pt)

### Transcrição da resposta do aluno
> **Não respondida.** A folha correspondente à Questão 4 (página 6/6) não está presente na digitalização da prova entregue.

### Avaliação por critério
Não se aplica. Conforme a regra da rubrica, questão em branco / não respondida recebe **nota final 0** (a escala Likert começa em 1, que representa "tentou, mas errou", e não "não respondeu").

**Fração:** 0,00 · **Pontos:** 0,00 / 0,30

### Comentário
- **Acertos:** —
- **Erros e por quê:** questão não respondida (folha ausente na digitalização). Não há conteúdo a avaliar. O gabarito esperado era `docker compose up -d --build` seguido de `git push origin main`.
