import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateWish, DutyWish, Response } from '@app/_models';
import { dutyWishes } from '@app/wishes';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

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
