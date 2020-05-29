import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Duty } from '../_models/duty';
import { environment } from '../../environments/environment';
import { duties } from '../duties';

@Injectable({ providedIn: 'root' })
export class DutyService {
  constructor(private http: HttpClient) { }

  getById(dutyId: number) {
    return duties.find(duty => duty.dutyId === dutyId);
    // return this.http.get<Duty>(`${environment.apiUrl}/duties/${dutyId}`); // TODO - Refactor to use API when ready
  }
}
