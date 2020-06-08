import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { BaseWish, Duty } from '@app/_models';
import { WishService } from '@app/_services';
import { DeleteWishDialogComponent } from '@app/delete-wish-dialog/delete-wish-dialog.component';
import { EditDateWishDialogComponent } from '@app/edit-date-wish-dialog/edit-date-wish-dialog.component';
import { EditDutyWishDialogComponent } from '@app/edit-duty-wish-dialog/edit-duty-wish-dialog.component';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-wish-details',
  templateUrl: './wish-details.component.html',
  styleUrls: ['./wish-details.component.scss']
})
export class WishDetailsComponent implements OnInit, OnDestroy {
  @Input() duty: Duty;
  @Input() wishUpdateEvent: Observable<void>;
  @ViewChild('wishDetails') table: MatTable<BaseWish>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  private wishUpdateSubscription: Subscription;

  displayedColumns: string[] = ['target-icon', 'type-target', 'start', 'end', 'reason', 'edit', 'delete'];
  dataSource = new MatTableDataSource<BaseWish>();

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private wishService: WishService
  ) {
    // Intentionally empty
  }

  ngOnInit(): void {
    // Add custom sorting for nested objects
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'type-target':
          return item.wishType + item.target;
        case 'start':
          return item.details.start;
        case 'end':
          return item.details.end;
        default:
          return item[property];
      }
    };

    // Load wishes
    this.loadWishes();
    this.wishUpdateSubscription = this.wishUpdateEvent.subscribe(() => this.loadWishes());
  }

  ngOnDestroy() {
    this.wishUpdateSubscription.unsubscribe();
  }

  async loadWishes() {
    // Clear previous data, if any
    this.dataSource.data = [];

    // Load Date and Duty Wishes asynchronously but wait with the second call for the first one to be finished.
    // This is necessary because of our Hibernate not being able to handle two requests at the same time.. :(
    this.dataSource.data.push(
      ...await this.wishService.getDutyWishesForDuty(this.duty.dutyId).toPromise(),
      ...await this.wishService.getDateWishesForDate(this.duty.start).toPromise()
    );
    this.table.renderRows();

    // Add pagination and sorting
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  isNotEditable(wish): boolean {
    if (wish.target === 'DUTY') {
      return false;
    }

    const wishStart = new Date(wish.details.start);
    const wishEnd = new Date(wish.details.end);
    const today = new Date();

    return (wishStart <= today && wishEnd >= today) || (wishEnd <= today);
  }

  editWish(wish: BaseWish) {
    if (wish.target === 'DATE') {
      this.editDateWishDialog(wish);
    } else {
      this.editDutyWishDialog(wish);
    }
  }

  editDateWishDialog(dateWish: BaseWish): void {
    const dialogRef = this.dialog.open(EditDateWishDialogComponent, {
      width: '600px',
      data: {
        dateWish
      }
    });
    dialogRef.componentInstance.wishUpdate.subscribe(error => {
      if (error) {
        this.openSnackBar(error);
      } else {
        this.openSnackBar('Successfully edited Request');
        this.loadWishes();
      }
    });
  }

  editDutyWishDialog(dutyWish: BaseWish): void {
    const dialogRef = this.dialog.open(EditDutyWishDialogComponent, {
      width: '600px', // A CSS solution would have been nicer here.. :(
      data: {
        dutyWish
      }
    });
    dialogRef.componentInstance.wishUpdate.subscribe(error => {
      if (error) {
        this.openSnackBar(error);
      } else {
        this.openSnackBar('Successfully edited Request');
        this.loadWishes();
      }
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
              this.openSnackBar('Successfully deleted Request');
            },
            error: err => this.openSnackBar(err)
          });
        } else {
          this.wishService.deleteDutyWish(wish, this.duty.dutyId).subscribe({
            next: () => {
              this.loadWishes();
              this.openSnackBar('Successfully deleted Request');
            },
            error: err => this.openSnackBar(err)
          });
        }
      }
    });
  }

  openSnackBar(message: string, action: string = 'Close'): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
