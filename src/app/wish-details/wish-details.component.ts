import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BaseWish, Duty } from '@app/_models';
import { WishService } from '@app/_services';
import { DeleteWishDialogComponent } from '@app/delete-wish-dialog/delete-wish-dialog.component';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-wish-details',
  templateUrl: './wish-details.component.html',
  styleUrls: ['./wish-details.component.scss']
})
export class WishDetailsComponent implements OnInit, OnDestroy {
  @Input() duty: Duty;
  @Input() wishUpdateEvent: Observable<void>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  private wishUpdateSubscription: Subscription;

  displayedColumns: string[] = ['target-icon', 'type-target', 'status', 'reason', 'edit', 'delete'];
  dataSource = new MatTableDataSource<BaseWish>();

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private wishService: WishService
  ) {
    // Add custom sorting for nested objects
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'type-target':
          return item.wishType + item.target;
        default:
          return item[property];
      }
    };
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
    const wishList = forkJoin([
      this.wishService.getDutyWishesForDuty(this.duty.dutyId),
      this.wishService.getDateWishesForDate(this.duty.start)
    ]).pipe(map(([dutyWishes, dateWishes]) => dutyWishes.concat(dateWishes)));

    wishList.subscribe(wishes => {
      this.dataSource.data = wishes;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
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
