import { DateWish, DutyWish } from './_models/wish';

export const dutyWishes: DutyWish[] = [
  {
    type: 'NEGATIVE',
    target: 'DUTY',
    status: 'REVIEW',
    reason: 'I wanna be free',
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
  },
  {
    type: 'POSITIVE',
    target: 'DUTY',
    status: 'REVIEW',
    reason: 'I wanna play #3',
    dutyId: 1,
    musicalPieces: [
      {
        musicalPieceId: 3,
        name: 'La Bohème'
      },
    ],
    forEntireSop: true
  },
];

export const dateWishes: DateWish[] = [
  {
    type: 'NEGATIVE',
    target: 'DATE',
    status: 'REVIEW',
    reason: 'I wanna get free',
    start: '2020-05-01',
    end: '2020-05-03'
  }
];
