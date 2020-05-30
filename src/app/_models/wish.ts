import { MusicalPiece } from './musicalPiece';

export interface BaseWish {
  wishType: 'POSITIVE' | 'NEGATIVE';
  target: 'DATE' | 'DUTY';
  status: 'APPROVED' | 'REVIEW' | 'REJECTED';
  reason: string;
}

export interface DateWish extends BaseWish {
  details: {
    start: string;
    end: string;
  };
}

export interface DutyWish extends BaseWish {
  details: {
    dutyId: number;
    musicalPieces: MusicalPiece[];
    forEntireSop: boolean;
  };
}
