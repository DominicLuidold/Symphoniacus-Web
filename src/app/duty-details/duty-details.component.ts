import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { duties } from '../duties';

@Component({
  selector: 'app-duty-details',
  templateUrl: './duty-details.component.html',
  styleUrls: ['./duty-details.component.css']
})
export class DutyDetailsComponent implements OnInit {
  displayedColumns: string[] = ['start', 'end', 'category', 'description', 'seriesOfPerformances', 'musicalPieces'];
  duty;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.duty = new Array(duties[+params.get('dutyId') - 1]); // TODO - Add real data source here
    });
  }
}
