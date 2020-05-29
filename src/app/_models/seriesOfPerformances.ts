import { MusicalPiece } from '@app/_models/musicalPiece';

export interface SeriesOfPerformances {
  seriesOfPerformancesId: number;
  description: string;
  musicalPieces: MusicalPiece[];
}
