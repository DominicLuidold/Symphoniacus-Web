import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Duty } from '@app/_models';
import { DutyService } from '@app/_services';
import { DutyWishDialogComponent } from '@app/duty-wish-dialog/duty-wish-dialog.component';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-duty-details',
  templateUrl: './duty-details.component.html',
  styleUrls: ['./duty-details.component.scss']
})
export class DutyDetailsComponent implements OnInit {
  wishUpdateSubject: Subject<void> = new Subject();
  displayedColumns: string[] = ['start', 'end', 'category', 'description', 'seriesOfPerformances', 'musicalPieces'];
  duty: Duty;
  dutyDataSource: Duty[];

  constructor(
    private route: ActivatedRoute,
    private dutyService: DutyService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    // Intentionally empty
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.dutyService.getById(+params.get('dutyId')).pipe(first()).subscribe(duty => {
        this.duty = duty;
        this.dutyDataSource = new Array(duty);
      });
    });
  }

  openDutyWishDialog(): void {
    const dialogRef = this.dialog.open(DutyWishDialogComponent, {
      width: '600px', // A CSS solution would have been nicer.. :(
      data: {
        dutyId: this.duty.dutyId,
        musicalPieces: this.duty.seriesOfPerformances.musicalPieces
      }
    });
    dialogRef.componentInstance.wishUpdate.subscribe(error => {
      // If an error is given, adding was not successful
      if (error) {
        this.snackBar.open(error, 'Close', {
          duration: 3000,
        });
      } else {
        this.wishUpdateSubject.next();
      }
    });
  }
}
