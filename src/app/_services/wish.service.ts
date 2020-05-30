import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Response } from '../_models/response';
import { DateWish, DutyWish } from '../_models/wish';
import { dutyWishes } from '../wishes';

@Injectable({ providedIn: 'root' })
export class WishService {

  constructor(private http: HttpClient) {
    // Intentionally empty
  }

  getAllForDuty(dutyId: number): DutyWish[] {
    return dutyWishes.filter(wish => wish.details.dutyId === dutyId);
    // return this.http.get<DutyWish>(`${environment.apiUrl}/duties/${dutyId}/wishes`); // TODO - Refactor to use API when ready
  }

  getAllDateWishes(): Observable<Response<DateWish[]>> {
    return this.http.get<Response<DateWish[]>>(`${ environment.apiUrl }/datewishes`);
  }
}
