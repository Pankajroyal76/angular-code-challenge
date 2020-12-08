import { Component, OnInit, enableProdMode } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  isShowNavbar: any;
  constructor(private router: Router) {
    let isLogin = localStorage.getItem('isLogin');
    this.isShowNavbar = localStorage.getItem('isLogin');
    if (isLogin === 'true') {
      return;
    } else {
      this.router.navigateByUrl('login');
    }
  }

  ngOnInit(): void {}
  getdata() {
    fetch(
      'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-trending-tickers?region=IN',
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key':
            '397fcd7d35msh11ecf1f588a0bf6p13501cjsnb5d89baae0d8',
          'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
        },
      }
    )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
