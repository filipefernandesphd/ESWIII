import { setWorldConstructor, World } from '@cucumber/cucumber';
import { IMatch } from '../../src/models/Tournament';

export interface TournamentResponse {
  name: string;
  matches: IMatch[];
}

export class ApiWorld extends World {
  apiUrl = process.env.API_URL || 'http://localhost:3000';
  response?: Response;
  tournament?: TournamentResponse;
}

setWorldConstructor(ApiWorld);
