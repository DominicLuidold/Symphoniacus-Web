import { MusicalPiece } from './musicalPiece';

export interface BaseWish {
  type: 'POSITIVE' | 'NEGATIVE';
  target: 'DATE' | 'DUTY';
  status: 'APPROVED' | 'REVIEW' | 'REJECTED';
  reason: string;
}

export interface DateWish extends BaseWish {
  start: string;
  end: string;
}

export interface DutyWish extends BaseWish {
  dutyId: number;
  musicalPieces: MusicalPiece[];
  forEntireSop: boolean;
}
