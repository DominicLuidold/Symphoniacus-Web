import { Component, Input, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Duty } from '@app/_models/duty';
import { BaseWish } from '@app/_models/wish';
import { WishService } from '@app/_services/wish.service';

@Component({
  selector: 'app-wish-details',
  templateUrl: './wish-details.component.html',
  styleUrls: ['./wish-details.component.css']
})
export class WishDetailsComponent implements OnInit {
  displayedColumns: string[] = ['target-icon', 'type-target', 'status', 'reason', 'edit'];
  @Input() duty: Duty;
  wishes: BaseWish[] = [];

  constructor(private wishService: WishService) {
    // Intentionally empty
  }

  ngOnInit(): void {
    this.wishes = this.wishService.getAllForDuty(this.duty.dutyId); // TODO - Refactor to use API when ready

    this.wishService.getAllDateWishes().pipe(first()).subscribe(response => {
      this.wishes = this.wishes.concat(
        response.payload.filter(wish => {
          return (Date.parse(this.duty.start) >= Date.parse(wish.details.start)
            && Date.parse(this.duty.start) <= Date.parse(wish.details.end));
        })
      );
    });
  }
}
