import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Duty } from '@app/_models';
import { DutyService } from '@app/_services';
import { DutyWishDialogComponent } from '@app/duty-wish-dialog/duty-wish-dialog.component';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-duty-details',
  templateUrl: './duty-details.component.html',
  styleUrls: ['./duty-details.component.css']
})
export class DutyDetailsComponent implements OnInit {
  displayedColumns: string[] = ['start', 'end', 'category', 'description', 'seriesOfPerformances', 'musicalPieces'];
  duty: Duty;
  tableData: Duty[];

  constructor(
    private route: ActivatedRoute,
    private dutyService: DutyService,
    public dialog: MatDialog // TODO - Check if public is necessary
  ) {
    // Intentionally empty
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.dutyService.getById(+params.get('dutyId')).pipe(first()).subscribe(response => {
        this.duty = response.payload;
        this.tableData = new Array(this.duty);
      });
    });
  }

  openDutyWishDialog(): void {
    const dialogRef = this.dialog.open(DutyWishDialogComponent, {
      data: this.duty.seriesOfPerformances.musicalPieces
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('TODO - Request dialog closed'); // TODO - Save Wish
    });
  }
}
