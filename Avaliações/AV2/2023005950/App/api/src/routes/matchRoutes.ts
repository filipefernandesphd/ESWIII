import { Router } from 'express';
import { listMatches } from '../controllers/matchController';

export const matchRoutes = Router();

matchRoutes.get('/matches', listMatches);
