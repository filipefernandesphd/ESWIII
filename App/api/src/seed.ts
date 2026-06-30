import mongoose from 'mongoose';
import { env } from './config/env';
import { Tournament, IMatch } from './models/Tournament';

const WORLDCUP_JSON_URL =
  'https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json';

interface WorldCupFile {
  name: string;
  matches: IMatch[];
}

async function seed(): Promise<void> {
  try {
    console.log(`[seed] Baixando dados de ${WORLDCUP_JSON_URL}`);
    const response = await fetch(WORLDCUP_JSON_URL);
    if (!response.ok) {
      throw new Error(`Falha ao baixar o arquivo: HTTP ${response.status}`);
    }
    const data = (await response.json()) as WorldCupFile;
    console.log(`[seed] Torneio: ${data.name} (${data.matches.length} partidas)`);

    await mongoose.connect(env.mongodbUri);
    console.log(`[seed] Conectado ao MongoDB em ${env.mongodbUri}`);

    await Tournament.deleteMany({});
    console.log('[seed] Coleção de torneios limpa.');

    await Tournament.create({ name: data.name, matches: data.matches });
    console.log(`[seed] "${data.name}" inserido com ${data.matches.length} partidas!`);
  } catch (error) {
    console.error('[seed] Erro ao executar seed:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seed();
