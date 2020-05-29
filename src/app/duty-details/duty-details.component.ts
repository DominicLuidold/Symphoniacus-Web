import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { Duty } from '../_models/duty';
import { DutyService } from '../_services/duty.service';

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
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.duty = this.dutyService.getById(+params.get('dutyId')); // TODO Pipe etc!
      this.tableData = new Array(this.duty);
    });
  }
}
