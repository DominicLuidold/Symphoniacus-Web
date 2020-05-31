import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BaseWish, Duty } from '@app/_models';
import { WishService } from '@app/_services';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-wish-details',
  templateUrl: './wish-details.component.html',
  styleUrls: ['./wish-details.component.css']
})
export class WishDetailsComponent implements OnInit, OnDestroy {
  @Input() duty: Duty;
  @Input() wishUpdateEvent: Observable<void>;
  private wishUpdateSubscription: Subscription;

  displayedColumns: string[] = ['target-icon', 'type-target', 'status', 'reason', 'edit', 'delete'];
  wishes: Observable<BaseWish[]>;

  constructor(private wishService: WishService) {
    // Intentionally empty
  }

  ngOnInit(): void {
    this.loadWishes();
    this.wishUpdateSubscription = this.wishUpdateEvent.subscribe(() => this.loadWishes());
  }

  ngOnDestroy() {
    this.wishUpdateSubscription.unsubscribe();
  }

  loadWishes() {
    // Join Observables from DutyWishes and DateWishes
    this.wishes = forkJoin([
      this.wishService.getDutyWishesForDuty(this.duty.dutyId),
      this.wishService.getDateWishesForDate(this.duty.start)
    ]).pipe(map(([dutyWishes, dateWishes]) => dutyWishes.concat(dateWishes)));
  }
}
