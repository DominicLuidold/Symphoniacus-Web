import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DateWish } from '@app/_models';
import { WishService } from '@app/_services';
import { AddDateWishDialogComponent } from '@app/add-date-wish-dialog/add-date-wish-dialog.component';
import { DeleteWishDialogComponent } from '@app/delete-wish-dialog/delete-wish-dialog.component';
import { EditDateWishDialogComponent } from '@app/edit-date-wish-dialog/edit-date-wish-dialog.component';

@Component({
  selector: 'app-date-wish-overview',
  templateUrl: './date-wish-overview.component.html',
  styleUrls: ['./date-wish-overview.component.scss']
})
export class DateWishOverviewComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['target-icon', 'type-target', 'start', 'end', 'reason', 'edit', 'delete'];
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

  isNotEditable(wish: DateWish): boolean {
    const wishStart = new Date(wish.details.start);
    const wishEnd = new Date(wish.details.end);
    const today = new Date();

    return (wishStart <= today && wishEnd >= today) || (wishEnd <= today);
  }

  addDateWishDialog(): void {
    const dialogRef = this.dialog.open(AddDateWishDialogComponent, {
      width: '600px' // A CSS solution would have been nicer.. :(
    });
    dialogRef.componentInstance.wishUpdate.subscribe(error => {
      // If an error is given, adding was not successful
      if (error) {
        this.openSnackBar(error);
      } else {
        this.openSnackBar('Successfully added Request');
        this.loadWishes();
      }
    });
  }

  editDateWishDialog(dateWish: DateWish): void {
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

  deleteWishDialog(wish: DateWish): void {
    const dialogRef = this.dialog.open(DeleteWishDialogComponent);
    dialogRef.afterClosed().subscribe(deleteWish => {
      if (deleteWish) {
        this.wishService.deleteDateWish(wish).subscribe({
          next: () => {
            this.openSnackBar('Successfully deleted Request');
            this.loadWishes();
          },
          error: err => this.openSnackBar(err)
        });
      }
    });
  }

  openSnackBar(message: string, action: string = 'Close'): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
