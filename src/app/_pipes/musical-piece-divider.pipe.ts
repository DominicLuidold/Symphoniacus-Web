import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'musicalPieceDivider'
})
export class MusicalPieceDividerPipe implements PipeTransform {

  transform(musicalPieces: string[]): string {
    if (musicalPieces.length < 2) {
      return musicalPieces[0];
    } else {
      let result = '';
      for (const musicalPiece of musicalPieces) {
        result += musicalPiece + '\r\n';
      }
      return result;
    }
  }
}
