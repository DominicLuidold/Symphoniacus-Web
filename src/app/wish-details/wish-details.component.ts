import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

import { wishes } from '../wishes';

@Component({
  selector: 'app-wish-details',
  templateUrl: './wish-details.component.html',
  styleUrls: ['./wish-details.component.css']
})
export class WishDetailsComponent implements OnInit {
  displayedColumns: string[] = ['type', 'date', 'details', 'edit'];
  @Input() duty;
  wish;

  constructor() { }

  ngOnInit(): void {
    this.wish = new Array(wishes.find(o => o.dutyId === this.duty[0].dutyId));
    console.log(this.wish);
  }
}
