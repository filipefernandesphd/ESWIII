import { Match } from '../types';

interface MatchCardProps {
  match: Match;
}

export function MatchCard({ match }: MatchCardProps) {
  const formattedDate = new Date(`${match.date}T12:00:00`).toLocaleDateString(
    'pt-BR'
  );

  return (
    <div className="match-card">
      <div className="match-card-header">
        <span className="match-stage">{match.round}</span>
        {match.group && <span className="match-group">{match.group}</span>}
      </div>

      <div className="match-score">
        <span className="team home">{match.team1}</span>
        <span className="score">vs</span>
        <span className="team away">{match.team2}</span>
      </div>

      <div className="match-info">
        <span>{formattedDate}</span>
        <span>{match.time}</span>
        <span>{match.ground}</span>
      </div>
    </div>
  );
}
