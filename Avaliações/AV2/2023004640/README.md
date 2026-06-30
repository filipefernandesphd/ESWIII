# AV2 — Engenharia de Software III — Correção

- **Matrícula:** 2023004640
- **Disciplina:** Engenharia de Software III (INF03098)
- **Avaliação:** AV2 — Containerização e CI (2,0 pontos)
- **Nota final:** 0,96 / 2,00

> Correção automatizada. O aluno é identificado exclusivamente pela matrícula.

## Resumo das notas

| Questão | Arquivo | Pontos máx. | Fração | Pontos obtidos |
|---|---|---:|---:|---:|
| Q1 | App/api/Dockerfile | 0,50 | 0,72 | 0,36 |
| Q2 | App/docker-compose.yml | 0,50 | 0,00 | 0,00 |
| Q3 | App/.github/workflows/api-test-bdd.yml | 0,70 | 0,54 | 0,38 |
| Q4 | Sequência de comandos | 0,30 | 0,74 | 0,22 |
| **Total** | | **2,00** | | **0,96** |

> **Observação importante:** a folha da **Questão 2** não consta na digitalização da prova (o PDF entregue possui apenas 3 páginas: Q1, Q3 e Q4). Por decisão do professor, a Q2 foi tratada como **não respondida** (nota 0).

## Questão 1 — App/api/Dockerfile (0,5 pt)

### Transcrição da resposta do aluno
```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY src/
RUN npm run build

FROM node:20-alpine as production
WORKDIR /app
COPY dist/
RUN npm start
EXPOSE PORT: 3000
CMD: ["npm", "start"]
```

### Avaliação por critério
| Critério | Peso | Nota (1–5) | Justificativa |
|---|---:|---:|---|
| Intenção técnica | 20% | 5 | Escreveu um Dockerfile *multi-stage* com duas etapas (`build` e `production`), exatamente o tipo de artefato pedido. |
| Comandos principais | 30% | 3 | Usa `FROM`, `WORKDIR`, `COPY`, `RUN`, `EXPOSE`, `CMD`. Porém faltou instalar dependências (`COPY package*.json` + `RUN npm install`) na etapa `build`, sem o qual `npm run build` falha; `RUN npm start` não deveria ser uma camada de build; `EXPOSE PORT: 3000` e `CMD:` estão com sintaxe inválida. |
| Ordem vertical | 20% | 4 | Sequência geral coerente: `FROM` → `WORKDIR` → `COPY` → `RUN`, com `CMD` ao final. Perde pontos pela ausência do `npm install` antes do `build`. |
| Ordem horizontal | 10% | 3 | `FROM node:20-alpine AS build` correto, mas `COPY src/` sem destino, `EXPOSE PORT: 3000` e `CMD:` com dois-pontos indevido quebram a estrutura interna. |
| Completude mínima | 10% | 3 | Esqueleto presente (tem `FROM` e estágios), mas falta a instalação de dependências e a etapa `production` não traz os artefatos compilados via `COPY --from=build`. |
| Coerência técnica | 10% | 3 | `RUN npm start` como camada de build, `EXPOSE PORT: 3000` e `CMD:` são incoerências de sintaxe Docker. |

**Fração:** 0,72 · **Pontos:** 0,36 / 0,50

### Comentário
- **Acertos:** estrutura *multi-stage* correta com os estágios `build` e `production`, imagem base `node:20-alpine`, `WORKDIR /app` nas duas etapas e uso dos verbos certos do Dockerfile.
- **Erros e por quê:**
  - Falta `COPY package*.json ./` + `RUN npm install` na etapa `build`: sem as dependências, `npm run build` (compilação do TypeScript) não roda.
  - `COPY src/` e `COPY dist/` estão sem destino — a forma correta é `COPY src ./src` / `COPY tsconfig.json ./`. Em produção o correto seria `COPY --from=build /app/dist ./dist`, trazendo o artefato compilado do estágio anterior; `COPY dist/` busca no contexto de build, onde `dist` não existe.
  - `RUN npm start` está errado: `npm start` é o comando de execução (runtime), não uma camada de imagem. Quem executa a API é o `CMD`.
  - `EXPOSE PORT: 3000` é inválido — a sintaxe é `EXPOSE 3000`.
  - `CMD: ["npm", "start"]` tem dois-pontos indevido; o correto é `CMD ["npm", "start"]` (e o gabarito usa `CMD ["node", "dist/server.js"]`).

## Questão 2 — App/docker-compose.yml (0,5 pt)

### Transcrição da resposta do aluno
> **Não respondida.** A folha correspondente à Questão 2 não está presente na digitalização da prova entregue.

### Avaliação por critério
Não se aplica. Conforme a regra da rubrica, questão em branco / não respondida recebe **nota final 0** (a escala Likert começa em 1, que representa "tentou, mas errou", e não "não respondeu").

**Fração:** 0,00 · **Pontos:** 0,00 / 0,50

### Comentário
- **Acertos:** —
- **Erros e por quê:** questão não respondida (folha ausente na digitalização). Não há conteúdo a avaliar.

## Questão 3 — App/.github/workflows/api-test-bdd.yml (0,7 pt)

### Transcrição da resposta do aluno
```yaml
WORKFLOW API-testes BDD
on:
  push

job:
  name: API-testes BDD
  contex: test-bdd
  on: ubuntu-latest

service:
  context: mongo:7
  port: 27017:27017
```

### Avaliação por critério
| Critério | Peso | Nota (1–5) | Justificativa |
|---|---:|---:|---|
| Intenção técnica | 20% | 4 | Reconhece que se trata de um workflow de GitHub Actions disparado em `push`, com um *job* e um *service container* de banco — a intenção está alinhada à questão. |
| Comandos principais | 30% | 2 | Apenas `on: push` está correto. `WORKFLOW` deveria ser `name:`; `job:` → `jobs:` (com id do job); `on: ubuntu-latest` → `runs-on:`; `service:` → `services:`; `context: mongo:7` → `image: mongo:7`; `port:` → `ports:`. Faltam `env`, `defaults`/`working-directory` e **todos os `steps`** (checkout, setup-node, install, build, seed, subir API, `test:bdd`). |
| Ordem vertical | 20% | 3 | A sequência apresentada (nome → `on` → job → `runs-on` → service) segue a estrutura geral de um workflow, mas os passos do job estão ausentes. |
| Ordem horizontal | 10% | 3 | `27017:27017` e `mongo:7` com a ordem interna correta; `on: push` adequado. Demais campos com nomes errados. |
| Completude mínima | 10% | 2 | Lacuna grave: o *job* não tem `steps`, logo não faz checkout, não instala dependências e não executa os testes BDD — o workflow não cumpre seu objetivo. |
| Coerência técnica | 10% | 2 | `WORKFLOW` não é chave YAML; `contex` (escrito errado) e `service: context:` misturam campos inexistentes/indevidos (`context` é termo de *build*, não de *service*). |

**Fração:** 0,54 · **Pontos:** 0,38 / 0,70

### Comentário
- **Acertos:** identificou o gatilho `on: push`, a imagem `mongo:7` como serviço, o mapeamento de porta `27017:27017` e a ideia de um *job* rodando em `ubuntu-latest`.
- **Erros e por quê:**
  - Chaves incorretas: o YAML do GitHub Actions usa `name:`, `jobs:`, `runs-on:`, `services:`, `image:`, `ports:`. `WORKFLOW`, `job:`, `on: ubuntu-latest`, `service:`, `context:`, `port:` não são reconhecidos e quebram o workflow.
  - Faltaram blocos essenciais: `env` (`MONGODB_URI`, `PORT`, `API_URL`), `defaults.run.working-directory: App/api` e, principalmente, a lista de `steps`.
  - Sem os `steps` (checkout → setup-node@v4 Node 20 → `npm install` → `npm run build` → `npm run seed` → `npm start &`/`sleep 5` → `npm run test:bdd`), o workflow não executa os testes BDD — que é o propósito da questão.

## Questão 4 — Sequência de comandos (0,3 pt)

### Transcrição da resposta do aluno
```bash
docker start
git push
```

### Avaliação por critério
| Critério | Peso | Nota (1–5) | Justificativa |
|---|---:|---:|---|
| Intenção técnica | 20% | 4 | Entendeu que são dois passos: subir os containers e depois atualizar o repositório remoto. |
| Comandos principais | 30% | 3 | `git push` está essencialmente correto, mas `docker start` é o comando errado para a tarefa: ele apenas reinicia um container existente, não constrói nem sobe a stack do Compose (`docker compose up -d --build`). |
| Ordem vertical | 20% | 5 | Ordem correta: primeiro subir os containers, depois o `push`. |
| Ordem horizontal | 10% | 3 | `docker start` sem alvo/flags; `git push` sem `origin main` (aceitável, mas incompleto). |
| Completude mínima | 10% | 3 | Os dois passos estão presentes e compreensíveis, embora `docker start` não cumpra o objetivo de construir/subir os serviços. |
| Coerência técnica | 10% | 4 | São comandos reais e coerentes de `docker`/`git`; não há comandos sem sentido, apenas escolha inadequada na primeira linha. |

**Fração:** 0,74 · **Pontos:** 0,22 / 0,30

### Comentário
- **Acertos:** sequência na ordem certa (subir containers → atualizar remoto) e `git push` correto para disparar o workflow no GitHub Actions.
- **Erros e por quê:** `docker start` apenas reinicia um container já criado; para a tarefa pedida o comando é `docker compose up -d --build` (constrói as imagens e sobe `mongodb`, `api` e `web` em segundo plano, lendo o `.env` automaticamente). O `git push` poderia explicitar o destino (`git push origin main`), mas a forma curta é aceita.
