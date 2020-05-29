import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

import { Duty } from '../_models/duty';
import { BaseWish } from '../_models/wish';
import { WishService } from '../_services/wish.service';

@Component({
  selector: 'app-wish-details',
  templateUrl: './wish-details.component.html',
  styleUrls: ['./wish-details.component.css']
})
export class WishDetailsComponent implements OnInit {
  displayedColumns: string[] = ['target-icon', 'type-target', 'status', 'reason', 'edit'];
  @Input() duty: Duty;
  wishes: BaseWish[];

  constructor(private wishService: WishService) { }

  ngOnInit(): void {
    this.wishes = this.wishService.getAllForDuty(this.duty.dutyId);
    this.wishes = this.wishes.concat(this.wishService.getAllForDate(this.duty.start));
  }
}
