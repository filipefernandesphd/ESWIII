# AV2 — Engenharia de Software III — Correção

- **Matrícula:** 2021004210
- **Disciplina:** Engenharia de Software III (INF03098)
- **Avaliação:** AV2 — Containerização e CI (2,0 pontos)
- **Nota final:** 0,45 / 2,00

> Correção automatizada. O aluno é identificado exclusivamente pela matrícula.

> ⚠️ **ATENÇÃO — DIGITALIZAÇÃO INCOMPLETA.** O PDF entregue para esta matrícula
> contém **apenas a página 1/6** (Questão 1). As páginas **2/6 a 6/6**, que
> correspondem às **Questões 2, 3 e 4**, **não constam no arquivo escaneado**.
> Conforme a regra de questão não respondida, as Questões 2, 3 e 4 receberam
> **nota final 0**. **Recomenda-se fortemente conferir a prova física**: é
> possível que o aluno tenha respondido nas folhas que não foram digitalizadas.
> Caso as respostas existam, a nota deve ser recalculada.

## Resumo das notas

| Questão | Arquivo | Pontos máx. | Fração | Pontos obtidos |
|---|---|---:|---:|---:|
| Q1 | App/api/Dockerfile | 0,50 | 0,90 | 0,45 |
| Q2 | App/docker-compose.yml | 0,50 | — | 0,00 |
| Q3 | App/.github/workflows/api-test-bdd.yml | 0,70 | — | 0,00 |
| Q4 | Sequência de comandos | 0,30 | — | 0,00 |
| **Total** | | **2,00** | | **0,45** |

## Questão 1 — App/api/Dockerfile (0,5 pt)

### Transcrição da resposta do aluno
```dockerfile
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src ./src
RUN npm as build

FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json
RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist

CMD ["node", "dist/server.js"]
```

### Avaliação por critério

| Critério | Peso | Nota (1–5) | Justificativa |
| --- | ---: | ---: | --- |
| Intenção técnica | 20% | 5 | Escreveu exatamente o artefato pedido: um Dockerfile *multi-stage* com estágio `build` (instala deps + compila) e estágio `production` (instala só prod + roda a API). |
| Comandos principais | 30% | 4 | `FROM`, `WORKDIR`, `COPY`, `RUN`, `CMD` usados corretamente, com sintaxe `AS build`/`AS production` e `COPY --from=build`. Dois deslizes: `RUN npm as build` (deveria ser `npm run build`) e `COPY package*.json` sem o destino (`./`). |
| Ordem vertical | 20% | 5 | Sequência impecável e idêntica ao gabarito: FROM → WORKDIR → COPY package → install → COPY tsconfig/src → build → segundo FROM → WORKDIR → COPY package → install prod → COPY --from=build → CMD. |
| Ordem horizontal | 10% | 4 | Ordem interna correta (`COPY package*.json ./`, `COPY --from=build /app/dist ./dist`, `CMD ["node", "dist/server.js"]`). Penaliza levemente o `COPY package*.json` sem destino e o token `as` no lugar de `run`. |
| Completude mínima | 10% | 5 | Estrutura completa: ambos os estágios, base, build, cópia do dist compilado e `CMD`. Nada essencial faltou para compreender/executar. |
| Coerência técnica | 10% | 4 | Solução totalmente coerente, sem comandos fora de lugar. Único ponto: `npm as build` não é subcomando válido do npm — incoerência pontual, mas a intenção (compilar) está clara e no lugar certo. |

**Fração:** 0,90 · **Pontos:** 0,45 / 0,50

### Comentário

- **Acertos:** Dockerfile *multi-stage* praticamente equivalente ao gabarito. Acertou a separação `build`/`production`, a sintaxe `FROM ... AS <estágio>`, o `WORKDIR /app`, a instalação de dependências (`npm ci`, inclusive a variante `--omit=dev` no estágio de produção — boa prática), a cópia de `tsconfig.json` e `src`, o `COPY --from=build /app/dist ./dist` para trazer o build compilado e o `CMD ["node", "dist/server.js"]`. Excelente domínio do conceito.
- **Erros e por quê:**
  - `RUN npm as build` — o comando de compilação do TypeScript é `npm run build` (executa o script `build` do `package.json`). `npm as build` não é um comando válido; sem ele, o `dist/` não é gerado no estágio de build.
  - `COPY package*.json` (segundo estágio) — falta o destino. A instrução `COPY` exige origem **e** destino (ex.: `COPY package*.json ./`); como está, a build falharia.

## Questão 2 — App/docker-compose.yml (0,5 pt)

### Transcrição da resposta do aluno

**Não respondida.** A página da Questão 2 (2/6) **não consta no PDF escaneado** — o arquivo contém apenas a página 1/6 (Questão 1). Ver o aviso de digitalização incompleta no topo deste documento.

### Avaliação

Conforme a rubrica, questão não respondida recebe **nota final 0** (a escala Likert começa em 1 = "tentou, mas errado", e não é aplicada a respostas ausentes).

**Fração:** — · **Pontos:** 0,00 / 0,50

### Comentário

- **Acertos:** não avaliável (página ausente no escaneamento).
- **Observação:** ⚠️ conferir a prova física antes de fechar a nota — a resposta pode existir em folha não digitalizada.

## Questão 3 — App/.github/workflows/api-test-bdd.yml (0,7 pt)

### Transcrição da resposta do aluno

**Não respondida.** A página da Questão 3 **não consta no PDF escaneado** — o arquivo contém apenas a página 1/6 (Questão 1). Ver o aviso de digitalização incompleta no topo deste documento.

### Avaliação

Conforme a rubrica, questão não respondida recebe **nota final 0**.

**Fração:** — · **Pontos:** 0,00 / 0,70

### Comentário

- **Acertos:** não avaliável (página ausente no escaneamento).
- **Observação:** ⚠️ conferir a prova física antes de fechar a nota — a resposta pode existir em folha não digitalizada.

## Questão 4 — Sequência de comandos (0,3 pt)

### Transcrição da resposta do aluno

**Não respondida.** A página da Questão 4 **não consta no PDF escaneado** — o arquivo contém apenas a página 1/6 (Questão 1). Ver o aviso de digitalização incompleta no topo deste documento.

### Avaliação

Conforme a rubrica, questão não respondida recebe **nota final 0**.

**Fração:** — · **Pontos:** 0,00 / 0,30

### Comentário

- **Acertos:** não avaliável (página ausente no escaneamento).
- **Observação:** ⚠️ conferir a prova física antes de fechar a nota — a resposta pode existir em folha não digitalizada.
