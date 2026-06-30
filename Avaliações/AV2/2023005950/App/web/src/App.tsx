import { useEffect, useState } from 'react';
import { fetchTournament } from './api';
import { Match } from './types';
import { MatchCard } from './components/MatchCard';

const KNOCKOUT_ROUNDS_ORDER = [
  'Round of 32',
  'Round of 16',
  'Quarter-final',
  'Semi-final',
  'Match for third place',
  'Final',
];

export default function App() {
  const [name, setName] = useState('Copa Resultados');
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTournament()
      .then((tournament) => {
        setName(tournament.name);
        setMatches(tournament.matches);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="container">
        <h1>{name}</h1>
        <p className="feedback">Carregando partidas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h1>{name}</h1>
        <p className="feedback error">Erro: {error}</p>
      </div>
    );
  }

  // Fase de grupos: seções por grupo (Group A, Group B, ...)
  const groups = Array.from(
    new Set(matches.filter((m) => m.group).map((m) => m.group as string))
  ).sort();

  // Mata-mata: seções por rodada, na ordem do torneio
  const knockoutRounds = KNOCKOUT_ROUNDS_ORDER.filter((round) =>
    matches.some((m) => !m.group && m.round === round)
  );

  return (
    <div className="container">
      <h1>{name}</h1>

      {groups.map((group) => (
        <section key={group} className="stage-section">
          <h2>{group}</h2>
          <div className="matches-grid">
            {matches
              .filter((m) => m.group === group)
              .map((match, index) => (
                <MatchCard key={`${group}-${index}`} match={match} />
              ))}
          </div>
        </section>
      ))}

      {knockoutRounds.map((round) => (
        <section key={round} className="stage-section">
          <h2>{round}</h2>
          <div className="matches-grid">
            {matches
              .filter((m) => !m.group && m.round === round)
              .map((match, index) => (
                <MatchCard key={`${round}-${index}`} match={match} />
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
