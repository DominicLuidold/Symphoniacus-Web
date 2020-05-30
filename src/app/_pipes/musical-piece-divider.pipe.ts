import { Pipe, PipeTransform } from '@angular/core';
import { MusicalPiece } from '../_models/musicalPiece';

@Pipe({
  name: 'musicalPieceDivider'
})
export class MusicalPieceDividerPipe implements PipeTransform {

  transform(musicalPieces: MusicalPiece[]): string {
    if (musicalPieces.length < 2) {
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
