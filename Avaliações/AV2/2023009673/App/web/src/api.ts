import { Tournament } from './types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function fetchTournament(): Promise<Tournament> {
  const response = await fetch(`${API_URL}/matches`);
  if (!response.ok) {
    throw new Error(`Erro ao buscar partidas: ${response.status}`);
  }
  return response.json();
}
