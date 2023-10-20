import { AfterViewInit, OnInit, Component, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TariffTableDataSource, TariffTableItem } from './tariff-table-datasource';

@Component({
  selector: 'app-tariff-table',
  templateUrl: './tariff-table.component.html',
  styleUrls: ['./tariff-table.component.scss']
})
export class TariffTableComponent implements OnInit, AfterViewInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TariffTableItem>;
  dataSource = new TariffTableDataSource([]);
  @Input('tariffItems') tariffItems!: TariffTableItem[];
  constructor(private changeDetectorRefs: ChangeDetectorRef){
    this.dataSource = new TariffTableDataSource(this.tariffItems);
  }

  ngOnInit(): void {
    this.dataSource = new TariffTableDataSource(this.tariffItems);
  }

  displayedColumns = ['name', 'annualCost'];

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.changeDetectorRefs.detectChanges();
  }
}
