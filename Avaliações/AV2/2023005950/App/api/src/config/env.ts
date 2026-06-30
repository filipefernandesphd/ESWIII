import dotenv from 'dotenv';

// Carrega variáveis de ambiente do arquivo .env.dev quando presente.
// Em produção (Docker), as variáveis vêm do ambiente do container.
dotenv.config({ path: '.env.dev' });

export const env = {
  port: Number(process.env.PORT) || 3000,
  mongodbUri:
    process.env.MONGODB_URI || 'mongodb://localhost:27017/cupmatches',
};
