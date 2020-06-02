import { MusicalPiece } from '@app/_models/musicalPiece';
import { MusicalPieceDividerPipe } from '@app/_pipes';

describe('MusicalPieceDividerPipe', () => {
  let pipe: MusicalPieceDividerPipe;

  beforeEach(() => {
    pipe = new MusicalPieceDividerPipe();
  });

  it('providing empty array returns nothing', () => {
    expect(pipe.transform([])).toBe('');
  });

  it('providing single musical piece returns musical piece name', () => {
    // Given: One Musical Piece
    const musicalPieces: MusicalPiece[] = [
      {
        musicalPieceId: 1,
        name: 'Test Musical Piece 1',
        category: 'Test Category 1'
      },
    ];

    expect(pipe.transform(musicalPieces)).toBe(musicalPieces[0].name);
  });

  it('providing multiple musical pieces returns all musical piece names', () => {
    // Given: Two Musical Pieces
    const musicalPieces: MusicalPiece[] = [
      {
        musicalPieceId: 1,
        name: 'Test Musical Piece 1',
        category: 'Test Category 1'
      },
      {
        musicalPieceId: 2,
        name: 'Test Musical Piece 2',
        category: 'Test Category 2'
      }
    ];

    expect(pipe.transform(musicalPieces)).toBe(musicalPieces[0].name + '\r\n' + musicalPieces[1].name + '\r\n');
  });
});
