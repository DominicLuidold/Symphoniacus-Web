import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Duty } from '../_models/duty';
import { Response } from '../_models/response';

@Injectable({ providedIn: 'root' })
export class DutyService {

  constructor(private http: HttpClient) {
    // Intentionally empty
  }

  getById(dutyId: number): Observable<Response<Duty>> {
    return this.http.get<Response<Duty>>(`${ environment.apiUrl }/duties/${ dutyId }`);
  }
}
