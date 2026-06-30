# AV2 — Engenharia de Software III — Correção

- **Matrícula:** 2023009673
- **Disciplina:** Engenharia de Software III (INF03098)
- **Avaliação:** AV2 — Containerização e CI (2,0 pontos)
- **Nota final:** 0,13 / 2,00

> Correção automatizada. O aluno é identificado exclusivamente pela matrícula.

## Resumo das notas

| Questão | Arquivo | Pontos máx. | Fração | Pontos obtidos |
|---|---|---:|---:|---:|
| Q1 | App/api/Dockerfile | 0,50 | 0,00 | 0,00 |
| Q2 | App/docker-compose.yml | 0,50 | 0,00 | 0,00 |
| Q3 | App/.github/workflows/api-test-bdd.yml | 0,70 | 0,00 | 0,00 |
| Q4 | Sequência de comandos | 0,30 | 0,44 | 0,13 |
| **Total** | | **2,00** | | **0,13** |

> **Observação importante — digitalização incompleta:** o PDF entregue possui apenas **2 páginas**: a folha da **Questão 1** (com as linhas em branco e a parte inferior não digitalizada) e a folha da **Questão 4**. As folhas das **Questões 2 e 3 não constam** na digitalização. Conforme a política definida para páginas ausentes/em branco, Q1, Q2 e Q3 foram tratadas como **não respondidas** (nota 0). **Recomenda-se conferir a prova física do aluno**; havendo as folhas faltantes, estas questões podem ser reavaliadas.

## Questão 1 — App/api/Dockerfile (0,5 pt)

### Transcrição da resposta do aluno
> **Não respondida.** A folha da Questão 1 foi digitalizada com as linhas em branco (lines 1–2 visíveis e vazias; restante da página não digitalizado).

### Avaliação por critério
Não se aplica. Conforme a regra da rubrica, questão em branco / não respondida recebe **nota final 0**.

**Fração:** 0,00 · **Pontos:** 0,00 / 0,50

### Comentário
- **Acertos:** —
- **Erros e por quê:** questão não respondida. O esperado era um `Dockerfile` *multi-stage* (etapas `build` e `production`).

## Questão 2 — App/docker-compose.yml (0,5 pt)

### Transcrição da resposta do aluno
> **Não respondida.** A folha da Questão 2 não está presente na digitalização da prova entregue.

### Avaliação por critério
Não se aplica. Conforme a regra da rubrica, questão em branco / não respondida recebe **nota final 0**.

**Fração:** 0,00 · **Pontos:** 0,00 / 0,50

### Comentário
- **Acertos:** —
- **Erros e por quê:** questão não respondida (folha ausente na digitalização). O esperado era o `docker-compose.yml` orquestrando `mongodb`, `api` e `web`.

## Questão 3 — App/.github/workflows/api-test-bdd.yml (0,7 pt)

### Transcrição da resposta do aluno
> **Não respondida.** A folha da Questão 3 não está presente na digitalização da prova entregue.

### Avaliação por critério
Não se aplica. Conforme a regra da rubrica, questão em branco / não respondida recebe **nota final 0**.

**Fração:** 0,00 · **Pontos:** 0,00 / 0,70

### Comentário
- **Acertos:** —
- **Erros e por quê:** questão não respondida (folha ausente na digitalização). O esperado era o workflow de GitHub Actions que roda os testes BDD a cada *push*.

## Questão 4 — Sequência de comandos (0,3 pt)

### Transcrição da resposta do aluno
```bash
git branch main
git add .
git pull
```

### Avaliação por critério
| Critério | Peso | Nota (1–5) | Justificativa |
|---|---:|---:|---|
| Intenção técnica | 20% | 2 | Escreveu apenas comandos `git`; não há nenhum comando para **subir os containers** (Docker) e o `git pull` não **atualiza o remoto** (faz o contrário). |
| Comandos principais | 30% | 2 | Falta totalmente o `docker compose up -d --build`. `git add .` não era necessário (cenário já comitado) e `git pull` deveria ser `git push`. |
| Ordem vertical | 20% | 2 | A sequência (branch → add → pull) não realiza o objetivo (subir containers e depois atualizar o remoto). |
| Ordem horizontal | 10% | 3 | As formas dos comandos `git` em si são válidas (`git add .`, `git branch main`, `git pull`). |
| Completude mínima | 10% | 2 | Metade da tarefa ausente: nenhum comando relativo aos containers. |
| Coerência técnica | 10% | 3 | São comandos `git` reais e coerentes individualmente, mas `git pull` é semanticamente o oposto de atualizar o repositório remoto. |

**Fração:** 0,44 · **Pontos:** 0,13 / 0,30

### Comentário
- **Acertos:** demonstrou familiaridade com comandos `git` (`git add .`).
- **Erros e por quê:**
  - Não há comando para **subir os containers** — o esperado era `docker compose up -d --build` (constrói e sobe `mongodb`, `api` e `web`, lendo o `.env` automaticamente).
  - `git pull` traz alterações do remoto para o local; para **atualizar o repositório remoto** o comando é `git push origin main`.
  - `git branch main` e `git add .` não fazem parte da tarefa (no cenário, tudo já estava comitado).
