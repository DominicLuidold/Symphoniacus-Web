import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Duty } from '../_models/duty';
import { Response } from '../_models/response';

@Injectable({ providedIn: 'root' })
export class DutyService {

  constructor(private http: HttpClient) {
    // Intentionally empty
  }

  /**
   * Returns a Duty for a given id.
   *
   * @param dutyId The id of a duty
   */
  getById(dutyId: number): Observable<Duty> {
    return this.http.get<Response<Duty>>(`${ environment.apiUrl }/duties/${ dutyId }`).pipe(map(response => response.payload));
  }
}
