import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

import { Duty } from '../_models/duty';
import { wishes } from '../wishes';

@Component({
  selector: 'app-wish-details',
  templateUrl: './wish-details.component.html',
  styleUrls: ['./wish-details.component.css']
})
export class WishDetailsComponent implements OnInit {
  displayedColumns: string[] = ['type', 'date', 'details', 'edit'];
  @Input() duty: Duty;
  wish;

  constructor() { }

  ngOnInit(): void {
    this.wish = new Array(wishes.find(o => o.dutyId === this.duty.dutyId));
  }
}
