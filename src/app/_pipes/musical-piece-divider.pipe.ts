import { Pipe, PipeTransform } from '@angular/core';
import { MusicalPiece } from '@app/_models';

@Pipe({
  name: 'musicalPieceDivider'
})
export class MusicalPieceDividerPipe implements PipeTransform {

  /**
   * Transforms an array of {@link MusicalPiece}s into a table friendly string.
   *
   * @param musicalPieces An array of Musical Pieces
   */
  transform(musicalPieces: MusicalPiece[]): string {
    if (musicalPieces.length === 0) {
      return '';
    } else if (musicalPieces.length === 1) {
      return musicalPieces[0].name;
    } else {
      let result = '';
      for (const musicalPiece of musicalPieces) {
        result += musicalPiece.name + '\r\n';
      }
      return result;
    }
  }
}
