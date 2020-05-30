import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
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
  dutyDataSource: Duty[];

  constructor(private route: ActivatedRoute, private dutyService: DutyService) {
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
}
