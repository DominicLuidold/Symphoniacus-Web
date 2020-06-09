import { MusicalPiece } from '@app/_models';

export interface SeriesOfPerformances {
  seriesOfPerformancesId: number;
  description: string;
  musicalPieces: MusicalPiece[];
}
