import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Duty } from '@app/_models';
import { DutyService } from '@app/_services';

@Component({
  selector: 'app-duty-overview',
  templateUrl: './duty-overview.component.html',
  styleUrls: ['./duty-overview.component.css']
})
export class DutyOverviewComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['start', 'end', 'category', 'description', 'seriesOfPerformances', 'musicalPieces', 'add'];
  dataSource = new MatTableDataSource<Duty>();

  constructor(private dutyService: DutyService) {
    // Intentionally empty
  }

  ngOnInit(): void {
    this.dutyService.getAll().subscribe(duties => {
      this.dataSource.data = duties;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    // Add custom filter for nested objects
    this.dataSource.filterPredicate = (data, filter: string) => {
      const accumulator = (currentTerm, key) => {
        return this.nestedFilterCheck(currentTerm, data, key);
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      // Transform the filter by converting it to lowercase and removing whitespace.
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  nestedFilterCheck(search, data, key) {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }
}
