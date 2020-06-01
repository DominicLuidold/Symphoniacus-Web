import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseWish, Duty } from '@app/_models';
import { WishService } from '@app/_services';
import { DeleteWishDialogComponent } from '@app/delete-wish-dialog/delete-wish-dialog.component';
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

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private wishService: WishService
  ) {
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

  deleteWishDialog(wish: BaseWish): void {
    const dialogRef = this.dialog.open(DeleteWishDialogComponent);
    dialogRef.afterClosed().subscribe(deleteWish => {
      if (deleteWish) {
        if (wish.target === 'DATE') {
          this.wishService.deleteDateWish(wish).subscribe({
            next: () => {
              this.loadWishes();
              this.openSnackBar('Successfully deleted Request', 'Close');
            },
            error: err => this.openSnackBar(err, 'Close')
          });
        } else {
          this.wishService.deleteDutyWish(wish, this.duty.dutyId).subscribe({
            next: () => {
              this.loadWishes();
              this.openSnackBar('Successfully deleted Request', 'Close');
            },
            error: err => this.openSnackBar(err, 'Close')
          });
        }
      }
    });
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
