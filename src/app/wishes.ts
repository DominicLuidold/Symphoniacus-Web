import { DutyWish } from './_models/wish';

export const dutyWishes: DutyWish[] = [
  {
    wishType: 'NEGATIVE',
    target: 'DUTY',
    status: 'REVIEW',
    reason: 'I wanna be free',
    details: {
      dutyId: 1,
      musicalPieces: [
        {
          musicalPieceId: 1,
          name: 'Cavalleria rusticana'
        },
        {
          musicalPieceId: 2,
          name: 'Alpensinfonie'
        }
      ],
      forEntireSop: false
    }
  },
  {
    wishType: 'POSITIVE',
    target: 'DUTY',
    status: 'REVIEW',
    reason: 'I wanna play #3',
    details: {
      dutyId: 1,
      musicalPieces: [
        {
          musicalPieceId: 3,
          name: 'La Bohème'
        },
      ],
      forEntireSop: true
    }
  },
];
