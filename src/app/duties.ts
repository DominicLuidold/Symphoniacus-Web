import { Duty } from './_models/duty';

export const duties: Duty[] = [
  {
    dutyId: 1,
    description: 'Test Duty 1',
    dutyCategory: {
      dutyCategoryId: 1,
      type: 'Opera performance'
    },
    start: '2020-05-01 15:30:00',
    end: '2020-05-01 18:30:00',
    seriesOfPerformances: {
      seriesOfPerformancesId: 1,
      description: 'Nino On Ice',
      musicalPieces: [
        {
          musicalPieceId: 1,
          name: 'Cavalleria rusticana'
        },
        {
          musicalPieceId: 2,
          name: 'Alpensinfonie'
        }
      ]
    }
  }
];
