import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import { connectDatabase } from './config/db';
import { matchRoutes } from './routes/matchRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(matchRoutes);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

async function start(): Promise<void> {
  await connectDatabase();
  app.listen(env.port, () => {
    console.log(`[api] Servidor rodando em http://localhost:${env.port}`);
  });
}

start();
