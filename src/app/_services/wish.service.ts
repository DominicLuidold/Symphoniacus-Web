import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseWish, DateWish, DutyWish, Response } from '@app/_models';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class WishService {

  constructor(private http: HttpClient) {
    // Intentionally empty
  }

  /**
   * Returns all {@link DutyWish}es for a {@link Duty}.
   *
   * @param dutyId The id of a duty
   */
  getDutyWishesForDuty(dutyId: number): Observable<BaseWish[]> {
    return this.http.get<Response<DutyWish[]>>(`${ environment.apiUrl }/duties/${ dutyId }/wishes`).pipe(
      map(response => response.payload || [])
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
        }) || []
      )
    );
  }

  /**
   * Returns all {@link DutyWish}es.
   */
  getAllDutyWishes(): Observable<DutyWish[]> {
    return this.http.get<Response<DutyWish[]>>(`${ environment.apiUrl }/dutywishes`).pipe(
      map(response => response.payload || [])
    );
  }

  /**
   * Returns all {@link DateWish}es.
   */
  getAllDateWishes(): Observable<DateWish[]> {
    return this.http.get<Response<DateWish[]>>(`${ environment.apiUrl }/datewishes`).pipe(
      map(response => response.payload || [])
    );
  }

  /**
   * Creates a new {@link DutyWish} to a {@link Duty}.
   *
   * @param wish The Duty Wish to create
   */
  addDutyWish(wish: DutyWish): Observable<DutyWish> {
    return this.http.post<Response<DutyWish>>(`${ environment.apiUrl }/duties/${ wish.details.dutyId }/wishes`, wish).pipe(
      map(response => response.payload)
    );
  }

  /**
   * Creates a new {@link DateWish}.
   *
   * @param wish The Date Wish to create
   */
  addDateWish(wish: DateWish): Observable<DateWish> {
    return this.http.post<Response<DateWish>>(`${ environment.apiUrl }/datewishes`, wish).pipe(
      map(response => response.payload)
    );
  }

  /**
   * Updates a {@link DutyWish} from a {@link Duty}.
   *
   * @param wish The Duty Wish to update
   */
  updateDutyWish(wish: DutyWish): Observable<DutyWish> {
    return this.http.put<Response<DutyWish>>(
      `${ environment.apiUrl }/duties/${ wish.details.dutyId }/wishes/${ wish.wishId }`,
      wish
    ).pipe(map(response => response.payload));
  }

  /**
   * Updates a {@link DateWish}.
   *
   * @param wish The Date Wish to update
   */
  updateDateWish(wish: DateWish): Observable<DateWish> {
    return this.http.put<Response<DateWish>>(
      `${ environment.apiUrl }/datewishes/${ wish.wishId }`,
      wish
    ).pipe(map(response => response.payload));
  }

  /**
   * Deletes a {@link DutyWish} from a {@link Duty}.
   *
   * @param wish The Duty Wish to delete
   * @param dutyId The Duty to delete the Wish from
   */
  deleteDutyWish(wish: BaseWish, dutyId: number): Observable<Response<any>> {
    return this.http.delete<Response<any>>(`${ environment.apiUrl }/duties/${ dutyId }/wishes/${ wish.wishId }`);
  }

  /**
   * Deletes a {@link DateWish}.
   *
   * @param wish The Date Wish to delete
   */
  deleteDateWish(wish: BaseWish): Observable<Response<any>> {
    return this.http.delete<Response<any>>(`${ environment.apiUrl }/datewishes/${ wish.wishId }`);
  }
}
