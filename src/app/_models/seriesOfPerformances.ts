import { MusicalPiece } from './musicalPiece';

export interface SeriesOfPerformances {
  seriesOfPerformancesId: number;
  description: string;
  musicalPieces: MusicalPiece[];
}
