import { Schema, model, Document } from 'mongoose';

export interface IMatch {
  round: string;
  num?: number;
  date: string;
  time: string;
  team1: string;
  team2: string;
  group?: string;
  ground: string;
}

export interface ITournament extends Document {
  name: string;
  matches: IMatch[];
}

const matchSchema = new Schema<IMatch>(
  {
    round: { type: String, required: true },
    num: { type: Number },
    date: { type: String, required: true },
    time: { type: String, required: true },
    team1: { type: String, required: true },
    team2: { type: String, required: true },
    group: { type: String },
    ground: { type: String, required: true },
  },
  { _id: false }
);

const tournamentSchema = new Schema<ITournament>({
  name: { type: String, required: true },
  matches: { type: [matchSchema], required: true },
});

export const Tournament = model<ITournament>('Tournament', tournamentSchema);
