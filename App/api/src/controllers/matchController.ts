import { Request, Response } from 'express';
import { Tournament } from '../models/Tournament';

export async function listMatches(req: Request, res: Response): Promise<void> {
  try {
    const tournament = await Tournament.findOne();
    if (!tournament) {
      res.status(404).json({ message: 'Nenhum torneio encontrado. Execute o seed.' });
      return;
    }
    res.json({ name: tournament.name, matches: tournament.matches });
  } catch (error) {
    console.error('[matches] Erro ao listar partidas:', error);
    res.status(500).json({ message: 'Erro ao listar partidas' });
  }
}
