# Copa Resultados

Aplicação didática para listar as partidas da Copa do Mundo 2026, da fase de grupos até a final. O projeto é composto por uma API em Node.js, um frontend em React e um banco de dados MongoDB.

Os dados são obtidos do projeto [openfootball/worldcup.json](https://github.com/openfootball/worldcup.json).

## Tecnologias utilizadas

- **Backend (`api/`)**: Node.js, TypeScript, Express, MongoDB com Mongoose
- **Frontend (`web/`)**: Vite, TypeScript, React
- **Banco de dados**: MongoDB (banco `cupmatches`)
- **Infraestrutura**: Docker e Docker Compose

## Estrutura de pastas

```txt
copa-resultados/
├── api/                  # Backend (Node.js + TypeScript + Express + Mongoose)
│   ├── src/
│   │   ├── config/       # Configurações (variáveis de ambiente, banco)
│   │   ├── controllers/  # Controladores das rotas
│   │   ├── models/       # Modelos do Mongoose (Tournament)
│   │   ├── routes/       # Definição das rotas
│   │   ├── seed.ts       # Seed: baixa o JSON do openfootball e popula o banco
│   │   └── server.ts     # Ponto de entrada da API
│   ├── features/         # Testes BDD (Cucumber)
│   ├── .env.dev          # Variáveis de ambiente de desenvolvimento
│   └── Dockerfile        # Build multi-stage da API
├── web/                  # Frontend (Vite + React + TypeScript)
│   ├── src/
│   │   ├── components/   # Componentes React
│   │   ├── api.ts        # Cliente da API
│   │   ├── App.tsx       # Tela principal
│   │   └── main.tsx      # Ponto de entrada
│   ├── .env.dev          # Variáveis de ambiente de desenvolvimento
│   ├── nginx.conf        # Configuração do Nginx (produção)
│   └── Dockerfile        # Build multi-stage do frontend
├── docker-compose.yml    # Orquestração dos serviços
├── .env.dev              # Variáveis de ambiente do Docker Compose
└── README.md
```

## Estrutura dos dados no banco

O banco `cupmatches` guarda um único documento de torneio, na coleção `tournaments`:

```json
{
  "name": "World Cup 2026",
  "matches": [
    {
      "round": "Matchday 1",
      "date": "2026-06-11",
      "time": "13:00 UTC-6",
      "team1": "Mexico",
      "team2": "South Africa",
      "group": "Group A",
      "ground": "Mexico City"
    },
    {
      "round": "Final",
      "date": "2026-07-19",
      "time": "15:00 UTC-4",
      "team1": "W101",
      "team2": "W102",
      "ground": "New York/New Jersey (East Rutherford)"
    }
  ]
}
```

Partidas da fase de grupos possuem o campo `group`; partidas do mata-mata não.

Os dados são fornecidos por `https://github.com/openfootball/worldcup.json`.

## Variáveis de ambiente

### Raiz (`.env.dev`) — usadas pelo Docker Compose

| Variável           | Descrição                                           | Exemplo                              |
| ------------------ | --------------------------------------------------- | ------------------------------------ |
| `API_PORT`         | Porta exposta da API no host                        | `3000`                               |
| `WEB_PORT`         | Porta exposta do frontend no host                   | `5173`                               |
| `MONGODB_PORT`     | Porta exposta do MongoDB no host                    | `27017`                              |
| `MONGODB_DATABASE` | Nome do banco de dados                              | `cupmatches`                         |
| `MONGODB_URI`      | URI de conexão usada pela API dentro da rede Docker | `mongodb://mongodb:27017/cupmatches` |
| `VITE_API_URL`     | URL da API usada no build do frontend               | `http://localhost:3000`              |

### Backend (`api/.env.dev`)

| Variável      | Descrição                    | Exemplo                                |
| ------------- | ---------------------------- | -------------------------------------- |
| `PORT`        | Porta da API                 | `3000`                                 |
| `MONGODB_URI` | URI de conexão com o MongoDB | `mongodb://localhost:27017/cupmatches` |

### Frontend (`web/.env.dev`)

| Variável       | Descrição       | Exemplo                 |
| -------------- | --------------- | ----------------------- |
| `VITE_API_URL` | URL base da API | `http://localhost:3000` |

> Observação: rodando localmente (sem Docker), o MongoDB fica em `localhost`. Rodando via Docker Compose, a API acessa o banco pelo nome do serviço (`mongodb`).

## Como instalar dependências localmente

```bash
# Backend
cd api
npm install

# Frontend
cd web
npm install
```

## Como rodar localmente sem Docker

É necessário ter um MongoDB rodando em `localhost:27017` (pode ser via Docker: `docker run -d -p 27017:27017 mongo:7`).

```bash
# Backend (http://localhost:3000)
cd api
npm run dev

# Frontend (http://localhost:5173)
cd web
npm run dev
```

O backend carrega automaticamente o arquivo `api/.env.dev`. O frontend usa `web/.env.dev` por meio do modo `dev` do Vite (`vite --mode dev`).

## Como subir com Docker Compose

Na raiz do projeto:

```bash
docker compose --env-file .env.dev up -d --build
```

Serviços disponíveis:

- **Web**: http://localhost:5173
- **API**: http://localhost:3000
- **MongoDB**: localhost:27017

Para derrubar os serviços:

```bash
docker compose --env-file .env.dev down
```

### Testes BDD da API

A API possui testes BDD com Cucumber (`npm run test:bdd`), localizados em `api/features/`. Eles são executados automaticamente pelo GitHub Actions (workflow `api-test-bdd.yml`) a cada push: o workflow sobe um MongoDB, instala as dependências, compila o TypeScript, executa o seed, inicia a API e roda os testes. O seed exige acesso à internet (download do calendário oficial).

Para rodar os testes localmente, com o MongoDB ativo e a API no ar:

```bash
cd api
npm run test:bdd
```

## Como executar o seed do banco

O seed baixa o calendário oficial da Copa 2026 de
`https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json`
e insere o torneio no banco `cupmatches` (requer acesso à internet).

Com o MongoDB rodando:

```bash
cd api
npm run seed
```

> Com o Docker Compose ativo, o MongoDB fica exposto em `localhost:27017`, então o seed pode ser executado da máquina local com o comando acima.

## Endpoints disponíveis

| Método | Rota       | Descrição                               |
| ------ | ---------- | --------------------------------------- |
| `GET`  | `/matches` | Retorna o torneio com todas as partidas |
| `GET`  | `/health`  | Verificação de saúde da API             |

## Exemplos de resposta da API

### `GET /matches`

```json
{
  "name": "World Cup 2026",
  "matches": [
    {
      "round": "Matchday 1",
      "date": "2026-06-11",
      "time": "13:00 UTC-6",
      "team1": "Mexico",
      "team2": "South Africa",
      "group": "Group A",
      "ground": "Mexico City"
    }
  ]
}
```

### `GET /health`

```json
{ "status": "ok" }
```

---

Projeto didático desenvolvido para a disciplina de Engenharia de Software III.
