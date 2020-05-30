import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Response } from '../_models/response';
import { BaseWish, DateWish, DutyWish } from '../_models/wish';

@Injectable({ providedIn: 'root' })
export class WishService {

  constructor(private http: HttpClient) {
    // Intentionally empty
  }

  /**
   * Returns all {@link DutyWish}es for a Duty.
   *
   * @param dutyId The id of a duty
   */
  getDutyWishesForDuty(dutyId: number): Observable<BaseWish[]> {
    return this.http.get<Response<DutyWish[]>>(`${ environment.apiUrl }/duties/${ dutyId }/wishes`).pipe(
      map(response => response.payload)
    );
  }

  /**
   * Returns all {@link DateWish}es that occur on a given date.
   *
   * @param date The date to filter Date Wishes for
   */
  getDateWishesForDate(date: string): Observable<BaseWish[]> {
    return this.http.get<Response<DateWish[]>>(`${ environment.apiUrl }/datewishes`).pipe(
      map(response => response.payload.filter(
        dateWish => {
          return (Date.parse(date) >= Date.parse(dateWish.details.start) && Date.parse(date) <= Date.parse(dateWish.details.end));
        })
      )
    );
  }
}
