# AV2 — Engenharia de Software III — Correção

- **Matrícula:** 2023005950
- **Disciplina:** Engenharia de Software III (INF03098)
- **Avaliação:** AV2 — Containerização e CI (2,0 pontos)
- **Nota final:** 0,41 / 2,00

> Correção automatizada. O aluno é identificado exclusivamente pela matrícula.

> ⚠️ **Atenção — escaneamento incompleto.** O PDF entregue contém apenas **2 páginas**: a **Questão 1** (resposta fragmentária) e a **Questão 4**. **As páginas das Questões 2 e 3 não constam no escaneamento** (o rodapé da folha indica "1/6"). As Q2 e Q3 foram tratadas como **em branco (nota 0)**, conforme a política de correção. **Recomenda-se conferir a prova física** antes de fechar a nota: se Q2/Q3 tiverem sido respondidas em papel, a nota deve ser recalculada.

## Resumo das notas

| Questão | Arquivo | Pontos máx. | Fração | Pontos obtidos |
|---|---|---:|---:|---:|
| Q1 | App/api/Dockerfile | 0,50 | 0,30 | 0,15 |
| Q2 | App/docker-compose.yml | 0,50 | — | 0,00 |
| Q3 | App/.github/workflows/api-test-bdd.yml | 0,70 | — | 0,00 |
| Q4 | Sequência de comandos | 0,30 | 0,86 | 0,26 |
| **Total** | | **2,00** | | **0,41** |

## Questão 1 — App/api/Dockerfile (0,5 pt)

### Transcrição da resposta do aluno
```dockerfile
version: Node 20
Job:
  name: build

  name: production
```

> Resposta fragmentária: o aluno escreveu apenas estes trechos soltos, sem nenhuma instrução de Dockerfile.

### Avaliação por critério

| Critério           | Peso | Nota (1–5) | Justificativa |
| ------------------- | ---: | ----------: | ------------- |
| Intenção técnica |  20% | 2 | Os fragmentos (`version: Node 20`, `Job:`, `name: build`, `name: production`) lembram YAML/Actions, não um Dockerfile. Há apenas o indício de duas etapas nomeadas. |
| Comandos principais |  30% | 1 | Não há nenhuma instrução de Dockerfile: faltam `FROM`, `WORKDIR`, `COPY`, `RUN`, `CMD`. |
| Ordem vertical      |  20% | 2 | Quase nada a ordenar; só `build` antes de `production`, que ao menos espelha a ideia de duas etapas. |
| Ordem horizontal    |  10% | 2 | Fragmentos isolados, sem comando completo para avaliar ordem interna. |
| Completude mínima  |  10% | 1 | Falta praticamente tudo o que é essencial (imagem base, instalação, build, `CMD`). |
| Coerência técnica |  10% | 1 | Mistura de sintaxe de YAML/Actions (`Job:`, `version:`) onde se esperava um Dockerfile — incoerente. |

**Fração:** 0,30 · **Pontos:** 0,15 / 0,50

### Comentário

- **Acertos:** Demonstrou ter ouvido falar em Node 20 e na ideia de duas etapas (`build` e `production`).
- **Erros e por quê:** A resposta não é um Dockerfile — não há `FROM node:20-alpine`, `WORKDIR`, `COPY package*.json ./`, `RUN npm install`/`npm run build`, nem `CMD`. Escreveu fragmentos em estilo YAML (`version:`, `Job:`, `name:`), que não existem no Dockerfile. Um Dockerfile multi-stage começa cada etapa com `FROM <imagem> AS <nome>` e usa instruções próprias (`RUN`, `COPY`, `CMD`).

## Questão 2 — App/docker-compose.yml (0,5 pt)

### Transcrição da resposta do aluno

**Não respondida.** A página da Questão 2 não consta no PDF escaneado (o arquivo contém apenas Q1 e Q4). Conforme a regra de correção, questão em branco/não respondida recebe **nota final 0**.

> ⚠️ Possível falha de digitalização — **conferir a prova física**. Se houver resposta manuscrita para a Q2 em papel, reabrir e recalcular esta questão.

**Fração:** — · **Pontos:** 0,00 / 0,50

### Comentário

- **Acertos:** Não avaliável (sem resposta no material escaneado).
- **Erros e por quê:** Não aplicável — a questão não foi pontuada por ausência de resposta no escaneamento, não por erro técnico.

## Questão 3 — App/.github/workflows/api-test-bdd.yml (0,7 pt)

### Transcrição da resposta do aluno

**Não respondida.** A página da Questão 3 não consta no PDF escaneado (o arquivo contém apenas Q1 e Q4). Conforme a regra de correção, questão em branco/não respondida recebe **nota final 0**.

> ⚠️ Possível falha de digitalização — **conferir a prova física**. Se houver resposta manuscrita para a Q3 em papel, reabrir e recalcular esta questão.

**Fração:** — · **Pontos:** 0,00 / 0,70

### Comentário

- **Acertos:** Não avaliável (sem resposta no material escaneado).
- **Erros e por quê:** Não aplicável — a questão não foi pontuada por ausência de resposta no escaneamento, não por erro técnico.

## Questão 4 — Sequência de comandos (0,3 pt)

### Transcrição da resposta do aluno
```bash
docker compose up -d --build
docker compose exec
npm run build
git add .
git commit -m "Feat: atualização"
git push origin main
```

### Avaliação por critério

| Critério           | Peso | Nota (1–5) | Justificativa |
| ------------------- | ---: | ----------: | ------------- |
| Intenção técnica |  20% | 5 | É uma sequência de comandos e inclui os dois passos pedidos (subir os serviços e dar push). |
| Comandos principais |  30% | 4 | Os dois comandos essenciais estão corretos (`docker compose up -d --build` e `git push origin main`); há comandos extras, e `docker compose exec` está incompleto (sem serviço/comando). |
| Ordem vertical      |  20% | 4 | Subir os containers primeiro e o `push` por último está correto; o `git add`→`commit`→`push` no fim é uma ordem coerente. |
| Ordem horizontal    |  10% | 5 | Ordem interna correta (`up -d --build`, `push origin main`, `commit -m "..."`). |
| Completude mínima  |  10% | 5 | Os dois comandos essenciais da resposta estão presentes. |
| Coerência técnica |  10% | 3 | `docker compose exec` sem serviço/comando é incompleto; `npm run build` solto não faz sentido aqui (a build ocorre no container). |

**Fração:** 0,86 · **Pontos:** 0,26 / 0,30

### Comentário

- **Acertos:** Acertou os dois comandos centrais — `docker compose up -d --build` (constrói e sobe os serviços) e `git push origin main` (dispara o CI) — na ordem correta. O fluxo `git add .` → `git commit` → `git push` é um encadeamento válido.
- **Erros e por quê:** Incluiu comandos desnecessários/incompletos: `docker compose exec` exige um serviço e um comando para executar (ex.: `docker compose exec api sh`); sozinho, não faz nada. `npm run build` solto também não se aplica aqui, pois a compilação acontece dentro do container durante o build da imagem. O gabarito pedia apenas `docker compose up -d --build` seguido de `git push origin main`.
