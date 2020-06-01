import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BaseWish } from '@app/_models';
import { WishService } from '@app/_services';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-wish-overview',
  templateUrl: './wish-overview.component.html',
  styleUrls: ['./wish-overview.component.scss']
})
export class WishOverviewComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['target-icon', 'type-target', 'status', 'reason', 'info'];
  dataSource = new MatTableDataSource<BaseWish>();

  constructor(private wishService: WishService) {
    // Intentionally empty
  }

  ngOnInit(): void {
    // Join Observables from DutyWishes and DateWishes
    const wishList = forkJoin([
      this.wishService.getAllDutyWishes(),
      this.wishService.getAllDateWishes()
    ]).pipe(map(([dutyWishes, dateWishes]) => dutyWishes.concat(dateWishes)));

    wishList.subscribe(wishes => {
      this.dataSource.data = wishes;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  isDutyWish(wish): boolean {
    return typeof wish.details.dutyId !== 'undefined';
  }
}
