import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Duty, Response } from '@app/_models';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

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
