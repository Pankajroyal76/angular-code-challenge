import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-trending-stocks',
  templateUrl: './trending-stocks.component.html',
  styleUrls: ['./trending-stocks.component.css'],
})
export class TrendingStocksComponent implements OnInit {
  public loading = false;
  trendingStocks: Array<any> = [];
  displayedColumns: string[] = ['name', 'weight', 'symbol'];
  allData: any;
  dataSource: MatTableDataSource<any>;
  constructor(private http: HttpClient, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.spinner.show();
    this.http
      .get<any>(
        'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-trending-tickers?region=IN',
        {
          headers: {
            'x-rapidapi-key':
              '397fcd7d35msh11ecf1f588a0bf6p13501cjsnb5d89baae0d8',
            'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
          },
        }
      )
      .subscribe((res) => {
        this.dataSource = new MatTableDataSource(res.finance.result[0].quotes);
        this.spinner.hide();
      });
  }
  applyFilter(filterValue: any) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
}
