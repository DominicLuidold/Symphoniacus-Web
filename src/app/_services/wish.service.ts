import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { DateWish, DutyWish } from '../_models/wish';
import {dateWishes, dutyWishes} from '../wishes';

@Injectable({ providedIn: 'root' })
export class WishService {
  constructor(private http: HttpClient) { }

  getAllForDuty(dutyId: number): DutyWish[] {
    return dutyWishes.filter(wish => wish.dutyId === dutyId);
    // return this.http.get<DutyWish>(`${environment.apiUrl}/duties/${dutyId}/wishes`); // TODO - Refactor to use API when ready
  }

  getAllForDate(dutyDate: string): DateWish[] {
    // TODO API
    return dateWishes.filter(wish => Date.parse(dutyDate) >= Date.parse(wish.start) && Date.parse(dutyDate) <= Date.parse(wish.end));
  }
}
