import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { BaseWish } from '@app/_models';
import { WishService } from '@app/_services';

@Component({
  selector: 'app-wish-overview',
  templateUrl: './wish-overview.component.html',
  styleUrls: ['./wish-overview.component.scss']
})
export class WishOverviewComponent implements OnInit {
  @ViewChild('wishOverview') table: MatTable<BaseWish>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['target-icon', 'type-target', 'start', 'end', 'reason', 'info'];
  dataSource = new MatTableDataSource<BaseWish>();

  constructor(private wishService: WishService) {
    // Intentionally empty
  }

  ngOnInit(): void {
    // Add custom sorting for nested objects
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'type-target':
          return item.wishType + item.target;
        case 'start':
          return item.details.start;
        case 'end':
          return item.details.end;
        default:
          return item[property];
      }
    };

    // Load wishes
    this.loadWishes();
  }

  async loadWishes() {
    // Clear previous data, if any
    this.dataSource.data = [];

    // Load Date and Duty Wishes asynchronously but wait with the second call for the first one to be finished.
    // This is necessary because of our Hibernate not being able to handle two requests at the same time.. :(
    this.dataSource.data.push(
      ...await this.wishService.getAllDutyWishes().toPromise(),
      ...await this.wishService.getAllDateWishes().toPromise()
    );
    this.table.renderRows();

    // Add pagination and sorting
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  isDutyWish(wish): boolean {
    return typeof wish.details.dutyId !== 'undefined';
  }
}
