import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BaseWish, DateWish } from '@app/_models';
import { WishService } from '@app/_services';
import { DateWishDialogComponent } from '@app/date-wish-dialog/date-wish-dialog.component';
import { DeleteWishDialogComponent } from '@app/delete-wish-dialog/delete-wish-dialog.component';

@Component({
  selector: 'app-date-wish-overview',
  templateUrl: './date-wish-overview.component.html',
  styleUrls: ['./date-wish-overview.component.css']
})
export class DateWishOverviewComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['target-icon', 'type-target', 'start', 'end', 'status', 'reason', 'edit', 'delete'];
  dataSource = new MatTableDataSource<DateWish>();

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private wishService: WishService
  ) {
    // Intentionally empty
  }

  ngOnInit(): void {
    this.loadWishes();

    // Add custom sorting for nested objects
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'start':
          return item.details.start;
        case 'end':
          return item.details.end;
        default:
          return item[property];
      }
    };
  }

  loadWishes(): void {
    this.wishService.getAllDateWishes().subscribe(dateWishes => {
      this.dataSource.data = dateWishes;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDateWishDialog(): void {
    const dialogRef = this.dialog.open(DateWishDialogComponent, {
      width: '600px', // A CSS solution would have been nicer.. :(
    });
    dialogRef.componentInstance.wishUpdate.subscribe(error => {
      // If an error is given, adding was not successful
      if (error) {
        this.snackBar.open(error, 'Close', {
          duration: 3000,
        });
      } else {
        this.snackBar.open('Successfully added Request', 'Close', {
          duration: 3000,
        });
        this.loadWishes();
      }
    });
  }

  deleteWishDialog(wish: BaseWish): void {
    const dialogRef = this.dialog.open(DeleteWishDialogComponent);
    dialogRef.afterClosed().subscribe(deleteWish => {
      if (deleteWish) {
        this.wishService.deleteDateWish(wish).subscribe({
          next: () => {
            this.loadWishes();
            this.openSnackBar('Successfully deleted Request', 'Close');
          },
          error: err => this.openSnackBar(err, 'Close')
        });
      }
    });
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
